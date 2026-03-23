import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { ApiClientService } from '../../../../core/http/api-client.service';
import { ApiRequestContextService } from '../../../../core/http/api-request-context.service';

interface PreparacionFacturacionDto {
  ticketsAnalizadosDTO?: number | string;
  ticketsListosDTO?: number | string;
  ticketsPendientesDTO?: number | string;
  porcentajePreparacionDTO?: number | string;
  ticketsProcesadosDTO?: number | string;
  minutosAhorradosDTO?: number | string;
  minutosPorTicketDTO?: number | string;
}

export interface InvoicePreparationSummary {
  ticketsAnalyzed: number;
  ticketsReady: number;
  ticketsPending: number;
  preparationPercent: number;
  ticketsProcessed: number;
  savedMinutes: number;
  minutesPerTicket: number;
}

const DEFAULT_SUMMARY: InvoicePreparationSummary = {
  ticketsAnalyzed: 0,
  ticketsReady: 0,
  ticketsPending: 0,
  preparationPercent: 0,
  ticketsProcessed: 0,
  savedMinutes: 0,
  minutesPerTicket: 6,
};

@Injectable({ providedIn: 'root' })
export class BillingMetricsApiService {
  private readonly api = inject(ApiClientService);
  private readonly requestContext = inject(ApiRequestContextService);

  getSummary(): Observable<InvoicePreparationSummary> {
    return this.api.post<PreparacionFacturacionDto[] | PreparacionFacturacionDto>(
      API_ENDPOINTS.dashboard.invoicePreparation,
      this.requestContext.withUserId()
    ).pipe(
      map((response) => mapSummary(normalizeToArray(response)[0])),
      catchError(() => of({ ...DEFAULT_SUMMARY }))
    );
  }
}

function mapSummary(item?: PreparacionFacturacionDto): InvoicePreparationSummary {
  if (!item) return { ...DEFAULT_SUMMARY };

  const summary: InvoicePreparationSummary = {
    ticketsAnalyzed: toNonNegativeInt(item.ticketsAnalizadosDTO),
    ticketsReady: toNonNegativeInt(item.ticketsListosDTO),
    ticketsPending: toNonNegativeInt(item.ticketsPendientesDTO),
    preparationPercent: Math.min(100, toNonNegativeInt(item.porcentajePreparacionDTO)),
    ticketsProcessed: toNonNegativeInt(item.ticketsProcesadosDTO || item.ticketsAnalizadosDTO),
    savedMinutes: toNonNegativeInt(item.minutosAhorradosDTO),
    minutesPerTicket: toNonNegativeInt(item.minutosPorTicketDTO) || 6,
  };

  return sanitizeSummary(summary);
}

function sanitizeSummary(summary: InvoicePreparationSummary): InvoicePreparationSummary {
  const hasProcessedTickets = summary.ticketsProcessed > 0;
  const hasAnalyzedTickets = summary.ticketsAnalyzed > 0;
  const hasSavings = summary.savedMinutes > 0;

  if (!hasProcessedTickets || !hasAnalyzedTickets || !hasSavings) {
    return {
      ...summary,
      preparationPercent: 0,
      savedMinutes: 0,
      ticketsProcessed: hasProcessedTickets ? summary.ticketsProcessed : 0,
    };
  }

  return summary;
}

function normalizeToArray<T>(raw: T[] | T): T[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'object' && raw !== null) return [raw];
  return [];
}

function toNonNegativeInt(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.trunc(value));
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.max(0, Math.trunc(parsed));
  }

  return 0;
}
