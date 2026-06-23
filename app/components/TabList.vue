<template>
  <div>
    <div v-if="pending" class="h-20 bg-gray-light rounded-lg" aria-hidden="true" />
    <p v-else-if="error" role="alert" class="text-error text-pretty">No se pudo cargar.</p>
    <slot v-else />
  </div>
</template>

<script setup>
defineProps({
  pending: Boolean,
  error: [Object, Error, null]
})
</script>
