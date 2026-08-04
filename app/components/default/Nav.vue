<template>
  <nav class="w-full flex lg:hidden items-center justify-between gap-1 sticky bottom-0 z-10 bg-gris-claro border-t border-violeta-2 rounded-t-[18px] shadow-nav px-5 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="h-11 flex flex-1 items-center justify-center rounded-[10px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta py-2"
      :class="route.path === link.to ? 'bg-magenta-switch text-magenta' : 'text-gris-texto'"
      :aria-label="link.label"
    >
      <Icon :name="link.icon" size="24" />
    </NuxtLink>
  </nav>
</template>

<script setup>
defineProps({
  links: { type: Array, default: () => [] }
})

const route = useRoute()
</script>
