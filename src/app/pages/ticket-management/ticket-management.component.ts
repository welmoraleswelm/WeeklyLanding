import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { catchError, of } from 'rxjs';
import {
  AssociatedContributor,
  TicketApiService,
  TicketDetailResult,
  TicketStatusSummary
} from './services/ticket-api.service';
import {
  TicketUploadStatusService,
  UploadBackgroundState,
  UploadNotificationSnapshot
} from './services/ticket-upload-status.service';

// Tipos
export type TicketStatus = 'guardado' | 'pendiente' | 'cancelado' | 'facturado';

export interface Ticket {
  id: string;
  fecha: string;
  empresa: string;
  numero: string;
  total: number;
  estatus: TicketStatus;
  tieneImagen: boolean;
  tieneFactura: boolean;
  pdfUrl?: string;
  xmlUrl?: string;
  notas?: string;
  uuid?: string;
}

interface DetailEntry {
  key: string;
  label: string;
  value: string;
}

interface UploadTicketCard {
  title: string;
  entries: DetailEntry[];
}

interface UploadNotification {
  id: number;
  tone: 'info' | 'success' | 'error';
  message: string;
  expiresAt: number;
}

type SortOption = 'recientes' | 'antiguos' | 'mayor-total' | 'menor-total';
type ViewState = 'loading' | 'empty' | 'error' | 'data';

@Component({
  selector: 'app-ticket-management',
  imports: [CommonModule, FormsModule, ModalComponent, PageBreadcrumbComponent],
  templateUrl: './ticket-management.component.html',
})
export class TicketManagementComponent implements OnInit, OnDestroy {
  private static readonly HIDDEN_DETAIL_KEYS = new Set([
    'bucketpath',
    'idempresa',
    'estatus',
    'idcliente',
    'idtiporazonsocial',
    'idmunicipio',
  ]);
  private static readonly UPLOAD_LABEL_MAP: Record<string, string> = {
    empresa_detectada: 'Empresa detectada',
    razon_social_emisor: 'Razon social emisor',
    rfc_emisor: 'RFC emisor',
    fecha: 'Fecha',
    hora: 'Hora',
    total: 'Total',
    cambio: 'Cambio',
    numero_ticket: 'Numero de ticket',
    codigo_postal_emisor: 'Codigo postal emisor',
    sucursal: 'Sucursal',
    caja: 'Caja',
    nombre_tienda: 'Nombre tienda',
    referencia_facturacion: 'Referencia facturacion',
    num_transaccion: 'Numero transaccion',
  };
  private static readonly UPLOAD_FIELD_ORDER = [
    'empresa_detectada',
    'razon_social_emisor',
    'rfc_emisor',
    'fecha',
    'hora',
    'total',
    'cambio',
    'numero_ticket',
    'codigo_postal_emisor',
    'sucursal',
    'caja',
    'nombre_tienda',
    'referencia_facturacion',
    'num_transaccion',
  ];

  // Estados de la vista
  viewState: ViewState = 'data';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ticketApiService: TicketApiService,
    private readonly ticketUploadStatusService: TicketUploadStatusService,
  ) {}

  // Filtros
  activeFilter: TicketStatus | 'todos' = 'todos';
  searchQuery = '';
  sortOption: SortOption = 'recientes';
  dateFrom = '';
  dateTo = '';

  // Modal
  isDetailModalOpen = false;
  selectedTicket: Ticket | null = null;
  isDetailLoading = false;
  detailLoadError = '';
  ticketDetail: TicketDetailResult | null = null;
  isTicketImageModalOpen = false;
  isTicketImageLoading = false;
  ticketImageError = '';
  ticketImageDataUrl: string | null = null;
  ticketImageTicketId: string | null = null;
  isUploadModalOpen = false;
  isUploadDragging = false;
  isUploading = false;
  isSavingExtracted = false;
  uploadError = '';
  uploadSuccess = '';
  uploadResponsePayload: unknown = null;
  uploadFiles: File[] = [];
  associatedContributors: AssociatedContributor[] = [];
  selectedContributorId: number | null = null;
  isAssociatedContributorsLoading = false;
  associatedContributorsError = '';
  associatedContributorsSearch = '';
  associatedContributorsPersonType: 'todos' | 'FISICA' | 'MORAL' = 'todos';
  uploadBackgroundState: UploadBackgroundState = 'idle';
  uploadBackgroundMessage = '';
  uploadNotifications: UploadNotification[] = [];
  highlightUploadButton = false;
  private notificationSeq = 0;
  private uploadHighlightTimer: ReturnType<typeof setTimeout> | null = null;
  private notificationTimers = new Map<number, ReturnType<typeof setTimeout>>();

  tickets: Ticket[] = [];
  ticketStatusSummary: TicketStatusSummary | null = null;

  ngOnInit(): void {
    this.hydrateUploadBackgroundState();
    this.hydrateUploadNotifications();
    this.viewState = 'loading';
    this.loadTicketStatusSummary();
    this.loadTickets();

    if (this.route.snapshot.queryParamMap.get('highlightUpload') === '1') {
      this.triggerUploadHighlight();
    }
  }

  ngOnDestroy(): void {
    for (const timer of this.notificationTimers.values()) {
      clearTimeout(timer);
    }
    this.notificationTimers.clear();

    if (this.uploadHighlightTimer) {
      clearTimeout(this.uploadHighlightTimer);
      this.uploadHighlightTimer = null;
    }
  }

  private loadTicketStatusSummary(): void {
    this.ticketApiService.getTicketStatusSummary().subscribe((summary) => {
      this.ticketStatusSummary = summary;
    });
  }

  private loadTickets(): void {
    this.ticketApiService
      .getTickets()
      .pipe(catchError(() => of([] as Ticket[])))
      .subscribe({
        next: (tickets) => {
          this.tickets = tickets;
          this.viewState = this.tickets.length ? 'data' : 'empty';
        },
        error: () => {
          this.viewState = 'error';
          this.tickets = [];
        },
      });
  }

  // Computed: tickets filtrados y ordenados
  get filteredTickets(): Ticket[] {
    let result = [...this.tickets];

    // Filtrar por estatus
    if (this.activeFilter !== 'todos') {
      result = result.filter(t => t.estatus === this.activeFilter);
    }

    // Filtrar por búsqueda
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.empresa.toLowerCase().includes(query) ||
          t.numero.toLowerCase().includes(query)
      );
    }

    // Filtrar por rango de fechas
    const fromDate = this.parseFilterDate(this.dateFrom);
    const toDate = this.parseFilterDate(this.dateTo);
    const normalizedRange = this.normalizeDateRange(fromDate, toDate);

    if (normalizedRange.from || normalizedRange.to) {
      result = result.filter((t) => {
        const ticketDate = this.parseTicketDate(t.fecha);
        if (!ticketDate) return false;

        if (normalizedRange.from && ticketDate < normalizedRange.from) return false;
        if (normalizedRange.to && ticketDate > normalizedRange.to) return false;
        return true;
      });
    }

    // Ordenar
    switch (this.sortOption) {
      case 'recientes':
        result.sort((a, b) => b.fecha.localeCompare(a.fecha));
        break;
      case 'antiguos':
        result.sort((a, b) => a.fecha.localeCompare(b.fecha));
        break;
      case 'mayor-total':
        result.sort((a, b) => b.total - a.total);
        break;
      case 'menor-total':
        result.sort((a, b) => a.total - b.total);
        break;
    }

    return result;
  }

  // KPIs
  get kpis() {
    if (this.ticketStatusSummary) {
      return this.ticketStatusSummary;
    }

    return {
      guardados: this.tickets.filter(t => t.estatus === 'guardado').length,
      pendientes: this.tickets.filter(t => t.estatus === 'pendiente').length,
      cancelados: this.tickets.filter(t => t.estatus === 'cancelado').length,
      facturados: this.tickets.filter(t => t.estatus === 'facturado').length,
    };
  }

  get showHeaderUploadIndicator(): boolean {
    return this.uploadBackgroundState !== 'idle';
  }

  get showUploadNotificationsDock(): boolean {
    return this.uploadNotifications.length > 0;
  }

  get uploadBackgroundPhaseLabel(): string {
    switch (this.uploadBackgroundState) {
      case 'processing':
        return 'Extrayendo';
      case 'saving':
        return 'Guardando';
      case 'success':
        return 'Completado';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  }

  get uploadBackgroundProgress(): number {
    switch (this.uploadBackgroundState) {
      case 'processing':
        return 45;
      case 'saving':
        return 85;
      case 'success':
        return 100;
      case 'error':
        return 100;
      default:
        return 0;
    }
  }

  // Helpers
  getStatusLabel(status: TicketStatus): string {
    const labels: Record<TicketStatus, string> = {
      guardado: 'Guardado',
      pendiente: 'Pendiente',
      cancelado: 'Cancelado',
      facturado: 'Facturado',
    };
    return labels[status];
  }

  getStatusClasses(status: TicketStatus): string {
    const classes: Record<TicketStatus, string> = {
      guardado: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
      pendiente: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400',
      cancelado: 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400',
      facturado: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
    };
    return classes[status];
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  // Acciones
  setFilter(filter: TicketStatus | 'todos'): void {
    this.activeFilter = filter;
  }

  clearFilters(): void {
    this.activeFilter = 'todos';
    this.searchQuery = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.sortOption = 'recientes';
  }

  openDatePicker(input: HTMLInputElement): void {
    (input as { showPicker?: () => void }).showPicker?.();
  }

  openTicketDetail(ticket: Ticket): void {
    this.selectedTicket = {
      ...ticket,
      // No habilites acciones de imagen hasta que el detalle confirme que existe una ruta real.
      tieneImagen: false,
    };
    this.isDetailModalOpen = true;
    this.ticketDetail = null;
    this.detailLoadError = '';
    this.isDetailLoading = true;

    const idTicket = Number(ticket.id);
    if (!Number.isFinite(idTicket) || idTicket <= 0) {
      this.isDetailLoading = false;
      this.detailLoadError = 'No se pudo identificar el ticket seleccionado.';
      return;
    }

    const selectedTicketId = ticket.id;

    this.ticketApiService.getTicketDetail(idTicket).subscribe((detail) => {
      if (this.selectedTicket?.id !== selectedTicketId) return;

      this.isDetailLoading = false;

      if (!detail?.ticket) {
        this.detailLoadError = 'No se encontró detalle para este ticket.';
        return;
      }

      this.ticketDetail = detail;
      this.setTicketImageAvailability(selectedTicketId, this.hasTicketImageInDetail(detail.ticket));
    });
  }

  closeDetailModal(): void {
    this.isDetailModalOpen = false;
    this.closeTicketImageModal();
    this.selectedTicket = null;
    this.ticketDetail = null;
    this.detailLoadError = '';
    this.isDetailLoading = false;
  }

  onUploadTicket(): void {
    this.highlightUploadButton = false;
    this.isUploadModalOpen = true;
    this.resetUploadFormState();
    this.loadAssociatedContributors();
  }

  closeUploadModal(): void {
    if (this.isUploading || this.isSavingExtracted) {
      this.isUploadModalOpen = false;
      return;
    }
    this.isUploadModalOpen = false;
    this.resetUploadFormState();
  }

  onUploadDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isUploadDragging = true;
  }

  onUploadDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isUploadDragging = false;
  }

  onUploadDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isUploadDragging = false;

    const files = event.dataTransfer?.files ?? null;
    this.setUploadFiles(files);
  }

  onUploadFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setUploadFiles(input.files ?? null);
    input.value = '';
  }

  removeUploadFile(index: number): void {
    this.uploadFiles = this.uploadFiles.filter((_, i) => i !== index);
    this.uploadError = '';
  }

  submitUploadTicket(): void {
    if (!this.uploadFiles.length || this.isUploading) {
      this.uploadError = 'Selecciona al menos una imagen para continuar.';
      return;
    }

    this.isUploading = true;
    this.uploadError = '';
    this.uploadSuccess = '';
    this.uploadResponsePayload = null;
    this.setUploadBackgroundState('processing', 'Procesando tickets en segundo plano...');
    this.pushUploadNotification('Extracción iniciada.', 'info', 15000);
    this.isUploadModalOpen = false;

    this.ticketApiService.readTicket(this.uploadFiles).subscribe({
      next: (result) => {
        this.isUploading = false;
        this.uploadResponsePayload = result.payload;
        this.uploadSuccess = 'Informacion extraida correctamente. Guardando tickets...';
        this.setUploadBackgroundState('saving', 'Extraccion completada. Guardando tickets en segundo plano...');
        const extractedCount = this.getExtractedTicketCount(result.payload);
        if (extractedCount > 0) {
          this.pushUploadNotification(`Extracción completada (${extractedCount} ticket(s)).`, 'success', 20000);
          this.pushPerTicketNotifications(extractedCount, 'extraído');
        } else {
          this.pushUploadNotification('Extracción completada.', 'success', 20000);
        }
        this.onSaveExtractedTickets();
      },
      error: () => {
        this.isUploading = false;
        this.uploadError = 'No se pudo procesar el ticket. Verifica el archivo e intenta de nuevo.';
        this.setUploadBackgroundState('error', 'No se pudo procesar el ticket en segundo plano.');
        this.pushUploadNotification('Error al extraer tickets.', 'error', 30000);
      },
    });
  }

  onSaveExtractedTickets(): void {
    if (this.isSavingExtracted || !this.hasUploadExtractionResult) return;

    this.isSavingExtracted = true;
    this.uploadError = '';
    this.setUploadBackgroundState('saving', 'Guardando tickets en segundo plano...');

    this.ticketApiService.saveExtractedTickets(this.uploadResponsePayload).subscribe({
      next: (result) => {
        this.isSavingExtracted = false;
        this.uploadSuccess = 'Informacion extraida y tickets guardados correctamente.';
        this.setUploadBackgroundState('success', 'Lectura finalizada. Tickets guardados correctamente.');
        const savedCount = this.getSavedTicketCount(result?.payload);
        if (savedCount > 0) {
          this.pushUploadNotification(`Guardado completado (${savedCount} ticket(s)).`, 'success', 20000);
          this.pushPerTicketNotifications(savedCount, 'guardado');
        } else {
          this.pushUploadNotification('Guardado completado.', 'success', 20000);
        }
        this.resetUploadFormState();
        this.loadTicketStatusSummary();
        this.loadTickets();
      },
      error: () => {
        this.isSavingExtracted = false;
        this.uploadError = 'No se pudieron guardar los tickets extraidos.';
        this.setUploadBackgroundState('error', 'Se extrajo la informacion, pero no se pudieron guardar los tickets.');
        this.pushUploadNotification('Error al guardar tickets extraídos.', 'error', 30000);
      },
    });
  }
  clearUploadBackgroundMessage(): void {
    this.uploadBackgroundState = 'idle';
    this.uploadBackgroundMessage = '';
    this.ticketUploadStatusService.clear();
  }

  dismissUploadNotification(id: number): void {
    this.uploadNotifications = this.uploadNotifications.filter((n) => n.id !== id);
    this.syncUploadNotifications();
    const timer = this.notificationTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.notificationTimers.delete(id);
    }
  }

  onExportCSV(): void {
    console.log('Exportar tickets a CSV');
  }

  onDownloadPDF(ticket: Ticket): void {
    this.onViewTicketImage(ticket);
  }

  onViewTicketImage(ticket: Ticket): void {
    this.fetchTicketImage(ticket, { openModal: true, download: false });
  }

  onDownloadTicketImage(ticket: Ticket): void {
    this.pushUploadNotification(`Iniciando descarga del ticket ${ticket.numero || ticket.id}.`, 'info', 10000);
    this.fetchTicketImage(ticket, { openModal: false, download: true });
  }

  closeTicketImageModal(): void {
    this.isTicketImageModalOpen = false;
    this.isTicketImageLoading = false;
    this.ticketImageError = '';
  }

  onRetry(ticket: Ticket): void {
    this.ticketApiService
      .retryTicket(ticket.id)
      .pipe(catchError(() => of(void 0)))
      .subscribe(() => {
        console.log('Reintentar procesamiento del ticket:', ticket.id);
      });
  }

  // Cambiar estado de la vista (para demostración)
  setViewState(state: ViewState): void {
    this.viewState = state;
  }

  get ticketDetailEntries(): DetailEntry[] {
    return this.buildDetailEntries(this.ticketDetail?.ticket);
  }

  get empresaEmisoraEntries(): DetailEntry[] {
    return this.buildDetailEntries(this.ticketDetail?.empresaEmisora);
  }

  get clienteReceptorEntries(): DetailEntry[] {
    return this.buildDetailEntries(this.ticketDetail?.clienteReceptor);
  }

  private buildDetailEntries(record: Record<string, unknown> | null | undefined): DetailEntry[] {
    if (!record) return [];

    return Object.entries(record)
      .filter(([key]) => !this.isHiddenDetailKey(key))
      .map(([key, value]) => ({
        key,
        label: this.toDetailLabel(key),
        value: this.formatDetailValue(value, key),
      }));
  }

  private toDetailLabel(raw: string): string {
    return raw
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  private isHiddenDetailKey(raw: string): boolean {
    const normalized = raw.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    return TicketManagementComponent.HIDDEN_DETAIL_KEYS.has(normalized);
  }

  private formatDetailValue(value: unknown, key: string): string {
    if (value === null || value === undefined) return 'N/A';

    if (typeof value === 'number') {
      if (key.includes('total') || key.includes('cambio') || key.includes('importe')) {
        return this.formatCurrency(value);
      }
      return String(value);
    }

    if (typeof value === 'boolean') return value ? 'Sí' : 'No';

    if (typeof value === 'string') {
      if (this.isIsoDate(value)) return this.formatDateTime(value);
      const clean = value.trim();
      return clean.length ? clean : 'N/A';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  private isIsoDate(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(value);
  }

  private formatDateTime(value: string): string {
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

  private buildTicketImageDataUrl(base64: string): string | null {
    const clean = base64.trim();
    if (!clean.length) return null;

    if (clean.startsWith('data:image/')) return clean;

    return `data:image/jpeg;base64,${clean}`;
  }

  private fetchTicketImage(ticket: Ticket, options: { openModal: boolean; download: boolean }): void {
    if (!ticket.tieneImagen) {
      if (options.openModal) {
        this.isTicketImageModalOpen = true;
        this.isTicketImageLoading = false;
        this.ticketImageDataUrl = null;
        this.ticketImageError = 'Este ticket no tiene imagen disponible.';
      }
      return;
    }

    if (this.ticketImageDataUrl && this.ticketImageTicketId === ticket.id) {
      if (options.openModal) {
        this.isTicketImageModalOpen = true;
        this.isTicketImageLoading = false;
        this.ticketImageError = '';
      }
      if (options.download) {
        this.downloadTicketImage(this.ticketImageDataUrl, ticket);
        this.pushUploadNotification(`Descarga completada: ${this.buildTicketImageFileName(ticket)}.`, 'success', 12000);
      }
      return;
    }

    const idTicket = Number(ticket.id);
    if (!Number.isFinite(idTicket) || idTicket <= 0) {
      if (options.openModal) {
        this.isTicketImageModalOpen = true;
        this.isTicketImageLoading = false;
        this.ticketImageError = 'No se pudo identificar el ticket para cargar imagen.';
      }
      if (options.download) {
        this.pushUploadNotification('No se pudo identificar el ticket para descargar la imagen.', 'error', 20000);
      }
      return;
    }

    if (options.openModal) {
      this.isTicketImageModalOpen = true;
      this.isTicketImageLoading = true;
      this.ticketImageError = '';
      this.ticketImageDataUrl = null;
    }

    this.ticketApiService.getTicketImage(idTicket).subscribe((base64) => {
      if (!base64) {
        this.setTicketImageAvailability(ticket.id, false);
        if (options.openModal) {
          this.isTicketImageLoading = false;
          this.ticketImageError = 'Este ticket no tiene imagen disponible.';
        }
        return;
      }

      const imageUrl = this.buildTicketImageDataUrl(base64);
      if (!imageUrl) {
        if (options.openModal) {
          this.isTicketImageLoading = false;
          this.ticketImageError = 'La imagen recibida no es válida.';
        }
        if (options.download) {
          this.pushUploadNotification('La imagen del ticket no es válida para descargar.', 'error', 20000);
        }
        return;
      }

      this.ticketImageDataUrl = imageUrl;
      this.ticketImageTicketId = ticket.id;

      if (options.openModal) {
        this.isTicketImageLoading = false;
        this.ticketImageError = '';
      }

      if (options.download) {
        this.downloadTicketImage(imageUrl, ticket);
        this.pushUploadNotification(`Descarga completada: ${this.buildTicketImageFileName(ticket)}.`, 'success', 12000);
      }
    }, () => {
      this.setTicketImageAvailability(ticket.id, false);
      if (options.openModal) {
        this.isTicketImageLoading = false;
        this.ticketImageError = 'Este ticket no tiene imagen disponible.';
      }
    });
  }

  private hasTicketImageInDetail(record: Record<string, unknown> | null | undefined): boolean {
    if (!record) return false;

    const explicitFlag = this.toOptionalBoolean(record['tieneImagenDTO'] ?? record['tieneImagen'] ?? record['tiene_imagen']);
    if (explicitFlag !== null) return explicitFlag;

    const candidates = [
      record['bucketpath'],
      record['bucketPath'],
      record['bucket_path'],
    ];

    return candidates.some((value) => typeof value === 'string' && value.trim().length > 0);
  }

  private toOptionalBoolean(value: unknown): boolean | null {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value !== 'string') return null;

    const normalized = value.trim().toLowerCase();
    if (!normalized.length) return null;
    if (['1', 'true', 'si', 'sí', 'yes'].includes(normalized)) return true;
    if (['0', 'false', 'no'].includes(normalized)) return false;
    return null;
  }

  private setTicketImageAvailability(ticketId: string, available: boolean): void {
    this.tickets = this.tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, tieneImagen: available } : ticket
    );

    if (this.selectedTicket?.id === ticketId) {
      this.selectedTicket = { ...this.selectedTicket, tieneImagen: available };
    }
  }

  private downloadTicketImage(dataUrl: string, ticket: Ticket): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = this.buildTicketImageFileName(ticket);
    link.click();
  }

  private buildTicketImageFileName(ticket: Ticket): string {
    const safeNumber = ticket.numero.replace(/[^a-zA-Z0-9_-]/g, '_');
    return `ticket_${safeNumber || ticket.id}.jpg`;
  }

  private parseTicketDate(value: string): Date | null {
    // Ticket data is expected as yyyy-mm-dd.
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-').map((part) => Number(part));
      const parsed = new Date(year, month - 1, day);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }

  private parseFilterDate(value: string): Date | null {
    if (!value?.trim()) return null;
    const clean = value.trim();

    // Native date input model value.
    if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
      const [year, month, day] = clean.split('-').map((part) => Number(part));
      const parsed = new Date(year, month - 1, day);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    // Manual input fallback: dd/mm/yyyy.
    const slashMatch = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
      const day = Number(slashMatch[1]);
      const month = Number(slashMatch[2]);
      const year = Number(slashMatch[3]);
      const parsed = new Date(year, month - 1, day);
      if (Number.isNaN(parsed.getTime())) return null;
      if (
        parsed.getFullYear() !== year ||
        parsed.getMonth() !== month - 1 ||
        parsed.getDate() !== day
      ) {
        return null;
      }
      return parsed;
    }

    return null;
  }

  private normalizeDateRange(from: Date | null, to: Date | null): { from: Date | null; to: Date | null } {
    if (!from || !to) {
      return { from, to };
    }

    if (from <= to) {
      return { from, to };
    }

    // If user inverts dates, we swap to keep UX forgiving.
    return { from: to, to: from };
  }

  get uploadResponsePrettyJson(): string {
    if (this.uploadResponsePayload === null || this.uploadResponsePayload === undefined) {
      return '';
    }

    try {
      return JSON.stringify(this.uploadResponsePayload, null, 2);
    } catch {
      return String(this.uploadResponsePayload);
    }
  }

  get hasUploadExtractionResult(): boolean {
    return this.uploadResponsePayload !== null && this.uploadResponsePayload !== undefined;
  }

  get uploadTicketCards(): UploadTicketCard[] {
    const items = this.extractUploadTicketItems(this.uploadResponsePayload);
    if (!items.length) return [];

    return items.map((item, index) => {
      const mergedFields = this.mergeUploadTicketFields(item);
      return {
        title: `Ticket ${index + 1}`,
        entries: this.buildUploadEntries(mergedFields),
      };
    });
  }

  get filteredAssociatedContributors(): AssociatedContributor[] {
    let result = [...this.associatedContributors];

    const personType = this.associatedContributorsPersonType;
    if (personType !== 'todos') {
      result = result.filter((item) => item.tipoPersona.toUpperCase() === personType);
    }

    const query = this.associatedContributorsSearch.trim().toLowerCase();
    if (query.length) {
      result = result.filter((item) => {
        const name = item.nombre.toLowerCase();
        const rfc = item.rfc.toLowerCase();
        return name.includes(query) || rfc.includes(query);
      });
    }

    return result;
  }

  formatUploadFileSize(sizeInBytes: number): string {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private setUploadFiles(files: FileList | null): void {
    this.uploadError = '';
    this.uploadSuccess = '';
    this.uploadResponsePayload = null;

    if (!files || files.length === 0) {
      this.uploadFiles = [];
      return;
    }

    const incoming = Array.from(files);
    const valid: File[] = [];

    for (const file of incoming) {
      const validationError = this.validateUploadFile(file);
      if (validationError) {
        this.uploadError = validationError;
        continue;
      }
      valid.push(file);
    }

    this.uploadFiles = valid;
  }

  private extractUploadTicketItems(payload: unknown): Record<string, unknown>[] {
    if (Array.isArray(payload)) {
      return payload
        .map((item) => this.asRecord(item))
        .filter((item): item is Record<string, unknown> => item !== null);
    }

    const record = this.asRecord(payload);
    if (!record) return [];

    const data = record['data'];
    if (Array.isArray(data)) {
      return data
        .map((item) => this.asRecord(item))
        .filter((item): item is Record<string, unknown> => item !== null);
    }

    return [];
  }

  private mergeUploadTicketFields(item: Record<string, unknown>): Record<string, unknown> {
    const fields: Record<string, unknown> = {};

    const empresaDetectada = item['empresa_detectada'];
    if (empresaDetectada !== undefined) {
      fields['empresa_detectada'] = empresaDetectada;
    }

    const dataTicket = this.asRecord(item['data_ticket']);
    if (dataTicket) {
      Object.assign(fields, dataTicket);
    }

    for (const [key, value] of Object.entries(item)) {
      if (key === 'data_ticket' || key === 'texto_ocr') continue;
      if (fields[key] !== undefined) continue;
      if (typeof value === 'object' && value !== null) continue;
      fields[key] = value;
    }

    return fields;
  }

  private buildUploadEntries(fields: Record<string, unknown>): DetailEntry[] {
    const entries: DetailEntry[] = [];
    const used = new Set<string>();

    for (const key of TicketManagementComponent.UPLOAD_FIELD_ORDER) {
      if (!(key in fields)) continue;
      used.add(key);
      entries.push({
        key,
        label: this.toUploadLabel(key),
        value: this.formatUploadFieldValue(key, fields[key]),
      });
    }

    for (const [key, value] of Object.entries(fields)) {
      if (used.has(key)) continue;
      entries.push({
        key,
        label: this.toUploadLabel(key),
        value: this.formatUploadFieldValue(key, value),
      });
    }

    return entries;
  }

  private toUploadLabel(key: string): string {
    const mapped = TicketManagementComponent.UPLOAD_LABEL_MAP[key];
    if (mapped) return mapped;
    return this.toDetailLabel(key);
  }

  private formatUploadFieldValue(key: string, value: unknown): string {
    if (typeof value === 'string' && key === 'fecha' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return this.formatDate(value);
    }

    if (typeof value === 'number' && (key === 'total' || key === 'cambio')) {
      return this.formatCurrency(value);
    }

    return this.formatDetailValue(value, key);
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  }

  private validateUploadFile(file: File): string | null {
    const maxBytes = 12 * 1024 * 1024;
    const allowedExtensions = new Set(['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif']);
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (!allowedExtensions.has(extension)) {
      return 'Formato no permitido. Usa JPG, PNG, WEBP, BMP o GIF.';
    }

    if (file.size > maxBytes) {
      return 'El archivo excede el tamaño máximo de 12 MB.';
    }

    return null;
  }
  private setUploadBackgroundState(state: UploadBackgroundState, message: string): void {
    this.uploadBackgroundState = state;
    this.uploadBackgroundMessage = message;
    this.ticketUploadStatusService.setStatus(state, message);
  }

  private pushUploadNotification(
    message: string,
    tone: UploadNotification['tone'],
    ttlMs = 20000,
    delayMs = 0
  ): void {
    const id = ++this.notificationSeq;

    const enqueue = () => {
      if (this.uploadNotifications.length >= 30) {
        this.uploadNotifications = this.uploadNotifications.slice(this.uploadNotifications.length - 29);
      }
      const expiresAt = Date.now() + ttlMs;
      this.uploadNotifications = [...this.uploadNotifications, { id, tone, message, expiresAt }];
      this.syncUploadNotifications();
      const removeTimer = setTimeout(() => this.dismissUploadNotification(id), ttlMs);
      this.notificationTimers.set(id, removeTimer);
    };

    if (delayMs > 0) {
      const delayedTimer = setTimeout(enqueue, delayMs);
      this.notificationTimers.set(id, delayedTimer);
      return;
    }

    enqueue();
  }

  private pushPerTicketNotifications(total: number, suffix: 'extraído' | 'guardado'): void {
    const capped = Math.min(Math.max(0, total), 12);
    for (let i = 1; i <= capped; i++) {
      this.pushUploadNotification(`Ticket ${i} ${suffix}.`, 'info', 18000);
    }
  }

  private getExtractedTicketCount(payload: unknown): number {
    return Array.isArray(payload) ? payload.length : 0;
  }

  private getSavedTicketCount(payload: unknown): number {
    if (!Array.isArray(payload)) return 0;

    let saved = 0;
    for (const item of payload) {
      if (!item || typeof item !== 'object') continue;
      if ((item as Record<string, unknown>)['exito'] === true) saved++;
    }

    return saved;
  }

  private hydrateUploadNotifications(): void {
    const now = Date.now();
    const persisted = this.ticketUploadStatusService
      .getNotifications()
      .filter((item) => item.expiresAt > now);

    if (!persisted.length) {
      this.uploadNotifications = [];
      this.syncUploadNotifications();
      return;
    }

    this.uploadNotifications = persisted.map((item) => ({
      id: item.id,
      tone: item.tone,
      message: item.message,
      expiresAt: item.expiresAt,
    }));

    this.notificationSeq = Math.max(this.notificationSeq, ...persisted.map((n) => n.id));

    for (const notification of this.uploadNotifications) {
      const remaining = notification.expiresAt - now;
      if (remaining <= 0) continue;
      const timer = setTimeout(() => this.dismissUploadNotification(notification.id), remaining);
      this.notificationTimers.set(notification.id, timer);
    }
  }

  private syncUploadNotifications(): void {
    const toPersist: UploadNotificationSnapshot[] = this.uploadNotifications.map((item) => ({
      id: item.id,
      tone: item.tone,
      message: item.message,
      expiresAt: item.expiresAt,
    }));
    this.ticketUploadStatusService.setNotifications(toPersist);
  }

  private hydrateUploadBackgroundState(): void {
    const snapshot = this.ticketUploadStatusService.getSnapshot();
    this.uploadBackgroundState = snapshot.state;
    this.uploadBackgroundMessage = snapshot.message;
  }

  private resetUploadFormState(): void {
    this.isUploadDragging = false;
    this.isUploading = false;
    this.isSavingExtracted = false;
    this.uploadError = '';
    this.uploadSuccess = '';
    this.uploadResponsePayload = null;
    this.uploadFiles = [];
  }

  clearUploadFields(): void {
    this.resetUploadFormState();
    this.selectedContributorId = null;
    this.associatedContributorsSearch = '';
    this.associatedContributorsPersonType = 'todos';
  }

  selectAssociatedContributor(idContribuyente: number): void {
    this.selectedContributorId = idContribuyente;
  }

  private triggerUploadHighlight(): void {
    this.highlightUploadButton = true;

    if (this.uploadHighlightTimer) {
      clearTimeout(this.uploadHighlightTimer);
    }

    this.uploadHighlightTimer = setTimeout(() => {
      this.highlightUploadButton = false;
      this.uploadHighlightTimer = null;
    }, 4500);
  }

  private loadAssociatedContributors(): void {
    this.isAssociatedContributorsLoading = true;
    this.associatedContributorsError = '';
    this.associatedContributors = [];
    this.selectedContributorId = null;
    this.associatedContributorsSearch = '';
    this.associatedContributorsPersonType = 'todos';

    this.ticketApiService.getAssociatedContributors().subscribe({
      next: (contributors) => {
        this.isAssociatedContributorsLoading = false;
        this.associatedContributors = contributors;
        this.selectedContributorId = contributors.length ? contributors[0].idContribuyente : null;
      },
      error: () => {
        this.isAssociatedContributorsLoading = false;
        this.associatedContributorsError = 'No se pudo cargar la lista de contribuyentes.';
      },
    });
  }
}



