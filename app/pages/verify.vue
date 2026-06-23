<template>
  <main class="max-w-md min-h-dvh flex flex-col justify-center gap-4 mx-auto p-6">
    <template v-if="error">
      <p role="alert" class="text-error text-pretty">{{ error }}</p>
      <NuxtLink to="/login" class="text-primary text-sm">Volver a ingresar</NuxtLink>
    </template>
    <p v-else class="text-gray-dark">Verificando acceso…</p>
  </main>
</template>

<script setup>
const { verify } = useAuth()
const route = useRoute()
const error = ref('')

const token = route.query.token
if (!token) {
  error.value = 'Enlace inválido.'
} else {
  try {
    await verify(token)
    await navigateTo('/')
  } catch {
    error.value = 'El enlace expiró o no es válido.'
  }
}
</script>
