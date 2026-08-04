<template>
  <div class="min-h-dvh flex bg-white">
    <DefaultSidebar :name="name" :links="links" @logout="signOut" />

    <div class="min-w-0 flex-1 flex flex-col">
      <DefaultHeader v-if="!links.length" :name="name" @logout="signOut" />

      <main class="flex-1">
        <slot />
      </main>

      <DefaultNav v-if="links.length" :links="links" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { name, loadName, signOut } = useSession()

onMounted(loadName)

const links = computed(() => {
  const id = route.params.id
  if (!id) return []

  return [
    { to: `/reservas/${id}`, label: 'Detalle', icon: 'material-symbols:location-on-outline-rounded' },
    { to: `/reservas/${id}/pasajeros`, label: 'Pasajeros', icon: 'material-symbols:groups-outline-rounded' },
    { to: `/reservas/${id}/hoteles`, label: 'Hoteles', icon: 'material-symbols:bed-outline-rounded' },
    { to: `/reservas/${id}/documentos`, label: 'Documentos', icon: 'material-symbols:description-outline-rounded' },
    { to: `/reservas/${id}/contacto`, label: 'Contacto', icon: 'material-symbols:call-outline-rounded' }
  ]
})
</script>
