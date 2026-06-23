<template>
  <main class="max-w-md min-h-dvh flex flex-col justify-center gap-6 mx-auto p-6">
    <h1 class="text-secondary text-2xl font-bold text-balance">Mi gestión</h1>

    <p v-if="sent" class="text-dark text-pretty">
      Te enviamos un enlace de acceso a <strong>{{ email }}</strong>. Revisá tu correo.
    </p>

    <form v-else class="flex flex-col gap-4" @submit.prevent="submit">
      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-dark">Email</span>
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="w-full border border-gray-mid rounded-lg p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          placeholder="tu@email.com"
        >
      </label>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary rounded-lg text-light font-semibold disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-3"
      >
        {{ loading ? 'Enviando…' : 'Recibir enlace de acceso' }}
      </button>
      <p v-if="error" role="alert" class="text-error text-sm">{{ error }}</p>
    </form>
  </main>
</template>

<script setup>
const { requestMagicLink } = useAuth()

const email = ref('')
const sent = ref(false)
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await requestMagicLink(email.value)
    sent.value = true
  } catch {
    error.value = 'No se pudo enviar el enlace. Probá de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>
