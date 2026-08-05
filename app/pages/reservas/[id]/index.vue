<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <p v-if="reserva.descripcion || reserva.description" class="text-violeta-texto text-xs lg:text-base font-medium">
      {{ reserva.descripcion || reserva.description }}
    </p>

    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
      <ReservaFact
        label="Inicia"
        :value="formatDayMonth(reserva.fecha_salida)"
        :hint="reserva.start_city_nombre"
      />
      <ReservaFact
        label="Finaliza"
        :value="formatDayMonth(reserva.fecha_regreso)"
        :hint="reserva.end_city_nombre"
      />
      <ReservaFact
        label="Duración"
        :value="reserva.duration_days ? `${reserva.duration_days} días` : '—'"
        :hint="reserva.duration_nights ? `${reserva.duration_nights} noches` : ''"
      />
      <ReservaFact
        label="Pasajeros"
        :value="reserva.cant_pasajeros || '—'"
        :hint="reserva.cant_pasajeros ? `${reserva.cant_pasajeros} adultos` : ''"
      />
    </div>

    <section v-if="reserva.ciudades_recorrido?.length" class="w-full flex flex-col gap-3">
      <h2 class="text-morado text-xl lg:text-[28px] font-semibold">Recorre:</h2>
      <p class="text-violeta-texto text-xs lg:text-base font-medium">
        {{ reserva.ciudades_recorrido.join(', ') }}
      </p>
    </section>

    <section v-if="includes.length" class="w-full flex flex-col gap-3">
      <h2 class="text-morado text-xl lg:text-[28px] font-semibold">Tu tour incluye:</h2>
      <div class="w-full grid grid-cols-2 md:grid-cols-[repeat(auto-fill,136px)] lg:grid-cols-[repeat(auto-fill,175px)] gap-2">
        <ReservaChip
          v-for="item in includes"
          :key="item.label"
          :icon="item.icon"
          :image="item.image"
          :label="item.label"
        />

        <ReservaChip
          v-for="partner in PARTNERS"
          :key="partner.label"
          :image="partner.image"
          :label="partner.label"
          :logo-height="partner.height"
          logo
        />
      </div>
    </section>

    <section v-if="categories.length" class="w-full flex flex-col gap-3">
      <h2 class="text-morado text-xl lg:text-[28px] font-semibold">Categoría:</h2>
      <div class="w-full flex flex-col gap-3">
        <Row
          v-for="category in categories"
          :key="category.title"
          :icon="category.icon"
          :title="category.title"
          :subtitle="category.subtitle"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const INCLUDE_IMAGES = {
  traslados: '/images/incluye/traslados.svg',
  alojamiento: '/images/incluye/alojamiento.svg',
  comidas: '/images/incluye/comidas.svg',
  seguro: '/images/incluye/seguro.svg',
  datos: '/images/incluye/datos_moviles.svg',
  excursiones: '/images/incluye/excursiones.svg',
  guias: '/images/incluye/guias.svg'
}

const INCLUDE_ICONS = {
  aereo: 'material-symbols:airplane-ticket-outline-rounded'
}

const PARTNERS = [
  { label: 'Assist Card', image: '/images/incluye/assist_card.svg', height: 'h-5' },
  { label: 'Flexitour', image: '/images/incluye/flexitour.webp', height: 'h-4' }
]

const props = defineProps({
  reserva: { type: Object, required: true }
})

const includes = computed(() => {
  const raw = props.reserva.incluye || props.reserva.includes
  if (!Array.isArray(raw)) return []

  return raw.map((item) => {
    const label = typeof item === 'string' ? item : item.nombre || item.label || ''
    const normalized = label.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
    const imageKey = Object.keys(INCLUDE_IMAGES).find(k => normalized.includes(k))
    const iconKey = Object.keys(INCLUDE_ICONS).find(k => normalized.includes(k))
    return {
      label,
      image: imageKey ? INCLUDE_IMAGES[imageKey] : '',
      icon: iconKey ? INCLUDE_ICONS[iconKey] : ''
    }
  }).filter(item => item.label)
})

const categories = computed(() => {
  const list = []

  const hoteleria = props.reserva.categoria_hoteleria
    || props.reserva.categoria_hotelera
    || props.reserva.categoria

  if (hoteleria) {
    list.push({
      icon: 'material-symbols:bed-outline-rounded',
      title: 'Hotelería',
      subtitle: typeof hoteleria === 'string' ? hoteleria : hoteleria.nombre || hoteleria.descripcion
    })
  }

  if (props.reserva.tipo_salida) {
    list.push({
      icon: 'material-symbols:groups-outline-rounded',
      title: 'Salida',
      subtitle: props.reserva.tipo_salida
    })
  }

  return list
})
</script>
