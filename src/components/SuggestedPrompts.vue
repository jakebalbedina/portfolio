<template>
  <div :class="compact ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-5xl'">
    <template v-for="prompt in prompts" :key="prompt.text">
      <!-- Download Resume Link -->
      <a
        v-if="prompt.isDownload"
        href="/Resume - Balbedina, Jake M.pdf"
        download="Jake_Balbedina_Resume.pdf"
        :class="[
          'group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300',
          'glass border-2 border-white/30 dark:border-white/10',
          'hover:border-purple-400 dark:hover:border-purple-500',
          'hover:shadow-xl hover:scale-105',
          compact ? 'text-sm px-4 py-2' : '',
          'cursor-pointer block'
        ]"
      >
        <!-- Gradient overlay on hover -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300"></div>

        <div class="relative flex items-center gap-3">
          <div :class="['text-2xl', compact ? 'text-xl' : '']">{{ prompt.icon }}</div>
          <div class="flex-1">
            <div :class="['font-semibold text-gray-900 dark:text-white', compact ? 'text-sm' : '']">
              {{ prompt.text }}
            </div>
            <div v-if="!compact" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ prompt.description }}
            </div>
          </div>
        </div>
      </a>

      <!-- Modal Trigger Button -->
      <button
        v-else
        @click="$emit('openModal', prompt.type)"
        :class="[
          'group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300',
          'glass border-2 border-white/30 dark:border-white/10',
          'hover:border-purple-400 dark:hover:border-purple-500',
          'hover:shadow-xl hover:scale-105',
          compact ? 'text-sm px-4 py-2' : ''
        ]"
      >
        <!-- Gradient overlay on hover -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300"></div>

        <div class="relative flex items-center gap-3">
          <div :class="['text-2xl', compact ? 'text-xl' : '']">{{ prompt.icon }}</div>
          <div class="flex-1">
            <div :class="['font-semibold text-gray-900 dark:text-white', compact ? 'text-sm' : '']">
              {{ prompt.text }}
            </div>
            <div v-if="!compact" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ prompt.description }}
            </div>
          </div>
        </div>
      </button>
    </template>
  </div>
</template>

<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

defineEmits(['openModal'])

// Suggested prompt configurations
const prompts = [
  {
    icon: '👤',
    text: 'About Me',
    description: 'Learn about Jake\'s background',
    type: 'about'
  },
  {
    icon: '⚡',
    text: 'Skills & Tech',
    description: 'Technical expertise',
    type: 'skills'
  },
  {
    icon: '🚀',
    text: 'Projects',
    description: 'Portfolio projects',
    type: 'projects'
  },
  {
    icon: '💼',
    text: 'Work Experience',
    description: 'Career history',
    type: 'experience'
  },
  {
    icon: '📄',
    text: 'Download Resume',
    description: 'Get resume PDF',
    isDownload: true
  }
]
</script>
