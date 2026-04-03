<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen transition-colors duration-300">
    <!-- Animated gradient background -->
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"
      ></div>
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20 dark:opacity-10"></div>

      <!-- Animated orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
    </div>

    <!-- Main app -->
    <div class="relative min-h-screen flex flex-col">
      <!-- Header -->
      <header class="relative z-10 py-4 px-6">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              JB
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Jake Balbedina</h1>
              <p class="text-sm text-gray-600 dark:text-gray-400">Software Developer</p>
            </div>
          </div>

          <ThemeToggle v-model="isDark" />
        </div>
      </header>

      <!-- Chat Interface -->
      <main class="flex-1 flex items-center justify-center p-4 pb-8">
        <ChatInterface :isDark="isDark" />
      </main>

      <!-- Footer -->
      <footer class="relative z-10 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Built with Vue 3, Tailwind CSS | © 2026 Jake Balbedina</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChatInterface from './components/ChatInterface.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const isDark = ref(false)

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

// Update theme when isDark changes
import { watch } from 'vue'
watch(isDark, updateTheme)
</script>
