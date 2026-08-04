<template>
  <div class="w-full h-45 lg:h-47 flex flex-col justify-between relative bg-gris-claro-2 overflow-hidden p-5 lg:px-8">
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="reserva.nombreprod"
      class="w-full h-full absolute inset-0 object-cover"
    />
    <div class="absolute inset-0 bg-linear-to-b from-[#666666]/40 to-black/40" aria-hidden="true" />

    <div class="flex items-center justify-between gap-3 relative">
      <ButtonIconAction
        to="/"
        icon="material-symbols:keyboard-arrow-left-rounded"
        label="Volver a mis viajes"
      />

      <div class="shrink-0 flex items-center gap-2">
        <ButtonIconAction
          to="/instalar"
          icon="material-symbols:info-outline-rounded"
          label="Cómo descargar la app"
        />
        <ButtonIconAction
          icon="material-symbols:logout-rounded"
          label="Cerrar sesión"
          @click="$emit('logout')"
        />
      </div>
    </div>

    <div class="flex flex-col items-start gap-2 relative">
      <ReservaStatusPill :status="reserva.estado" />
      <h1 class="text-white text-xl lg:text-3xl font-bold text-balance">
        {{ reserva.nombreprod }}
      </h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reserva: { type: Object, required: true }
})

defineEmits(['logout'])

const { imgSrc } = useImageUrl()

const image = computed(() => imgSrc(props.reserva.img, props.reserva.main_image))
</script>
