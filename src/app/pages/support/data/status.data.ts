export type ServiceStatus = 'operational' | 'degraded' | 'down';
export type ProcessStatus = 'completed' | 'processing' | 'waiting' | 'failed';

export interface StatusService {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  updatedAt: string;
}

export interface ProcessState {
  status: ProcessStatus;
  label: string;
  description: string;
}

export const STATUS_SERVICES: StatusService[] = [
  {
    id: 'ia',
    name: 'Motor de IA (OCR)',
    description: 'Lectura y extracción de datos',
    status: 'operational',
    updatedAt: 'Hace 2 min',
  },
  {
    id: 'portales',
    name: 'Portales externos',
    description: 'Conexión con proveedores fiscales',
    status: 'degraded',
    updatedAt: 'Hace 8 min',
  },
  {
    id: 'descargas',
    name: 'Descargas CFDI/PDF',
    description: 'Generación y descarga de archivos',
    status: 'operational',
    updatedAt: 'Hace 1 min',
  },
  {
    id: 'pagos',
    name: 'Pagos',
    description: 'Cobros y renovaciones de plan',
    status: 'operational',
    updatedAt: 'Hace 3 min',
  },
  {
    id: 'notificaciones',
    name: 'Notificaciones',
    description: 'Alertas por correo y app',
    status: 'down',
    updatedAt: 'Hace 12 min',
  },
];

export const PROCESS_STATES: ProcessState[] = [
  {
    status: 'completed',
    label: 'Completed',
    description: 'Factura emitida correctamente',
  },
  {
    status: 'processing',
    label: 'Processing',
    description: 'Extracción y validación en curso',
  },
  {
    status: 'waiting',
    label: 'Waiting Provider',
    description: 'Esperando respuesta del portal',
  },
  {
    status: 'failed',
    label: 'Failed',
    description: 'Error en lectura o timbrado',
  },
];
