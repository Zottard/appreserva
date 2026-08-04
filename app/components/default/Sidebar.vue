<template>
  <aside class="w-68.5 shrink-0 h-dvh hidden lg:flex flex-col sticky top-0 bg-gris-claro-2 p-8">
    <div class="flex items-center gap-3">
      <Avatar :name="name" size="lg" />
      <div class="min-w-0 flex flex-col">
        <span class="text-violeta-texto text-xs font-medium">Hola,</span>
        <span class="text-morado text-base font-bold truncate">{{ name }}</span>
      </div>
    </div>

    <nav v-if="links.length" class="flex flex-col gap-1 pt-10">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-4 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta px-6 py-3.5"
        :class="route.path === link.to
          ? 'bg-magenta-switch text-magenta font-bold'
          : 'text-gris-texto hover:bg-gris-claro-3/50'"
      >
        <Icon :name="link.icon" />
        {{ link.label }}
      </NuxtLink>
    </nav>

    <button
      type="button"
      class="w-full flex items-center justify-center gap-3 mt-auto bg-gris-texto hover:bg-morado rounded-lg text-white text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta px-6 py-3.5"
      @click="$emit('logout')"
    >
      Cerrar sesión
      <Icon name="material-symbols:logout-rounded" />
    </button>
  </aside>
</template>

<script setup>
defineProps({
  name: { type: String, default: '' },
  links: { type: Array, default: () => [] }
})

defineEmits(['logout'])

const route = useRoute()
</script>
