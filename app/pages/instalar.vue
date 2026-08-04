<template>
  <NuxtLayout v-if="resolved && authenticated" name="default">
    <InstalarGuia :guides="guides" />
  </NuxtLayout>

  <div v-else-if="resolved" class="min-h-dvh flex flex-col bg-white">
    <DefaultHeaderBack />
    <main class="flex-1 border-t border-gris-claro-2">
      <InstalarGuia :guides="guides" />
    </main>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { authenticated, resolved } = useAuthStatus()

const guides = [
  {
    title: 'Para iPhone:',
    steps: [
      'Abrí la app de reservas desde Safari.',
      'Tocá el ícono cuadrado con una flecha hacia arriba, abajo de la pantalla.',
      'Deslizá hacia abajo y tocá "Agregar a Inicio".',
      'Tocá "Agregar" arriba a la derecha.',
      'Listo. Ahora vas a ver el ícono de la app en tu pantalla, como cualquier otra app.'
    ]
  },
  {
    title: 'Para Android:',
    steps: [
      'Abrí la app de reservas desde Chrome.',
      'Va a aparecer un cartel abajo que dice "Instalar app". Tocalo.',
      'Tocá "Instalar" otra vez para confirmar.',
      'Listo. Buscá el ícono de la app en tu pantalla principal.'
    ]
  }
]
</script>
