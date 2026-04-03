<template>
  <div
    :class="[
      'flex',
      message.type === 'user' ? 'justify-end' : 'justify-start',
      'animate-slide-up'
    ]"
  >
    <div
      :class="[
        'max-w-[80%] rounded-2xl px-6 py-4 shadow-lg',
        message.type === 'user'
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
          : 'glass border-2 border-white/20 dark:border-white/10 text-gray-900 dark:text-white'
      ]"
    >
      <!-- Regular text message -->
      <div v-if="!message.component" v-html="formattedContent" class="prose prose-sm dark:prose-invert max-w-none"></div>

      <!-- Dynamic components -->
      <div v-else>
        <div v-html="formattedContent" class="prose prose-sm dark:prose-invert max-w-none mb-4"></div>

        <!-- Projects component -->
        <ProjectsGrid v-if="message.component === 'projects'" :projects="message.data" />

        <!-- Skills component -->
        <SkillsGrid v-if="message.component === 'skills'" :skills="message.data" />

        <!-- Experience component -->
        <ExperienceList v-if="message.component === 'experience'" :experiences="message.data" />

        <!-- Contact component -->
        <ContactInfo v-if="message.component === 'contact'" :contact="message.data" />
      </div>

      <!-- Timestamp -->
      <div
        :class="[
          'text-xs mt-2 opacity-70',
          message.type === 'user' ? 'text-right' : 'text-left'
        ]"
      >
        {{ formatTime(message.timestamp) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import ProjectsGrid from './ProjectsGrid.vue'
import SkillsGrid from './SkillsGrid.vue'
import ExperienceList from './ExperienceList.vue'
import ContactInfo from './ContactInfo.vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

// Format message content with markdown support
const formattedContent = computed(() => {
  return marked(props.message.content, {
    breaks: true,
    gfm: true
  })
})

// Format timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
:deep(a) {
  @apply text-blue-500 hover:text-blue-600 underline;
}

:deep(code) {
  @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm;
}

:deep(pre) {
  @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto;
}

:deep(ul), :deep(ol) {
  @apply ml-4;
}

:deep(strong) {
  @apply font-semibold;
}
</style>
