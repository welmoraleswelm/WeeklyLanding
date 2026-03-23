# Registrar ruta /support

Agrega una ruta lazy en tu router principal (por ejemplo en `src/app/app.routes.ts`) para registrar `/support`.

Ejemplo (agregar dentro del array de rutas):

```ts
{
  path: 'support',
  loadChildren: () => import('./pages/support/support.routes').then(m => m.SUPPORT_ROUTES),
  title: 'Support Center',
}
```

Coloca la ruta en la sección de páginas (cerca de otras rutas como `/profile-management`).
