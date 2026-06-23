<template>
  <main class="max-w-2xl flex flex-col gap-4 mx-auto p-6">
    <NuxtLink to="/" class="text-primary text-sm">← Volver</NuxtLink>

    <div v-if="pendingReserva" class="h-40 bg-gray-light rounded-lg" aria-hidden="true" />
    <p v-else-if="errorReserva" role="alert" class="text-error text-pretty">
      No se pudo cargar la reserva.
    </p>

    <template v-else>
      <h1 class="text-secondary text-2xl font-bold text-balance">{{ reserva.nombreprod }}</h1>

      <nav class="flex flex-wrap gap-2 border-b border-gray-mid pb-2">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="text-sm rounded-lg px-3 py-1.5"
          :class="tab === t.key ? 'bg-primary text-light' : 'text-gray-dark'"
          @click="selectTab(t.key)"
        >
          {{ t.label }}
        </button>
      </nav>

      <div v-if="tab === 'overview'" class="flex flex-col gap-2">
        <p><strong>Estado:</strong> {{ reserva.estado }}</p>
        <p><strong>Fechas:</strong> {{ reserva.fecha_salida }} → {{ reserva.fecha_regreso }}</p>
        <p><strong>Pasajeros:</strong> {{ reserva.cant_pasajeros }}</p>
        <p><strong>Duración:</strong> {{ reserva.duration_days }} días / {{ reserva.duration_nights }} noches</p>
        <p><strong>Desde:</strong> {{ reserva.start_city_nombre }} <strong>Hasta:</strong> {{ reserva.end_city_nombre }}</p>
        <p v-if="reserva.included"><strong>Incluye:</strong> {{ reserva.included }}</p>
        <p v-if="reserva.not_included"><strong>No incluye:</strong> {{ reserva.not_included }}</p>
      </div>

      <TabList v-else-if="tab === 'itinerario'" :pending="itinerario.pending.value" :error="itinerario.error.value">
        <ol v-if="itinerario.data.value?.length" class="flex flex-col gap-3">
          <li v-for="d in itinerario.data.value" :key="d.nro_dia">
            <p class="font-semibold text-dark">Día {{ d.nro_dia }} — {{ d.titulo }}</p>
            <p class="text-sm text-gray-dark text-pretty">{{ d.texto }}</p>
          </li>
        </ol>
        <p v-else class="text-gray-dark">Sin itinerario.</p>
      </TabList>

      <TabList v-else-if="tab === 'pasajeros'" :pending="pasajeros.pending.value" :error="pasajeros.error.value">
        <ul v-if="pasajeros.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(p, i) in pasajeros.data.value" :key="i" class="border border-gray-mid rounded-lg p-3">
            <p class="font-semibold text-dark">{{ p.nombre }} {{ p.apellido }} <span class="text-xs text-gray-dark uppercase">({{ p.tipo }})</span></p>
            <p class="text-sm text-gray-dark">DNI {{ p.dni }} · Pasaporte {{ p.nro_pasaporte }}</p>
            <p class="text-sm text-gray-dark">{{ p.nacionalidad }} · {{ p.genero }} · {{ p.fecha_nacimiento }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin pasajeros.</p>
      </TabList>

      <TabList v-else-if="tab === 'hoteles'" :pending="hoteles.pending.value" :error="hoteles.error.value">
        <ul v-if="hoteles.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(h, i) in hoteles.data.value" :key="i" class="border border-gray-mid rounded-lg p-3">
            <p class="font-semibold text-dark">{{ h.nombre }} <span class="text-xs text-gray-dark">({{ h.categoria }})</span></p>
            <p class="text-sm text-gray-dark">{{ h.ciudad }} · {{ h.checkin }} → {{ h.checkout }} · {{ h.noches }} noches</p>
            <p class="text-sm text-gray-dark">Confirmación: {{ h.cod_confirmacion }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin hoteles.</p>
      </TabList>

      <TabList v-else-if="tab === 'vouchers'" :pending="vouchers.pending.value" :error="vouchers.error.value">
        <ul v-if="vouchers.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(v, i) in vouchers.data.value" :key="i">
            <a :href="v.url_s3" target="_blank" class="text-primary text-sm">{{ v.nombre }} ({{ v.tipo }}, {{ v.size_kb }} KB)</a>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin vouchers.</p>
      </TabList>

      <TabList v-else-if="tab === 'contactos'" :pending="contactos.pending.value" :error="contactos.error.value">
        <ul v-if="contactos.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(c, i) in contactos.data.value" :key="i" class="border border-gray-mid rounded-lg p-3">
            <p class="font-semibold text-dark">{{ c.nombre }} <span class="text-xs text-gray-dark uppercase">({{ c.tipo }})</span></p>
            <p class="text-sm text-gray-dark">{{ c.ciudad }} · {{ c.telefono }} · {{ c.whatsapp }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin contactos.</p>
      </TabList>
    </template>
  </main>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const id = route.params.id

const { data: reserva, pending: pendingReserva, error: errorReserva } = useReserva(id)

const itinerario = useReservaItinerario(id)
const pasajeros = useReservaPasajeros(id)
const hoteles = useReservaHoteles(id)
const vouchers = useReservaVouchers(id)
const contactos = useReservaContactos(id)

const fetchers = { itinerario, pasajeros, hoteles, vouchers, contactos }
const loaded = new Set()

const tab = ref('overview')
const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'itinerario', label: 'Itinerario' },
  { key: 'pasajeros', label: 'Pasajeros' },
  { key: 'hoteles', label: 'Hoteles' },
  { key: 'vouchers', label: 'Vouchers' },
  { key: 'contactos', label: 'Contactos' }
]

function selectTab(key) {
  tab.value = key
  if (key !== 'overview' && !loaded.has(key)) {
    loaded.add(key)
    fetchers[key].execute()
  }
}
</script>
