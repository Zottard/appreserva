# Pedido a back

Dos cosas: el **agente de viajes** (nuevo) y confirmar que **`/auth/session`**
existe en el back real.

---

# 1. Agente de viajes en la reserva

## Qué necesitamos

El **agente de viajes de Tour Experto asignado a la reserva**: nombre y mail.

La pantalla `/contacto` de la PWA muestra abajo un bloque "Datos de Tour Experto"
con el agente, el WhatsApp de mensajes y los teléfonos por país. Los teléfonos y
el WhatsApp los tenemos hardcodeados (son fijos de la agencia), pero el agente
cambia por reserva y hoy no lo recibimos.

Hoy la primera línea de ese bloque no se renderiza.

## Qué revisamos antes de pedirlo

- `GET /reservas/{id}` — no trae ningún campo de agente/asesor/vendedor.
- `GET /reservas/{id}/contactos` — trae los **operadores del tour** (Europamundo,
  Special Tours, hoteles), que es otra cosa: son los mayoristas para emergencias
  en destino, no la persona de Tour Experto que le vendió el viaje al cliente.

## Forma que espera el front

En el objeto de `GET /reservas/{id}`:

```json
{
  "id": 1,
  "nombreprod": "Europa Clásica",
  "agente": {
    "nombre": "Francini",
    "email": "francini@tourexperto.com"
  }
}
```

Se renderiza así:

```
Francini, tu agente de viajes:
francini@tourexperto.com
```

## Notas

- Si el campo se llama distinto del lado de ustedes (`vendedor`, `asesor`,
  `ejecutivo_cuenta`), no hay problema — decinos el nombre y lo mapeamos. Lo que
  importa es que lleguen **nombre y mail**.
- Si prefieren exponerlo en `/contactos` en vez de en la reserva, también sirve;
  necesitaríamos que venga separado de los operadores para no mezclarlos en la
  misma lista.
- El front ya tolera que no llegue: si `agente` es `null` o falta, esa línea se
  omite y el resto del bloque funciona. **No es bloqueante para publicar.**
- Si el mail no está disponible pero sí el nombre, también sirve — se muestra el
  nombre solo.

---

# 2. Confirmar `GET /auth/session`

El front lo usa en tres lugares: el middleware que protege las rutas, la
detección de sesión de `/instalar`, y para mostrar el nombre en el header.

Devuelve el usuario logueado, y **401 si no hay sesión válida**:

```json
{ "nombre": "Lucía Fernández", "email": "lucia.fernandez@gmail.com" }
```

**Está en nuestro mock, pero no pudimos verificar que exista en el back real** (no
tenemos `BACKEND_TOKEN` para consultar dev). Necesitamos saber:

1. ¿Existe `/auth/session`? Si se llama distinto, decinos el nombre.
2. ¿Devuelve **401** sin sesión? Vimos que dev responde **403** cuando el token
   del server está mal — el front hoy trata los dos como "no autenticado", pero
   conviene que 401 sea el de sesión inválida.

Si no existe, avisen: volvemos a detectar la sesión pegándole a `/reservas` y
descartando la respuesta, que es lo que hacíamos antes (funciona, pero se trae
toda la lista de reservas al pedo en cada navegación).
