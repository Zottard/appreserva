<template>
  <div class="w-full flex flex-col gap-6">
    <template v-if="error">
      <p role="alert" class="text-error text-sm">{{ error }}</p>
      <ButtonPrimary to="/login">
        Volver a ingresar
      </ButtonPrimary>
    </template>

    <p v-else class="text-gris text-sm">Verificando acceso…</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

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
