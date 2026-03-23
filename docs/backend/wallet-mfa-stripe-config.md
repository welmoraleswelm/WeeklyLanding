# Wallet, MFA y Stripe

## Frontend

- Wallet ya no usa `idUsuario = 1` como fallback.
- MFA en wallet ahora acepta respuestas del backend en formato objeto o arreglo.
- MFA se muestra como activo cuando el backend reporte `enabled` o al menos `configured`.

## Backend

- `UsuarioWeb/Mfa/ConfirmarActivacion` debe actualizar `ft_the_usuario.mfa_enabled = 1` y `mfa_enabled_at`.
- `UsuarioWeb/Mfa/ObtenerEstado` debe devolver, por usuario:
  - `mfa_enabled` o `mfaHabilitadoDTO`
  - `mfa_secret` o `mfaConfiguradoDTO` cuando aplique
- `UsuarioWeb/Mfa/ObtenerSesionesActivas` debe filtrar por `id_usuario`.
- `StripeUsuarioWeb/ListarMetodosPagoUsuario` debe hacer una de estas dos cosas:
  - consultar Stripe directo usando `stripe_customer_id`, o
  - devolver la data sincronizada en `ft_the_usuario_tarjeta`

## Base de Datos

- Si un usuario ya completo MFA, `mfa_enabled` no debe quedarse en `0`.
- Si un usuario tiene `stripe_customer_id` y `stripe_payment_method_id`, el backend debe sincronizar `ft_the_usuario_tarjeta` o consultar Stripe directo.
- El archivo [wallet_mfa_stripe_backfill.sql](/c:/Users/willi/Documents/Weekly/WeeklyLanding/docs/database/wallet_mfa_stripe_backfill.sql) deja:
  - backfill de MFA para usuarios ya configurados
  - auditoria de usuarios Stripe sin tarjeta local sincronizada
  - plantilla de insert para una tarjeta cuando ya tengas metadata real
