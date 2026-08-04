<template>
  <span
    v-if="status"
    class="w-fit rounded-full text-xs font-medium px-2 py-1"
    :class="isActive ? 'bg-violeta-2 text-morado' : 'bg-gris-claro text-gris'"
  >
    <template v-for="(part, i) in parts" :key="i">
      <span v-if="part.number" class="font-inter font-normal">{{ part.text }}</span>
      <template v-else>{{ part.text }}</template>
    </template>
  </span>
</template>

<script setup>
const props = defineProps({
  status: { type: String, default: '' }
})

const isActive = computed(() => /en curso/i.test(props.status))

const parts = computed(() =>
  props.status
    .split(/(\d+)/)
    .filter(Boolean)
    .map(text => ({ text, number: /^\d+$/.test(text) }))
)
</script>
