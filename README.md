# App Reservas — Mi gestión (Tour Experto)

Webapp para clientes: login por magic-link (solo email) y consulta de reservas.
Cascarón inicial para que back vaya conectando endpoints. La maqueta fina llega
después con el Figma — por ahora las pantallas son precarias a propósito.

## Stack

Nuxt 4 · Vue 3 · Tailwind · pnpm. Mismo patrón que WebTEX / CmsTEX.

## Arquitectura

Repo full-stack compartido (como CmsTEX): front y back sobre el mismo repo.

El front consume endpoints relativos `/api/*` (`app/composables/useReservas.ts`,
páginas de auth). **`server/` está vacío a propósito**: lo implementa back, con
el diseño que prefiera. Ver [`server/README.md`](server/README.md) para la lista
de endpoints que el front ya espera y el patrón TEX de referencia.

## Setup

```bash
pnpm install
cp example.env develop.env   # completar BACKEND_TOKEN
pnpm dev
```

## Pendiente (post-Figma / back)

- Back: implementar `server/` (ver `server/README.md`).
- Esquema de campos de la reserva (hoy se renderiza crudo).
- Definir si la sesión es cookie httpOnly o JWT.
- Middleware de auth (redirect a `/login`) — cuando esté el esquema de sesión.
- Maquetar login, listado y detalle.
