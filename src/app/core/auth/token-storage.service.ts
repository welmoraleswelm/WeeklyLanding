import { Injectable } from '@angular/core';
import { AuthSession } from './auth.models';

const ACCESS_TOKEN_KEY = 'weekly.access_token';
const SESSION_KEY = 'weekly.session';
const USER_ID_KEYS = ['idUsuario', 'weekly.id_usuario', 'weekly.user_id'] as const;

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  getAccessToken(): string | null {
    if (!isBrowser()) return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    if (!isBrowser()) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  setSession(session: AuthSession): void {
    if (!isBrowser()) return;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
    this.persistUserId(session.user?.id);
  }

  getSession(): AuthSession | null {
    if (!isBrowser()) return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(SESSION_KEY);

    for (const key of USER_ID_KEYS) {
      localStorage.removeItem(key);
    }
  }

  private persistUserId(value: unknown): void {
    const id = parsePositiveInteger(value);
    if (id === null) return;

    for (const key of USER_ID_KEYS) {
      localStorage.setItem(key, String(id));
    }
  }
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

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
