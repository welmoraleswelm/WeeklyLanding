export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-tipos-ticket',
    question: '¿Qué tipos de tickets puedo subir (foto o PDF)?',
    answer:
      'Puedes subir imágenes JPG/PNG y archivos PDF de tickets físicos o digitales. Recomendamos fotos en buena luz, sin cortes y con el total visible.',
    tags: ['ticket', 'foto', 'pdf', 'formatos'],
  },
  {
    id: 'faq-rechazos',
    question: '¿Cuáles son los rechazos más comunes?',
    answer:
      'Los rechazos suelen ocurrir por totales ilegibles, RFC incorrecto, fecha fuera del periodo o imágenes borrosas. Revisa el ticket antes de reintentar.',
    tags: ['rechazos', 'errores', 'ocr'],
  },
  {
    id: 'faq-tiempos',
    question: '¿Cuánto tarda el procesamiento?',
    answer:
      'Normalmente entre 1 y 3 minutos. En horas pico o con portales externos lentos puede extenderse hasta 15 minutos.',
    tags: ['tiempos', 'procesamiento'],
  },
  {
    id: 'faq-reintentos',
    question: '¿Cómo funcionan los reintentos?',
    answer:
      'Si un portal falla, el sistema reintenta automáticamente hasta 3 veces. También puedes lanzar un reintento manual desde el detalle del ticket.',
    tags: ['reintentos', 'fallas', 'portal'],
  },
  {
    id: 'faq-portales',
    question: '¿Qué pasa si un portal externo está caído?',
    answer:
      'El ticket se marca como “Waiting Provider”. Mantendremos el intento activo y te avisaremos cuando el servicio se restablezca.',
    tags: ['portal', 'down', 'waiting provider'],
  },
  {
    id: 'faq-descarga',
    question: '¿Cómo descargo la factura (CFDI/PDF)?',
    answer:
      'Desde la sección “Facturas” selecciona el ticket y haz clic en “Descargar CFDI” o “Descargar PDF”.',
    tags: ['descarga', 'cfdi', 'pdf'],
  },
  {
    id: 'faq-fiscales',
    question: 'Mis datos fiscales están incorrectos, ¿cómo los corrijo?',
    answer:
      'En “Perfil fiscal” actualiza RFC, razón social y régimen. Luego reintenta el ticket para aplicar los cambios.',
    tags: ['rfc', 'razon social', 'datos fiscales'],
  },
  {
    id: 'faq-limite',
    question: '¿Qué ocurre si llego al límite de mi plan?',
    answer:
      'Se detienen nuevos procesamientos hasta el siguiente ciclo o hasta que actualices tu plan.',
    tags: ['limite', 'plan', 'upgrade'],
  },
  {
    id: 'faq-seguridad',
    question: '¿Cómo se protegen mis datos?',
    answer:
      'Los archivos se almacenan cifrados y los accesos se auditan. Solo usuarios autorizados pueden ver tus tickets.',
    tags: ['seguridad', 'datos', 'cifrado'],
  },
  {
    id: 'faq-mfa',
    question: '¿Cómo activo MFA?',
    answer:
      'Ve a “Seguridad” y habilita la autenticación en dos pasos. Puedes usar apps como Google Authenticator.',
    tags: ['mfa', 'seguridad'],
  },
  {
    id: 'faq-notificaciones',
    question: 'No recibo notificaciones, ¿qué hago?',
    answer:
      'Revisa tu correo y preferencias de notificación. Verifica que no estén bloqueadas por tu proveedor.',
    tags: ['notificaciones', 'correo'],
  },
  {
    id: 'faq-pagos',
    question: '¿Cómo se factura mi plan y dónde veo los pagos?',
    answer:
      'Los cobros son automáticos según tu ciclo. Consulta el historial en “Mi suscripción”.',
    tags: ['pagos', 'facturacion', 'plan'],
  },
];
