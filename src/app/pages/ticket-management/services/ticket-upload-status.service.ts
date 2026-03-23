import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UploadBackgroundState = 'idle' | 'processing' | 'saving' | 'success' | 'error';

export interface UploadBackgroundStatusSnapshot {
  state: UploadBackgroundState;
  message: string;
  updatedAt: string;
}

export interface UploadNotificationSnapshot {
  id: number;
  tone: 'info' | 'success' | 'error';
  message: string;
  expiresAt: number;
}

const STORAGE_KEY = 'weekly.ticket_upload_background_status';
const NOTIFICATIONS_STORAGE_KEY = 'weekly.ticket_upload_notifications';
const MAX_IN_PROGRESS_AGE_MS = 20 * 60 * 1000; // 20 minutes

@Injectable({ providedIn: 'root' })
export class TicketUploadStatusService {
  private snapshot: UploadBackgroundStatusSnapshot = {
    state: 'idle',
    message: '',
    updatedAt: new Date().toISOString(),
  };
  private readonly statusSubject = new BehaviorSubject<UploadBackgroundStatusSnapshot>(this.snapshot);
  private readonly notificationsSubject = new BehaviorSubject<UploadNotificationSnapshot[]>([]);

  constructor() {
    this.snapshot = this.normalizeStaleInProgress(this.readFromStorage() ?? this.snapshot);
    this.writeToStorage(this.snapshot);
    this.statusSubject.next({ ...this.snapshot });
    this.notificationsSubject.next(this.readNotificationsFromStorage());
  }

  get status$(): Observable<UploadBackgroundStatusSnapshot> {
    return this.statusSubject.asObservable();
  }

  get notifications$(): Observable<UploadNotificationSnapshot[]> {
    return this.notificationsSubject.asObservable();
  }

  getNotifications(): UploadNotificationSnapshot[] {
    return this.readNotificationsFromStorage();
  }

  setNotifications(notifications: UploadNotificationSnapshot[]): void {
    const pruned = notifications.filter((item) => item.expiresAt > Date.now());
    this.writeNotificationsToStorage(pruned);
    this.notificationsSubject.next(pruned);
  }

  pruneExpiredNotifications(): void {
    const current = this.readNotificationsFromStorage();
    const pruned = current.filter((item) => item.expiresAt > Date.now());
    if (pruned.length !== current.length) {
      this.writeNotificationsToStorage(pruned);
    }
    this.notificationsSubject.next(pruned);
  }

  getSnapshot(): UploadBackgroundStatusSnapshot {
    return { ...this.snapshot };
  }

  setStatus(state: UploadBackgroundState, message: string): void {
    this.snapshot = {
      state,
      message,
      updatedAt: new Date().toISOString(),
    };
    this.writeToStorage(this.snapshot);
    this.statusSubject.next({ ...this.snapshot });
  }

  clear(): void {
    this.setStatus('idle', '');
    this.setNotifications([]);
  }

  private readFromStorage(): UploadBackgroundStatusSnapshot | null {
    if (!isBrowser()) return null;

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as Partial<UploadBackgroundStatusSnapshot>;
      if (!parsed || typeof parsed !== 'object') return null;

      const state = normalizeState(parsed.state);
      const message = typeof parsed.message === 'string' ? parsed.message : '';
      const updatedAt = typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString();

      return { state, message, updatedAt };
    } catch {
      return null;
    }
  }

  private normalizeStaleInProgress(snapshot: UploadBackgroundStatusSnapshot): UploadBackgroundStatusSnapshot {
    const isInProgress = snapshot.state === 'processing' || snapshot.state === 'saving';
    if (!isInProgress) return snapshot;

    const updatedAtMs = Date.parse(snapshot.updatedAt);
    if (!Number.isFinite(updatedAtMs)) {
      return {
        state: 'idle',
        message: '',
        updatedAt: new Date().toISOString(),
      };
    }

    const ageMs = Date.now() - updatedAtMs;
    if (ageMs <= MAX_IN_PROGRESS_AGE_MS) return snapshot;

    return {
      state: 'idle',
      message: '',
      updatedAt: new Date().toISOString(),
    };
  }

  private writeToStorage(snapshot: UploadBackgroundStatusSnapshot): void {
    if (!isBrowser()) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Best effort persistence.
    }
  }

  private readNotificationsFromStorage(): UploadNotificationSnapshot[] {
    if (!isBrowser()) return [];

    try {
      const raw = sessionStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed
        .map((item) => this.normalizeNotification(item))
        .filter((item): item is UploadNotificationSnapshot => item !== null);
    } catch {
      return [];
    }
  }

  private writeNotificationsToStorage(notifications: UploadNotificationSnapshot[]): void {
    if (!isBrowser()) return;

    try {
      sessionStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    } catch {
      // Best effort persistence.
    }
  }

  private normalizeNotification(value: unknown): UploadNotificationSnapshot | null {
    if (typeof value !== 'object' || value === null) return null;

    const item = value as Record<string, unknown>;
    const id = Number(item['id']);
    const tone = item['tone'];
    const message = item['message'];
    const expiresAt = Number(item['expiresAt']);

    if (!Number.isFinite(id) || id <= 0) return null;
    if (tone !== 'info' && tone !== 'success' && tone !== 'error') return null;
    if (typeof message !== 'string') return null;
    if (!Number.isFinite(expiresAt) || expiresAt <= 0) return null;

    return {
      id,
      tone,
      message,
      expiresAt,
    };
  }
}

function normalizeState(value: unknown): UploadBackgroundState {
  if (
    value === 'idle' ||
    value === 'processing' ||
    value === 'saving' ||
    value === 'success' ||
    value === 'error'
  ) {
    return value;
  }
  return 'idle';
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
