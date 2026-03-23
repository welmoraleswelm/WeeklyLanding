import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-recent-tickets-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-tickets-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTicketsCardComponent {
  @Input() tickets: Ticket[] = [];
  @Input() isUploadBusy = false;
  @Input() uploadPhaseLabel = 'Extrayendo...';
  @Output() newTicket = new EventEmitter<void>();
  @Output() viewHistory = new EventEmitter<void>();
  @Output() viewTicketDetails = new EventEmitter<Ticket>();
  @Output() viewTicketImage = new EventEmitter<Ticket>();

  onNewTicket(): void {
    this.newTicket.emit();
  }

  onViewHistory(): void {
    this.viewHistory.emit();
  }

  onViewTicketDetails(ticket: Ticket): void {
    this.viewTicketDetails.emit(ticket);
  }

  onViewTicketImage(ticket: Ticket): void {
    this.viewTicketImage.emit(ticket);
  }

  get uploadBusyLabel(): string {
    return this.uploadPhaseLabel?.trim() || 'Extrayendo...';
  }

  badgeClasses(status: Ticket['status']): string {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300';
      case 'Processing':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300';
      case 'Waiting provider':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300';
      case 'Failed':
        return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200';
    }
  }

  statusIcon(status: Ticket['status']): string {
    switch (status) {
      case 'Completed':
        return 'check';
      case 'Processing':
        return 'clock';
      case 'Waiting provider':
        return 'hourglass';
      case 'Failed':
        return 'x';
      default:
        return 'circle';
    }
  }

  statusLabel(status: Ticket['status']): string {
    switch (status) {
      case 'Completed':
        return 'Completado';
      case 'Processing':
        return 'Procesando';
      case 'Waiting provider':
        return 'En espera';
      case 'Failed':
        return 'Fallido';
      default:
        return status;
    }
  }
}
