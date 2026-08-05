<template>
  <component
    :is="to ? 'NuxtLink' : href ? 'a' : 'div'"
    :to="to"
    :href="href"
    class="w-full flex items-center gap-3 lg:gap-4 bg-gris-claro border border-violeta-2 rounded-[18px] shadow-card p-3 lg:p-4"
  >
    <div v-if="icon" class="shrink-0 flex items-center justify-center size-8.5 lg:size-12 bg-violeta rounded-[10px]">
      <Icon :name="icon" class="size-5! lg:size-6! text-white" />
    </div>

    <div class="min-w-0 flex flex-col gap-1">
      <p class="text-morado text-sm lg:text-base font-bold truncate">{{ title }}</p>
      <p v-if="subtitle" class="text-gris text-xs lg:text-sm font-medium truncate">{{ subtitle }}</p>
    </div>

    <div class="ml-auto shrink-0 flex items-center gap-2">
      <slot name="actions" />
    </div>
  </component>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  to: { type: String, default: '' },
  href: { type: String, default: '' }
})
</script>
