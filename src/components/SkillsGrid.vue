<template>
  <div class="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
    <div
      v-for="category in skills"
      :key="category.name"
      class="space-y-2 sm:space-y-3"
    >
      <h3 class="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
        {{ category.name }}
      </h3>
      <div class="flex flex-wrap gap-1.5 sm:gap-2">
        <div
          v-for="skill in category.items"
          :key="skill"
          class="group relative overflow-hidden"
        >
          <div class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation">
            <span class="text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-100 whitespace-nowrap">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skills: {
    type: Array,
    required: true
  }
})
</script>
