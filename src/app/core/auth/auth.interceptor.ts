import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { AuthService } from './auth.service';

const PUBLIC_ENDPOINTS = [API_ENDPOINTS.auth.signIn, API_ENDPOINTS.auth.signUp];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) => req.url.includes(endpoint));
  const hasUsableBearerToken = !!token && !token.startsWith('session-');

  const request = hasUsableBearerToken && !isPublicEndpoint
    ? req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
    : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isPublicEndpoint) {
        authService.signOut(false);
      }
      return throwError(() => error);
    })
  );
};
