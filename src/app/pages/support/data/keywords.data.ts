export interface KeywordArticle {
  id: string;
  title: string;
  url: string;
  keywords: string[];
}

export const KEYWORD_ARTICLES: KeywordArticle[] = [
  {
    id: 'art-rechazos',
    title: 'Rechazos comunes y cómo resolverlos',
    url: '#rechazos',
    keywords: ['rechazo', 'error', 'fallido', 'ocr', 'ilegible'],
  },
  {
    id: 'art-cfdi',
    title: 'Descarga de CFDI y PDF',
    url: '#descarga',
    keywords: ['descarga', 'cfdi', 'pdf', 'factura'],
  },
  {
    id: 'art-reintentos',
    title: 'Reintentos y recuperación automática',
    url: '#reintentos',
    keywords: ['reintento', 'portal', 'waiting', 'proveedor'],
  },
  {
    id: 'art-datos-fiscales',
    title: 'Actualizar datos fiscales',
    url: '#fiscales',
    keywords: ['rfc', 'razon social', 'datos fiscales', 'corregir'],
  },
  {
    id: 'art-limites',
    title: 'Límites del plan y upgrades',
    url: '#limites',
    keywords: ['limite', 'plan', 'upgrade', 'suscripcion'],
  },
  {
    id: 'art-mfa',
    title: 'Activar MFA para mayor seguridad',
    url: '#mfa',
    keywords: ['mfa', 'seguridad', '2fa'],
  },
];
