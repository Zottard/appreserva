<template>
  <label class="w-full flex flex-col gap-1">
    <span class="text-morado text-xs font-bold">{{ label }}</span>

    <span
      class="w-full flex items-center gap-3 border rounded-[9px] transition-colors duration-200 px-4 py-3"
      :class="error ? 'border-error' : 'border-morado focus-within:border-magenta'"
    >
      <Icon v-if="icon" :name="icon" class="shrink-0 text-gris" />
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        class="w-full bg-transparent text-morado text-xs font-semibold placeholder:text-gris placeholder:font-semibold focus:outline-none"
      >
    </span>

    <span v-if="error" role="alert" class="text-error text-xs">{{ error }}</span>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  icon: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: '' },
  required: Boolean,
  error: { type: String, default: '' }
})

const model = defineModel({ type: String, default: '' })
</script>
