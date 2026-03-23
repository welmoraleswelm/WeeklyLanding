import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { SupportHistoryTicket } from './models/support-history-ticket.model';
import { SupportDataService, SupportTicketDetail, SupportTicketImage } from './services/support-data.service';

type SupportHistoryState = 'loading' | 'empty' | 'error' | 'data';
type SupportStatusFilter = 'todos' | 'abierto' | 'en_proceso' | 'cerrado';
type SupportSortOption = 'recientes' | 'antiguos';

@Component({
  selector: 'app-support-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageBreadcrumbComponent, ModalComponent],
  templateUrl: './support-history.component.html',
})
export class SupportHistoryComponent implements OnInit {
  viewState: SupportHistoryState = 'loading';
  tickets: SupportHistoryTicket[] = [];
  activeFilter: SupportStatusFilter = 'todos';
  searchQuery = '';
  sortOption: SupportSortOption = 'recientes';
  dateFrom = '';
  dateTo = '';

  readonly selectedTicketDetail = signal<SupportTicketDetail | null>(null);
  readonly selectedTicketImage = signal<SupportTicketImage | null>(null);
  readonly isLoadingTicketDetail = signal(false);
  readonly isLoadingTicketImage = signal(false);

  constructor(private readonly dataService: SupportDataService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.viewState = 'loading';
    this.dataService.getTicketHistory().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.viewState = tickets.length ? 'data' : 'empty';
      },
      error: () => {
        this.tickets = [];
        this.viewState = 'error';
      },
    });
  }

  get filteredTickets(): SupportHistoryTicket[] {
    let result = [...this.tickets];

    if (this.activeFilter !== 'todos') {
      result = result.filter((ticket) => this.normalizeStatus(ticket.status) === this.activeFilter);
    }

    const query = this.searchQuery.trim().toLowerCase();
    if (query.length) {
      result = result.filter((ticket) =>
        ticket.title.toLowerCase().includes(query) ||
        ticket.number.toLowerCase().includes(query) ||
        ticket.category.toLowerCase().includes(query)
      );
    }

    const fromDate = this.parseFilterDate(this.dateFrom);
    const toDate = this.parseFilterDate(this.dateTo);
    const normalizedRange = this.normalizeDateRange(fromDate, toDate);

    if (normalizedRange.from || normalizedRange.to) {
      result = result.filter((ticket) => {
        const created = this.parseTicketDate(ticket.createdAtRaw);
        if (!created) return false;
        if (normalizedRange.from && created < normalizedRange.from) return false;
        if (normalizedRange.to && created > normalizedRange.to) return false;
        return true;
      });
    }

    result.sort((a, b) => {
      const left = new Date(a.createdAtRaw).getTime();
      const right = new Date(b.createdAtRaw).getTime();
      return this.sortOption === 'antiguos' ? left - right : right - left;
    });

    return result;
  }

  get summary() {
    return {
      total: this.tickets.length,
      abiertos: this.tickets.filter((ticket) => this.normalizeStatus(ticket.status) === 'abierto').length,
      enProceso: this.tickets.filter((ticket) => this.normalizeStatus(ticket.status) === 'en_proceso').length,
      cerrados: this.tickets.filter((ticket) => this.normalizeStatus(ticket.status) === 'cerrado').length,
    };
  }

  setFilter(filter: SupportStatusFilter): void {
    this.activeFilter = filter;
  }

  clearFilters(): void {
    this.activeFilter = 'todos';
    this.searchQuery = '';
    this.sortOption = 'recientes';
    this.dateFrom = '';
    this.dateTo = '';
  }

  openDatePicker(input: HTMLInputElement): void {
    (input as { showPicker?: () => void }).showPicker?.();
  }

  onViewTicketDetails(ticket: SupportHistoryTicket): void {
    this.isLoadingTicketDetail.set(true);
    this.dataService.getTicketDetail(ticket.id).subscribe({
      next: (detail) => {
        this.selectedTicketDetail.set(detail);
        this.isLoadingTicketDetail.set(false);
      },
      error: () => {
        this.isLoadingTicketDetail.set(false);
      },
    });
  }

  onViewTicketImage(ticket: SupportHistoryTicket): void {
    this.isLoadingTicketImage.set(true);
    this.dataService.getTicketImage(ticket.id).subscribe({
      next: (image) => {
        this.selectedTicketImage.set(image);
        this.isLoadingTicketImage.set(false);
      },
      error: () => {
        this.isLoadingTicketImage.set(false);
      },
    });
  }

  closeTicketDetailModal(): void {
    this.selectedTicketDetail.set(null);
  }

  closeTicketImageModal(): void {
    this.selectedTicketImage.set(null);
  }

  get selectedTicketImageSrc(): string {
    const image = this.selectedTicketImage();
    if (!image?.archivoBase64 || !image.contentType) return '';
    return `data:${image.contentType};base64,${image.archivoBase64}`;
  }

  statusLabel(status: string): string {
    switch (this.normalizeStatus(status)) {
      case 'abierto':
        return 'Abierto';
      case 'en_proceso':
        return 'En proceso';
      case 'cerrado':
        return 'Completado';
      default:
        return 'Abierto';
    }
  }

  statusClasses(status: string): string {
    switch (this.normalizeStatus(status)) {
      case 'abierto':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300';
      case 'en_proceso':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
      case 'cerrado':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200';
    }
  }

  priorityClasses(priority: string): string {
    switch ((priority || '').trim().toLowerCase()) {
      case 'baja':
        return 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300';
      case 'media':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
      case 'alta':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300';
      case 'urgente':
        return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200';
    }
  }

  private normalizeStatus(status: string): Exclude<SupportStatusFilter, 'todos'> {
    const normalized = (status || '').trim().toLowerCase();
    if (normalized === 'en_proceso' || normalized === 'en proceso' || normalized === 'procesando') {
      return 'en_proceso';
    }
    if (normalized === 'cerrado' || normalized === 'resuelto' || normalized === 'completado') {
      return 'cerrado';
    }
    return 'abierto';
  }

  private parseTicketDate(value: string): Date | null {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }

  private parseFilterDate(value: string): Date | null {
    if (!value?.trim()) return null;
    const clean = value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean)) return null;
    const [year, month, day] = clean.split('-').map(Number);
    const parsed = new Date(year, month - 1, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private normalizeDateRange(from: Date | null, to: Date | null): { from: Date | null; to: Date | null } {
    if (!from || !to) return { from, to };
    return from <= to ? { from, to } : { from: to, to: from };
  }
}
