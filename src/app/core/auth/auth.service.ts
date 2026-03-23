import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { ApiClientService } from '../http/api-client.service';
import {
  AuthSession,
  AuthUser,
  ConfirmMfaSetupRequest,
  MfaChallenge,
  MfaActiveSession,
  MfaSetup,
  MfaStatus,
  MfaStatusRequest,
  SignInRequest,
  SignInResult,
  SignInSuccess,
  SignUpRequest,
  StartMfaSetupRequest,
  SignUpResult,
  VerifyMfaRequest,
} from './auth.models';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiClientService);
  private readonly storage = inject(TokenStorageService);
  private readonly router = inject(Router);

  private readonly sessionSubject = new BehaviorSubject<AuthSession | null>(
    this.storage.getSession()
  );

  readonly session$ = this.sessionSubject.asObservable();
  readonly isAuthenticated$ = this.session$.pipe(map((session) => !!session?.accessToken));

  getSessionSnapshot(): AuthSession | null {
    return this.sessionSubject.value;
  }

  hasValidSession(): boolean {
    return this.isValidSession(this.sessionSubject.value);
  }

  signIn(payload: SignInRequest): Observable<SignInResult> {
    const requestBody = {
      correo: payload.email.trim(),
      passwordHash: payload.password,
    };

    return this.api.post<unknown>(API_ENDPOINTS.auth.signIn, requestBody).pipe(
      map((raw) => this.normalizeSignInResult(raw, requestBody.correo)),
      tap((result) => {
        if (!result.requiresMfa) {
          this.setSession(result.session);
        }
      })
    );
  }

  verifyMfa(payload: VerifyMfaRequest, fallbackEmail = ''): Observable<AuthSession> {
    return this.api.post<unknown>(API_ENDPOINTS.auth.verifyMfa, payload).pipe(
      map((raw) => this.normalizeAuthSession(raw, fallbackEmail)),
      tap((session) => this.setSession(session))
    );
  }

  getMfaStatus(payload: MfaStatusRequest): Observable<MfaStatus> {
    return this.api.post<unknown>(API_ENDPOINTS.auth.mfaStatus, payload).pipe(
      map((raw) => this.normalizeMfaStatus(raw))
    );
  }

  getMfaActiveSessions(payload: MfaStatusRequest): Observable<MfaActiveSession[]> {
    return this.api.post<unknown>(API_ENDPOINTS.auth.mfaSessions, payload).pipe(
      map((raw) => this.normalizeMfaActiveSessions(raw))
    );
  }

  startMfaSetup(payload: StartMfaSetupRequest): Observable<MfaSetup> {
    return this.api.post<unknown>(API_ENDPOINTS.auth.mfaStart, payload).pipe(
      map((raw) => this.normalizeMfaSetup(raw))
    );
  }

  confirmMfaSetup(payload: ConfirmMfaSetupRequest): Observable<MfaStatus> {
    return this.api.post<unknown>(API_ENDPOINTS.auth.mfaConfirm, payload).pipe(
      map((raw) => this.normalizeMfaStatus(raw))
    );
  }

  signUp(payload: SignUpRequest): Observable<SignUpResult> {
    return this.api.post<unknown>(API_ENDPOINTS.auth.signUp, payload).pipe(
      map((raw) => this.normalizeSignUpResult(raw))
    );
  }

  signOut(redirect = true): void {
    this.sessionSubject.next(null);
    this.storage.clear();
    if (redirect) {
      void this.router.navigate(['/signin'], { replaceUrl: true });
    }
  }

  getAccessToken(): string | null {
    const tokenFromSession = this.sessionSubject.value?.accessToken;
    if (tokenFromSession) return tokenFromSession;
    return this.storage.getAccessToken();
  }

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  getUserId(): number | null {
    return parsePositiveInteger(this.sessionSubject.value?.user?.id);
  }

  updateSessionUser(userPatch: Partial<AuthUser>): void {
    const current = this.sessionSubject.value;
    if (!current) return;

    const next: AuthSession = {
      ...current,
      user: {
        ...(current.user ?? {}),
        ...userPatch,
      },
    };

    this.setSession(next);
  }

  private setSession(session: AuthSession): void {
    this.sessionSubject.next(session);
    this.storage.setSession(session);
  }

  private normalizeSignInResult(raw: unknown, fallbackEmail = ''): SignInResult {
    const source = asRecord(raw);
    const requiresMfa = pickBoolean(source, ['RequiereMfa', 'requiereMfa', 'requiereMfaDTO']);
    const idUsuario = pickNumber(source, ['IdUsuario', 'idUsuario', 'idUsuarioDTO']);

    if (requiresMfa) {
      const challengeToken = pickString(source, [
        'MfaChallengeToken',
        'mfaChallengeToken',
        'challengeToken',
        'challengeTokenDTO',
      ]);

      if (!challengeToken || idUsuario === null) {
        throw new Error('No se pudo iniciar la validacion MFA.');
      }

      const challenge: MfaChallenge = {
        requiresMfa: true,
        challengeToken,
        userId: String(idUsuario),
        email: fallbackEmail,
      };

      return challenge;
    }

    const session = this.normalizeAuthSession(raw, fallbackEmail);
    const success: SignInSuccess = {
      requiresMfa: false,
      session,
    };
    return success;
  }

  private normalizeAuthSession(raw: unknown, fallbackEmail = ''): AuthSession {
    const source = asRecord(raw);

    const tieneAcceso = pickBoolean(source, ['TieneAcceso', 'tieneAcceso', 'tieneAccesoDTO']);
    const idUsuario = pickNumber(source, ['IdUsuario', 'idUsuario', 'idUsuarioDTO']);

    if (!tieneAcceso || idUsuario === null) {
      throw new Error('Credenciales incorrectas');
    }

    const accessToken =
      pickString(source, ['accessToken', 'token', 'jwt', 'bearerToken']) ?? `session-${idUsuario}`;
    const refreshToken = pickString(source, ['refreshToken']);
    const expiresAt = pickString(source, ['expiresAt', 'expiration', 'expires']);

    const userRecord = pickRecord(source, ['user', 'usuario']);
    const user: AuthUser = {
      id: pickString(userRecord, ['id', 'id_usuario']) ?? String(idUsuario),
      name: pickString(userRecord, ['name', 'nombre']) ?? undefined,
      email: pickString(userRecord, ['email']) ?? fallbackEmail,
    };

    return {
      accessToken,
      refreshToken: refreshToken ?? undefined,
      expiresAt: expiresAt ?? undefined,
      user,
    };
  }

  private normalizeSignUpResult(raw: unknown): SignUpResult {
    const source = asRecord(raw);
    const message = pickString(source, ['message', 'mensaje']) ?? 'Registro exitoso';

    const requiresEmailVerificationRaw = source['requiresEmailVerification'];
    const requiresEmailVerification =
      typeof requiresEmailVerificationRaw === 'boolean'
        ? requiresEmailVerificationRaw
        : undefined;

    return {
      message,
      requiresEmailVerification,
    };
  }

  private normalizeMfaStatus(raw: unknown): MfaStatus {
    const source = firstRecord(raw);
    const enabled = pickBoolean(source, [
      'mfaHabilitadoDTO',
      'mfaHabilitado',
      'enabled',
      'mfa_enabled',
      'mfaEnabled',
    ]);
    const configured =
      pickBoolean(source, [
        'mfaConfiguradoDTO',
        'mfaConfigurado',
        'configured',
        'mfa_configurado',
        'mfaConfigured',
      ]) ||
      enabled ||
      pickString(source, ['mfaSecretDTO', 'mfaSecret', 'mfa_secret']) !== null ||
      pickString(source, ['mfaEnabledAtDTO', 'mfaEnabledAt', 'mfa_enabled_at']) !== null;

    return {
      enabled,
      configured,
    };
  }

  private normalizeMfaSetup(raw: unknown): MfaSetup {
    const source = asRecord(raw);
    const userId = pickNumber(source, ['idUsuarioDTO', 'idUsuario']) ?? 0;
    const setupToken = pickString(source, ['setupTokenDTO', 'setupToken']) ?? '';
    const manualEntryKey =
      pickString(source, ['manualEntryKeyDTO', 'manualEntryKey']) ?? '';
    const otpAuthUri = pickString(source, ['otpAuthUriDTO', 'otpAuthUri']) ?? '';
    const issuer = pickString(source, ['issuerDTO', 'issuer']) ?? '';
    const accountName =
      pickString(source, ['accountNameDTO', 'accountName']) ?? '';

    if (!userId || !setupToken || !manualEntryKey) {
      throw new Error('No se pudo iniciar la activacion MFA.');
    }

    return {
      userId,
      setupToken,
      manualEntryKey,
      otpAuthUri,
      issuer,
      accountName,
    };
  }

  private normalizeMfaActiveSessions(raw: unknown): MfaActiveSession[] {
    if (!Array.isArray(raw)) {
      return [];
    }

    return raw.map((item, index) => {
      const source = asRecord(item);
      const id =
        pickString(source, ['idSesionDTO', 'idSesion', 'id']) ??
        `session-${index + 1}`;
      const device =
        pickString(source, ['dispositivoDTO', 'dispositivo', 'device']) ??
        'Sesion web';
      const location =
        pickString(source, ['ubicacionDTO', 'ubicacion', 'location']) ??
        'Ubicacion no disponible';
      const lastActiveAt =
        pickString(source, ['ultimoAccesoDTO', 'ultimoAcceso', 'lastActiveAt']) ??
        '';

      return {
        id,
        device,
        location,
        lastActiveAt,
      };
    });
  }

  private isValidSession(session: AuthSession | null): boolean {
    return !!session?.accessToken && parsePositiveInteger(session.user?.id) !== null;
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
}

function firstRecord(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) {
    return asRecord(value[0]);
  }

  return asRecord(value);
}

function pickString(
  source: Record<string, unknown>,
  keys: readonly string[]
): string | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }
  return null;
}

function pickNumber(
  source: Record<string, unknown>,
  keys: readonly string[]
): number | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
      return Math.trunc(value);
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed > 0) {
        return Math.trunc(parsed);
      }
    }
  }
  return null;
}

function pickBoolean(
  source: Record<string, unknown>,
  keys: readonly string[]
): boolean {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true' || normalized === '1') return true;
      if (normalized === 'false' || normalized === '0') return false;
    }
  }
  return false;
}

function pickRecord(
  source: Record<string, unknown>,
  keys: readonly string[]
): Record<string, unknown> {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'object' && value !== null) {
      return value as Record<string, unknown>;
    }
  }
  return {};
}

function parsePositiveInteger(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}
