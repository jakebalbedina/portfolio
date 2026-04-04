<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen transition-colors duration-200">
    <!-- Clean, solid background like ChatGPT -->
    <div class="fixed inset-0 -z-10 bg-white dark:bg-gray-900"></div>

    <!-- Main app - Full height layout -->
    <div class="relative h-screen h-[100dvh] flex flex-col">
      <!-- Compact header with theme toggle -->
      <header class="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              JB
            </div>
            <div>
              <h1 class="text-sm font-semibold text-gray-900 dark:text-white">Jake Balbedina</h1>
              <p class="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">AI Portfolio Assistant</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleClearChat"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
              title="New Chat"
              aria-label="Clear chat and start new conversation"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <ThemeToggle v-model="isDark" />
          </div>
        </div>
      </header>

      <!-- Chat Interface - Takes remaining space -->
      <main class="flex-1 overflow-hidden">
        <ChatInterface ref="chatInterfaceRef" :isDark="isDark" />
      </main>
    </div>

    <!-- Clear Chat Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showClearConfirm"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          @click.self="showClearConfirm = false"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full p-6"
            @click.stop
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Clear chat history?</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">This will delete all messages in the current conversation. This action cannot be undone.</p>
              </div>
            </div>

            <div class="flex gap-3 mt-6">
              <button
                @click="showClearConfirm = false"
                class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="confirmClearChat"
                class="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ChatInterface from './components/ChatInterface.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const isDark = ref(false)
const showClearConfirm = ref(false)
const chatInterfaceRef = ref(null)

onMounted(() => {
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme')
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  isDark.value = savedTheme === 'dark' || (!savedTheme && systemDark)

  // Watch for changes
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})

// Watch isDark changes
const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

watch(isDark, updateTheme)

// Clear chat functionality
const handleClearChat = () => {
  showClearConfirm.value = true
}

const confirmClearChat = () => {
  if (chatInterfaceRef.value && chatInterfaceRef.value.clearMessages) {
    chatInterfaceRef.value.clearMessages()
  }
  showClearConfirm.value = false
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white,
.modal-enter-active .dark\:bg-gray-800,
.modal-leave-active .dark\:bg-gray-800 {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white,
.modal-enter-from .dark\:bg-gray-800,
.modal-leave-to .dark\:bg-gray-800 {
  transform: scale(0.95);
}
</style>
