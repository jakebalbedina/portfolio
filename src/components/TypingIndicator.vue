<template>
  <div class="flex justify-start animate-slide-up">
    <div class="glass border-2 border-white/20 dark:border-white/10 rounded-2xl px-6 py-4 shadow-lg">
      <div class="flex items-center gap-2">
        <div class="flex gap-1">
          <div
            v-for="i in 3"
            :key="i"
            class="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"
            :style="{ animationDelay: `${i * 0.15}s` }"
          ></div>
        </div>
        <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">Jake is typing...</span>
      </div>
    </div>
  </div>
</template>
