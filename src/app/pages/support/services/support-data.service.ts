import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { SupportHistoryTicket } from '../models/support-history-ticket.model';
import { FaqItem } from '../models/faq.model';
import { GuideItem } from '../models/guide.model';
import { ApiClientService } from '../../../core/http/api-client.service';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiRequestContextService } from '../../../core/http/api-request-context.service';

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LegalResourceItem {
  id: string;
  title: string;
  href: string;
}

export interface SupportTicketDetail {
  id: number;
  folio: string;
  asunto: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  estatus: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  bucketPath: string;
}

export interface SupportTicketImage {
  archivoBase64: string;
  nombreArchivo: string;
  contentType: string;
}

export interface SupportHeaderSummary {
  averageResponseTimeLabel: string;
}

interface RecentSupportTicketDto {
  idTicketSoporteDTO: number;
  folioDTO: string;
  asuntoDTO: string;
  estatusDTO: string;
  fechaCreacionDTO: string;
  tieneImagenDTO: boolean;
}

interface SupportHistoryTicketDto {
  idTicketSoporteDTO: number;
  folioDTO: string;
  asuntoDTO: string;
  categoriaDTO: string;
  prioridadDTO: string;
  estatusDTO: string;
  fechaCreacionDTO: string;
  fechaActualizacionDTO: string;
  tieneImagenDTO: boolean;
}

interface SupportTicketDetailDto {
  idTicketSoporteDTO: number;
  folioDTO: string;
  asuntoDTO: string;
  descripcionDTO: string;
  categoriaDTO: string;
  prioridadDTO: string;
  estatusDTO: string;
  fechaCreacionDTO: string;
  fechaActualizacionDTO: string;
  bucketPathDTO: string;
}

interface SupportTicketImageDto {
  archivoBase64DTO: string;
  nombreArchivoDTO: string;
  contentTypeDTO: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupportDataService {
  constructor(
    private readonly api: ApiClientService,
    private readonly requestContext: ApiRequestContextService,
  ) {}

  private readonly quickActions: QuickActionItem[] = [
    {
      id: 'qa-new',
      title: 'Subir ticket',
      description: 'Adjunta tu imagen y recibe seguimiento prioritario.',
      icon: 'upload',
    },
    {
      id: 'qa-retry',
      title: 'Reintentar último ticket',
      description: 'Reenvía la última solicitud con datos corregidos.',
      icon: 'retry',
    },
    {
      id: 'qa-cfdi',
      title: 'Descargar CFDI',
      description: 'Obtén tu CFDI en PDF y XML desde tu panel.',
      icon: 'download',
    },
  ];

  private readonly guides: GuideItem[] = [
    {
      id: 'g-1',
      title: 'Subir ticket correctamente',
      description: 'Checklist para adjuntar imágenes completas y legibles.',
      icon: 'check',
    },
    {
      id: 'g-2',
      title: 'Entender estado del ticket',
      description: 'Qué significa cada estado y tiempos de respuesta.',
      icon: 'status',
    },
    {
      id: 'g-3',
      title: 'Reportar incidencia',
      description: 'Paso a paso para reportar errores críticos.',
      icon: 'alert',
    },
  ];

  private readonly faqs: FaqItem[] = [
    {
      id: 'f-1',
      question: '¿Cuánto tarda en procesarse un ticket?',
      answer: 'Normalmente entre 24 y 48 horas hábiles dependiendo del volumen.',
      category: 'Estado',
    },
    {
      id: 'f-2',
      question: '¿Qué formatos son válidos para subir imágenes?',
      answer: 'Aceptamos PNG, JPG, JPEG y WEBP siempre que estén completos y legibles.',
      category: 'Subidas',
    },
    {
      id: 'f-3',
      question: '¿Cómo reintento un ticket fallido?',
      answer: 'Desde el historial puedes reintentar con una nueva imagen.',
      category: 'Acciones',
    },
  ];

  private readonly legalResources: LegalResourceItem[] = [
    {
      id: 'l-1',
      title: 'Política de privacidad',
      href: '#',
    },
    {
      id: 'l-2',
      title: 'Términos del servicio',
      href: '#',
    },
    {
      id: 'l-3',
      title: 'Acuerdo de procesamiento de datos',
      href: '#',
    },
  ];

  getRecentTickets(): Observable<Ticket[]> {
    return this.api
      .post<RecentSupportTicketDto[]>(
        API_ENDPOINTS.support.recentTickets,
        this.requestContext.withUserId({ cantidad: 3 })
      )
      .pipe(
        map((rows) => (rows ?? []).map((row) => this.mapRecentTicket(row))),
        catchError(() => of([]))
      );
  }

  getHeaderSummary(): Observable<SupportHeaderSummary> {
    return of({ averageResponseTimeLabel: 'Sin datos' });
  }

  getTicketHistory(): Observable<SupportHistoryTicket[]> {
    const request = this.requestContext.withUserId({});
    return this.buildHistoryFromRecentTickets(request);
  }

  getTicketDetail(idTicketSoporte: string): Observable<SupportTicketDetail> {
    return this.api
      .post<SupportTicketDetailDto>(
        API_ENDPOINTS.support.ticketDetail,
        this.requestContext.withUserId({ idTicketSoporte: Number(idTicketSoporte) })
      )
      .pipe(map((row) => this.mapTicketDetail(row)));
  }

  getTicketImage(idTicketSoporte: string): Observable<SupportTicketImage> {
    return this.api
      .post<SupportTicketImageDto>(
        API_ENDPOINTS.support.ticketImage,
        this.requestContext.withUserId({ idTicketSoporte: Number(idTicketSoporte) })
      )
      .pipe(
        map((row) => ({
          archivoBase64: row.archivoBase64DTO,
          nombreArchivo: row.nombreArchivoDTO,
          contentType: row.contentTypeDTO,
        }))
      );
  }

  getQuickActions(): Observable<QuickActionItem[]> {
    return of(this.quickActions);
  }

  getGuides(): Observable<GuideItem[]> {
    return of(this.guides);
  }

  getFaqs(): Observable<FaqItem[]> {
    return of(this.faqs);
  }

  getLegalResources(): Observable<LegalResourceItem[]> {
    return of(this.legalResources);
  }

  private buildHistoryFromRecentTickets(request: { idUsuario: number }): Observable<SupportHistoryTicket[]> {
    return this.api
      .post<RecentSupportTicketDto[]>(API_ENDPOINTS.support.recentTickets, { ...request, cantidad: 100 })
      .pipe(
        switchMap((recentRows) => {
          const items = recentRows ?? [];
          if (!items.length) {
            return of([] as SupportHistoryTicket[]);
          }

          return forkJoin(
            items.map((row) =>
              this.getTicketDetail(String(row.idTicketSoporteDTO)).pipe(
                map((detail) => ({ row, detail })),
                catchError(() => of({ row, detail: null }))
              )
            )
          ).pipe(
            map((details) =>
              details.map(({ row, detail }) => ({
                id: String(row.idTicketSoporteDTO),
                title: row.asuntoDTO || 'Ticket sin asunto',
                number: row.folioDTO || '-',
                category: detail?.categoria || '-',
                priority: detail?.prioridad || '-',
                status: row.estatusDTO || 'abierto',
                createdAt: this.formatSupportDate(row.fechaCreacionDTO),
                updatedAt: detail?.fechaActualizacion || this.formatSupportDate(row.fechaCreacionDTO),
                createdAtRaw: row.fechaCreacionDTO,
                updatedAtRaw: row.fechaCreacionDTO,
                hasImage: row.tieneImagenDTO === true,
              }))
            )
          );
        })
      );
  }

  createTicket(payload: {
    title: string;
    description: string;
    category: string;
    priority: string;
    image: File | null;
  }): Observable<unknown> {
    const formData = new FormData();
    formData.append('idUsuario', String(this.requestContext.getUserIdOrDefault()));
    formData.append('asunto', payload.title);
    formData.append('descripcion', payload.description);
    formData.append('categoria', payload.category);
    formData.append('prioridad', payload.priority);

    if (payload.image) {
      formData.append('imagen', payload.image, payload.image.name);
    }

    return this.api.post<unknown>(API_ENDPOINTS.support.createTicket, formData);
  }

  private mapRecentTicket(row: RecentSupportTicketDto): Ticket {
    return {
      id: String(row.idTicketSoporteDTO),
      title: row.asuntoDTO || 'Ticket sin asunto',
      status: this.mapStatus(row.estatusDTO),
      updatedAt: this.formatSupportDate(row.fechaCreacionDTO),
      number: row.folioDTO || '-',
      hasImage: row.tieneImagenDTO === true,
    };
  }

  private mapHistoryTicket(row: SupportHistoryTicketDto): SupportHistoryTicket {
    return {
      id: String(row.idTicketSoporteDTO),
      title: row.asuntoDTO || 'Ticket sin asunto',
      number: row.folioDTO || '-',
      category: row.categoriaDTO || '-',
      priority: row.prioridadDTO || '-',
      status: row.estatusDTO || 'abierto',
      createdAt: this.formatSupportDate(row.fechaCreacionDTO),
      updatedAt: this.formatSupportDate(row.fechaActualizacionDTO),
      createdAtRaw: row.fechaCreacionDTO,
      updatedAtRaw: row.fechaActualizacionDTO,
      hasImage: row.tieneImagenDTO === true,
    };
  }

  private mapTicketDetail(row: SupportTicketDetailDto): SupportTicketDetail {
    return {
      id: row.idTicketSoporteDTO,
      folio: row.folioDTO,
      asunto: row.asuntoDTO,
      descripcion: row.descripcionDTO,
      categoria: row.categoriaDTO,
      prioridad: row.prioridadDTO,
      estatus: row.estatusDTO,
      fechaCreacion: this.formatSupportDate(row.fechaCreacionDTO),
      fechaActualizacion: this.formatSupportDate(row.fechaActualizacionDTO),
      bucketPath: row.bucketPathDTO,
    };
  }

  private mapStatus(status: string): Ticket['status'] {
    const normalized = (status || '').trim().toLowerCase();

    switch (normalized) {
      case 'abierto':
        return 'Waiting provider';
      case 'en_proceso':
      case 'en proceso':
      case 'procesando':
        return 'Processing';
      case 'cerrado':
      case 'resuelto':
      case 'completado':
        return 'Completed';
      case 'fallido':
      case 'rechazado':
        return 'Failed';
      default:
        return 'Waiting provider';
    }
  }

  private formatSupportDate(value: string): string {
    if (!value) return '-';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}



