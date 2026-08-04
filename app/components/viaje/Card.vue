<template>
  <NuxtLink
    :to="`/reservas/${reserva.id}`"
    class="w-full flex flex-col rounded-[18px] shadow-card overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
  >
    <div class="w-full h-40 flex flex-col justify-between relative bg-gris-claro-2 p-3">
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="reserva.nombreprod"
        class="w-full h-full absolute inset-0 object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-linear-to-b from-[#666666]/40 to-black/40" aria-hidden="true" />

      <ReservaStatusPill :status="reserva.estado" class="relative" />

      <div class="relative flex flex-col gap-0.5">
        <p class="text-white text-xl font-bold text-balance">{{ reserva.nombreprod }}</p>
        <p class="font-inter text-white text-xs font-medium">{{ dateRange }}</p>
      </div>
    </div>

    <div class="w-full flex items-center justify-between gap-3 bg-gris-claro px-5 py-3">
      <span v-if="duration" class="flex items-center gap-2 font-inter text-gris text-xs font-medium">
        <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" size="16" class="shrink-0 text-morado" />
        {{ duration }}
      </span>

      <span v-if="reserva.cant_pasajeros" class="flex items-center gap-2 font-inter text-gris text-xs font-medium">
        <Icon name="material-symbols:groups-outline-rounded" size="16" class="shrink-0 text-morado" />
        {{ reserva.cant_pasajeros }} pax
      </span>

      <Icon name="material-symbols:keyboard-arrow-right-rounded" size="16" class="shrink-0 text-morado" />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  reserva: { type: Object, required: true }
})

const { imgSrc } = useImageUrl()

const image = computed(() => imgSrc(props.reserva.img, props.reserva.main_image))

const dateRange = computed(() => {
  const from = formatShortDate(props.reserva.fecha_salida)
  const to = formatShortDate(props.reserva.fecha_regreso)
  return from && to ? `${from} – ${to}` : from || to
})

const duration = computed(() => {
  const { duration_days: days, duration_nights: nights } = props.reserva
  if (!days) return ''
  return nights ? `${days} días - ${nights} noches` : `${days} días`
})
</script>
