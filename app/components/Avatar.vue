<template>
  <div
    class="shrink-0 flex items-center justify-center bg-violeta-2 rounded-full"
    :class="{
      'size-13': size === 'xl',
      'size-10 lg:size-11': size === 'lg',
      'size-9': size !== 'xl' && size !== 'lg'
    }"
  >
    <p
      class="text-morado text-center font-bold"
      :class="{
        'text-xl': size === 'xl',
        'text-base lg:text-xl': size === 'lg',
        'text-xs': size !== 'xl' && size !== 'lg'
      }"
    >
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
