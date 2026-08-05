<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15">
    <p class="text-morado text-base lg:text-xl font-semibold">
      {{ sent
        ? 'Te enviamos un correo electrónico con un link para que puedas acceder al detalle de tu viaje.'
        : 'Iniciá sesión para ver tu itinerario, vouchers y contactos en cualquier momento de tu viaje.' }}
    </p>

    <template v-if="sent">
      <div class="w-full flex flex-col gap-6 md:gap-8 mt-6">
        <p class="text-morado text-sm lg:text-base font-medium">
          Si no recibiste el correo podés volverlo a intentar en
          <span class="font-inter text-coral font-medium tabular-nums">{{ countdown }}</span>
        </p>

        <ButtonPrimary :disabled="remaining > 0 || loading" @click="submit">
          Volver a enviar
        </ButtonPrimary>

        <p v-if="error" role="alert" class="text-error text-sm">{{ error }}</p>
      </div>
    </template>

    <form v-else class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15" @submit.prevent="submit">
      <FormTextField v-model="email" label="Correo electrónico" type="email"
        icon="material-symbols:mail-outline-rounded" placeholder="Ingresá aquí tu email" autocomplete="email" required
        :error="error" />

      <ButtonPrimary type="submit" :disabled="loading">
        {{ loading ? 'Enviando…' : 'Ingresar' }}
      </ButtonPrimary>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

const RESEND_SECONDS = 60

const { requestMagicLink } = useAuth()

const email = ref('')
const sent = ref(false)
const error = ref('')
const loading = ref(false)
const remaining = ref(0)

let timer = null

const countdown = computed(() => {
  const m = String(Math.floor(remaining.value / 60)).padStart(2, '0')
  const s = String(remaining.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

function startCountdown() {
  remaining.value = RESEND_SECONDS
  clearInterval(timer)
  timer = setInterval(() => {
    remaining.value--
    if (remaining.value <= 0) clearInterval(timer)
  }, 1000)
}

async function submit() {
  if (loading.value || remaining.value > 0) return

  error.value = ''
  loading.value = true

  try {
    await requestMagicLink(email.value)
    sent.value = true
    startCountdown()
  } catch {
    error.value = 'No se pudo enviar el enlace. Probá de nuevo.'
  } finally {
    loading.value = false
  }
}

onBeforeUnmount(() => clearInterval(timer))
</script>
