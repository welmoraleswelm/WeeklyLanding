import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TicketUploadStatusService } from '../../../../pages/ticket-management/services/ticket-upload-status.service';

@Component({
  selector: 'app-global-upload-notification-dock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pointer-events-none fixed bottom-6 right-4 z-[70] w-[340px]">
      <div class="pointer-events-auto max-h-[60vh] space-y-2 overflow-y-auto pr-1">
        @if ((status$ | async); as status) {
          @if (status.state !== 'idle') {
            <div
              class="rounded-xl border p-3 text-sm shadow-theme-xs backdrop-blur-sm"
              [ngClass]="status.state === 'error'
                ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-300/70 dark:bg-red-500/15 dark:text-red-100'
                : status.state === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-300/70 dark:bg-emerald-500/15 dark:text-emerald-100'
                  : 'border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-300/70 dark:bg-brand-500/15 dark:text-brand-100'">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 text-xs font-semibold">
                  @if (status.state === 'processing' || status.state === 'saving') {
                    <span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  }
                  @if (status.state === 'success') {
                    <span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold">✓</span>
                  }
                  @if (status.state === 'error') {
                    <span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold">!</span>
                  }
                  <span>{{ toPhaseLabel(status.state) }}</span>
                </div>
                <button
                  (click)="clearStatus()"
                  class="rounded border border-current/20 px-2 py-0.5 text-[11px] leading-none hover:bg-black/5 dark:hover:bg-white/10">
                  Ocultar
                </button>
              </div>
              <p class="mt-2 leading-5">{{ status.message }}</p>
            </div>
          }
        }

        @if ((notifications$ | async); as notifications) {
          @for (notification of notifications; track notification.id) {
            <div
              class="rounded-xl border p-3 text-sm shadow-theme-xs backdrop-blur-sm"
              [ngClass]="notification.tone === 'error'
                ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-300/70 dark:bg-red-500/15 dark:text-red-100'
                : notification.tone === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-300/70 dark:bg-emerald-500/15 dark:text-emerald-100'
                  : 'border-slate-200 bg-white text-slate-800 dark:border-slate-300/60 dark:bg-slate-900/75 dark:text-white/90'">
              <div class="flex items-start justify-between gap-2">
                <p class="leading-5">{{ notification.message }}</p>
                <button
                  (click)="dismiss(notification.id)"
                  class="rounded border border-current/20 px-1.5 py-0.5 text-[11px] leading-none hover:bg-black/5 dark:hover:bg-white/10">
                  ×
                </button>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class GlobalUploadNotificationDockComponent implements OnInit, OnDestroy {
  private readonly uploadStatusService = inject(TicketUploadStatusService);
  private readonly subs = new Subscription();

  readonly status$ = this.uploadStatusService.status$;
  readonly notifications$ = this.uploadStatusService.notifications$;

  ngOnInit(): void {
    this.uploadStatusService.pruneExpiredNotifications();
    this.subs.add(
      interval(1000).subscribe(() => this.uploadStatusService.pruneExpiredNotifications())
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  dismiss(id: number): void {
    const next = this.uploadStatusService.getNotifications().filter((item) => item.id !== id);
    this.uploadStatusService.setNotifications(next);
  }

  clearStatus(): void {
    const snapshot = this.uploadStatusService.getSnapshot();
    if (snapshot.state !== 'idle') {
      this.uploadStatusService.setStatus('idle', '');
    }
  }

  toPhaseLabel(state: 'idle' | 'processing' | 'saving' | 'success' | 'error'): string {
    if (state === 'processing') return 'Extrayendo';
    if (state === 'saving') return 'Guardando';
    if (state === 'success') return 'Completado';
    if (state === 'error') return 'Error';
    return 'Estatus';
  }
}
