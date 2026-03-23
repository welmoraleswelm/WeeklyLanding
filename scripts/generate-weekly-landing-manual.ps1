Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function New-Directory {
    param([Parameter(Mandatory = $true)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Remove-IfExists {
    param([Parameter(Mandatory = $true)][string]$Path)

    if (Test-Path -LiteralPath $Path) {
        Remove-Item -LiteralPath $Path -Recurse -Force
    }
}

function Write-Utf8File {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Content
    )

    $directory = Split-Path -Parent $Path
    if ($directory) {
        New-Directory -Path $directory
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function ConvertTo-Emu {
    param([Parameter(Mandatory = $true)][double]$Inches)
    return [int64][Math]::Round($Inches * 914400)
}

function Escape-Xml {
    param([AllowNull()][string]$Value)

    if ($null -eq $Value) {
        return ''
    }

    return $Value.
        Replace('&', '&amp;').
        Replace('<', '&lt;').
        Replace('>', '&gt;').
        Replace('"', '&quot;').
        Replace("'", '&apos;')
}

function Get-ParagraphXml {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [int]$FontSize = 1400,
        [string]$Color = '1F2937',
        [switch]$Bold,
        [switch]$Bullet,
        [string]$Align = 'l'
    )

    $escapedText = Escape-Xml -Value $Text
    $bulletXml = if ($Bullet) { '<a:buChar char="•"/>' } else { '<a:buNone/>' }
    $boldXml = if ($Bold) { ' b="1"' } else { '' }

    return @"
<a:p>
  <a:pPr algn="$Align">
    $bulletXml
  </a:pPr>
  <a:r>
    <a:rPr lang="es-MX" sz="$FontSize"$boldXml dirty="0" smtClean="0">
      <a:solidFill><a:srgbClr val="$Color"/></a:solidFill>
      <a:latin typeface="Aptos"/>
      <a:ea typeface="Aptos"/>
      <a:cs typeface="Aptos"/>
    </a:rPr>
    <a:t>$escapedText</a:t>
  </a:r>
  <a:endParaRPr lang="es-MX" sz="$FontSize" dirty="0"/>
</a:p>
"@
}

function Get-TextBoxXml {
    param(
        [Parameter(Mandatory = $true)][int]$Id,
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][double]$X,
        [Parameter(Mandatory = $true)][double]$Y,
        [Parameter(Mandatory = $true)][double]$W,
        [Parameter(Mandatory = $true)][double]$H,
        [Parameter(Mandatory = $true)][AllowEmptyCollection()][string[]]$Paragraphs,
        [string]$FillColor = '',
        [string]$LineColor = '',
        [switch]$DashedLine,
        [switch]$RoundRect,
        [string]$Anchor = 't',
        [int]$Inset = 0
    )

    $x = ConvertTo-Emu -Inches $X
    $y = ConvertTo-Emu -Inches $Y
    $cx = ConvertTo-Emu -Inches $W
    $cy = ConvertTo-Emu -Inches $H
    $geometry = if ($RoundRect) { 'roundRect' } else { 'rect' }

    $fillXml = if ($FillColor) {
        "<a:solidFill><a:srgbClr val=""$FillColor""/></a:solidFill>"
    } else {
        '<a:noFill/>'
    }

    $lineXml = if ($LineColor) {
        $dashXml = if ($DashedLine) { '<a:prstDash val="sysDash"/>' } else { '' }
        "<a:ln w=""19050""><a:solidFill><a:srgbClr val=""$LineColor""/></a:solidFill>$dashXml<a:round/></a:ln>"
    } else {
        '<a:ln><a:noFill/></a:ln>'
    }

    $paragraphXml = ($Paragraphs -join "`n")

    return @"
<p:sp>
  <p:nvSpPr>
    <p:cNvPr id="$Id" name="$(Escape-Xml -Value $Name)"/>
    <p:cNvSpPr txBox="1"/>
    <p:nvPr/>
  </p:nvSpPr>
  <p:spPr>
    <a:xfrm>
      <a:off x="$x" y="$y"/>
      <a:ext cx="$cx" cy="$cy"/>
    </a:xfrm>
    <a:prstGeom prst="$geometry"><a:avLst/></a:prstGeom>
    $fillXml
    $lineXml
  </p:spPr>
  <p:txBody>
    <a:bodyPr wrap="square" anchor="$Anchor" lIns="$Inset" tIns="$Inset" rIns="$Inset" bIns="$Inset"/>
    <a:lstStyle/>
    $paragraphXml
  </p:txBody>
</p:sp>
"@
}

function Get-StandardSlideXml {
    param(
        [Parameter(Mandatory = $true)][int]$SlideNumber,
        [Parameter(Mandatory = $true)][int]$TotalSlides,
        [Parameter(Mandatory = $true)][hashtable]$Slide
    )

    $shapes = New-Object System.Collections.Generic.List[string]
    $shapeId = 2

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Top Accent' -X 0 -Y 0 -W 13.333 -H 0.22 -Paragraphs @() -FillColor '1D4ED8'))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Slide Title' -X 0.7 -Y 0.42 -W 7.9 -H 0.55 -Paragraphs @(
        (Get-ParagraphXml -Text $Slide.Title -FontSize 2400 -Color '0F172A' -Bold)
    )))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Slide Subtitle' -X 0.72 -Y 0.95 -W 8.3 -H 0.35 -Paragraphs @(
        (Get-ParagraphXml -Text $Slide.Subtitle -FontSize 1100 -Color '475569')
    )))
    $shapeId++

    $bodyParagraphs = New-Object System.Collections.Generic.List[string]
    $bodyParagraphs.Add((Get-ParagraphXml -Text $Slide.Summary -FontSize 1300 -Color '334155' -Bold))
    foreach ($bullet in $Slide.Bullets) {
        $bodyParagraphs.Add((Get-ParagraphXml -Text $bullet -FontSize 1180 -Color '334155' -Bullet))
    }

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Body Card' -X 0.7 -Y 1.35 -W 5.45 -H 4.82 -Paragraphs $bodyParagraphs.ToArray() -FillColor 'FFFFFF' -LineColor 'CBD5E1' -RoundRect -Inset (ConvertTo-Emu -Inches 0.14)))
    $shapeId++

    $captureParagraphs = @(
        (Get-ParagraphXml -Text 'ESPACIO PARA CAPTURA' -FontSize 1700 -Color '0F172A' -Bold -Align 'ctr'),
        (Get-ParagraphXml -Text $Slide.CaptureTitle -FontSize 1100 -Color '475569' -Align 'ctr'),
        (Get-ParagraphXml -Text $Slide.CaptureHint -FontSize 980 -Color '64748B' -Align 'ctr')
    )

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Capture Placeholder' -X 6.45 -Y 1.35 -W 6.15 -H 4.82 -Paragraphs $captureParagraphs -FillColor 'F8FAFC' -LineColor '94A3B8' -DashedLine -RoundRect -Anchor 'ctr' -Inset (ConvertTo-Emu -Inches 0.18)))
    $shapeId++

    $footerText = "Weekly Landing | Manual de usuario | Diapositiva $SlideNumber de $TotalSlides"
    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Footer' -X 0.7 -Y 6.45 -W 12.0 -H 0.25 -Paragraphs @(
        (Get-ParagraphXml -Text $footerText -FontSize 900 -Color '64748B')
    )))

    $shapeXml = $shapes -join "`n"

    return @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      $shapeXml
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr>
    <a:masterClrMapping/>
  </p:clrMapOvr>
</p:sld>
"@
}

function Get-CoverSlideXml {
    param(
        [Parameter(Mandatory = $true)][int]$SlideNumber,
        [Parameter(Mandatory = $true)][int]$TotalSlides,
        [Parameter(Mandatory = $true)][hashtable]$Slide
    )

    $shapes = New-Object System.Collections.Generic.List[string]
    $shapeId = 2

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Cover Background' -X 0 -Y 0 -W 13.333 -H 7.5 -Paragraphs @() -FillColor 'EFF6FF'))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Cover Accent' -X 0 -Y 0 -W 13.333 -H 0.35 -Paragraphs @() -FillColor '1D4ED8'))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Cover Title' -X 0.8 -Y 0.85 -W 5.4 -H 1.3 -Paragraphs @(
        (Get-ParagraphXml -Text 'Manual de usuario' -FontSize 1800 -Color '1D4ED8' -Bold),
        (Get-ParagraphXml -Text 'Weekly Landing' -FontSize 3000 -Color '0F172A' -Bold)
    )))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Cover Details' -X 0.82 -Y 2.35 -W 5.1 -H 2.15 -Paragraphs @(
        (Get-ParagraphXml -Text 'Documento editable para capacitacion interna y operacion diaria.' -FontSize 1300 -Color '334155'),
        (Get-ParagraphXml -Text 'Incluye modulos reales de la aplicacion, pasos de uso y recuadros para insertar capturas.' -FontSize 1180 -Color '475569' -Bullet),
        (Get-ParagraphXml -Text 'Se recomienda reemplazar cada recuadro gris por una evidencia de la pantalla correspondiente.' -FontSize 1180 -Color '475569' -Bullet),
        (Get-ParagraphXml -Text 'Fecha de elaboracion: 11 de marzo de 2026.' -FontSize 1080 -Color '64748B')
    ) -FillColor 'FFFFFF' -LineColor 'BFDBFE' -RoundRect -Inset (ConvertTo-Emu -Inches 0.14)))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Cover Placeholder' -X 6.45 -Y 0.9 -W 5.95 -H 5.55 -Paragraphs @(
        (Get-ParagraphXml -Text 'ESPACIO PARA PORTADA' -FontSize 1900 -Color '0F172A' -Bold -Align 'ctr'),
        (Get-ParagraphXml -Text 'Inserta aqui una captura de la landing, dashboard o logotipo principal.' -FontSize 1150 -Color '475569' -Align 'ctr'),
        (Get-ParagraphXml -Text 'Sugerencia: usa una imagen horizontal de alta resolucion.' -FontSize 980 -Color '64748B' -Align 'ctr')
    ) -FillColor 'F8FAFC' -LineColor '60A5FA' -DashedLine -RoundRect -Anchor 'ctr' -Inset (ConvertTo-Emu -Inches 0.18)))
    $shapeId++

    $shapes.Add((Get-TextBoxXml -Id $shapeId -Name 'Cover Footer' -X 0.82 -Y 6.72 -W 11.6 -H 0.25 -Paragraphs @(
        (Get-ParagraphXml -Text "Weekly Landing | Manual editable | Diapositiva $SlideNumber de $TotalSlides" -FontSize 920 -Color '64748B')
    )))

    $shapeXml = $shapes -join "`n"

    return @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      $shapeXml
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr>
    <a:masterClrMapping/>
  </p:clrMapOvr>
</p:sld>
"@
}

$slides = @(
    [ordered]@{
        Kind = 'cover'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '1. Introduccion al sistema'
        Subtitle = 'Vista general del alcance funcional de Weekly Landing'
        Summary = 'Weekly Landing centraliza el registro, consulta y seguimiento de tickets y datos fiscales.'
        Bullets = @(
            'La aplicacion combina landing publica, acceso autenticado y panel interno.',
            'Los modulos principales son Dashboard, Gestion de tickets, Gestion de contribuyentes, Mi suscripcion, Cartera y Soporte.',
            'El objetivo operativo es cargar tickets, extraer informacion, asociarla a contribuyentes y dar seguimiento al proceso.',
            'Tambien permite revisar consumos del plan, metodos de pago, facturas e informacion fiscal.',
            'Este manual esta pensado para usuarios finales y puede completarse con capturas reales de su entorno.'
        )
        CaptureTitle = 'Captura sugerida: pagina de inicio o landing principal'
        CaptureHint = 'Usa una imagen completa donde se vea la marca y el acceso al sistema.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '2. Inicio de sesion'
        Subtitle = 'Acceso al entorno autenticado'
        Summary = 'El acceso principal del usuario autenticado se realiza desde la pantalla de inicio de sesion.'
        Bullets = @(
            'El formulario solicita correo y contrasena para ingresar al sistema.',
            'Existe la opcion "Mantener sesion activa" para conservar el acceso en el equipo actual.',
            'Si las credenciales son correctas, el sistema redirige automaticamente al Dashboard.',
            'Si ocurre un error, se muestra un mensaje para validar datos o intentar nuevamente.',
            'La pantalla tambien incluye accesos visibles a registro y regreso al inicio.'
        )
        CaptureTitle = 'Captura sugerida: formulario de inicio de sesion'
        CaptureHint = 'Muestra campos de correo, contrasena y boton "Iniciar sesion".'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '3. Navegacion general'
        Subtitle = 'Como moverse dentro de la plataforma'
        Summary = 'La experiencia interna se organiza con un menu lateral, encabezado superior y area central de trabajo.'
        Bullets = @(
            'El menu lateral contiene accesos directos a Dashboard, Tickets, Contribuyentes, Mi suscripcion, Cartera y Soporte.',
            'El boton hamburguesa permite expandir o contraer el panel lateral, sobre todo en vista movil.',
            'El encabezado superior incluye buscador, cambio de tema y menu del usuario.',
            'Cada modulo abre dentro del area central sin salir del entorno principal.',
            'Las pantallas incluyen breadcrumb o titulo superior para confirmar en que modulo se encuentra el usuario.'
        )
        CaptureTitle = 'Captura sugerida: layout completo con sidebar y header'
        CaptureHint = 'Asegura que se vea el menu lateral y el titulo del modulo actual.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '4. Dashboard'
        Subtitle = 'Resumen ejecutivo de operacion y consumo'
        Summary = 'El Dashboard muestra indicadores rapidos para revisar actividad, uso del plan y estado general de la operacion.'
        Bullets = @(
            'La tarjeta "Plan" muestra nombre del plan, dias restantes, tickets usados, limite y proyeccion de consumo.',
            'La seccion "Tickets" resume guardados, pendientes, cancelados y facturados, junto con total facturado.',
            'La tarjeta "Preparacion para facturacion" indica que porcentaje de tickets guardados estan listos para avanzar.',
            'La grafica de tickets permite alternar entre guardados y facturados, con vistas mensual, trimestral y anual.',
            'Tambien se incluyen listas de top empresas, errores recientes y ultimos tickets para monitoreo rapido.'
        )
        CaptureTitle = 'Captura sugerida: Dashboard completo'
        CaptureHint = 'Intenta incluir tarjetas principales, grafica y tablas inferiores.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '5. Gestion de tickets: consulta'
        Subtitle = 'Revision del listado principal de tickets'
        Summary = 'Este modulo permite filtrar, buscar y revisar el estado de todos los tickets cargados.'
        Bullets = @(
            'En la parte superior se muestran KPIs de guardados, pendientes, cancelados y facturados.',
            'Los chips de filtro permiten cambiar rapidamente la vista por estatus.',
            'Tambien se puede buscar por empresa o numero, filtrar por rango de fechas y ordenar por total o antiguedad.',
            'El listado principal muestra fecha, empresa, numero, total, estatus y acciones disponibles.',
            'Si no hay datos, la pantalla informa que no existe informacion para mostrar; si falla la carga, ofrece reintentar.'
        )
        CaptureTitle = 'Captura sugerida: pantalla principal de Gestion de tickets'
        CaptureHint = 'Incluye filtros y al menos algunas filas de la tabla.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '6. Gestion de tickets: subir ticket'
        Subtitle = 'Proceso de carga y extraccion de informacion'
        Summary = 'El boton "Subir ticket" abre un modal para cargar una o varias imagenes del comprobante.'
        Bullets = @(
            'El usuario puede arrastrar archivos o seleccionarlos desde su equipo en formatos JPG, PNG, WEBP, BMP o GIF.',
            'Antes de procesar, se debe elegir el contribuyente al que se asociara la facturacion.',
            'La plataforma permite buscar contribuyentes por nombre o RFC y filtrar por tipo de persona.',
            'Despues de cargar archivos, el usuario puede quitar elementos, limpiar campos o iniciar el procesamiento.',
            'Si la extraccion es exitosa, aparece la opcion "Guardar datos" para persistir la informacion obtenida.'
        )
        CaptureTitle = 'Captura sugerida: modal de Subir ticket'
        CaptureHint = 'Muestra el area de carga, lista de archivos y selector de contribuyente.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '7. Gestion de tickets: detalle y seguimiento'
        Subtitle = 'Acciones disponibles sobre un ticket'
        Summary = 'Cada registro incluye acciones para consultar detalles, ver evidencia y recuperar operaciones fallidas.'
        Bullets = @(
            'La accion "Ver detalle" abre un modal con informacion del ticket, empresa emisora y cliente receptor.',
            'Desde el detalle se puede abrir el ticket, descargar la imagen o cerrar la ventana.',
            'Existe un modal adicional para visualizar la imagen completa del ticket dentro de la plataforma.',
            'Si el estatus del ticket es cancelado, aparece la accion "Reintentar" para relanzar el proceso.',
            'Estas funciones ayudan a validar datos, corregir incidencias y conservar evidencia del comprobante.'
        )
        CaptureTitle = 'Captura sugerida: modal de detalle o visualizacion del ticket'
        CaptureHint = 'Conviene mostrar campos clave y botones de accion.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '8. Gestion de contribuyentes'
        Subtitle = 'Consulta, filtros y manejo de favoritos'
        Summary = 'Este modulo concentra la administracion de contribuyentes globales y favoritos.'
        Bullets = @(
            'Los filtros permiten ver todos, solo favoritos o solo globales.',
            'Tambien se puede buscar por nombre o RFC y filtrar por tipo de persona fisica o moral.',
            'La tabla muestra nombre de la persona, nombre comercial, RFC, tipo y estado de favorito.',
            'El boton de favorito cambia entre "Agregar" y "Favorito" segun el estado actual del registro.',
            'El sistema puede mostrar notificaciones de exito o error para confirmar actualizaciones.'
        )
        CaptureTitle = 'Captura sugerida: pantalla de Gestion de contribuyentes'
        CaptureHint = 'Incluye filtros superiores y columna de favorito.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '9. Carga de CSF en PDF'
        Subtitle = 'Extraccion de datos fiscales desde constancia'
        Summary = 'Desde Gestion de contribuyentes se puede abrir el flujo "Subir CSF" para procesar una constancia fiscal en PDF.'
        Bullets = @(
            'El usuario selecciona un archivo PDF y espera a que termine el procesamiento.',
            'Si el archivo se procesa correctamente, la pantalla muestra los datos extraidos para revision.',
            'Los campos se organizan en datos generales, direccion y datos de persona fisica o moral.',
            'Antes de guardar, el usuario puede corregir o complementar la informacion extraida.',
            'Al final es posible guardar el contribuyente o lanzar un nuevo proceso de ticket.'
        )
        CaptureTitle = 'Captura sugerida: modal "Subir PDF CSF" con datos extraidos'
        CaptureHint = 'Idealmente muestra el archivo cargado y algunos campos editables.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '10. Mi suscripcion'
        Subtitle = 'Revision del plan contratado y renovaciones'
        Summary = 'La pantalla de Mi suscripcion esta orientada al control del plan activo del usuario.'
        Bullets = @(
            'Si no existe una suscripcion activa, el sistema invita a revisar planes disponibles.',
            'Cuando hay plan activo, se muestran resumen del plan, estado de la suscripcion y consumo.',
            'El usuario puede revisar metodo de pago, historial de cobros y beneficios incluidos en el plan.',
            'La vista tambien presenta otros planes disponibles para evaluar cambios.',
            'Desde esta pantalla se puede abrir el flujo para cambiar plan y, si aplica, cancelar la suscripcion.'
        )
        CaptureTitle = 'Captura sugerida: pantalla de Mi suscripcion'
        CaptureHint = 'Incluye resumen del plan, estado y tabla de historial.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '11. Cartera'
        Subtitle = 'Administracion financiera y datos fiscales'
        Summary = 'Cartera complementa el manejo de suscripcion con medios de pago, seguridad y datos fiscales.'
        Bullets = @(
            'La vista incluye un resumen del plan, mensajes del sistema y alertas relacionadas con pagos.',
            'El bloque de gestion de suscripcion permite cambiar plan, reintentar pagos, actualizar tarjeta o cancelar.',
            'El usuario puede administrar tarjetas guardadas, definir una como predeterminada o eliminarla.',
            'Tambien se muestran paneles de seguridad, consumo, tabla de facturas e informacion fiscal.',
            'El formulario fiscal permite actualizar datos necesarios para facturacion o cumplimiento administrativo.'
        )
        CaptureTitle = 'Captura sugerida: pantalla de Cartera'
        CaptureHint = 'Procura que se vean los modulos de pago y el formulario fiscal.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '12. Soporte'
        Subtitle = 'Centro de ayuda y seguimiento de solicitudes'
        Summary = 'El modulo de Soporte concentra acceso rapido a ayuda, guias y tickets recientes.'
        Bullets = @(
            'La pagina muestra un encabezado de soporte, listado de tickets recientes y acceso para crear uno nuevo.',
            'Las acciones rapidas ayudan a iniciar procesos frecuentes o navegar a funciones de asistencia.',
            'Las tarjetas de guias y preguntas frecuentes facilitan la autosolucion de dudas comunes.',
            'Tambien se incluyen recursos legales y un acceso flotante al chat de soporte.',
            'Cuando se abre el modal de nuevo ticket, el usuario puede enviar una solicitud directamente desde la plataforma.'
        )
        CaptureTitle = 'Captura sugerida: centro de Soporte'
        CaptureHint = 'Incluye tickets recientes, guias y modulo de FAQ.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '13. Buenas practicas de uso'
        Subtitle = 'Recomendaciones operativas para una captura mas limpia'
        Summary = 'Estas practicas ayudan a reducir errores de OCR y a mantener consistencia en la operacion diaria.'
        Bullets = @(
            'Usa imagenes claras, completas y sin recortes al momento de subir tickets.',
            'Verifica que el contribuyente seleccionado corresponda al receptor correcto antes de procesar.',
            'Revisa la informacion extraida antes de guardarla, sobre todo importes, RFC y fechas.',
            'Da seguimiento a tickets cancelados o pendientes para evitar acumulacion de incidencias.',
            'Mantener actualizados metodos de pago y datos fiscales reduce bloqueos administrativos posteriores.'
        )
        CaptureTitle = 'Captura sugerida: evidencia de buenas practicas o checklist interno'
        CaptureHint = 'Puede reemplazarse por una captura de proceso correcto o una politica interna.'
    },
    [ordered]@{
        Kind = 'standard'
        Title = '14. Checklist de capturas recomendadas'
        Subtitle = 'Lista rapida para completar esta presentacion'
        Summary = 'Antes de entregar el manual final, revisa que las evidencias cubran el recorrido completo del usuario.'
        Bullets = @(
            'Landing o pantalla principal.',
            'Formulario de inicio de sesion.',
            'Dashboard completo.',
            'Gestion de tickets: lista, modal de carga y modal de detalle.',
            'Gestion de contribuyentes y modal de CSF.',
            'Mi suscripcion, Cartera y Soporte.'
        )
        CaptureTitle = 'Espacio libre para una captura adicional o collage final'
        CaptureHint = 'Tambien puedes pegar una combinacion de mini capturas como resumen visual.'
    }
)

$root = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $root 'docs'
$outputFile = Join-Path $outputDirectory 'Manual_Usuario_Weekly_Landing.pptx'
$workRoot = Join-Path $root '.tmp\weekly-landing-manual-pptx'
$packageRoot = Join-Path $workRoot 'package'

Remove-IfExists -Path $workRoot
New-Directory -Path $packageRoot

$packageDirectories = @(
    '_rels',
    'docProps',
    'ppt',
    'ppt\_rels',
    'ppt\slides',
    'ppt\slides\_rels',
    'ppt\slideLayouts',
    'ppt\slideLayouts\_rels',
    'ppt\slideMasters',
    'ppt\slideMasters\_rels',
    'ppt\theme'
)

foreach ($relativePath in $packageDirectories) {
    New-Directory -Path (Join-Path $packageRoot $relativePath)
}

$slideOverrides = New-Object System.Collections.Generic.List[string]
$slideIdList = New-Object System.Collections.Generic.List[string]
$presentationRelationships = New-Object System.Collections.Generic.List[string]

$presentationRelationships.Add('<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>')
$presentationRelationships.Add('<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/>')
$presentationRelationships.Add('<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/>')

$slideIndex = 1
$relationIndex = 4
$slideIdBase = 256
$totalSlides = $slides.Count

foreach ($slide in $slides) {
    if ($slide.Kind -eq 'cover') {
        $slideXml = Get-CoverSlideXml -SlideNumber $slideIndex -TotalSlides $totalSlides -Slide $slide
    } else {
        $slideXml = Get-StandardSlideXml -SlideNumber $slideIndex -TotalSlides $totalSlides -Slide $slide
    }

    $slideFile = Join-Path $packageRoot "ppt\slides\slide$slideIndex.xml"
    Write-Utf8File -Path $slideFile -Content $slideXml

    $slideRelFile = Join-Path $packageRoot "ppt\slides\_rels\slide$slideIndex.xml.rels"
    Write-Utf8File -Path $slideRelFile -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>
"@

    $slideOverrides.Add("<Override PartName=""/ppt/slides/slide$slideIndex.xml"" ContentType=""application/vnd.openxmlformats-officedocument.presentationml.slide+xml""/>")
    $slideIdList.Add("<p:sldId id=""$($slideIdBase + $slideIndex - 1)"" r:id=""rId$relationIndex""/>")
    $presentationRelationships.Add("<Relationship Id=""rId$relationIndex"" Type=""http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide"" Target=""slides/slide$slideIndex.xml""/>")

    $slideIndex++
    $relationIndex++
}

Write-Utf8File -Path (Join-Path $packageRoot '[Content_Types].xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>
  <Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  $($slideOverrides -join "`n  ")
</Types>
"@

Write-Utf8File -Path (Join-Path $packageRoot '_rels\.rels') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"@

$createdUtc = (Get-Date).ToUniversalTime().ToString("s") + 'Z'

Write-Utf8File -Path (Join-Path $packageRoot 'docProps\app.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
  <PresentationFormat>On-screen Show (16:9)</PresentationFormat>
  <Slides>$totalSlides</Slides>
  <Notes>0</Notes>
  <HiddenSlides>0</HiddenSlides>
  <MMClips>0</MMClips>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs>
    <vt:vector size="2" baseType="variant">
      <vt:variant><vt:lpstr>Slides</vt:lpstr></vt:variant>
      <vt:variant><vt:i4>$totalSlides</vt:i4></vt:variant>
    </vt:vector>
  </HeadingPairs>
  <TitlesOfParts>
    <vt:vector size="$totalSlides" baseType="lpstr">
      <vt:lpstr>Weekly Landing</vt:lpstr>
      <vt:lpstr>Introduccion</vt:lpstr>
      <vt:lpstr>Inicio de sesion</vt:lpstr>
      <vt:lpstr>Navegacion general</vt:lpstr>
      <vt:lpstr>Dashboard</vt:lpstr>
      <vt:lpstr>Gestion de tickets</vt:lpstr>
      <vt:lpstr>Subir ticket</vt:lpstr>
      <vt:lpstr>Detalle de ticket</vt:lpstr>
      <vt:lpstr>Contribuyentes</vt:lpstr>
      <vt:lpstr>CSF PDF</vt:lpstr>
      <vt:lpstr>Mi suscripcion</vt:lpstr>
      <vt:lpstr>Cartera</vt:lpstr>
      <vt:lpstr>Soporte</vt:lpstr>
      <vt:lpstr>Buenas practicas</vt:lpstr>
      <vt:lpstr>Checklist</vt:lpstr>
    </vt:vector>
  </TitlesOfParts>
  <Company>Weekly Landing</Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>1.0</AppVersion>
</Properties>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'docProps\core.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Manual de usuario Weekly Landing</dc:title>
  <dc:subject>Manual de usuario</dc:subject>
  <dc:creator>Codex</dc:creator>
  <cp:keywords>manual usuario weekly landing power point pptx</cp:keywords>
  <dc:description>Manual editable de Weekly Landing con espacios para capturas.</dc:description>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">$createdUtc</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">$createdUtc</dcterms:modified>
</cp:coreProperties>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\presentation.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" saveSubsetFonts="1" autoCompressPictures="0">
  <p:sldMasterIdLst>
    <p:sldMasterId id="2147483648" r:id="rId1"/>
  </p:sldMasterIdLst>
  <p:sldIdLst>
    $($slideIdList -join "`n    ")
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="screen16x9"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:defaultTextStyle>
    <a:defPPr>
      <a:defRPr lang="es-MX"/>
    </a:defPPr>
  </p:defaultTextStyle>
</p:presentation>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\_rels\presentation.xml.rels') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  $($presentationRelationships -join "`n  ")
</Relationships>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\presProps.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentationPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\viewProps.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:viewPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" lastView="sldView">
  <p:normalViewPr>
    <p:restoredLeft sz="15620"/>
    <p:restoredTop sz="94660"/>
  </p:normalViewPr>
  <p:slideViewPr>
    <p:cSldViewPr snapToGrid="0">
      <p:guideLst/>
    </p:cSldViewPr>
  </p:slideViewPr>
  <p:notesTextViewPr>
    <p:cViewPr>
      <p:scale sx="100" sy="100"/>
      <p:origin x="0" y="0"/>
    </p:cViewPr>
  </p:notesTextViewPr>
  <p:gridSpacing cx="72008" cy="72008"/>
</p:viewPr>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\slideMasters\slideMaster1.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Default Master">
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill>
        <a:effectLst/>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst>
    <p:sldLayoutId id="1" r:id="rId1"/>
  </p:sldLayoutIdLst>
  <p:txStyles>
    <p:titleStyle>
      <a:lvl1pPr algn="l">
        <a:defRPr sz="2800" b="1"/>
      </a:lvl1pPr>
    </p:titleStyle>
    <p:bodyStyle>
      <a:lvl1pPr algn="l">
        <a:defRPr sz="1400"/>
      </a:lvl1pPr>
    </p:bodyStyle>
    <p:otherStyle>
      <a:lvl1pPr algn="l">
        <a:defRPr sz="1200"/>
      </a:lvl1pPr>
    </p:otherStyle>
  </p:txStyles>
</p:sldMaster>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\slideMasters\_rels\slideMaster1.xml.rels') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\slideLayouts\slideLayout1.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank Layout">
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr>
    <a:masterClrMapping/>
  </p:clrMapOvr>
</p:sldLayout>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\slideLayouts\_rels\slideLayout1.xml.rels') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>
"@

Write-Utf8File -Path (Join-Path $packageRoot 'ppt\theme\theme1.xml') -Content @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Weekly Theme">
  <a:themeElements>
    <a:clrScheme name="Weekly Colors">
      <a:dk1><a:srgbClr val="0F172A"/></a:dk1>
      <a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="1E293B"/></a:dk2>
      <a:lt2><a:srgbClr val="F8FAFC"/></a:lt2>
      <a:accent1><a:srgbClr val="1D4ED8"/></a:accent1>
      <a:accent2><a:srgbClr val="2563EB"/></a:accent2>
      <a:accent3><a:srgbClr val="0EA5E9"/></a:accent3>
      <a:accent4><a:srgbClr val="10B981"/></a:accent4>
      <a:accent5><a:srgbClr val="F59E0B"/></a:accent5>
      <a:accent6><a:srgbClr val="EF4444"/></a:accent6>
      <a:hlink><a:srgbClr val="2563EB"/></a:hlink>
      <a:folHlink><a:srgbClr val="7C3AED"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Weekly Fonts">
      <a:majorFont>
        <a:latin typeface="Aptos Display"/>
        <a:ea typeface="Aptos Display"/>
        <a:cs typeface="Aptos Display"/>
      </a:majorFont>
      <a:minorFont>
        <a:latin typeface="Aptos"/>
        <a:ea typeface="Aptos"/>
        <a:cs typeface="Aptos"/>
      </a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Weekly Format">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/></a:schemeClr></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"><a:shade val="90000"/></a:schemeClr></a:solidFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
      </a:effectStyleLst>
      <a:bgFillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/></a:schemeClr></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"><a:shade val="90000"/></a:schemeClr></a:solidFill>
      </a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
  <a:objectDefaults/>
  <a:extraClrSchemeLst/>
</a:theme>
"@

Add-Type -AssemblyName System.IO.Compression.FileSystem

Remove-IfExists -Path $outputFile
New-Directory -Path $outputDirectory
[System.IO.Compression.ZipFile]::CreateFromDirectory($packageRoot, $outputFile)

Write-Host "PowerPoint generado en: $outputFile"
