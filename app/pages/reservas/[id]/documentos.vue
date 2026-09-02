<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <p class="text-violeta-texto text-xs lg:text-base font-medium">
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
              <button
                v-if="isPreviewable(voucher)"
                type="button"
                class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="`Ver ${voucher.nombre}`"
                @click="preview = voucher"
              >
                <Icon name="material-symbols:visibility-outline-rounded" size="24" />
              </button>
              <a
                :href="voucher.url_s3"
                download
                class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="`Descargar ${voucher.nombre}`"
              >
                <Icon name="material-symbols:download-rounded" size="24" />
              </a>
            </template>
          </Row>
        </li>
      </ul>
    </State>

    <Modal v-model="isOpen" :title="preview?.nombre || ''">
      <template #actions>
        <a
          :href="preview?.url_s3"
          download
          class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          :aria-label="`Descargar ${preview?.nombre}`"
        >
          <Icon name="material-symbols:download-rounded" size="24" />
        </a>
      </template>

      <iframe
        v-if="preview"
        :src="preview.url_s3"
        class="w-full h-full border-0"
        :title="preview.nombre"
      />
    </Modal>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: vouchers, pending, error } = useReservaVouchers(route.params.id)

const preview = ref(null)

const isOpen = computed({
  get: () => !!preview.value,
  set: (value) => { if (!value) preview.value = null }
})

// solo el PDF se puede ver en un iframe; el resto va directo a descarga.
// la extensión puede llegar en tipo, en el nombre o en la url (firmada o no)
function isPreviewable(voucher) {
  if (!voucher.url_s3) return false
  if (voucher.tipo) return /pdf/i.test(voucher.tipo)
  return /\.pdf($|[?#])/i.test(voucher.nombre || '') || /\.pdf($|[?#])/i.test(voucher.url_s3)
}

function subtitle(voucher) {
  return voucher.tipo?.toUpperCase() || ''
}
</script>
