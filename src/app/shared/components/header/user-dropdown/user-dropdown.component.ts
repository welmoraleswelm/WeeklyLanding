import { Component, inject } from '@angular/core';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownItemTwoComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component-two';
import { map } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ApiClientService } from '../../../../core/http/api-client.service';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { ApiRequestContextService } from '../../../../core/http/api-request-context.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports:[CommonModule, FormsModule, RouterModule, DropdownComponent, DropdownItemTwoComponent]
})
export class UserDropdownComponent {
  private readonly auth = inject(AuthService);
  private readonly api = inject(ApiClientService);
  private readonly requestContext = inject(ApiRequestContextService);

  isOpen = false;
  showEditProfileModal = false;
  isSavingProfile = false;
  profileError = '';
  profileSuccess = '';

  editProfileForm = {
    nombre: '',
    email: '',
    telefono: '',
    contrasenaHash: '',
    confirmarContrasena: '',
    notificacionesActivas: true,
  };
  private initialProfileSnapshot = '';

  readonly userFullName$ = this.auth.session$.pipe(
    map((session) => resolveUserName(session?.user?.name, session?.user?.email))
  );

  readonly userFirstName$ = this.userFullName$.pipe(
    map((name) => resolveFirstName(name))
  );

  readonly userEmail$ = this.auth.session$.pipe(
    map((session) => session?.user?.email?.trim() || '')
  );

  readonly userInitial$ = this.userFirstName$.pipe(
    map((name) => resolveInitial(name))
  );

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  signOut(): void {
    this.closeDropdown();
    this.auth.signOut(true);
  }

  openEditProfileModal(): void {
    this.closeDropdown();
    this.profileError = '';
    this.profileSuccess = '';

    const session = this.auth.getSessionSnapshot();
    this.editProfileForm = {
      nombre: (session?.user?.name || '').trim(),
      email: (session?.user?.email || '').trim(),
      telefono: '',
      contrasenaHash: '',
      confirmarContrasena: '',
      notificacionesActivas: true,
    };
    this.initialProfileSnapshot = this.buildProfileSnapshot(this.editProfileForm);
    this.showEditProfileModal = true;

    const idUsuario = this.requestContext.getUserIdOrNull();
    if (!idUsuario) return;

    this.api.post<unknown>(API_ENDPOINTS.auth.getProfile, { idUsuario }).subscribe({
      next: (response) => {
        const data = extractProfileData(response);
        if (!data) {
          this.profileError = 'No se pudieron cargar los datos del perfil.';
          return;
        }

        this.editProfileForm = {
          nombre: safeString(pickValue(data, ['nombreDTO', 'NombreDTO']), this.editProfileForm.nombre),
          email: safeString(pickValue(data, ['emailDTO', 'EmailDTO']), this.editProfileForm.email),
          telefono: safeString(pickValue(data, ['telefonoDTO', 'TelefonoDTO']), ''),
          contrasenaHash: '',
          confirmarContrasena: '',
          notificacionesActivas: toBool(
            pickValue(data, ['notificacionesActivasDTO', 'NotificacionesActivasDTO']),
            true
          ),
        };
        this.initialProfileSnapshot = this.buildProfileSnapshot(this.editProfileForm);
      },
      error: () => {
        this.profileError = 'No se pudo consultar el perfil.';
      }
    });
  }

  closeEditProfileModal(): void {
    if (this.isSavingProfile) return;
    if (this.hasUnsavedChanges()) {
      const shouldClose = window.confirm('Tienes cambios sin guardar. ¿Deseas descartarlos?');
      if (!shouldClose) return;
    }
    this.showEditProfileModal = false;
  }

  saveProfile(): void {
    if (this.isSavingProfile) return;

    const idUsuario = this.requestContext.getUserIdOrNull();
    if (!idUsuario) {
      this.profileError = 'No se encontró el usuario en sesión.';
      return;
    }

    const nombre = this.editProfileForm.nombre.trim();
    const email = this.editProfileForm.email.trim();
    const telefono = this.editProfileForm.telefono.trim();
    const contrasena = this.editProfileForm.contrasenaHash.trim();
    const confirmar = this.editProfileForm.confirmarContrasena.trim();

    if (!nombre || !email) {
      this.profileError = 'Nombre y correo son obligatorios.';
      return;
    }

    if (!this.hasUnsavedChanges()) {
      this.profileError = 'No hay cambios para guardar.';
      return;
    }

    if (contrasena || confirmar) {
      if (!contrasena || !confirmar) {
        this.profileError = 'Debes capturar y confirmar la nueva contraseña.';
        return;
      }
      if (contrasena !== confirmar) {
        this.profileError = 'Las contraseñas no coinciden.';
        return;
      }
    }

    const shouldSave = window.confirm('¿Deseas guardar los cambios de tu perfil?');
    if (!shouldSave) return;

    this.isSavingProfile = true;
    this.profileError = '';
    this.profileSuccess = '';

    this.api.post<unknown>(API_ENDPOINTS.auth.updateProfile, {
      idUsuario,
      nombre,
      email,
      telefono,
      contrasenaHash: contrasena,
      notificacionesActivas: this.editProfileForm.notificacionesActivas,
    }).subscribe({
      next: () => {
        this.auth.updateSessionUser({
          name: nombre,
          email,
        });
        this.profileSuccess = 'Perfil actualizado correctamente.';
        this.isSavingProfile = false;
        this.initialProfileSnapshot = this.buildProfileSnapshot({
          ...this.editProfileForm,
          nombre,
          email,
          telefono,
          contrasenaHash: '',
          confirmarContrasena: '',
        });
        this.showEditProfileModal = false;
      },
      error: () => {
        this.profileError = 'No se pudo actualizar el perfil.';
        this.isSavingProfile = false;
      }
    });
  }

  canSaveProfile(): boolean {
    return !this.isSavingProfile && this.hasUnsavedChanges();
  }

  private hasUnsavedChanges(): boolean {
    return this.buildProfileSnapshot(this.editProfileForm) !== this.initialProfileSnapshot;
  }

  private buildProfileSnapshot(form: {
    nombre: string;
    email: string;
    telefono: string;
    contrasenaHash: string;
    confirmarContrasena: string;
    notificacionesActivas: boolean;
  }): string {
    return JSON.stringify({
      nombre: (form.nombre || '').trim(),
      email: (form.email || '').trim(),
      telefono: (form.telefono || '').trim(),
      contrasenaHash: (form.contrasenaHash || '').trim(),
      confirmarContrasena: (form.confirmarContrasena || '').trim(),
      notificacionesActivas: !!form.notificacionesActivas,
    });
  }
}

type PerfilApiData = {
  nombreDTO?: string;
  emailDTO?: string;
  telefonoDTO?: string;
  notificacionesActivasDTO?: boolean | number | string;
};

function extractProfileData(response: unknown): PerfilApiData | null {
  const root = asRecord(response);
  if (!root) return null;

  // Caso 1: ApiClient ya desenvuelto y viene directo el DTO
  if (
    'NombreDTO' in root || 'nombreDTO' in root ||
    'EmailDTO' in root || 'emailDTO' in root ||
    'TelefonoDTO' in root || 'telefonoDTO' in root
  ) {
    return root as PerfilApiData;
  }

  const raw = root['data'] ?? root['Data'];
  if (Array.isArray(raw)) {
    return asRecord(raw[0]) as PerfilApiData | null;
  }
  const nested = asRecord(raw) as PerfilApiData | null;
  if (nested) return nested;

  return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null;
  return value as Record<string, unknown>;
}

function safeString(value: unknown, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function toBool(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === '1' || normalized === 'true') return true;
    if (normalized === '0' || normalized === 'false') return false;
  }
  return fallback;
}

function pickValue(source: Record<string, unknown>, keys: readonly string[]): unknown {
  for (const key of keys) {
    if (key in source) return source[key];
  }
  return undefined;
}

function resolveUserName(name?: string, email?: string): string {
  const cleanName = (name || '').trim();
  if (cleanName) return cleanName;

  const local = (email || '').split('@')[0]?.trim();
  if (local) return local;

  return 'Usuario';
}

function resolveInitial(name: string): string {
  const first = (name || '').trim().charAt(0);
  return first ? first.toUpperCase() : 'U';
}

function resolveFirstName(name: string): string {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts[0] : 'Usuario';
}
