# Pedido a back

Tres cosas: el **mail del agente**, la **categoría hotelera**, y confirmar que
**`/auth/session`** existe en el back real.

Pasajeros y vouchers ya llegan bien — gracias.

---

# 1. Agente de viajes en la reserva

## Estado: falta sólo el mail

Ya llega **`reserva.vendedor`** con el nombre y se ve OK en pantalla. **Falta el
mail**, que es lo único que bloquea la línea de contacto del agente.

El front ya lo acepta en cualquiera de estas formas, la que les quede más cómoda:

```json
{ "vendedor": "Francini", "vendedor_email": "francini@tourexperto.com" }
```

```json
{ "agente": { "nombre": "Francini", "email": "francini@tourexperto.com" } }
```

No hace falta que cambien `vendedor` de string a objeto si les complica: con
agregar `vendedor_email` al lado alcanza.

La pantalla `/contacto` de la PWA muestra abajo un bloque "Datos de Tour Experto"
con el agente, el WhatsApp de mensajes y los teléfonos por país. Los teléfonos y
el WhatsApp los tenemos hardcodeados (son fijos de la agencia), pero el agente
cambia por reserva.

---

# 1.b Categoría hotelera

No la estamos recibiendo. En `GET /reservas/{id}` el front busca
**`categoria_hoteleria`** (y tolera `categoria_hotelera` o `categoria`), pero no
viene ninguno, así que la tarjeta "Hotelería" del detalle no se renderiza.

Es el dato tipo `"Económica (Hoteles 3*/4*)"` / `"Superior (Hoteles 5*)"`.

¿Existe del lado de ustedes? Si se llama distinto, decinos el nombre y lo
mapeamos.

## Notas

- El agente **no es lo mismo** que `GET /reservas/{id}/contactos`: ahí vienen los
  **operadores del tour** (Europamundo, Special Tours, hoteles), los mayoristas
  para emergencias en destino. El agente es la persona de Tour Experto que le
  vendió el viaje al cliente.
- Con el mail, se renderiza así:

```
Francini, tu agente de viajes:
francini@tourexperto.com
```

- El front ya tolera que el mail no llegue: hoy se muestra el nombre solo y el
  resto del bloque funciona. **No es bloqueante para publicar.**

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
