-- WeeklyLanding: ajustes base para Wallet / MFA / Stripe
-- Ejecutar primero en ambiente de pruebas.

-- 1) Backfill de MFA para usuarios que ya tienen activacion persistida
--    pero el flag quedo en 0.
UPDATE ft_the_usuario
SET
  mfa_enabled = 1,
  mfa_enabled_at = COALESCE(mfa_enabled_at, NOW())
WHERE COALESCE(mfa_enabled, 0) = 0
  AND mfa_secret IS NOT NULL
  AND TRIM(mfa_secret) <> ''
  AND mfa_enabled_at IS NOT NULL;

-- 2) Auditoria: usuarios con Stripe vinculado en ft_the_usuario
--    pero sin fila sincronizada en ft_the_usuario_tarjeta.
SELECT
  u.id_usuario,
  u.correo,
  u.stripe_customer_id,
  u.stripe_payment_method_id
FROM ft_the_usuario AS u
LEFT JOIN ft_the_usuario_tarjeta AS t
  ON t.id_usuario = u.id_usuario
 AND t.id_metodo_pago_stripe = u.stripe_payment_method_id
WHERE COALESCE(u.stripe_customer_id, '') <> ''
  AND COALESCE(u.stripe_payment_method_id, '') <> ''
  AND t.id_usuario_tarjeta IS NULL;

-- 3) Plantilla para sincronizar una tarjeta cuando ya tengas la metadata real
--    desde Stripe (marca, ultimos4, mes y anio de expiracion).
--    No inventes esos valores: deben venir de Stripe o de tu webhook.
/*
INSERT INTO ft_the_usuario_tarjeta (
  id_usuario,
  id_cliente_stripe,
  id_metodo_pago_stripe,
  marca_tarjeta,
  ultimos_4_digitos,
  mes_expiracion,
  anio_expiracion,
  es_predeterminada,
  estado_tarjeta,
  fecha_registro,
  fecha_actualizacion
)
VALUES (
  1,
  'cus_Twu5ZIUJO2EIps',
  'pm_1TBpbJAU2zlGvsy7FsaoHmix',
  'visa',
  '1111',
  2,
  2028,
  1,
  'activa',
  NOW(),
  NOW()
);
*/

-- 4) Validacion final sugerida para el usuario 1.
SELECT
  id_usuario,
  correo,
  stripe_customer_id,
  stripe_payment_method_id,
  mfa_enabled,
  mfa_secret,
  mfa_enabled_at
FROM ft_the_usuario
WHERE id_usuario = 1;

SELECT *
FROM ft_the_usuario_tarjeta
WHERE id_usuario = 1;
