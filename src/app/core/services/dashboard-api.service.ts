import { Injectable, inject } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { ApiClientService } from '../http/api-client.service';
import { ApiRequestContextService } from '../http/api-request-context.service';

export interface PlanConsumptionSummary {
  planName: string;
  used: number;
  limit: number;
  remainingDays: number;
  projectedUsed: number;
}

export interface PlanUsuarioDto {
  nombrePlanDTO?: string;
  nombrePlanDto?: string;
  planActualDTO?: string;
  planActualDto?: string;
  fechaInicioDTO?: string;
  fechaInicioDto?: string;
  fechaInicioPlanDTO?: string;
  fechaInicioPlanDto?: string;
  fechaFinDTO?: string;
  fechaFinDto?: string;
  fechaFinPlanDTO?: string;
  fechaFinPlanDto?: string;
  diasRestantesPlanDTO?: number;
  diasRestantesPlanDto?: number;
  ticketsPermitidosDTO?: number;
  ticketsPermitidosDto?: number;
  ticketsLimitePlanDTO?: number;
  ticketsLimitePlanDto?: number;
  capacidadPlanTicketsDTO?: number;
  capacidadPlanTicketsDto?: number;
  ticketsGeneradosDTO?: number;
  ticketsGeneradosDto?: number;
  ticketsSeleccionadosDTO?: number;
  ticketsSeleccionadosDto?: number;
  ticketsGuardadosDTO?: number;
  ticketsGuardadosDto?: number;
  ticketsPendientesDTO?: number;
  ticketsPendientesDto?: number;
  ticketsFacturadosDTO?: number;
  ticketsFacturadosDto?: number;
  ticketsCanceladosDTO?: number;
  ticketsCanceladosDto?: number;
  facturasEmitidasDTO?: number;
  facturasEmitidasDto?: number;
  ticketsAlmacenadosDTO?: number;
  ticketsAlmacenadosDto?: number;
}

export interface PlanConsumptionResult {
  summary: PlanConsumptionSummary;
  rawData: PlanUsuarioDto[];
  source: 'api' | 'fallback';
}

interface TicketUploadDateDto {
  fechaSubidaDTO?: string;
  fechaSubidaDto?: string;
}

export type TicketsRange = 'mensual' | 'trimestral' | 'anual';
export type TicketStatus = 'guardado' | 'facturado';

export interface TicketsByRangeDto {
  anioDTO?: number;
  periodoDTO?: number;
  etiquetaDTO?: string;
  totalTicketsDTO?: number;
}

export interface TicketsByRangeResult {
  categories: string[];
  totals: number[];
  rawData: TicketsByRangeDto[];
  source: 'api' | 'fallback';
}

export interface TicketConsumptionDto {
  estatusDTO?: string;
  countEstatusDTO?: number;
  totalTicketsDTO?: number;
}

export interface TicketConsumptionSummary {
  guardados: number;
  pendientes: number;
  cancelados: number;
  facturados: number;
  totalFacturado: number;
}

export interface TicketConsumptionResult {
  summary: TicketConsumptionSummary;
  rawData: TicketConsumptionDto[];
  source: 'api' | 'fallback';
}

export interface TopCompanyDto {
  razonSocialDTO?: string;
  cantidadTicketsDTO?: number | string;
  importeTicketsDTO?: number | string;
}

export interface TopCompanyItem {
  name: string;
  tickets: number;
  amount: number;
}

export interface TopCompaniesResult {
  items: TopCompanyItem[];
  rawData: TopCompanyDto[];
  source: 'api' | 'fallback';
}

export interface ActivityLogDto {
  idLogDTO?: number;
  idUsuarioDTO?: number;
  accionDTO?: string;
  entidadAfectadaDTO?: string;
  idEntidadDTO?: number;
  detalleDTO?: string;
  fechaDTO?: string;
}

export interface RecentErrorItem {
  title: string;
  detail: string;
  ago: string;
  timestamp: number;
}

export interface RecentErrorsResult {
  items: RecentErrorItem[];
  rawData: ActivityLogDto[];
  source: 'api' | 'fallback';
}

export interface LatestTicketDto {
  idTicketDTO?: number;
  fechaSubidaDTO?: string;
  razonSocialDTO?: string;
  importeTicketsDTO?: number | string;
  estatusTicketDTO?: string;
}

export interface LatestTicketItem {
  id: number;
  date: string;
  company: string;
  total: number;
  status: 'Guardado' | 'Pendiente' | 'Cancelado' | 'Facturado' | 'Desconocido';
}

export interface LatestTicketsResult {
  items: LatestTicketItem[];
  rawData: LatestTicketDto[];
  source: 'api' | 'fallback';
}

const DEFAULT_SUMMARY: PlanConsumptionSummary = {
  planName: '-',
  used: 0,
  limit: 0,
  remainingDays: 0,
  projectedUsed: 0,
};

const DEFAULT_TICKET_CONSUMPTION_SUMMARY: TicketConsumptionSummary = {
  guardados: 0,
  pendientes: 0,
  cancelados: 0,
  facturados: 0,
  totalFacturado: 0,
};

const MONTH_LABELS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
] as const;

const QUARTER_LABELS = ['T1', 'T2', 'T3', 'T4'] as const;

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly api = inject(ApiClientService);
  private readonly requestContext = inject(ApiRequestContextService);

  getPlanConsumption(): Observable<PlanConsumptionResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    const planRequest$ = this.api.post<PlanUsuarioDto[] | PlanUsuarioDto>(
      API_ENDPOINTS.dashboard.planConsumption,
      { idUsuario: userId }
    );

    const ticketsRequest$ = this.api.post<TicketUploadDateDto[] | TicketUploadDateDto>(
      API_ENDPOINTS.tickets.userListById,
      { idUsuario: userId }
    ).pipe(
      map((response) => normalizeToArray(response)),
      catchError(() => of([] as TicketUploadDateDto[]))
    );

    return forkJoin({
      planResponse: planRequest$,
      ticketRows: ticketsRequest$,
    }).pipe(
      map(({ planResponse, ticketRows }) => {
        const rawData = normalizeToArray(planResponse);
        return {
          summary: mapSummary(rawData, ticketRows),
          rawData,
          source: 'api' as const,
        };
      }),
      catchError(() =>
        of({
          summary: DEFAULT_SUMMARY,
          rawData: [],
          source: 'fallback' as const,
        })
      )
    );
  }

  getTicketsByRange(
    range: TicketsRange = 'mensual',
    status: TicketStatus = 'guardado'
  ): Observable<TicketsByRangeResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    return this.api.post<TicketsByRangeDto[] | TicketsByRangeDto>(
      API_ENDPOINTS.dashboard.ticketsByRange,
      { idUsuario: userId, ...buildTicketsByRangeRequest(range, status) }
    ).pipe(
      map((response) => {
        const rawData = normalizeToArray(response);
        const mapped = mapTicketsByRange(rawData, range);

        return {
          ...mapped,
          rawData,
          source: 'api' as const,
        };
      }),
      catchError(() => of(buildFallbackTicketsByRange(range)))
    );
  }

  getTicketConsumption(): Observable<TicketConsumptionResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    return this.api.post<TicketConsumptionDto[] | TicketConsumptionDto>(
      API_ENDPOINTS.dashboard.ticketConsumption,
      { idUsuario: userId }
    ).pipe(
      map((response) => {
        const rawData = normalizeToArray(response);
        return {
          summary: mapTicketConsumptionSummary(rawData),
          rawData,
          source: 'api' as const,
        };
      }),
      catchError(() =>
        of({
          summary: { ...DEFAULT_TICKET_CONSUMPTION_SUMMARY },
          rawData: [],
          source: 'fallback' as const,
        })
      )
    );
  }

  getTopCompanies(): Observable<TopCompaniesResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    return this.api.post<TopCompanyDto[] | TopCompanyDto>(
      API_ENDPOINTS.dashboard.topCompanies,
      { idUsuario: userId }
    ).pipe(
      map((response) => {
        const rawData = normalizeToArray(response);
        return {
          items: mapTopCompanies(rawData),
          rawData,
          source: 'api' as const,
        };
      }),
      catchError(() =>
        of({
          items: [],
          rawData: [],
          source: 'fallback' as const,
        })
      )
    );
  }

  getRecentErrors(limit = 3): Observable<RecentErrorsResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    return this.api.post<ActivityLogDto[] | ActivityLogDto>(
      API_ENDPOINTS.dashboard.activityLog,
      buildActivityLogRequest('errores', userId)
    ).pipe(
      map((response) => {
        const rawData = normalizeToArray(response);
        return {
          items: mapRecentErrors(rawData, limit),
          rawData,
          source: 'api' as const,
        };
      }),
      catchError(() =>
        of({
          items: [],
          rawData: [],
          source: 'fallback' as const,
        })
      )
    );
  }

  getLatestTickets(limit = 4): Observable<LatestTicketsResult> {
    const userId = this.requestContext.getUserIdOrDefault();

    return this.api.post<LatestTicketDto[] | LatestTicketDto>(
      API_ENDPOINTS.dashboard.latestTickets,
      { idUsuario: userId }
    ).pipe(
      map((response) => {
        const rawData = normalizeToArray(response);
        return {
          items: mapLatestTickets(rawData, limit),
          rawData,
          source: 'api' as const,
        };
      }),
      catchError(() =>
        of({
          items: [],
          rawData: [],
          source: 'fallback' as const,
        })
      )
    );
  }
}

function mapSummary(raw: PlanUsuarioDto[], ticketRows: TicketUploadDateDto[] = []): PlanConsumptionSummary {
  const item = raw[0];
  if (!item) {
    return DEFAULT_SUMMARY;
  }

  const rawPlanName =
    readStringField(item, ['nombrePlanDTO', 'nombrePlanDto', 'planActualDTO', 'planActualDto']) ??
    DEFAULT_SUMMARY.planName;
  const planName = rawPlanName;
  const used = resolveUsedTickets(item);
  const limit =
    readNumberField(item, [
      'ticketsPermitidosDTO',
      'ticketsPermitidosDto',
      'ticketsLimitePlanDTO',
      'ticketsLimitePlanDto',
      'capacidadPlanTicketsDTO',
      'capacidadPlanTicketsDto',
    ]) ?? 0;
  const startDateIso =
    readStringField(item, ['fechaInicioDTO', 'fechaInicioDto', 'fechaInicioPlanDTO', 'fechaInicioPlanDto']) ??
    undefined;
  const endDateIso =
    readStringField(item, ['fechaFinDTO', 'fechaFinDto', 'fechaFinPlanDTO', 'fechaFinPlanDto']) ??
    undefined;
  const remainingDays =
    readNumberField(item, ['diasRestantesPlanDTO', 'diasRestantesPlanDto']) ??
    calculateRemainingDays(
      startDateIso,
      endDateIso
    );
  const projectedUsed = calculateProjectedUsedByUploadDates({
    used,
    startDateIso,
    endDateIso,
    remainingDays,
    uploadRows: ticketRows,
  });

  return {
    planName,
    used,
    limit,
    remainingDays,
    projectedUsed,
  };
}

function normalizeToArray<T>(raw: T[] | T): T[] {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (typeof raw === 'object' && raw !== null) {
    return [raw];
  }
  return [];
}

function resolveUsedTickets(item: PlanUsuarioDto): number {
  const generated =
    readNumberField(item, [
      'ticketsGeneradosDTO',
      'ticketsGeneradosDto',
      'ticketsSeleccionadosDTO',
      'ticketsSeleccionadosDto',
    ]) ?? 0;
  if (generated > 0) return generated;

  const guardados =
    readNumberField(item, [
      'ticketsGuardadosDTO',
      'ticketsGuardadosDto',
      'ticketsAlmacenadosDTO',
      'ticketsAlmacenadosDto',
    ]) ?? 0;
  const pendientes =
    readNumberField(item, ['ticketsPendientesDTO', 'ticketsPendientesDto']) ?? 0;
  const cancelados =
    readNumberField(item, ['ticketsCanceladosDTO', 'ticketsCanceladosDto']) ?? 0;
  const facturados =
    readNumberField(item, [
      'ticketsFacturadosDTO',
      'ticketsFacturadosDto',
      'facturasEmitidasDTO',
      'facturasEmitidasDto',
    ]) ?? 0;

  return guardados + pendientes + cancelados + facturados;
}

function calculateRemainingDays(startDateIso?: string, endDateIso?: string): number {
  if (!startDateIso || !endDateIso) return DEFAULT_SUMMARY.remainingDays;

  const start = normalizeToStartOfDay(new Date(startDateIso));
  const end = normalizeToStartOfDay(new Date(endDateIso));
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return DEFAULT_SUMMARY.remainingDays;

  const totalPlanDays = calculatePlanDays(start, end);
  if (totalPlanDays <= 0) return 0;

  const today = normalizeToStartOfDay(new Date());
  if (today.getTime() <= start.getTime()) {
    return totalPlanDays;
  }
  if (today.getTime() >= end.getTime()) {
    return 0;
  }

  return calculatePlanDays(today, end);
}

function calculatePlanDays(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / msPerDay);
  return Math.max(0, diffDays);
}

function calculateProjectedUsed(input: {
  used: number;
  startDateIso?: string;
  remainingDays: number;
}): number {
  if (input.used <= 0) return 0;

  const start = input.startDateIso
    ? normalizeToStartOfDay(new Date(input.startDateIso))
    : null;
  if (!start || Number.isNaN(start.getTime())) return input.used;

  const today = normalizeToStartOfDay(new Date());
  if (today.getTime() <= start.getTime()) return input.used;

  const msPerDay = 1000 * 60 * 60 * 24;
  const elapsedDays = Math.max(1, Math.ceil((today.getTime() - start.getTime()) / msPerDay));
  const dailyRate = input.used / elapsedDays;

  if (dailyRate <= 0) return input.used;

  const projected = Math.ceil(input.used + dailyRate * input.remainingDays);
  return Math.max(input.used, projected);
}

function calculateProjectedUsedByUploadDates(input: {
  used: number;
  startDateIso?: string;
  endDateIso?: string;
  remainingDays: number;
  uploadRows: TicketUploadDateDto[];
}): number {
  if (input.used <= 0 && !input.uploadRows.length) return 0;

  const start = input.startDateIso
    ? normalizeToStartOfDay(new Date(input.startDateIso))
    : null;
  const end = input.endDateIso
    ? normalizeToStartOfDay(new Date(input.endDateIso))
    : null;

  if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return calculateProjectedUsed({
      used: input.used,
      startDateIso: input.startDateIso,
      remainingDays: input.remainingDays,
    });
  }

  const today = normalizeToStartOfDay(new Date());
  const effectiveEnd = today.getTime() > end.getTime() ? end : today;
  const elapsedDays = Math.max(1, calculatePlanDays(start, effectiveEnd));

  const uploadedInRange = input.uploadRows.filter((row) => {
    const iso =
      safeTrim(row.fechaSubidaDTO) ??
      safeTrim(row.fechaSubidaDto);
    if (!iso) return false;

    const parsed = normalizeToStartOfDay(new Date(iso));
    if (Number.isNaN(parsed.getTime())) return false;

    return parsed.getTime() >= start.getTime() && parsed.getTime() <= effectiveEnd.getTime();
  }).length;

  if (uploadedInRange <= 0) return input.used;

  const dailyRate = uploadedInRange / elapsedDays;
  if (dailyRate <= 0) return Math.max(input.used, uploadedInRange);

  const projected = Math.ceil(uploadedInRange + dailyRate * input.remainingDays);
  return Math.max(input.used, projected);
}

function safeNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function safeTrim(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function readNumberField(
  source: object,
  keys: readonly string[]
): number | null {
  const record = source as Record<string, unknown>;
  for (const key of keys) {
    const value = safeNumber(record[key]);
    if (value !== null) return value;
  }
  return null;
}

function readStringField(
  source: object,
  keys: readonly string[]
): string | null {
  const record = source as Record<string, unknown>;
  for (const key of keys) {
    const value = safeTrim(record[key]);
    if (value !== null) return value;
  }
  return null;
}

function normalizeToStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildTicketsByRangeRequest(
  range: TicketsRange,
  status: TicketStatus
): Record<string, unknown> {
  const today = normalizeToStartOfDay(new Date());
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const periodToken = range.toUpperCase();
  const statusToken = status.toLowerCase();

  return {
    fechaInicio: formatDateYmd(start),
    fechaFin: formatDateYmd(end),
    tipoPeriodo: periodToken,
    estatus: statusToken,
  };
}

function mapTicketsByRange(raw: TicketsByRangeDto[], range: TicketsRange): Pick<TicketsByRangeResult, 'categories' | 'totals'> {
  if (!raw.length) {
    return buildEmptyTicketsSeries(range);
  }

  const sorted = [...raw].sort(compareTicketsByRange);
  const singleYear = hasSingleYear(sorted);

  if (range === 'mensual' && singleYear) {
    const categories = [...MONTH_LABELS];
    const totals = new Array(MONTH_LABELS.length).fill(0);

    for (const item of sorted) {
      const period = safeNumber(item.periodoDTO);
      if (period !== null && period >= 1 && period <= MONTH_LABELS.length) {
        totals[period - 1] = safeNumber(item.totalTicketsDTO) ?? 0;
      }
    }

    return { categories, totals };
  }

  if (range === 'trimestral' && singleYear) {
    const categories = [...QUARTER_LABELS];
    const totals = new Array(QUARTER_LABELS.length).fill(0);

    for (const item of sorted) {
      const period = safeNumber(item.periodoDTO);
      if (period !== null && period >= 1 && period <= QUARTER_LABELS.length) {
        totals[period - 1] = safeNumber(item.totalTicketsDTO) ?? 0;
      }
    }

    return { categories, totals };
  }

  return {
    categories: sorted.map((item) => formatTicketsLabel(item, range, range === 'mensual' && singleYear)),
    totals: sorted.map((item) => safeNumber(item.totalTicketsDTO) ?? 0),
  };
}

function compareTicketsByRange(a: TicketsByRangeDto, b: TicketsByRangeDto): number {
  const yearA = safeNumber(a.anioDTO) ?? 0;
  const yearB = safeNumber(b.anioDTO) ?? 0;
  if (yearA !== yearB) return yearA - yearB;

  const periodA = safeNumber(a.periodoDTO) ?? 0;
  const periodB = safeNumber(b.periodoDTO) ?? 0;
  return periodA - periodB;
}

function hasSingleYear(items: TicketsByRangeDto[]): boolean {
  const years = new Set<number>();

  for (const item of items) {
    const year = safeNumber(item.anioDTO);
    if (year !== null) years.add(year);
    if (years.size > 1) return false;
  }

  return years.size <= 1;
}

function formatTicketsLabel(item: TicketsByRangeDto, range: TicketsRange, singleYearMonthly: boolean): string {
  const period = safeNumber(item.periodoDTO);
  const year = safeNumber(item.anioDTO);
  const etiqueta = safeTrim(item.etiquetaDTO);

  if (range === 'mensual') {
    if (period !== null && period >= 1 && period <= 12) {
      const month = MONTH_LABELS[period - 1];
      if (singleYearMonthly) return month;
      if (year !== null) return `${month} ${year}`;
      return month;
    }
    if (etiqueta) return etiqueta;
  }

  if (range === 'trimestral') {
    if (period !== null && period >= 1 && period <= 4) {
      const quarter = QUARTER_LABELS[period - 1];
      if (year !== null) return `${quarter} ${year}`;
      return quarter;
    }
    if (etiqueta) return etiqueta;
  }

  if (range === 'anual') {
    if (year !== null) return `${year}`;
    if (etiqueta) return etiqueta;
  }

  if (etiqueta) return etiqueta;
  if (period !== null) return `${period}`;
  return '-';
}

function buildFallbackTicketsByRange(range: TicketsRange): TicketsByRangeResult {
  return {
    ...buildEmptyTicketsSeries(range),
    rawData: [],
    source: 'fallback',
  };
}

function mapTicketConsumptionSummary(raw: TicketConsumptionDto[]): TicketConsumptionSummary {
  if (!raw.length) {
    return { ...DEFAULT_TICKET_CONSUMPTION_SUMMARY };
  }

  const summary: TicketConsumptionSummary = { ...DEFAULT_TICKET_CONSUMPTION_SUMMARY };

  for (const item of raw) {
    const status = normalizeTicketConsumptionStatus(item.estatusDTO);
    const count = safeNumber(item.countEstatusDTO) ?? 0;
    const total = safeNumber(item.totalTicketsDTO) ?? 0;

    if (status === 'guardado') {
      summary.guardados += count;
      continue;
    }

    if (status === 'pendiente') {
      summary.pendientes += count;
      continue;
    }

    if (status === 'cancelado') {
      summary.cancelados += count;
      continue;
    }

    if (status === 'facturado') {
      summary.facturados += count;
      summary.totalFacturado += total;
      continue;
    }

    if (status === 'permitido') {
      // Compatibilidad hacia atras: algunos ambientes usan "permitido"
      // para representar tickets ya facturados.
      summary.facturados += count;
    }
  }

  return summary;
}

function mapTopCompanies(raw: TopCompanyDto[]): TopCompanyItem[] {
  return raw
    .map((item) => ({
      name: safeTrim(item.razonSocialDTO) ?? 'Sin nombre',
      tickets: Math.max(0, Math.trunc(safeNumber(item.cantidadTicketsDTO) ?? 0)),
      amount: Math.max(0, safeNumber(item.importeTicketsDTO) ?? 0),
    }))
    .slice(0, 5);
}

function mapLatestTickets(raw: LatestTicketDto[], limit: number): LatestTicketItem[] {
  return raw
    .map((item) => {
      const date = parseDate(item.fechaSubidaDTO);
      const id = Math.trunc(safeNumber(item.idTicketDTO) ?? 0);

      return {
        id: id > 0 ? id : 0,
        date: formatTicketDate(date),
        company: safeTrim(item.razonSocialDTO) ?? 'Sin empresa',
        total: Math.max(0, safeNumber(item.importeTicketsDTO) ?? 0),
        status: normalizeLatestTicketStatus(item.estatusTicketDTO),
      };
    })
    .sort((a, b) => b.id - a.id)
    .slice(0, Math.max(0, limit));
}

function buildActivityLogRequest(action: string, userId: number): Record<string, unknown> {
  return { idUsuario: userId, accion: action };
}

function mapRecentErrors(raw: ActivityLogDto[], limit: number): RecentErrorItem[] {
  return raw
    .map((item) => {
      const date = parseDate(item.fechaDTO);
      return {
        title: buildRecentErrorTitle(item),
        detail: safeTrim(item.detalleDTO) ?? 'Sin detalle',
        ago: formatRelativeTime(date),
        timestamp: date?.getTime() ?? 0,
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, Math.max(0, limit));
}

function buildRecentErrorTitle(item: ActivityLogDto): string {
  const action = normalizeLabel(item.accionDTO);
  const entity = normalizeLabel(item.entidadAfectadaDTO);

  if (action && entity) return `${action} · ${entity}`;
  if (action) return action;
  if (entity) return entity;
  return 'Error';
}

function normalizeLabel(value: unknown): string | null {
  const text = safeTrim(value);
  if (!text) return null;

  return text
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim().length) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function formatTicketDate(date: Date | null): string {
  if (!date) return '--';

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function normalizeLatestTicketStatus(
  statusRaw: unknown
): 'Guardado' | 'Pendiente' | 'Cancelado' | 'Facturado' | 'Desconocido' {
  const normalized = safeTrim(statusRaw)
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!normalized) return 'Desconocido';

  if (normalized.startsWith('guard')) return 'Guardado';
  if (normalized.startsWith('pend')) return 'Pendiente';
  if (normalized.startsWith('cancel')) return 'Cancelado';
  if (normalized.startsWith('factur')) return 'Facturado';

  return 'Desconocido';
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return '--';

  const diffMs = Math.max(0, Date.now() - date.getTime());
  const minuteMs = 1000 * 60;
  const hourMs = minuteMs * 60;
  const dayMs = hourMs * 24;

  if (diffMs < hourMs) {
    const minutes = Math.max(1, Math.floor(diffMs / minuteMs));
    return `${minutes} min`;
  }

  if (diffMs < dayMs) {
    const hours = Math.max(1, Math.floor(diffMs / hourMs));
    return `${hours} h`;
  }

  const days = Math.max(1, Math.floor(diffMs / dayMs));
  return `${days} d`;
}

function normalizeTicketConsumptionStatus(
  statusRaw: unknown
): 'guardado' | 'pendiente' | 'cancelado' | 'permitido' | 'facturado' | null {
  const normalized = safeTrim(statusRaw)
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!normalized) return null;

  if (normalized.startsWith('guard')) return 'guardado';
  if (normalized.startsWith('pend')) return 'pendiente';
  if (normalized.startsWith('cancel')) return 'cancelado';
  if (normalized.startsWith('permit')) return 'permitido';
  if (normalized.startsWith('factur')) return 'facturado';

  return null;
}

function buildEmptyTicketsSeries(range: TicketsRange): Pick<TicketsByRangeResult, 'categories' | 'totals'> {
  if (range === 'mensual') {
    return {
      categories: [...MONTH_LABELS],
      totals: new Array(MONTH_LABELS.length).fill(0),
    };
  }

  if (range === 'trimestral') {
    return {
      categories: [...QUARTER_LABELS],
      totals: new Array(QUARTER_LABELS.length).fill(0),
    };
  }

  const currentYear = new Date().getFullYear();
  return {
    categories: [`${currentYear}`],
    totals: [0],
  };
}

function formatDateYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
