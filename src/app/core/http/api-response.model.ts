export interface GenericApiResponse<T> {
  data?: T;
  result?: T;
  payload?: T;
  value?: T;
  message?: string;
  success?: boolean;
  statusCode?: number;
}

export type ApiResponse<T> = T | GenericApiResponse<T>;

