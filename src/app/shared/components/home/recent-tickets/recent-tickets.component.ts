import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  DashboardApiService,
  LatestTicketItem,
} from '../../../../core/services/dashboard-api.service';
import { ModalComponent } from '../../ui/modal/modal.component';
import {
  TicketApiService,
  TicketDetailResult,
} from '../../../../pages/ticket-management/services/ticket-api.service';

interface DetailEntry {
  key: string;
  label: string;
  value: string;
}

type RecentTicketNotificationTone = 'info' | 'success' | 'error';

interface RecentTicketNotification {
  id: number;
  tone: RecentTicketNotificationTone;
  message: string;
}

@Component({
  selector: 'app-recent-tickets',
  imports: [CommonModule, ModalComponent],
  templateUrl: './recent-tickets.component.html'
})
export class RecentTicketsComponent implements OnInit, OnDestroy {
  private readonly dashboardApiService = inject(DashboardApiService);
  private readonly ticketApiService = inject(TicketApiService);
  private readonly router = inject(Router);

  private static readonly HIDDEN_DETAIL_KEYS = new Set([
    'idticket',
    'idusuario',
    'idfactura',
    'bucketpath',
    'idempresa',
    'estatus',
    'idcliente',
    'idtiporazonsocial',
    'idmunicipio',
  ]);

  tickets: LatestTicketItem[] = [];
  isDetailModalOpen = false;
  selectedTicket: LatestTicketItem | null = null;
  isDetailLoading = false;
  detailLoadError = '';
  ticketDetail: TicketDetailResult | null = null;
  isTicketImageModalOpen = false;
  isTicketImageLoading = false;
  ticketImageError = '';
  ticketImageDataUrl: string | null = null;
  ticketImageTicketId: number | null = null;
  notifications: RecentTicketNotification[] = [];
  private notificationSeq = 0;
  private notificationTimers = new Map<number, ReturnType<typeof setTimeout>>();

  ngOnInit(): void {
    this.dashboardApiService.getLatestTickets(20).subscribe((result) => {
      this.tickets = result.items;
    });
  }

  ngOnDestroy(): void {
    for (const timer of this.notificationTimers.values()) {
      clearTimeout(timer);
    }
    this.notificationTimers.clear();
  }

  formatTotal(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  getStatusClasses(status: string): string {
    if (status === 'Guardado') {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400';
    }
    if (status === 'Pendiente') {
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400';
    }
    if (status === 'Facturado') {
      return 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400';
    }
    if (status === 'Cancelado') {
      return 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400';
    }
    return 'bg-gray-100 text-gray-700 dark:bg-white/[0.08] dark:text-white/70';
  }

  trackByTicket(_: number, ticket: LatestTicketItem): number {
    return ticket.id;
  }

  goToTicketManagement(): void {
    void this.router.navigate(['/ticket-management']);
  }

  openTicketDetail(ticket: LatestTicketItem): void {
    this.selectedTicket = ticket;
    this.isDetailModalOpen = true;
    this.ticketDetail = null;
    this.detailLoadError = '';
    this.isDetailLoading = true;

    this.ticketApiService.getTicketDetail(ticket.id).subscribe((detail) => {
      if (this.selectedTicket?.id !== ticket.id) return;

      this.isDetailLoading = false;
      if (!detail?.ticket) {
        this.detailLoadError = 'No se encontró detalle para este ticket.';
        return;
      }

      this.ticketDetail = detail;
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

  get ticketDetailEntries(): DetailEntry[] {
    return this.buildDetailEntries(this.ticketDetail?.ticket);
  }

  get empresaEmisoraEntries(): DetailEntry[] {
    return this.buildDetailEntries(this.ticketDetail?.empresaEmisora);
  }

  get clienteReceptorEntries(): DetailEntry[] {
    return this.buildDetailEntries(this.ticketDetail?.clienteReceptor);
  }

  onViewTicketImage(): void {
    if (!this.selectedTicket) return;
    this.fetchTicketImage(this.selectedTicket, { openModal: true, download: false });
  }

  onDownloadTicketImage(): void {
    if (!this.selectedTicket) return;
    this.pushNotification(`Iniciando descarga del ticket ${this.selectedTicket.id}.`, 'info', 10000);
    this.fetchTicketImage(this.selectedTicket, { openModal: false, download: true });
  }

  closeTicketImageModal(): void {
    this.isTicketImageModalOpen = false;
    this.isTicketImageLoading = false;
    this.ticketImageError = '';
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
    return RecentTicketsComponent.HIDDEN_DETAIL_KEYS.has(normalized);
  }

  private formatDetailValue(value: unknown, key: string): string {
    if (value === null || value === undefined) return 'N/A';

    if (typeof value === 'number') {
      if (key.includes('total') || key.includes('cambio') || key.includes('importe')) {
        return this.formatTotal(value);
      }
      return String(value);
    }

    if (typeof value === 'boolean') return value ? 'Sí' : 'No';

    if (typeof value === 'string') {
      if (this.isIsoDate(value)) return this.formatDateTime(value);
      const clean = value.trim();
      return clean.length ? clean : 'N/A';
    }

    if (typeof value === 'object') return JSON.stringify(value);

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

  private fetchTicketImage(ticket: LatestTicketItem, options: { openModal: boolean; download: boolean }): void {
    if (this.ticketImageDataUrl && this.ticketImageTicketId === ticket.id) {
      if (options.openModal) {
        this.isTicketImageModalOpen = true;
        this.isTicketImageLoading = false;
        this.ticketImageError = '';
      }
      if (options.download) {
        this.downloadTicketImage(this.ticketImageDataUrl, ticket);
        this.pushNotification(`Descarga completada: ticket_${ticket.id}.jpg`, 'success', 12000);
      }
      return;
    }

    if (options.openModal) {
      this.isTicketImageModalOpen = true;
      this.isTicketImageLoading = true;
      this.ticketImageError = '';
      this.ticketImageDataUrl = null;
    }

    this.ticketApiService.getTicketImage(ticket.id).subscribe((base64) => {
      if (!base64) {
        if (options.openModal) {
          this.isTicketImageLoading = false;
          this.ticketImageError = 'No se pudo obtener la imagen del ticket.';
        }
        this.pushNotification(
          options.download
            ? 'No se pudo descargar la imagen del ticket.'
            : 'No se pudo visualizar la imagen del ticket.',
          'error',
          20000
        );
        return;
      }

      const imageUrl = this.buildTicketImageDataUrl(base64);
      if (!imageUrl) {
        if (options.openModal) {
          this.isTicketImageLoading = false;
          this.ticketImageError = 'La imagen recibida no es válida.';
        }
        this.pushNotification(
          options.download
            ? 'La imagen del ticket no es válida para descargar.'
            : 'La imagen del ticket no es válida para visualizar.',
          'error',
          20000
        );
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
        this.pushNotification(`Descarga completada: ticket_${ticket.id}.jpg`, 'success', 12000);
      }
    }, () => {
      if (options.openModal) {
        this.isTicketImageLoading = false;
        this.ticketImageError = 'Ocurrió un error al obtener la imagen del ticket.';
      }
      this.pushNotification(
        options.download
          ? 'Ocurrió un error al descargar la imagen del ticket.'
          : 'Ocurrió un error al visualizar la imagen del ticket.',
        'error',
        20000
      );
    });
  }

  private buildTicketImageDataUrl(base64: string): string | null {
    const clean = base64.trim();
    if (!clean.length) return null;
    if (clean.startsWith('data:image/')) return clean;
    return `data:image/jpeg;base64,${clean}`;
  }

  private downloadTicketImage(dataUrl: string, ticket: LatestTicketItem): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ticket_${ticket.id}.jpg`;
    link.click();
  }

  dismissNotification(id: number): void {
    this.notifications = this.notifications.filter((item) => item.id !== id);
    const timer = this.notificationTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.notificationTimers.delete(id);
    }
  }

  getNotificationClasses(tone: RecentTicketNotificationTone): string {
    switch (tone) {
      case 'success':
        return 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200';
      case 'error':
        return 'border-red-300 bg-red-50 text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200';
      default:
        return 'border-brand-300 bg-brand-50 text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-100';
    }
  }

  private pushNotification(message: string, tone: RecentTicketNotificationTone, ttlMs = 5000): void {
    const id = ++this.notificationSeq;
    if (this.notifications.length >= 6) {
      this.notifications = this.notifications.slice(this.notifications.length - 5);
    }

    this.notifications = [...this.notifications, { id, tone, message }];
    const timer = setTimeout(() => this.dismissNotification(id), ttlMs);
    this.notificationTimers.set(id, timer);
  }
}


