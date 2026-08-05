<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <p class="text-violeta-texto text-xs lg:text-base font-medium">
      {{ intro }}
    </p>

    <State
      :pending="pending"
      :error="error"
      :empty="!pasajeros?.length"
      error-text="No se pudieron cargar los pasajeros."
      empty-text="Todavía no hay pasajeros cargados."
    >
      <ul class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
        <li v-for="(pasajero, i) in pasajeros" :key="pasajero.id || i">
          <Accordion v-model="open[i]">
            <template #summary>
              <span class="flex items-center gap-3 lg:gap-4">
                <Avatar :name="fullName(pasajero)" size="lg" />
                <span class="flex flex-col text-left">
                  <span class="text-morado text-base lg:text-xl font-bold">{{ fullName(pasajero) }}</span>
                  <span v-if="pasajero.genero" class="text-gris text-xs lg:text-sm font-medium">{{ pasajero.genero }}</span>
                </span>
              </span>
            </template>

            <dl class="w-full grid grid-cols-2 gap-3 pl-13">
              <div v-if="pasajero.nro_pasaporte" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">Pasaporte</dt>
                <dd class="font-inter text-morado text-sm lg:text-base font-medium">{{ pasajero.nro_pasaporte }}</dd>
              </div>
              <div v-if="pasajero.fecha_nacimiento" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">Nacimiento</dt>
                <dd class="font-inter text-morado text-sm lg:text-base font-medium">{{ formatFecha(pasajero.fecha_nacimiento) }}</dd>
              </div>
              <div v-if="pasajero.nacionalidad" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">Nacionalidad</dt>
                <dd class="text-morado text-sm lg:text-base font-semibold">{{ pasajero.nacionalidad }}</dd>
              </div>
              <div v-if="pasajero.genero" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">Género</dt>
                <dd class="text-morado text-sm lg:text-base font-semibold">{{ pasajero.genero }}</dd>
              </div>
            </dl>
          </Accordion>
        </li>
      </ul>
    </State>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: pasajeros, pending, error } = useReservaPasajeros(route.params.id)

const open = reactive({})

const intro = computed(() => {
  const total = pasajeros.value?.length || 0
  if (!total) return 'Pasajeros incluidos en esta reserva.'
  return `${total} ${total === 1 ? 'pasajero incluido' : 'pasajeros incluidos'} en esta reserva. Tocá uno para ver el detalle del documento.`
})

function fullName(pasajero) {
  return [pasajero.nombre, pasajero.apellido].filter(Boolean).join(' ')
}
</script>
