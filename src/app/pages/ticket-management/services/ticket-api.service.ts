import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiClientService } from '../../../core/http/api-client.service';
import { ApiRequestContextService } from '../../../core/http/api-request-context.service';
import type { Ticket } from '../ticket-management.component';

export interface TicketStatusSummaryDto {
  cantidadTicketsDTO?: number | string;
  estatusDTO?: string;
}

export interface TicketStatusSummary {
  guardados: number;
  pendientes: number;
  cancelados: number;
  facturados: number;
}

const DEFAULT_TICKET_STATUS_SUMMARY: TicketStatusSummary = {
  guardados: 0,
  pendientes: 0,
  cancelados: 0,
  facturados: 0,
};

interface TicketsListByIdDto {
  fechaSubidaDTO?: string;
  razonSocialDTO?: string;
  folioDTO?: string;
  totalDTO?: number | string;
  estatusDTO?: string;
  idTicketDTO?: number | string;
  bucketPathDTO?: string;
  bucketpathDTO?: string;
  bucketpath?: string;
  bucket_path?: string;
  imagenDTO?: string;
  archivoDTO?: string;
  archivoBase64DTO?: string;
  tieneImagenDTO?: boolean | string | number;
  tieneFacturaDTO?: boolean | string | number;
}

interface TicketDetailDto {
  ticket?: unknown;
  camposExtra?: unknown;
  empresaEmisora?: unknown;
  clienteReceptor?: unknown;
}

interface TicketImageDto {
  archivoBase64DTO?: string;
}

export interface TicketDetailResult {
  ticket: Record<string, unknown> | null;
  camposExtra: Record<string, unknown>[];
  empresaEmisora: Record<string, unknown> | null;
  clienteReceptor: Record<string, unknown> | null;
}

export interface TicketReadResult {
  payload: unknown;
}

export interface SaveExtractedTicketsResult {
  payload: unknown;
}

export interface AssociatedContributorDto {
  idContribuyenteDTO?: number | string;
  idUsuarioDTO?: number | string;
  tipoPersonaDTO?: string;
  rfcDTO?: string;
  nombreMostradoDTO?: string;
  nombreComercialDTO?: string;
  razonSocialDTO?: string;
  nombreCompletoDTO?: string;
}

export interface AssociatedContributor {
  idContribuyente: number;
  idUsuario: number;
  nombre: string;
  rfc: string;
  tipoPersona: string;
}

@Injectable({ providedIn: 'root' })
export class TicketApiService {
  private readonly api = inject(ApiClientService);
  private readonly requestContext = inject(ApiRequestContextService);

  getTickets(): Observable<Ticket[]> {
    return this.api.post<TicketsListByIdDto[] | TicketsListByIdDto>(
      API_ENDPOINTS.tickets.userListById,
      this.requestContext.withUserId()
    ).pipe(
      map((response) => mapTicketsListById(normalizeToArray(response)))
    );
  }

  getTicketStatusSummary(): Observable<TicketStatusSummary> {
    return this.api.post<TicketStatusSummaryDto[] | TicketStatusSummaryDto>(
      API_ENDPOINTS.tickets.statusSummary,
      this.requestContext.withUserId()
    ).pipe(
      map((response) => mapTicketStatusSummary(normalizeToArray(response))),
      catchError(() => of({ ...DEFAULT_TICKET_STATUS_SUMMARY }))
    );
  }

  getTicketDetail(idTicket: number): Observable<TicketDetailResult | null> {
    return this.api.post<TicketDetailDto>(
      API_ENDPOINTS.tickets.viewTicket,
      { idTicket }
    ).pipe(
      map((response) => mapTicketDetail(response)),
      catchError(() => of(null))
    );
  }

  getTicketImage(idTicket: number): Observable<string | null> {
    return this.api.post<TicketImageDto>(
      API_ENDPOINTS.tickets.downloadTicketImage,
      { idTicket }
    ).pipe(
      map((response) => normalizeBase64(response?.archivoBase64DTO)),
      catchError(() => of(null))
    );
  }

  retryTicket(ticketId: string): Observable<void> {
    return this.api.post<void>(API_ENDPOINTS.tickets.retry, { ticketId });
  }

  readTicket(files: File[]): Observable<TicketReadResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    const payloadFiles = new FormData();
    payloadFiles.append('idUsuario', String(userId));
    for (const file of files) {
      payloadFiles.append('files', file, file.name);
    }

    return this.api.post<unknown>(API_ENDPOINTS.tickets.readTicket, payloadFiles, { timeoutMs: 180000 }).pipe(
      map((response) => ({ payload: response }))
    );
  }

  saveExtractedTickets(extractedPayload: unknown): Observable<SaveExtractedTicketsResult> {
    const payload = this.requestContext.withUserId({ tickets: extractedPayload });
    return this.api.post<unknown>(API_ENDPOINTS.tickets.saveExtractedTickets, payload, { timeoutMs: 120000 }).pipe(
      map((response) => ({ payload: response }))
    );
  }

  getAssociatedContributors(): Observable<AssociatedContributor[]> {
    return this.api.post<AssociatedContributorDto[] | AssociatedContributorDto>(
      API_ENDPOINTS.tickets.associatedContributors,
      this.requestContext.withUserId()
    ).pipe(
      map((response) => mapAssociatedContributors(normalizeToArray(response))),
      catchError(() => of([]))
    );
  }
}

function normalizeToArray<T>(raw: T[] | T): T[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'object' && raw !== null) return [raw];
  return [];
}

function mapTicketStatusSummary(items: TicketStatusSummaryDto[]): TicketStatusSummary {
  const summary: TicketStatusSummary = { ...DEFAULT_TICKET_STATUS_SUMMARY };

  for (const item of items) {
    const status = normalizeStatus(item.estatusDTO);
    const count = toNonNegativeInt(item.cantidadTicketsDTO);

    if (status === 'guardado') summary.guardados += count;
    if (status === 'pendiente') summary.pendientes += count;
    if (status === 'cancelado') summary.cancelados += count;
    if (status === 'facturado') summary.facturados += count;
  }

  return summary;
}

function normalizeStatus(value: unknown): 'guardado' | 'pendiente' | 'cancelado' | 'facturado' | null {
  if (typeof value !== 'string') return null;

  const normalized = value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (normalized.startsWith('guard')) return 'guardado';
  if (normalized.startsWith('pend')) return 'pendiente';
  if (normalized.startsWith('cancel')) return 'cancelado';
  if (normalized.startsWith('factur')) return 'facturado';

  return null;
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

function mapTicketsListById(items: TicketsListByIdDto[]): Ticket[] {
  return items.map((item) => {
    const idNumeric = toNonNegativeInt(item.idTicketDTO);
    const dateIso = normalizeDateToIso(item.fechaSubidaDTO);
    const status = normalizeStatus(item.estatusDTO) ?? 'guardado';
    const hasImage = resolveTicketImageAvailability(item);

    return {
      id: String(idNumeric || Date.now()),
      fecha: dateIso ?? '1970-01-01',
      empresa: normalizeText(item.razonSocialDTO, 'Sin empresa'),
      numero: normalizeText(item.folioDTO, `TK-${idNumeric || 0}`),
      total: toNonNegativeNumber(item.totalDTO),
      estatus: status,
      tieneImagen: hasImage,
      tieneFactura: status === 'facturado',
      uuid: undefined,
      notas: undefined,
      pdfUrl: undefined,
      xmlUrl: undefined,
    };
  });
}

function normalizeDateToIso(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim().length) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, '0');
  const d = String(parsed.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function toNonNegativeNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.max(0, parsed);
  }

  return 0;
}

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const clean = value.trim();
  return clean.length ? clean : fallback;
}

function mapTicketDetail(raw: TicketDetailDto | null | undefined): TicketDetailResult | null {
  if (!raw || typeof raw !== 'object') return null;

  return {
    ticket: sanitizeTicketRecord(toRecord(raw.ticket)),
    camposExtra: mapCamposExtra(raw.camposExtra),
    empresaEmisora: toRecord(raw.empresaEmisora),
    clienteReceptor: toRecord(raw.clienteReceptor),
  };
}

function mapCamposExtra(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => normalizeCampoExtra(item))
    .filter((item): item is Record<string, unknown> => item !== null);
}

function normalizeCampoExtra(value: unknown): Record<string, unknown> | null {
  const record = toRecord(value);
  if (!record) return null;

  const payload = record['nombre_campo'];
  if (typeof payload === 'string') {
    const parsed = tryParseJson(payload);
    if (parsed !== null) {
      record['nombre_campo'] = parsed;
    }
  }

  return record;
}

function sanitizeTicketRecord(ticket: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!ticket) return null;

  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(ticket)) {
    if (key === 'texto_ocr') continue;
    cleaned[key] = value;
  }

  return cleaned;
}

function toRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return { ...(value as Record<string, unknown>) };
  }

  return null;
}

function tryParseJson(value: string): Record<string, unknown> | null {
  const raw = value.trim();
  if (!raw.startsWith('{') && !raw.startsWith('[')) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeBase64(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean.length ? clean : null;
}

function resolveTicketImageAvailability(item: TicketsListByIdDto): boolean {
  const explicitFlag = toOptionalBoolean(item.tieneImagenDTO ?? item.tieneFacturaDTO);
  if (explicitFlag !== null) return explicitFlag;

  const candidatePaths = [
    item.bucketPathDTO,
    item.bucketpathDTO,
    item.bucketpath,
    item.bucket_path,
  ];

  return candidatePaths.some((value) => typeof value === 'string' && value.trim().length > 0);
}

function toOptionalBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value !== 'string') return null;

  const normalized = value.trim().toLowerCase();
  if (!normalized.length) return null;
  if (['1', 'true', 'si', 'sí', 'yes'].includes(normalized)) return true;
  if (['0', 'false', 'no'].includes(normalized)) return false;
  return null;
}

function mapAssociatedContributors(items: AssociatedContributorDto[]): AssociatedContributor[] {
  return items
    .map((item) => {
      const idContribuyente = toNonNegativeInt(item.idContribuyenteDTO);
      const idUsuario = toNonNegativeInt(item.idUsuarioDTO);
      const nombre = normalizeText(
        item.nombreMostradoDTO ?? item.nombreComercialDTO ?? item.razonSocialDTO ?? item.nombreCompletoDTO,
        'Contribuyente'
      );
      const rfc = normalizeText(item.rfcDTO, 'Sin RFC');
      const tipoPersona = normalizeText(item.tipoPersonaDTO, 'N/A');

      return { idContribuyente, idUsuario, nombre, rfc, tipoPersona };
    })
    .filter((item) => item.idContribuyente > 0);
}
