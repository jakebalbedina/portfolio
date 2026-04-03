<template>
  <button
    @click="toggle"
    class="relative w-16 h-8 rounded-full glass border-2 border-white/30 dark:border-white/10 transition-all duration-300 hover:scale-105"
    :aria-label="modelValue ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <div
      :class="[
        'absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-gradient-to-br shadow-lg transition-all duration-300 flex items-center justify-center',
        modelValue
          ? 'translate-x-8 from-purple-600 to-blue-600'
          : 'translate-x-0 from-yellow-400 to-orange-400'
      ]"
    >
      <span class="text-sm">{{ modelValue ? '🌙' : '☀️' }}</span>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
