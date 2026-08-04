<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="w-full flex items-center justify-center bg-magenta hover:bg-magenta-focused rounded-full text-white text-base font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta px-6 py-3.5"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    class="w-full flex items-center justify-center rounded-full text-base font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta px-6 py-3.5"
    :class="disabled
      ? 'bg-gris-claro-3 text-gris cursor-not-allowed'
      : 'bg-magenta hover:bg-magenta-focused text-white'"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  to: { type: [String, Object], default: null },
  type: { type: String, default: 'button' },
  disabled: Boolean
})
</script>
