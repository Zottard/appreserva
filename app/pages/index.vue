<template>
  <div class="w-full max-w-300 flex flex-col gap-6 px-5 lg:px-12 pt-3 lg:pt-8 pb-6 lg:pb-10">
    <div class="flex flex-col gap-1">
      <h1 class="text-morado text-[22px] lg:text-4xl font-bold text-balance">Mis viajes</h1>
      <p v-if="subtitle" class="text-violeta-texto text-sm font-medium">{{ subtitle }}</p>
    </div>

    <State
      :pending="pending"
      :error="error"
      :empty="!reservas?.length"
      :rows="2"
      error-text="No se pudieron cargar tus viajes."
      empty-text="Todavía no tenés viajes reservados."
    >
      <ul class="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
        <li v-for="reserva in reservas" :key="reserva.id">
          <ViajeCard :reserva="reserva" />
        </li>
      </ul>
    </State>

    <Help />
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const { data: reservas, pending, error } = useReservas()

const subtitle = computed(() => {
  const total = reservas.value?.length || 0
  if (!total) return ''
  return total === 1 ? '1 reserva activa' : `${total} reservas activas`
})
</script>
