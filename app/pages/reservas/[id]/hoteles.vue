<template>
  <div class="w-full flex flex-col gap-6">
    <p class="text-violeta-texto text-xs font-medium">
      Tu alojamiento por destino. Podrás ser alojado en cualquiera de nuestros hoteles seleccionados
      ya que la asignación depende de disponibilidad y estacionalidad.
    </p>

    <State
      :pending="pending"
      :error="error"
      :empty="!hoteles?.length"
      error-text="No se pudieron cargar los hoteles."
      empty-text="Todavía no hay hoteles asignados."
    >
      <div class="w-full flex flex-col gap-2">
        <Accordion
          v-for="(destino, i) in hoteles"
          :key="destino.ciudad || i"
          v-model="open[i]"
          :title="destino.ciudad"
        >
          <Row
            v-for="(hotel, j) in destino.alternativas"
            :key="hotel.nombre || j"
            icon="material-symbols:bed-outline-rounded"
            :title="hotel.nombre"
            :subtitle="hotel.estado || 'Previsto o similar'"
          />
        </Accordion>
      </div>
    </State>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: hoteles, pending, error } = useReservaHoteles(route.params.id)

const open = reactive({})
</script>
