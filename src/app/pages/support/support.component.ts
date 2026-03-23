import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, startWith, switchMap } from 'rxjs';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { SupportHeaderCardComponent } from './components/support-header-card/support-header-card.component';
import { RecentTicketsCardComponent } from './components/recent-tickets-card/recent-tickets-card.component';
import { QuickActionsCardComponent } from './components/quick-actions-card/quick-actions-card.component';
import { GuidesCardComponent } from './components/guides-card/guides-card.component';
import { FaqCardComponent } from './components/faq-card/faq-card.component';
import { LegalResourcesCardComponent } from './components/legal-resources-card/legal-resources-card.component';
import { SupportChatFabComponent } from './components/support-chat-fab/support-chat-fab.component';
import { NewTicketModalComponent, NewTicketData } from './components/new-ticket-modal/new-ticket-modal.component';
import { LegalResourceItem, QuickActionItem, SupportDataService, SupportHeaderSummary, SupportTicketDetail, SupportTicketImage } from './services/support-data.service';
import { Ticket } from './models/ticket.model';
import { GuideItem } from './models/guide.model';
import { FaqItem } from './models/faq.model';
import { TicketUploadStatusService, UploadBackgroundState } from '../ticket-management/services/ticket-upload-status.service';

interface GuideModalContent {
  title: string;
  subtitle: string;
  bullets: string[];
  footer: string;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    PageBreadcrumbComponent,
    SupportHeaderCardComponent,
    RecentTicketsCardComponent,
    QuickActionsCardComponent,
    GuidesCardComponent,
    FaqCardComponent,
    LegalResourcesCardComponent,
    SupportChatFabComponent,
    NewTicketModalComponent,
  ],
  templateUrl: './support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportPageComponent {
  headerQuery = '';
  private readonly refreshTickets$ = new Subject<void>();

  readonly isNewTicketModalOpen = signal(false);
  readonly selectedTicketDetail = signal<SupportTicketDetail | null>(null);
  readonly selectedTicketImage = signal<SupportTicketImage | null>(null);
  readonly selectedGuide = signal<GuideModalContent | null>(null);
  readonly isLoadingTicketDetail = signal(false);
  readonly isLoadingTicketImage = signal(false);

  readonly tickets$: Observable<Ticket[]>;
  readonly headerSummary$: Observable<SupportHeaderSummary>;
  readonly quickActions$: Observable<QuickActionItem[]>;
  readonly guides$: Observable<GuideItem[]>;
  readonly faqs$: Observable<FaqItem[]>;
  readonly legalResources$: Observable<LegalResourceItem[]>;
  readonly chatContextMessage$: Observable<string>;
  readonly isUploadBusy$: Observable<boolean>;
  readonly uploadPhaseLabel$: Observable<string>;

  constructor(
    private readonly dataService: SupportDataService,
    private readonly ticketUploadStatusService: TicketUploadStatusService,
    private readonly router: Router,
  ) {
    this.tickets$ = this.refreshTickets$.pipe(
      startWith(void 0),
      switchMap(() => this.dataService.getRecentTickets())
    );
    this.headerSummary$ = this.dataService.getHeaderSummary();
    this.quickActions$ = this.dataService.getQuickActions();
    this.guides$ = this.dataService.getGuides();
    this.faqs$ = this.dataService.getFaqs();
    this.legalResources$ = this.dataService.getLegalResources();
    this.isUploadBusy$ = this.ticketUploadStatusService.status$.pipe(
      map((status) => status.state === 'processing' || status.state === 'saving')
    );
    this.uploadPhaseLabel$ = this.ticketUploadStatusService.status$.pipe(
      map((status) => this.mapUploadPhaseLabel(status.state))
    );

    this.chatContextMessage$ = this.tickets$.pipe(
      map((tickets) => {
        const latest = tickets[0];
        if (!latest) return 'Hola, en que podemos ayudarte hoy?';
        return `Veo que tu ultimo ticket esta en ${latest.status}. Quieres actualizarlo?`;
      })
    );
  }

  onHeaderQueryChange(value: string): void {
    this.headerQuery = value;
  }

  openNewTicketModal(): void {
    this.isNewTicketModalOpen.set(true);
  }

  closeNewTicketModal(): void {
    this.isNewTicketModalOpen.set(false);
  }

  closeTicketDetailModal(): void {
    this.selectedTicketDetail.set(null);
  }

  closeTicketImageModal(): void {
    this.selectedTicketImage.set(null);
  }

  closeGuideModal(): void {
    this.selectedGuide.set(null);
  }

  onTicketSubmit(data: NewTicketData): void {
    this.dataService
      .createTicket({
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        image: data.image,
      })
      .subscribe({
        next: () => {
          this.closeNewTicketModal();
          this.refreshTickets$.next();
        },
        error: () => {},
      });
  }

  onViewTicketDetails(ticket: Ticket): void {
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

  onViewTicketImage(ticket: Ticket): void {
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

  onViewHistory(): void {
    void this.router.navigate(['/support/history']);
  }

  onQuickActionClick(action: QuickActionItem): void {
    if (action.id === 'qa-new') {
      void this.router.navigate(['/ticket-management'], {
        queryParams: { highlightUpload: '1' },
      });
    }
  }

  onGuideClick(guide: GuideItem): void {
    this.selectedGuide.set(this.buildGuideModalContent(guide));
  }

  get selectedTicketImageSrc(): string {
    const image = this.selectedTicketImage();
    if (!image?.archivoBase64 || !image.contentType) return '';
    return `data:${image.contentType};base64,${image.archivoBase64}`;
  }

  priorityClasses(priority: string): string {
    const normalized = (priority || '').trim().toLowerCase();

    switch (normalized) {
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

  private mapUploadPhaseLabel(state: UploadBackgroundState): string {
    switch (state) {
      case 'processing':
        return 'Extrayendo...';
      case 'saving':
        return 'Guardando...';
      default:
        return 'Extrayendo...';
    }
  }

  private buildGuideModalContent(guide: GuideItem): GuideModalContent {
    switch (guide.id) {
      case 'g-1':
        return {
          title: 'Subir ticket correctamente',
          subtitle: 'Checklist para adjuntar imágenes completas y legibles.',
          bullets: [
            'Verifica que la foto esté completa y no corte los datos principales del ticket.',
            'Procura buena iluminación y evita sombras sobre fecha, total, RFC y folio.',
            'Sube una sola imagen clara por ticket y evita fondos con demasiado ruido visual.',
            'Confirma que el archivo sea PNG, JPG, JPEG o WEBP antes de enviarlo.',
          ],
          footer: 'Mientras mejor sea la imagen, más rápida y precisa será la lectura del ticket.',
        };
      case 'g-2':
        return {
          title: 'Entender estado del ticket',
          subtitle: 'Qué significa cada estado y tiempos de respuesta.',
          bullets: [
            'Abierto: el ticket fue recibido y está pendiente de atención.',
            'En proceso: el equipo ya está revisando la solicitud o validando la imagen.',
            'Completado: el caso fue resuelto o cerrado por soporte.',
            'Si un ticket tarda más de lo esperado, revisa primero si falta información o evidencia adicional.',
          ],
          footer: 'Puedes consultar el historial para revisar el estado actual y la fecha de creación de cada ticket.',
        };
      case 'g-3':
        return {
          title: 'Reportar incidencia',
          subtitle: 'Paso a paso para reportar errores críticos.',
          bullets: [
            'Describe el problema con el mayor detalle posible desde el asunto y la descripción.',
            'Indica si el error afecta facturación, soporte técnico, tu cuenta u otra operación.',
            'Selecciona la prioridad correcta para que soporte entienda el impacto real del caso.',
            'Adjunta una imagen cuando el problema esté relacionado con un ticket o una evidencia visual.',
          ],
          footer: 'Un reporte claro reduce el tiempo de diagnóstico y facilita el seguimiento del caso.',
        };
      default:
        return {
          title: guide.title,
          subtitle: guide.description,
          bullets: ['Consulta esta guía para conocer el flujo recomendado dentro del módulo de soporte.'],
          footer: 'La información de esta guía está pensada para ayudarte a resolver incidencias más rápido.',
        };
    }
  }
}

export { SupportPageComponent as SupportComponent };
