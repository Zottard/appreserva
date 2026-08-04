<template>
  <div class="w-full max-w-200 flex flex-col gap-6 px-5 lg:px-12 pt-3 lg:pt-8 pb-6 lg:pb-10">
    <h1 class="text-morado text-[22px] lg:text-3xl font-bold text-balance">
      ¿Cómo descargar la app en tu celular?
    </h1>

    <section v-for="guide in guides" :key="guide.title" class="w-full flex flex-col gap-3">
      <h2 class="text-morado text-base font-semibold">{{ guide.title }}</h2>
      <ol class="w-full flex flex-col list-decimal text-morado text-xs font-medium pl-4.5">
        <li v-for="(step, i) in guide.steps" :key="i">{{ step }}</li>
      </ol>
    </section>

    <Help />
  </div>
</template>

<script setup>
defineProps({
  guides: { type: Array, required: true }
})
</script>
