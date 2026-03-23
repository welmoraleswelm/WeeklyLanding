import { Injectable, inject } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

const USER_ID_STORAGE_KEYS = ['idUsuario', 'weekly.id_usuario', 'weekly.user_id'] as const;

@Injectable({ providedIn: 'root' })
export class ApiRequestContextService {
  private readonly tokenStorage = inject(TokenStorageService);

  withUserId<T extends Record<string, unknown>>(payload?: T): T & { idUsuario: number } {
    return {
      ...(payload ?? ({} as T)),
      idUsuario: this.getUserIdOrDefault(),
    };
  }

  getUserIdOrNull(): number | null {
    return this.resolveUserIdFromSession() ?? this.resolveUserIdFromLocalStorage();
  }

  getUserIdOrDefault(): number {
    const userId = this.getUserIdOrNull();
    if (userId === null) {
      throw new Error('No se pudo identificar al usuario autenticado.');
    }

    return userId;
  }

  private resolveUserIdFromSession(): number | null {
    const sessionUserId = this.tokenStorage.getSession()?.user?.id;
    return asPositiveInteger(sessionUserId);
  }

  private resolveUserIdFromLocalStorage(): number | null {
    if (!isBrowser()) return null;

    for (const key of USER_ID_STORAGE_KEYS) {
      const value = localStorage.getItem(key);
      const parsed = asPositiveInteger(value);
      if (parsed !== null) return parsed;
    }

    return null;
  }
}

function asPositiveInteger(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }

  return null;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
