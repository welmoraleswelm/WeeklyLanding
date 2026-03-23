import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../core/config/api-endpoints';
import { ApiClientService } from '../../core/http/api-client.service';
import { ApiRequestContextService } from '../../core/http/api-request-context.service';

interface ContributorApiDto {
  idContribuyenteDTO?: number | string;
  idUsuarioDTO?: number | string;
  tipoPersonaDTO?: string;
  rfcDTO?: string;
  nombreMostradoDTO?: string;
  nombreComercialDTO?: string;
  razonSocialDTO?: string;
  nombreCompletoDTO?: string;
  estatusFavoritoDTO?: number | string;
  idContribuyentesFavoritosDTO?: number | string;
}

interface AddFavoriteResponseDto {
  contribuyenteFavoritoDTO?: boolean;
}

interface SaveCsfResponseDto {
  idContribuyenteDTO?: number | string;
}

interface SaveCsfRequestDto {
  tipoPersonaDTO: 'FISICA' | 'MORAL';
  rfcDTO: string;
  estatusPadronDTO: string;
  actividadEconomicaDTO: string;
  regimenDTO: string;
  codPostalDTO: string;
  tipoVialidadDTO: string;
  nomVialidadDTO: string;
  numExteriorDTO: string;
  numeroInteriorDTO: string;
  nomColoniaDTO: string;
  nomLocalidadDTO: string;
  nomMunicipioDTO: string;
  nomEntidadFederativaDTO: string;
  entreCalleDTO: string;
  yCalleDTO: string;
  curpDTO: string;
  nombreDTO: string;
  priApellidoDTO: string;
  segApellidoDTO: string;
  nombreComercialDTO: string;
  razonSocialDTO: string;
  regimenCapitalDTO: string;
}

export interface CsfExtractedContributor {
  razonSocialDTO?: string;
  regimenCapitalDTO?: string;
  rfcDTO?: string;
  curpDTO?: string;
  nombreDTO?: string;
  priApellidoDTO?: string;
  segApellidoDTO?: string;
  fechaInicioOperacionesDTO?: string;
  estatusPadronDTO?: string;
  fechaUltimoCambioEstadoDTO?: string;
  nombreComercialDTO?: string;
  codPostalDTO?: string;
  nomVialidadDTO?: string;
  numeroInteriorDTO?: string;
  nomLocalidadDTO?: string;
  nomEntidadFederativaDTO?: string;
  tipoVialidadDTO?: string;
  numExteriorDTO?: string;
  nomColoniaDTO?: string;
  nomMunicipioDTO?: string;
  entreCalleDTO?: string;
  yCalleDTO?: string;
  actividadEconomicaDTO?: string;
  regimenDTO?: string;
}

export interface ContributorUi {
  idContribuyente: number;
  idUsuario: number;
  nombre: string;
  nombrePersona: string;
  nombreComercial: string;
  rfc: string;
  tipoPersona: string;
  estatusFavorito: number;
  idContribuyentesFavoritos: number;
}

@Injectable({ providedIn: 'root' })
export class ContributorsApiService {
  private readonly api = inject(ApiClientService);
  private readonly requestContext = inject(ApiRequestContextService);

  getGlobalContributors(page = 1, pageSize = 200): Observable<ContributorUi[]> {
    return this.api.post<ContributorApiDto[] | ContributorApiDto>(
      API_ENDPOINTS.contributors.global,
      this.requestContext.withUserId({ page, pageSize })
    ).pipe(
      map((response) => this.mapContributors(this.normalizeToArray(response))),
      catchError(() => of([]))
    );
  }

  getFavoriteContributors(page = 1, pageSize = 200): Observable<ContributorUi[]> {
    return this.api.post<ContributorApiDto[] | ContributorApiDto>(
      API_ENDPOINTS.contributors.favorites,
      this.requestContext.withUserId({ page, pageSize })
    ).pipe(
      map((response) => this.mapContributors(this.normalizeToArray(response))),
      catchError(() => of([]))
    );
  }

  addFavorite(idContribuyente: number): Observable<boolean> {
    return this.api.post<AddFavoriteResponseDto>(
      API_ENDPOINTS.contributors.addFavorite,
      this.requestContext.withUserId({ idContribuyente })
    ).pipe(
      map((response) => Boolean(response?.contribuyenteFavoritoDTO)),
      catchError(() => of(false))
    );
  }

  removeFavorite(idContribuyentesFavoritos: number): Observable<boolean> {
    return this.api.post<boolean>(
      API_ENDPOINTS.contributors.removeFavorite,
      {
        idContribuyentesFavoritosDTO: idContribuyentesFavoritos,
        estatusFavoritoDTO: 0,
      }
    ).pipe(
      map((response) => Boolean(response)),
      catchError(() => of(false))
    );
  }

  extractCsf(file: File): Observable<CsfExtractedContributor | null> {
    const form = new FormData();
    form.append('ArchivoCsf', file);

    return this.api.post<CsfExtractedContributor>(
      API_ENDPOINTS.contributors.extractCsf,
      form,
      { timeoutMs: 180000 }
    ).pipe(
      map((response) => response ?? null),
      catchError(() => of(null))
    );
  }

  saveCsf(extracted: CsfExtractedContributor): Observable<number | null> {
    const tipoPersona: 'FISICA' | 'MORAL' = extracted.razonSocialDTO?.trim() ? 'MORAL' : 'FISICA';

    const payload = this.requestContext.withUserId({
      tipoPersonaDTO: tipoPersona,
      rfcDTO: extracted.rfcDTO?.trim() ?? '',
      estatusPadronDTO: extracted.estatusPadronDTO?.trim() ?? '',
      actividadEconomicaDTO: extracted.actividadEconomicaDTO?.trim() ?? '',
      regimenDTO: extracted.regimenDTO?.trim() ?? '',
      codPostalDTO: extracted.codPostalDTO?.trim() ?? '',
      tipoVialidadDTO: extracted.tipoVialidadDTO?.trim() ?? '',
      nomVialidadDTO: extracted.nomVialidadDTO?.trim() ?? '',
      numExteriorDTO: extracted.numExteriorDTO?.trim() ?? '',
      numeroInteriorDTO: extracted.numeroInteriorDTO?.trim() ?? '',
      nomColoniaDTO: extracted.nomColoniaDTO?.trim() ?? '',
      nomLocalidadDTO: extracted.nomLocalidadDTO?.trim() ?? '',
      nomMunicipioDTO: extracted.nomMunicipioDTO?.trim() ?? '',
      nomEntidadFederativaDTO: extracted.nomEntidadFederativaDTO?.trim() ?? '',
      entreCalleDTO: extracted.entreCalleDTO?.trim() ?? '',
      yCalleDTO: extracted.yCalleDTO?.trim() ?? '',
      curpDTO: extracted.curpDTO?.trim() ?? '',
      nombreDTO: extracted.nombreDTO?.trim() ?? '',
      priApellidoDTO: extracted.priApellidoDTO?.trim() ?? '',
      segApellidoDTO: extracted.segApellidoDTO?.trim() ?? '',
      nombreComercialDTO: extracted.nombreComercialDTO?.trim() ?? '',
      razonSocialDTO: extracted.razonSocialDTO?.trim() ?? '',
      regimenCapitalDTO: extracted.regimenCapitalDTO?.trim() ?? '',
    }) as SaveCsfRequestDto & { idUsuario: number };

    return this.api.post<SaveCsfResponseDto>(
      API_ENDPOINTS.contributors.saveCsf,
      payload
    ).pipe(
      map((response) => {
        const id = toPositiveInt(response?.idContribuyenteDTO);
        return id > 0 ? id : null;
      }),
      catchError(() => of(null))
    );
  }

  private normalizeToArray<T>(raw: T[] | T): T[] {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'object' && raw !== null) return [raw];
    return [];
  }

  private mapContributors(items: ContributorApiDto[]): ContributorUi[] {
    return items
      .map((item) => {
        const idContribuyente = toPositiveInt(item.idContribuyenteDTO);
        const idUsuario = toPositiveInt(item.idUsuarioDTO);
        const nombrePersona = normalizeOptionalText(item.nombreCompletoDTO);
        const nombreComercial = normalizeOptionalText(item.nombreComercialDTO);

        const nombre = normalizeText(
          item.nombreMostradoDTO ?? item.nombreComercialDTO ?? item.razonSocialDTO ?? item.nombreCompletoDTO,
          'Contribuyente'
        );
        const rfc = normalizeText(item.rfcDTO, 'Sin RFC');
        const tipoPersona = normalizeText(item.tipoPersonaDTO, 'N/A');

        return {
          idContribuyente,
          idUsuario,
          nombre,
          nombrePersona,
          nombreComercial,
          rfc,
          tipoPersona,
          estatusFavorito: toNonNegativeInt(item.estatusFavoritoDTO),
          idContribuyentesFavoritos: toNonNegativeInt(item.idContribuyentesFavoritosDTO),
        };
      })
      .filter((item) => item.idContribuyente > 0);
  }
}

function toPositiveInt(value: unknown): number {
  const parsed = toNonNegativeInt(value);
  return parsed > 0 ? parsed : 0;
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

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const clean = value.trim();
  return clean.length ? clean : fallback;
}

function normalizeOptionalText(value: unknown): string {
  if (typeof value !== 'string') return '-';
  const clean = value.trim();
  return clean.length ? clean : '-';
}
