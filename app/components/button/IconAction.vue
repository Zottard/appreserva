<template>
  <NuxtLink v-if="to" :to="to" :aria-label="label" :class="classes">
    <Icon :name="icon" size="20" />
  </NuxtLink>
  <button v-else type="button" :aria-label="label" :class="classes" @click="$emit('click')">
    <Icon :name="icon" size="20" />
  </button>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  to: { type: [String, Object], default: null }
})

defineEmits(['click'])

const classes = 'size-8 flex items-center justify-center shrink-0 bg-gris-claro hover:bg-gris-claro-2 border border-gris-claro-2 rounded-md text-gris transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta'
</script>
