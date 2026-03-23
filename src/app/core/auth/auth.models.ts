export interface SignInRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface VerifyMfaRequest {
  challengeToken: string;
  codigo: string;
}

export interface MfaStatusRequest {
  idUsuario: number;
}

export interface StartMfaSetupRequest {
  idUsuario: number;
}

export interface ConfirmMfaSetupRequest {
  idUsuario: number;
  setupToken: string;
  codigo: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  telefono?: string;
  notificacionesActivas?: boolean;
}

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  user?: AuthUser;
}

export interface MfaChallenge {
  requiresMfa: true;
  challengeToken: string;
  userId: string;
  email?: string;
}

export interface MfaStatus {
  enabled: boolean;
  configured: boolean;
}

export interface MfaActiveSession {
  id: string;
  device: string;
  location: string;
  lastActiveAt: string;
}

export interface MfaSetup {
  userId: number;
  setupToken: string;
  manualEntryKey: string;
  otpAuthUri: string;
  issuer: string;
  accountName: string;
}

export interface SignInSuccess {
  requiresMfa: false;
  session: AuthSession;
}

export type SignInResult = SignInSuccess | MfaChallenge;

export interface SignUpResult {
  message: string;
  requiresEmailVerification?: boolean;
}
