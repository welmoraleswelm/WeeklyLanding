import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { API_CONFIG, ApiRuntimeConfig, buildApiUrl } from '../config/api.config';
import { ApiResponse } from './api-response.model';

type Primitive = string | number | boolean;
type ParamValue = Primitive | readonly Primitive[];

export interface ApiRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, ParamValue>;
  timeoutMs?: number;
}

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private readonly http = inject(HttpClient);
  private readonly config = inject<ApiRuntimeConfig>(API_CONFIG);

  get<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  post<T>(path: string, body?: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.request<T>('POST', path, body, options);
  }

  put<T>(path: string, body?: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.request<T>('PUT', path, body, options);
  }

  patch<T>(path: string, body?: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.request<T>('PATCH', path, body, options);
  }

  delete<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  private request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    options?: ApiRequestOptions
  ): Observable<T> {
    const url = buildApiUrl(this.config, path);
    const timeoutMs = options?.timeoutMs ?? this.config.timeoutMs;

    const request$ = this.http.request<ApiResponse<T>>(method, url, {
        body,
        headers: options?.headers,
        params: options?.params,
      });

    const timedRequest$ = timeoutMs > 0
      ? request$.pipe(timeout(timeoutMs))
      : request$;

    return timedRequest$.pipe(map((response) => this.unwrapPayload<T>(response)));
  }

  private unwrapPayload<T>(response: ApiResponse<T>): T {
    if (!isRecord(response)) {
      return response as T;
    }

    if ('data' in response && response['data'] !== undefined) {
      return response['data'] as T;
    }
    if ('Data' in response && response['Data'] !== undefined) {
      return response['Data'] as T;
    }
    if ('result' in response && response['result'] !== undefined) {
      return response['result'] as T;
    }
    if ('Result' in response && response['Result'] !== undefined) {
      return response['Result'] as T;
    }
    if ('payload' in response && response['payload'] !== undefined) {
      return response['payload'] as T;
    }
    if ('Payload' in response && response['Payload'] !== undefined) {
      return response['Payload'] as T;
    }
    if ('value' in response && response['value'] !== undefined) {
      return response['value'] as T;
    }
    if ('Value' in response && response['Value'] !== undefined) {
      return response['Value'] as T;
    }

    return response as T;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
