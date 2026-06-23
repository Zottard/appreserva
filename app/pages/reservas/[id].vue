<template>
  <main class="max-w-2xl flex flex-col gap-4 mx-auto p-6">
    <NuxtLink to="/" class="text-primary text-sm">← Volver</NuxtLink>
    <h1 class="text-secondary text-2xl font-bold text-balance">Detalle de reserva</h1>

    <div v-if="pending" class="h-40 bg-gray-light rounded-lg" aria-hidden="true" />
    <p v-else-if="error" role="alert" class="text-error text-pretty">
      No se pudo cargar la reserva.
    </p>

    <pre v-else class="text-xs whitespace-pre-wrap border border-gray-mid rounded-lg p-4">{{ reserva }}</pre>
  </main>
</template>

<script setup>
const route = useRoute()
const { data: reserva, pending, error } = useReserva(route.params.id)
</script>
