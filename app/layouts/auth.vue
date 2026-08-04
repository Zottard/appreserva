<template>
  <div class="min-h-dvh flex flex-col lg:flex-row bg-white">
    <div
      class="w-full lg:w-1/2 h-[52dvh] lg:h-dvh shrink-0 flex flex-col justify-between relative bg-morado overflow-hidden px-5 lg:px-13 py-6 lg:py-13">
      <NuxtImg src="/images/login-hero.jpg" alt="" class="w-full h-full absolute inset-0 object-cover"
        aria-hidden="true" />
      <div class="absolute inset-0 bg-[linear-gradient(21.77deg,#2E014A_34.86%,rgba(46,1,74,0)_89.28%)]"
        aria-hidden="true" />

      <ButtonIconAction
        to="/instalar"
        icon="material-symbols:info-outline-rounded"
        label="Cómo instalar la app"
        class="self-start relative"
      />

      <div class="w-full flex flex-col gap-6 relative">
        <NuxtImg src="/images/logo.svg" alt="Tour Experto" class="w-25 lg:w-44" />
        <p class="text-white text-[22px] lg:text-4xl font-bold text-balance">
          Tu próximo viaje, organizado al detalle.
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex-1 flex flex-col px-5 lg:px-15 py-8">
      <div class="w-full max-w-142 mx-auto flex flex-col gap-6 lg:gap-8">
        <slot />
      </div>
    </div>
  </div>
</template>
