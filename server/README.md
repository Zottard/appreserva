# server/ — para back

Repo full-stack compartido (como CmsTEX): el front y back trabajan sobre el
mismo repo. El front ya está cableado a estos endpoints relativos vía
`app/composables/useReservas.ts` y las páginas de auth. Falta que back los
implemente acá, como prefiera.

## Endpoints que el front ya consume

| Método | Ruta | Lo usa | Espera devolver |
|---|---|---|---|
| `POST` | `/api/auth/request` | `pages/login.vue` | dispara el magic-link al email (body `{ email }`) |
| `GET`  | `/api/auth/verify?token=` | `pages/verify.vue` | valida el token del link y abre sesión (cookie/JWT, a definir) |
| `GET`  | `/api/reservas` | `pages/index.vue` | `Reserva[]` del usuario logueado |
| `GET`  | `/api/reservas/:id` | `pages/reservas/[id].vue` | una `Reserva` |

`Reserva` hoy es `{ id, ...resto }` (ver `composables/useReservas.ts`). Cuando
definan el esquema real, tipar ahí y avisar al front para maquetar.

## Config disponible

`nuxt.config.ts` ya expone:

- `runtimeConfig.backendToken` — server-only, desde `BACKEND_TOKEN` (env).
- `runtimeConfig.public.apiUrl` — desde `API_URL` (env).

Completar en `develop.env` (ver `example.env`).

## Patrón de referencia (TEX)

En WebTEX/CmsTEX el server de Nuxt actúa de BFF: recibe del cliente y reenvía al
back agregando `headers: { token: backendToken }`. Ejemplo de cómo se ve un
endpoint con ese patrón:

```ts
// server/api/reservas/index.get.ts
export default defineEventHandler((event) => {
  const { backendToken } = useRuntimeConfig(event)
  const { apiUrl } = useRuntimeConfig(event).public
  return $fetch(`${apiUrl}reservas`, { headers: { token: backendToken } })
})
```

Pero el diseño (proxy vs lógica propia, cookie vs JWT, etc.) lo definen ustedes.
