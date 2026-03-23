import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ContributorUi, ContributorsApiService, CsfExtractedContributor } from './contributors-api.service';

type PersonTypeFilter = 'todos' | 'FISICA' | 'MORAL';
type SortOption = 'nombre-asc' | 'nombre-desc' | 'rfc-asc' | 'rfc-desc';
type ScopeFilter = 'todos' | 'favoritos' | 'globales';
type ContributorNotificationTone = 'info' | 'success' | 'error';

interface ContributorNotification {
  id: number;
  tone: ContributorNotificationTone;
  message: string;
}

@Component({
  selector: 'app-contributors-management',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent],
  templateUrl: './contributors-management.component.html',
})
export class ContributorsManagementComponent implements OnInit {
  private readonly contributorsApi = inject(ContributorsApiService);
  @ViewChild('csfFileInput') private csfFileInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadError = '';
  togglingFavoriteId: number | null = null;

  contributors: ContributorUi[] = [];

  searchQuery = '';
  personTypeFilter: PersonTypeFilter = 'todos';
  sortOption: SortOption = 'nombre-asc';
  scopeFilter: ScopeFilter = 'todos';

  isUploadTicketModalOpen = false;
  csfFile: File | null = null;
  csfProcessing = false;
  csfSaving = false;
  csfError = '';
  csfSuccess = '';
  csfExtracted: CsfExtractedContributor | null = null;
  notifications: ContributorNotification[] = [];
  private notificationSeq = 0;
  private notificationTimers = new Map<number, ReturnType<typeof setTimeout>>();

  ngOnInit(): void {
    this.loadContributors();
  }

  ngOnDestroy(): void {
    for (const timer of this.notificationTimers.values()) {
      clearTimeout(timer);
    }
    this.notificationTimers.clear();
  }

  get filteredContributors(): ContributorUi[] {
    let result = [...this.contributors];

    if (this.scopeFilter === 'favoritos') {
      result = result.filter((item) => item.estatusFavorito > 0);
    }

    if (this.scopeFilter === 'globales') {
      result = result.filter((item) => item.estatusFavorito === 0);
    }

    if (this.personTypeFilter !== 'todos') {
      result = result.filter((item) => item.tipoPersona.toUpperCase() === this.personTypeFilter);
    }

    const query = this.searchQuery.trim().toLowerCase();
    if (query.length) {
      result = result.filter((item) =>
        item.nombre.toLowerCase().includes(query) ||
        item.nombrePersona.toLowerCase().includes(query) ||
        item.nombreComercial.toLowerCase().includes(query) ||
        item.rfc.toLowerCase().includes(query)
      );
    }

    switch (this.sortOption) {
      case 'nombre-desc':
        result.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'rfc-asc':
        result.sort((a, b) => a.rfc.localeCompare(b.rfc));
        break;
      case 'rfc-desc':
        result.sort((a, b) => b.rfc.localeCompare(a.rfc));
        break;
      default:
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    return result;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.personTypeFilter = 'todos';
    this.sortOption = 'nombre-asc';
    this.scopeFilter = 'todos';
  }

  setScope(scope: ScopeFilter): void {
    this.scopeFilter = scope;
  }

  openUploadTicketModal(): void {
    this.resetUploadState();
    this.isUploadTicketModalOpen = true;
  }

  closeUploadTicketModal(): void {
    this.isUploadTicketModalOpen = false;
  }

  onPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.csfFile = input.files?.[0] ?? null;
    this.csfError = '';
    this.csfSuccess = '';
    this.csfExtracted = null;

    if (this.csfFile) {
      this.processPdf();
    }
  }

  processPdf(): void {
    if (this.csfProcessing) return;

    if (!this.csfFile) {
      this.csfError = 'Selecciona un PDF.';
      return;
    }

    if (!this.csfFile.name.toLowerCase().endsWith('.pdf')) {
      this.csfError = 'Solo se permite formato PDF.';
      return;
    }

    this.csfProcessing = true;
    this.csfError = '';
    this.csfSuccess = '';
    this.csfExtracted = null;

    this.contributorsApi.extractCsf(this.csfFile).pipe(
      finalize(() => {
        this.csfProcessing = false;
      })
    ).subscribe((result) => {
      if (!result) {
        this.csfError = 'No se pudo extraer la información del PDF.';
        return;
      }

      this.csfExtracted = result;
      this.csfSuccess = 'PDF procesado correctamente.';
    });
  }

  saveExtractedData(): void {
    if (this.csfSaving || !this.csfExtracted) return;

    this.csfSaving = true;
    this.csfError = '';
    this.csfSuccess = '';

    this.contributorsApi.saveCsf(this.csfExtracted).pipe(
      finalize(() => {
        this.csfSaving = false;
      })
    ).subscribe((idContribuyente) => {
      if (!idContribuyente) {
        this.csfError = 'No se pudo guardar el contribuyente.';
        return;
      }

      this.csfSuccess = `Contribuyente guardado correctamente (ID ${idContribuyente}).`;
      this.loadContributors();
      this.closeUploadTicketModal();
      this.processNewTicket();
    });
  }

  processNewTicket(): void {
    this.csfFile = null;
    this.csfExtracted = null;
    this.csfSaving = false;
    this.csfError = '';
    this.csfSuccess = '';
    if (this.csfFileInput?.nativeElement) {
      this.csfFileInput.nativeElement.value = '';
    }
  }

  toggleFavorite(item: ContributorUi): void {
    if (this.togglingFavoriteId !== null) return;

    this.togglingFavoriteId = item.idContribuyente;
    const isRemoving = item.estatusFavorito > 0 && item.idContribuyentesFavoritos > 0;

    const request$ = isRemoving
      ? this.contributorsApi.removeFavorite(item.idContribuyentesFavoritos)
      : this.contributorsApi.addFavorite(item.idContribuyente);

    request$.pipe(finalize(() => {
      this.togglingFavoriteId = null;
    })).subscribe((ok) => {
      if (ok) {
        this.pushNotification(
          isRemoving
            ? `${item.nombre} se quitó de favoritos.`
            : `${item.nombre} se agregó a favoritos.`,
          'success'
        );
        this.loadContributors();
        return;
      }

      this.pushNotification(
        isRemoving
          ? `No se pudo quitar a ${item.nombre} de favoritos.`
          : `No se pudo agregar a ${item.nombre} a favoritos.`,
        'error',
        8000
      );
    });
  }

  isToggling(item: ContributorUi): boolean {
    return this.togglingFavoriteId === item.idContribuyente;
  }

  dismissNotification(id: number): void {
    this.notifications = this.notifications.filter((item) => item.id !== id);
    const timer = this.notificationTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.notificationTimers.delete(id);
    }
  }

  getNotificationClasses(tone: ContributorNotificationTone): string {
    switch (tone) {
      case 'success':
        return 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200';
      case 'error':
        return 'border-red-300 bg-red-50 text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200';
      default:
        return 'border-brand-300 bg-brand-50 text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-100';
    }
  }

  private loadContributors(): void {
    this.loading = true;
    this.loadError = '';
    this.contributors = [];

    forkJoin({
      globales: this.contributorsApi.getGlobalContributors(),
      favoritos: this.contributorsApi.getFavoriteContributors(),
    }).pipe(finalize(() => {
      this.loading = false;
    })).subscribe({
      next: ({ globales, favoritos }) => {
        const favoritosMap = new Map<number, ContributorUi>();
        for (const fav of favoritos) {
          favoritosMap.set(fav.idContribuyente, fav);
        }

        const merged = globales.map((item) => {
          const fav = favoritosMap.get(item.idContribuyente);
          if (!fav) return item;

          return {
            ...item,
            estatusFavorito: fav.estatusFavorito > 0 ? fav.estatusFavorito : 1,
            idContribuyentesFavoritos: fav.idContribuyentesFavoritos,
          };
        });

        for (const fav of favoritos) {
          if (!merged.some((g) => g.idContribuyente === fav.idContribuyente)) {
            merged.push({ ...fav, estatusFavorito: fav.estatusFavorito > 0 ? fav.estatusFavorito : 1 });
          }
        }

        this.contributors = merged;
      },
      error: () => {
        this.loadError = 'No se pudo cargar la lista de contribuyentes.';
      }
    });
  }

  private resetUploadState(): void {
    this.csfFile = null;
    this.csfProcessing = false;
    this.csfSaving = false;
    this.csfError = '';
    this.csfSuccess = '';
    this.csfExtracted = null;
  }

  private pushNotification(
    message: string,
    tone: ContributorNotificationTone,
    ttlMs = 5000
  ): void {
    const id = ++this.notificationSeq;
    if (this.notifications.length >= 6) {
      this.notifications = this.notifications.slice(this.notifications.length - 5);
    }

    this.notifications = [...this.notifications, { id, tone, message }];

    const timer = setTimeout(() => this.dismissNotification(id), ttlMs);
    this.notificationTimers.set(id, timer);
  }
}
