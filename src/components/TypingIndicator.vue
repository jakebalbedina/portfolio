<template>
  <!-- ChatGPT-style typing indicator -->
  <div class="bg-gray-50 dark:bg-gray-800/50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div class="flex gap-4 sm:gap-6">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
            JB
          </div>
        </div>

        <!-- Typing animation -->
        <div class="flex items-center gap-1 pt-2">
          <div
            v-for="i in 3"
            :key="i"
            class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            :style="{ animationDelay: `${i * 0.15}s` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
