<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <div class="w-full flex items-center gap-3 lg:gap-4 bg-magenta-switch border border-magenta rounded-[18px] p-3">
      <span class="shrink-0 flex items-center justify-center size-10 lg:size-12 bg-magenta rounded-lg">
        <Icon name="material-symbols:shield-outline-rounded" class="size-6! text-white" />
      </span>
      <p class="text-morado text-xs lg:text-sm font-medium">
        En caso de emergencia, contactate primero con tu operador.
      </p>
    </div>

    <State
      :pending="pending"
      :error="error"
      :empty="!contactos?.length"
      error-text="No se pudieron cargar los contactos."
      empty-text="Todavía no hay contactos disponibles."
    >
      <ul class="w-full flex flex-col gap-3">
        <li v-for="(contacto, i) in contactos" :key="contacto.id || i">
          <Row :title="contacto.nombre" :subtitle="contacto.tipo || contacto.ciudad">
            <template #actions>
              <a
                v-if="contacto.whatsapp"
                :href="`https://wa.me/${onlyDigits(contacto.whatsapp)}`"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-center size-10 lg:size-12 bg-whatsapp hover:brightness-95 rounded-[10px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="`WhatsApp de ${contacto.nombre}`"
              >
                <NuxtImg src="/images/icons/whatsapp.svg" alt="" class="size-6" />
              </a>
              <a
                v-else-if="contacto.telefono"
                :href="`tel:${contacto.telefono}`"
                class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-[10px] text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="`Llamar a ${contacto.nombre}`"
              >
                <Icon name="material-symbols:phone-in-talk-outline-rounded" size="24" />
              </a>
            </template>
          </Row>
        </li>
      </ul>
    </State>

    <ReservaDatosTex :agente="reserva?.vendedor ? { nombre: reserva.vendedor } : null" />
  </div>
</template>

<script setup>
defineProps({
  reserva: { type: Object, default: null }
})

const route = useRoute()

const { data: contactos, pending, error } = useReservaContactos(route.params.id)

function onlyDigits(value) {
  return String(value).replace(/\D/g, '')
}
</script>
