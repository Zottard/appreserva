<template>
  <main class="max-w-2xl flex flex-col gap-4 mx-auto p-6">
    <h1 class="text-secondary text-2xl font-bold text-balance">Mis reservas</h1>

    <div v-if="pending" class="flex flex-col gap-3" aria-hidden="true">
      <div v-for="i in 3" :key="i" class="h-20 bg-gray-light rounded-lg" />
    </div>

    <p v-else-if="error" role="alert" class="text-error text-pretty">
      No se pudieron cargar las reservas.
    </p>

    <div v-else-if="!reservas?.length" class="flex flex-col items-start gap-3">
      <p class="text-gray-dark text-pretty">Todavía no tenés reservas.</p>
      <NuxtLink to="/login" class="text-primary text-sm">Volver al inicio</NuxtLink>
    </div>

    <ul v-else class="flex flex-col gap-3">
      <li v-for="r in reservas" :key="r.id">
        <NuxtLink
          :to="`/reservas/${r.id}`"
          class="block border border-gray-mid rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-4"
        >
          <pre class="text-xs whitespace-pre-wrap">{{ r }}</pre>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
const { data: reservas, pending, error } = useReservas()
</script>
