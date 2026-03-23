export interface GuideStep {
  title: string;
  description: string;
}

export interface GuideItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  duration: string;
  steps: GuideStep[];
  tips: string[];
}

export const GUIDES: GuideItem[] = [
  {
    id: 'guia-subir-ticket',
    title: 'Subir ticket correctamente',
    summary: 'Asegura calidad de imagen y datos legibles.',
    category: 'Carga de tickets',
    duration: '3 min',
    steps: [
      { title: 'Captura clara', description: 'Toma la foto con buena luz y sin sombras.' },
      { title: 'Revisa totales', description: 'Confirma que el total y fecha se vean completos.' },
      { title: 'Sube el archivo', description: 'Arrastra la imagen o PDF en el módulo de carga.' },
    ],
    tips: ['Evita reflejos', 'No recortes el ticket', 'Usa fondo plano'],
  },
  {
    id: 'guia-entender-estatus',
    title: 'Entender estatus del ticket',
    summary: 'Aprende qué significa cada etapa del proceso.',
    category: 'Procesamiento',
    duration: '4 min',
    steps: [
      { title: 'Processing', description: 'OCR y validación de datos en curso.' },
      { title: 'Waiting Provider', description: 'Esperando respuesta del portal externo.' },
      { title: 'Completed', description: 'Factura generada y disponible.' },
    ],
    tips: ['Consulta el timeline', 'Reintenta si falla', 'Contacta soporte si persiste'],
  },
  {
    id: 'guia-reintentar',
    title: 'Reintentar proceso',
    summary: 'Lanza un nuevo intento en segundos.',
    category: 'Incidencias',
    duration: '2 min',
    steps: [
      { title: 'Abre el ticket', description: 'Ve al detalle del ticket fallido.' },
      { title: 'Reintentar', description: 'Haz clic en “Reintentar proceso”.' },
      { title: 'Monitorea', description: 'Sigue el estado desde el panel.' },
    ],
    tips: ['Verifica conexión', 'Valida RFC antes de reintentar'],
  },
  {
    id: 'guia-corregir-rfc',
    title: 'Corregir RFC / razón social',
    summary: 'Actualiza datos fiscales para emitir correctamente.',
    category: 'Datos fiscales',
    duration: '5 min',
    steps: [
      { title: 'Ir a perfil fiscal', description: 'Abre el panel de datos fiscales.' },
      { title: 'Editar datos', description: 'Corrige RFC, razón social y régimen.' },
      { title: 'Guardar y reintentar', description: 'Guarda cambios y reintenta el ticket.' },
    ],
    tips: ['Usa mayúsculas', 'Verifica homoclave'],
  },
  {
    id: 'guia-descargar-cfdi',
    title: 'Descargar CFDI/PDF',
    summary: 'Accede a tus archivos fiscales en segundos.',
    category: 'Facturación',
    duration: '2 min',
    steps: [
      { title: 'Ir a facturas', description: 'Entra a la sección “Facturas”.' },
      { title: 'Selecciona ticket', description: 'Abre el detalle del ticket.' },
      { title: 'Descargar', description: 'Elige CFDI o PDF según necesites.' },
    ],
    tips: ['Usa filtros por fecha', 'Verifica estatus “Completed”'],
  },
  {
    id: 'guia-reportar-incidencia',
    title: 'Reportar incidencia',
    summary: 'Crea un caso con contexto completo.',
    category: 'Soporte',
    duration: '3 min',
    steps: [
      { title: 'Completa el formulario', description: 'Describe el problema con detalles.' },
      { title: 'Adjunta evidencia', description: 'Agrega captura o archivo relevante.' },
      { title: 'Envía', description: 'Recibirás seguimiento en tu correo.' },
    ],
    tips: ['Incluye ID de ticket', 'Añade fecha y hora'],
  },
];
