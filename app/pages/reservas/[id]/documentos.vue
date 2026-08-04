<template>
  <div class="w-full flex flex-col gap-6">
    <p class="text-violeta-texto text-xs font-medium">
      Documentos de viaje listos para descargar y mostrar en destino.
    </p>

    <State
      :pending="pending"
      :error="error"
      :empty="!vouchers?.length"
      error-text="No se pudieron cargar los documentos."
      empty-text="Todavía no hay documentos disponibles."
    >
      <ul class="w-full flex flex-col gap-3">
        <li v-for="(voucher, i) in vouchers" :key="voucher.id || i">
          <Row :title="voucher.nombre" :subtitle="subtitle(voucher)">
            <template #actions>
              <a
                :href="voucher.url_s3"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-center size-10 bg-violeta hover:bg-violeta-2 rounded-lg text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="`Ver ${voucher.nombre}`"
              >
                <Icon name="material-symbols:visibility-outline-rounded" size="24" />
              </a>
              <a
                :href="voucher.url_s3"
                download
                class="flex items-center justify-center size-10 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="`Descargar ${voucher.nombre}`"
              >
                <Icon name="material-symbols:download-rounded" size="24" />
              </a>
            </template>
          </Row>
        </li>
      </ul>
    </State>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: vouchers, pending, error } = useReservaVouchers(route.params.id)

function subtitle(voucher) {
  return voucher.tipo?.toUpperCase() || ''
}
</script>
