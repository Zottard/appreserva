<template>
  <span class="w-full h-11 flex items-center justify-center gap-2 bg-gris-claro border border-violeta-2 rounded-lg text-morado-hover text-xs font-semibold text-center px-3">
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="label"
      :class="logo ? `${logoHeight} w-auto` : 'shrink-0 size-6'"
    />
    <Icon v-else-if="icon" :name="icon" size="24" class="shrink-0" />
    <template v-if="!logo">{{ label }}</template>
  </span>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  image: { type: String, default: '' },
  label: { type: String, required: true },
  logo: Boolean,
  logoHeight: { type: String, default: 'h-4' }
})
</script>
