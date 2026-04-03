<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <!-- Email -->
    <a
      :href="`mailto:${contact.email}`"
      class="group glass rounded-xl p-5 border-2 border-white/20 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105 flex items-center gap-4"
    >
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xl">
        📧
      </div>
      <div class="flex-1">
        <div class="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</div>
        <div class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {{ contact.email }}
        </div>
      </div>
    </a>

    <!-- Phone -->
    <a
      :href="`tel:${contact.phone[0]}`"
      class="group glass rounded-xl p-5 border-2 border-white/20 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105 flex items-center gap-4"
    >
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center text-white text-xl">
        📱
      </div>
      <div class="flex-1">
        <div class="text-sm font-semibold text-gray-600 dark:text-gray-400">Phone</div>
        <div class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {{ contact.phone[0] }}
        </div>
      </div>
    </a>

    <!-- LinkedIn -->
    <a
      :href="contact.linkedin"
      target="_blank"
      rel="noopener noreferrer"
      class="group glass rounded-xl p-5 border-2 border-white/20 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105 flex items-center gap-4"
    >
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xl">
        💼
      </div>
      <div class="flex-1">
        <div class="text-sm font-semibold text-gray-600 dark:text-gray-400">LinkedIn</div>
        <div class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          Connect with me
        </div>
      </div>
    </a>

    <!-- GitHub -->
    <a
      :href="contact.github"
      target="_blank"
      rel="noopener noreferrer"
      class="group glass rounded-xl p-5 border-2 border-white/20 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105 flex items-center gap-4"
    >
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xl">
        💻
      </div>
      <div class="flex-1">
        <div class="text-sm font-semibold text-gray-600 dark:text-gray-400">GitHub</div>
        <div class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          @jakebalbedina
        </div>
      </div>
    </a>

    <!-- Location -->
    <div class="glass rounded-xl p-5 border-2 border-white/20 dark:border-white/10 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white text-xl">
        📍
      </div>
      <div class="flex-1">
        <div class="text-sm font-semibold text-gray-600 dark:text-gray-400">Location</div>
        <div class="text-sm font-bold text-gray-900 dark:text-white">
          {{ contact.location }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  contact: {
    type: Object,
    required: true
  }
})
</script>
