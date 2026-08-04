<template>
  <div
    class="shrink-0 flex items-center justify-center bg-violeta-2 rounded-full"
    :class="size === 'lg' ? 'size-10' : 'size-9'"
  >
    <p class="text-morado text-center font-bold" :class="size === 'lg' ? 'text-base' : 'text-xs'">
      {{ initials }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  size: { type: String, default: 'md' }
})

const initials = computed(() =>
  props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
)
</script>
