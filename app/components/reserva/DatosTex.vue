<template>
  <section class="w-full flex flex-col gap-3">
    <h2 class="text-morado text-base font-bold">Datos de Tour Experto</h2>

    <div v-if="agente?.nombre" class="flex flex-col gap-1">
      <p class="flex items-center gap-2 text-morado text-xs font-semibold">
        <Icon name="material-symbols:support-agent-rounded" size="16" class="shrink-0" />
        {{ agente.nombre }}, tu agente de viajes:
      </p>
      <a
        v-if="agente.email"
        :href="`mailto:${agente.email}`"
        class="text-violeta-texto text-xs font-medium hover:text-magenta transition-colors duration-200 pl-6"
      >
        {{ agente.email }}
      </a>
    </div>

    <p class="flex items-center gap-2 text-morado text-xs font-semibold">
      <NuxtImg src="/images/icons/whatsapp-morado.svg" alt="" class="shrink-0 size-4" />
      WhatsApp solo mensajes:
      <span class="font-inter text-violeta-texto font-medium">{{ WHATSAPP }}</span>
    </p>

    <div class="flex flex-col gap-1">
      <p class="flex items-center gap-2 text-morado text-xs font-semibold">
        <Icon name="material-symbols:phone-in-talk-outline-rounded" size="16" class="shrink-0" />
        Llamadas:
      </p>
      <ul class="flex flex-col gap-1 pl-6">
        <li v-for="tel in TELEFONOS" :key="tel.pais" class="flex items-center gap-1">
          <span class="text-morado text-xs font-semibold">{{ tel.pais }}</span>
          <a
            :href="`tel:${tel.numero}`"
            class="font-inter text-violeta-texto text-xs font-medium hover:text-magenta transition-colors duration-200"
          >
            {{ tel.numero }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const WHATSAPP = '+1 302 252-1235'

const TELEFONOS = [
  { pais: 'Argentina', numero: '+541152372827' },
  { pais: 'Chile', numero: '+56224053096' },
  { pais: 'Colombia', numero: '+576017702903' },
  { pais: 'España', numero: '+34910601755' },
  { pais: 'Estados Unidos', numero: '+13022087264' },
  { pais: 'México', numero: '+525585262118' }
]

defineProps({
  agente: { type: Object, default: null }
})
</script>
