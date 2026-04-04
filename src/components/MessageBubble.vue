<template>
  <!-- ChatGPT-style message layout -->
  <div
    :class="[
      'group',
      message.type === 'user' ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
    ]"
  >
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div class="flex gap-4 sm:gap-6">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <div
            :class="[
              'w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-sm font-semibold text-white',
              message.type === 'user'
                ? 'bg-gradient-to-br from-emerald-600 to-teal-600'
                : 'bg-gradient-to-br from-indigo-600 to-purple-600'
            ]"
          >
            {{ message.type === 'user' ? 'You' : 'JB' }}
          </div>
        </div>

        <!-- Message content -->
        <div class="flex-1 min-w-0 space-y-3">
          <!-- Regular text message -->
          <div v-if="!message.component" v-html="formattedContent" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words"></div>

          <!-- Dynamic components -->
          <template v-else>
            <div v-html="formattedContent" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words"></div>

            <!-- Projects component -->
            <ProjectsGrid v-if="message.component === 'projects'" :projects="message.data" />

            <!-- Skills component -->
            <SkillsGrid v-if="message.component === 'skills'" :skills="message.data" />

            <!-- Experience component -->
            <ExperienceList v-if="message.component === 'experience'" :experiences="message.data" />

            <!-- Contact component -->
            <ContactInfo v-if="message.component === 'contact'" :contact="message.data" />
          </template>

          <!-- Timestamp -->
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
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
/* Clean prose styling */
:deep(a) {
  @apply text-indigo-600 dark:text-indigo-400 hover:underline;
}

:deep(code) {
  @apply bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900 dark:text-gray-100;
}

:deep(pre) {
  @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100;
}

:deep(p) {
  @apply break-words leading-relaxed text-gray-900 dark:text-gray-100;
}

:deep(ul), :deep(ol) {
  @apply space-y-1 text-gray-900 dark:text-gray-100;
}

:deep(li) {
  @apply text-gray-900 dark:text-gray-100;
}

:deep(strong) {
  @apply font-semibold text-gray-900 dark:text-white;
}

:deep(h1), :deep(h2), :deep(h3) {
  @apply font-semibold text-gray-900 dark:text-white;
}
</style>
