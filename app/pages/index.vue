<template>
  <main class="max-w-2xl flex flex-col gap-4 mx-auto p-6">
    <div class="flex items-center justify-between">
      <h1 class="text-secondary text-2xl font-bold text-balance">Mis viajes</h1>
      <button class="text-gray-dark text-sm" @click="onLogout">Cerrar sesión</button>
    </div>

    <div v-if="pending" class="flex flex-col gap-3" aria-hidden="true">
      <div v-for="i in 3" :key="i" class="h-20 bg-gray-light rounded-lg" />
    </div>

    <p v-else-if="error" role="alert" class="text-error text-pretty">
      No se pudieron cargar las reservas.
    </p>

    <div v-else-if="!reservas?.length" class="flex flex-col items-start gap-3">
      <p class="text-gray-dark text-pretty">Todavía no tenés viajes.</p>
    </div>

    <ul v-else class="flex flex-col gap-3">
      <li v-for="r in reservas" :key="r.id">
        <NuxtLink
          :to="`/reservas/${r.id}`"
          class="flex gap-4 border border-gray-mid rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-4"
        >
          <img v-if="r.img" :src="imgSrc(r.img, imgBase)" :alt="r.nombreprod" class="w-20 h-20 object-cover rounded-lg" />
          <div class="flex flex-col gap-1">
            <p class="font-semibold text-dark">{{ r.nombreprod }}</p>
            <p class="text-sm text-gray-dark">{{ formatFecha(r.fecha_salida) }} → {{ formatFecha(r.fecha_regreso) }}</p>
            <p class="text-xs text-secondary uppercase">{{ r.estado }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const { public: { imgBase } } = useRuntimeConfig()
const { logout } = useAuth()
const { data: reservas, pending, error } = useReservas()

watch(reservas, (val) => {
  if (val?.length) {
    console.log('[DEBUG img] primer reserva:', val[0].img)
    console.log('[DEBUG img] todas:', val.map(r => ({ id: r.id, img: r.img })))
  }
})

async function onLogout() {
  await logout()
  await navigateTo('/login')
}
</script>
