import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ApiRuntimeConfig {
  baseUrl: string;
  timeoutMs: number;
}

export const API_CONFIG = new InjectionToken<ApiRuntimeConfig>('API_CONFIG', {
  providedIn: 'root',
  factory: (): ApiRuntimeConfig => ({
    baseUrl: normalizeBaseUrl(environment.apiBaseUrl),
    timeoutMs: environment.apiTimeoutMs,
  }),
});

export function buildApiUrl(config: ApiRuntimeConfig, path: string): string {
  const cleanPath = path.replace(/^\/+/, '');
  return `${config.baseUrl}/${cleanPath}`;
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

 