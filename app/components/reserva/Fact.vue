<template>
  <div class="w-full flex flex-col gap-1.5 bg-white border border-violeta-2 rounded-xl p-3">
    <span class="text-gris text-xs font-bold">{{ label }}</span>
    <span class="font-inter text-morado text-base font-bold">{{ value }}</span>
    <span v-if="hint" class="text-gris text-xs font-medium">{{ hint }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: '—' },
  hint: { type: String, default: '' }
})
</script>
