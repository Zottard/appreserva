<template>
  <div v-if="pending" class="flex flex-col gap-3" aria-hidden="true">
    <div v-for="i in rows" :key="i" class="h-16 bg-gris-claro-2 rounded-xl animate-pulse" />
  </div>

  <p v-else-if="error" role="alert" class="text-error text-sm">
    {{ errorText }}
  </p>

  <p v-else-if="empty" class="text-gris text-sm">
    {{ emptyText }}
  </p>

  <slot v-else />
</template>

<script setup>
defineProps({
  pending: Boolean,
  error: { type: [Object, Error, null], default: null },
  empty: Boolean,
  rows: { type: Number, default: 3 },
  errorText: { type: String, default: 'No se pudo cargar la información.' },
  emptyText: { type: String, default: 'No hay información para mostrar.' }
})
</script>
