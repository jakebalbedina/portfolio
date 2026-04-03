<template>
  <div class="space-y-6 mt-4">
    <div
      v-for="category in skills"
      :key="category.name"
      class="space-y-3"
    >
      <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        {{ category.name }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="skill in category.items"
          :key="skill"
          class="group relative overflow-hidden"
        >
          <div class="px-4 py-2 rounded-full glass border-2 border-white/30 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
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
