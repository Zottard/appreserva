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

      <div v-if="tab === 'overview'" class="flex flex-col gap-3">
        <p><strong>Estado:</strong> {{ reserva.estado }}</p>
        <p><strong>Fechas:</strong> {{ formatFecha(reserva.fecha_salida) }} → {{ formatFecha(reserva.fecha_regreso) }}</p>
        <p><strong>Pasajeros:</strong> {{ reserva.cant_pasajeros }}</p>
        <p v-if="reserva.duration_days"><strong>Duración:</strong> {{ reserva.duration_days }} días / {{ reserva.duration_nights }} noches</p>
        <p v-if="reserva.start_city_nombre"><strong>Desde:</strong> {{ reserva.start_city_nombre }} <strong>Hasta:</strong> {{ reserva.end_city_nombre }}</p>
        <p v-if="reserva.ciudades_recorrido?.length"><strong>Recorre:</strong> {{ reserva.ciudades_recorrido.join(' · ') }}</p>
        <p v-if="reserva.tipo_salida"><strong>Tipo de salida:</strong> {{ reserva.tipo_salida }}</p>
        <p v-if="reserva.aereo_incluido !== null"><strong>Aéreo incluido:</strong> {{ reserva.aereo_incluido ? 'Sí' : 'No' }}</p>
        <p v-if="reserva.included"><strong>Incluye:</strong> <span v-html="reserva.included" /></p>
        <p v-if="reserva.not_included"><strong>No incluye:</strong> <span v-html="reserva.not_included" /></p>
        <div v-if="reserva.consejo_experto" class="border-l-4 border-primary pl-3 text-sm text-gray-dark">
          <p class="font-semibold text-dark mb-1">Consejo del experto</p>
          <p>{{ reserva.consejo_experto }}</p>
        </div>
      </div>

      <TabList v-else-if="tab === 'itinerario'" :pending="tabLoading.itinerario || itinerario.pending.value" :error="itinerario.error.value">
        <ol v-if="itinerario.data.value?.length" class="flex flex-col gap-3">
          <li v-for="d in itinerario.data.value" :key="d.nro_dia">
            <p class="font-semibold text-dark">Día {{ d.nro_dia }} — {{ d.titulo }}</p>
            <p class="text-sm text-gray-dark text-pretty">{{ d.texto }}</p>
          </li>
        </ol>
        <p v-else class="text-gray-dark">Sin itinerario.</p>
      </TabList>

      <TabList v-else-if="tab === 'pasajeros'" :pending="tabLoading.pasajeros || pasajeros.pending.value" :error="pasajeros.error.value">
        <ul v-if="pasajeros.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(p, i) in pasajeros.data.value" :key="i" class="border border-gray-mid rounded-lg p-3">
            <p class="font-semibold text-dark">{{ p.nombre }} {{ p.apellido }}</p>
            <p v-if="p.genero || p.fecha_nacimiento" class="text-sm text-gray-dark">
              {{ [p.genero, p.fecha_nacimiento].filter(Boolean).join(' · ') }}
            </p>
            <p v-if="p.nro_pasaporte" class="text-sm text-gray-dark">Pasaporte {{ p.nro_pasaporte }}</p>
            <p v-if="p.nacionalidad" class="text-sm text-gray-dark">{{ p.nacionalidad }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin pasajeros.</p>
      </TabList>

      <TabList v-else-if="tab === 'hoteles'" :pending="tabLoading.hoteles || hoteles.pending.value" :error="hoteles.error.value">
        <ul v-if="hoteles.data.value?.length" class="flex flex-col gap-4">
          <li v-for="(h, i) in hoteles.data.value" :key="i" class="flex flex-col gap-2">
            <p class="font-semibold text-dark">{{ h.ciudad }}</p>
            <div v-for="(alt, j) in h.alternativas" :key="j" class="border border-gray-mid rounded-lg p-3">
              <p class="text-sm font-medium text-dark">
                {{ alt.nombre }}
                <span v-if="alt.estrellas" class="text-xs text-gray-dark ml-1">{{ '★'.repeat(alt.estrellas) }}</span>
              </p>
              <p v-if="alt.direccion" class="text-xs text-gray-dark mt-1">{{ alt.direccion }}</p>
              <p class="text-xs text-gray-dark italic mt-1">previsto o similar</p>
            </div>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin hoteles.</p>
      </TabList>

      <TabList v-else-if="tab === 'vouchers'" :pending="tabLoading.vouchers || vouchers.pending.value" :error="vouchers.error.value">
        <ul v-if="vouchers.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(v, i) in vouchers.data.value" :key="i">
            <a :href="v.url_s3" target="_blank" class="text-primary text-sm">{{ v.nombre }} ({{ v.tipo }}, {{ v.size_kb }} KB)</a>
          </li>
        </ul>
        <p v-else class="text-gray-dark">Sin vouchers.</p>
      </TabList>

      <TabList v-else-if="tab === 'contactos'" :pending="tabLoading.contactos || contactos.pending.value" :error="contactos.error.value">
        <ul v-if="contactos.data.value?.length" class="flex flex-col gap-3">
          <li v-for="(c, i) in contactos.data.value" :key="i" class="border border-gray-mid rounded-lg p-3 flex flex-col gap-1">
            <p class="font-semibold text-dark">{{ c.nombre }} <span class="text-xs text-gray-dark uppercase">({{ c.tipo }})</span></p>
            <p v-if="c.ciudad" class="text-sm text-gray-dark">{{ c.ciudad }}</p>
            <a v-if="c.telefono" :href="`tel:${c.telefono}`" class="text-sm text-primary">{{ c.telefono }}</a>
            <a v-if="c.whatsapp" :href="`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`" target="_blank" class="text-sm text-primary">WhatsApp: {{ c.whatsapp }}</a>
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
const tabLoading = reactive({ itinerario: false, pasajeros: false, hoteles: false, vouchers: false, contactos: false })

const tab = ref('overview')
const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'itinerario', label: 'Itinerario' },
  { key: 'pasajeros', label: 'Pasajeros' },
  { key: 'hoteles', label: 'Hoteles' },
  { key: 'vouchers', label: 'Vouchers' },
  { key: 'contactos', label: 'Contactos' }
]

async function selectTab(key) {
  tab.value = key
  if (key !== 'overview' && !loaded.has(key)) {
    loaded.add(key)
    tabLoading[key] = true
    try {
      await fetchers[key].execute()
    } finally {
      tabLoading[key] = false
    }
  }
}
</script>
