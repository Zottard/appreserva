<template>
  <div class="w-full">
    <button
      type="button"
      class="w-full flex items-center justify-between gap-3 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta py-2"
      :aria-expanded="open"
      @click="open = !open"
    >
      <slot name="summary">
        <span class="text-morado text-xl font-bold">{{ title }}</span>
      </slot>
      <span class="shrink-0 flex items-center justify-center size-7 lg:size-10 bg-gris-claro rounded-full">
        <Icon
          name="material-symbols:keyboard-arrow-down-rounded"
          class="size-5! lg:size-8! text-gris transition-transform duration-300 ease-out"
          :class="open && 'rotate-180'"
        />
      </span>
    </button>

    <div class="grid transition-[grid-template-rows] duration-300 ease-out" :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <div class="flex flex-col gap-2 pt-1 pb-2">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' }
})

const open = defineModel({ type: Boolean, default: false })
</script>
