<template>
  <div class="space-y-4 mt-4">
    <div
      v-for="(exp, index) in experiences"
      :key="index"
      class="relative pl-8 pb-8 border-l-2 border-purple-200 dark:border-purple-800 last:pb-0"
    >
      <!-- Timeline dot -->
      <div
        :class="[
          'absolute -left-2 top-0 w-4 h-4 rounded-full border-2',
          exp.current
            ? 'bg-purple-600 border-purple-600 animate-pulse'
            : 'bg-white dark:bg-gray-800 border-purple-400 dark:border-purple-600'
        ]"
      ></div>

      <!-- Content -->
      <div class="glass rounded-xl p-5 border-2 border-white/20 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
        <div class="flex items-start justify-between mb-2">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ exp.position }}
            </h3>
            <p class="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {{ exp.company }}
            </p>
          </div>
          <span
            v-if="exp.current"
            class="px-3 py-1 text-xs font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
          >
            Current
          </span>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {{ exp.period }} • {{ exp.duration }}
        </p>

        <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {{ exp.description }}
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in exp.technologies"
            :key="tech"
            class="px-2 py-1 text-xs font-semibold rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  experiences: {
    type: Array,
    required: true
  }
})
</script>
