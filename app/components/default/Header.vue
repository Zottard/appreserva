<template>
  <header class="w-full flex lg:hidden items-center justify-between gap-3 bg-white border-b border-gris-claro-2 p-5">
    <div class="min-w-0 flex items-center gap-3">
      <Avatar :name="name" size="lg" />
      <div class="min-w-0 flex flex-col">
        <span class="text-violeta-texto text-xs font-medium">Hola,</span>
        <span class="text-morado text-base font-bold truncate">{{ name }}</span>
      </div>
    </div>

    <div class="shrink-0 flex items-center gap-2">
      <ButtonIconAction
        to="/instalar"
        icon="material-symbols:info-outline-rounded"
        label="Cómo descargar la app"
      />
      <ButtonIconAction
        icon="material-symbols:logout-rounded"
        label="Cerrar sesión"
        @click="$emit('logout')"
      />
    </div>
  </header>
</template>

<script setup>
defineProps({
  name: { type: String, default: '' }
})

defineEmits(['logout'])
</script>
