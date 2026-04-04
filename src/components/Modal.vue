<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="glass rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/20 dark:border-white/10 max-w-4xl w-full max-h-[90vh] max-h-[90dvh] overflow-hidden flex flex-col"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
            <div class="flex items-center gap-2 sm:gap-3 min-w-0">
              <span class="text-2xl sm:text-3xl flex-shrink-0">{{ icon }}</span>
              <h2 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{{ title }}</h2>
            </div>
            <button
              @click="closeModal"
              class="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors touch-manipulation active:scale-95 flex-shrink-0"
              aria-label="Close modal"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
            <!-- About Me -->
            <div v-if="type === 'about'" class="space-y-2 sm:space-y-3">
              <!-- Profile & Bio -->
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                <div class="flex-shrink-0 mx-auto sm:mx-0">
                  <div class="relative">
                    <img src="/profile.jpg" alt="Jake Balbedina" class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl object-cover shadow-xl border-2 border-white dark:border-gray-700" />
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm shadow-lg">
                      {{ data.emoji }}
                    </div>
                  </div>
                </div>
                <div class="flex-1 space-y-1 text-center sm:text-left min-w-0">
                  <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ data.name }}</h3>
                  <div class="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20">
                    <span class="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-semibold">{{ data.title }}</span>
                  </div>
                  <div class="flex items-center justify-center sm:justify-start gap-1 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span class="truncate">{{ data.location }}</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">{{ data.bio }}</p>
                </div>
              </div>

              <!-- Three Column Layout on Desktop -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3">
                <!-- Contact Information -->
                <div class="glass-card p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/20 dark:border-white/10">
                  <div class="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                    <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-xs">📧</span>
                    </div>
                    <h3 class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Contact</h3>
                  </div>
                  <div class="space-y-1.5 sm:space-y-2">
                    <!-- Email -->
                    <a :href="`mailto:${data.email}`" class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 hover:from-purple-100/50 dark:hover:from-purple-900/30 transition-colors touch-manipulation min-h-[44px]">
                      <div class="text-sm sm:text-base flex-shrink-0">📧</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">Email</div>
                        <div class="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline break-all">
                          {{ data.email }}
                        </div>
                      </div>
                    </a>
                    <!-- Phone -->
                    <div class="p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="flex items-start gap-2">
                        <div class="text-sm sm:text-base flex-shrink-0">📱</div>
                        <div class="flex-1 min-w-0">
                          <div class="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                          <div class="space-y-0.5">
                            <a v-for="phone in data.phone" :key="phone" :href="`tel:${phone}`" class="block text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline touch-manipulation py-1">
                              {{ phone }}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- LinkedIn -->
                    <a :href="data.linkedin" target="_blank" rel="noopener noreferrer" class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 hover:from-blue-100/50 dark:hover:from-blue-900/30 transition-colors touch-manipulation min-h-[44px]">
                      <div class="text-sm sm:text-base flex-shrink-0">💼</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">LinkedIn</div>
                        <div class="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline break-all">
                          linkedin.com/in/jake-balbedina
                        </div>
                      </div>
                    </a>
                    <!-- GitHub -->
                    <a :href="data.github" target="_blank" rel="noopener noreferrer" class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 hover:from-gray-200/50 dark:hover:from-gray-700/30 transition-colors touch-manipulation min-h-[44px]">
                      <div class="text-sm sm:text-base flex-shrink-0">💻</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">GitHub</div>
                        <div class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline break-all">
                          github.com/jakebalbedina
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <!-- Career Highlights -->
                <div class="glass-card p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/20 dark:border-white/10">
                  <div class="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                    <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-xs">⭐</span>
                    </div>
                    <h3 class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Highlights</h3>
                  </div>
                  <div class="space-y-1 sm:space-y-1.5">
                    <div v-for="(fact, index) in quickFacts" :key="fact" class="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="w-4 h-4 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                      </div>
                      <span class="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-snug">{{ fact }}</span>
                    </div>
                  </div>
                </div>

                <!-- Beyond Coding -->
                <div class="glass-card p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/20 dark:border-white/10">
                  <div class="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                    <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-pink-600 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-xs">🎨</span>
                    </div>
                    <h3 class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Beyond Coding</h3>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="hobby in hobbies" :key="hobby" class="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-gray-900 dark:text-white text-xs sm:text-sm font-medium leading-tight">
                      {{ hobby }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Download Resume -->
              <a
                href="/Resume - Balbedina, Jake M.pdf"
                download="Jake_Balbedina_Resume.pdf"
                class="flex items-center justify-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] shadow-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>

            <!-- Skills & Tech -->
            <div v-if="type === 'skills'" class="space-y-3 sm:space-y-4">
              <div v-for="category in data" :key="category.name" class="glass-card p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 dark:border-white/10">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{{ category.name }}</h3>
                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                  <span
                    v-for="skill in category.items"
                    :key="skill"
                    class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-500/20 dark:border-purple-500/30 text-purple-900 dark:text-purple-100 font-medium text-xs sm:text-sm leading-tight"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Projects -->
            <div v-if="type === 'projects'" class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div
                v-for="project in data"
                :key="project.name"
                class="glass-card p-4 sm:p-5 rounded-lg sm:rounded-xl hover:shadow-xl transition-shadow"
              >
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">{{ project.name }}</h3>
                <p class="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{{ project.description }}</p>
                <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="px-2.5 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 leading-tight"
                  >
                    {{ tech }}
                  </span>
                </div>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:underline touch-manipulation py-2 min-h-[44px]"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>

            <!-- Work Experience -->
            <div v-if="type === 'experience'" class="space-y-3 sm:space-y-4">
              <div
                v-for="(exp, index) in data"
                :key="exp.company"
                class="glass-card p-4 sm:p-5 rounded-lg sm:rounded-xl relative"
              >
                <div v-if="exp.current" class="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span class="px-2.5 py-1 text-xs rounded-full bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20">
                    Current
                  </span>
                </div>
                <div class="flex items-start gap-3 sm:gap-4">
                  <div class="text-2xl sm:text-3xl flex-shrink-0">{{ index === 0 ? '🚀' : index === 1 ? '💼' : index === 2 ? '⚡' : '🎯' }}</div>
                  <div class="flex-1 min-w-0 pr-16 sm:pr-20">
                    <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight">{{ exp.position }}</h3>
                    <div class="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium mt-1">{{ exp.company }}</div>
                    <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{{ exp.period }} • {{ exp.duration }}</div>
                    <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-2 sm:mt-3 leading-relaxed">{{ exp.description }}</p>
                    <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      <span
                        v-for="tech in exp.technologies"
                        :key="tech"
                        class="px-2.5 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 leading-tight"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import portfolioData from '../data/portfolio'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close'])

// Modal configuration - extracted for better maintainability
const MODAL_CONFIG = {
  about: {
    title: 'About Me',
    icon: '👤',
    data: portfolioData.personal
  },
  skills: {
    title: 'Skills & Technology',
    icon: '⚡',
    data: portfolioData.skills.categories
  },
  projects: {
    title: 'Projects',
    icon: '🚀',
    data: portfolioData.projects
  },
  experience: {
    title: 'Work Experience',
    icon: '💼',
    data: portfolioData.experience
  }
}

const title = ref('')
const icon = ref('')
const data = ref(null)
const quickFacts = ref(portfolioData.quickFacts)
const hobbies = ref(portfolioData.hobbies)

// Update modal content when type changes
watch(() => props.type, (newType) => {
  if (!newType) return

  const config = MODAL_CONFIG[newType]
  if (config) {
    title.value = config.title
    icon.value = config.icon
    data.value = config.data
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
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

.modal-enter-active .glass,
.modal-leave-active .glass {
  transition: transform 0.3s ease;
}

.modal-enter-from .glass,
.modal-leave-to .glass {
  transform: scale(0.95);
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.dark .glass-card {
  background: rgba(31, 41, 55, 0.8);
}
</style>
