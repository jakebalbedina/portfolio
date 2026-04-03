<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="glass rounded-3xl shadow-2xl border-2 border-white/20 dark:border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div class="flex items-center gap-3">
              <span class="text-3xl">{{ icon }}</span>
              <h2 class="text-2xl font-bold gradient-text">{{ title }}</h2>
            </div>
            <button
              @click="closeModal"
              class="p-2 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- About Me -->
            <div v-if="type === 'about'" class="space-y-3">
              <!-- Profile & Bio -->
              <div class="flex flex-col md:flex-row gap-4 items-start p-4 rounded-xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                <div class="flex-shrink-0">
                  <div class="relative">
                    <img src="/profile.jpg" alt="Jake Balbedina" class="w-24 h-24 rounded-xl object-cover shadow-xl border-2 border-white dark:border-gray-700" />
                    <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                      {{ data.emoji }}
                    </div>
                  </div>
                </div>
                <div class="flex-1 space-y-1">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ data.name }}</h3>
                  <div class="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20">
                    <span class="text-sm text-purple-600 dark:text-purple-400 font-semibold">{{ data.title }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{{ data.location }}</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{{ data.bio }}</p>
                </div>
              </div>

              <!-- Two Column Layout -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <!-- Contact Information -->
                <div class="glass-card p-3 rounded-xl border border-white/20 dark:border-white/10">
                  <div class="flex items-center gap-1.5 mb-2">
                    <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <span class="text-white text-xs">📧</span>
                    </div>
                    <h3 class="text-sm font-bold text-gray-900 dark:text-white">Contact</h3>
                  </div>
                  <div class="space-y-2">
                    <!-- Email -->
                    <div class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="text-base flex-shrink-0">📧</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">Email</div>
                        <a :href="`mailto:${data.email}`" class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline break-all">
                          {{ data.email }}
                        </a>
                      </div>
                    </div>
                    <!-- Phone -->
                    <div class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="text-base flex-shrink-0">📱</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                        <div class="space-y-0.5">
                          <a v-for="phone in data.phone" :key="phone" :href="`tel:${phone}`" class="block text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                            {{ phone }}
                          </a>
                        </div>
                      </div>
                    </div>
                    <!-- LinkedIn -->
                    <div class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="text-base flex-shrink-0">💼</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">LinkedIn</div>
                        <a :href="data.linkedin" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline break-all">
                          linkedin.com/in/jake-balbedina
                        </a>
                      </div>
                    </div>
                    <!-- GitHub -->
                    <div class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="text-base flex-shrink-0">💻</div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 dark:text-gray-400">GitHub</div>
                        <a :href="data.github" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline break-all">
                          github.com/jakebalbedina
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Career Highlights -->
                <div class="glass-card p-3 rounded-xl border border-white/20 dark:border-white/10">
                  <div class="flex items-center gap-1.5 mb-2">
                    <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                      <span class="text-white text-xs">⭐</span>
                    </div>
                    <h3 class="text-sm font-bold text-gray-900 dark:text-white">Highlights</h3>
                  </div>
                  <div class="space-y-1.5">
                    <div v-for="(fact, index) in quickFacts" :key="fact" class="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                      <div class="w-4 h-4 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                      </div>
                      <span class="text-gray-700 dark:text-gray-300 text-sm leading-snug">{{ fact }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Beyond Coding -->
              <div class="glass-card p-3 rounded-xl border border-white/20 dark:border-white/10">
                <div class="flex items-center gap-1.5 mb-2">
                  <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-600 to-orange-600 flex items-center justify-center">
                    <span class="text-white text-xs">🎨</span>
                  </div>
                  <h3 class="text-sm font-bold text-gray-900 dark:text-white">Beyond Coding</h3>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="hobby in hobbies" :key="hobby" class="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-gray-900 dark:text-white text-sm font-medium">
                    {{ hobby }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Skills & Tech -->
            <div v-if="type === 'skills'" class="space-y-6">
              <div v-for="category in data" :key="category.name" class="glass-card p-6 rounded-xl">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ category.name }}</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in category.items"
                    :key="skill"
                    class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-gray-900 dark:text-white font-medium"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Projects -->
            <div v-if="type === 'projects'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="project in data"
                :key="project.name"
                class="glass-card p-6 rounded-xl hover:shadow-xl transition-shadow"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ project.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  >
                    {{ tech }}
                  </span>
                </div>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>

            <!-- Work Experience -->
            <div v-if="type === 'experience'" class="space-y-6">
              <div
                v-for="(exp, index) in data"
                :key="exp.company"
                class="glass-card p-6 rounded-xl relative"
              >
                <div v-if="exp.current" class="absolute top-4 right-4">
                  <span class="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20">
                    Current
                  </span>
                </div>
                <div class="flex items-start gap-4">
                  <div class="text-3xl">{{ index === 0 ? '🚀' : index === 1 ? '💼' : index === 2 ? '⚡' : '🎯' }}</div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ exp.position }}</h3>
                    <div class="text-purple-600 dark:text-purple-400 font-medium">{{ exp.company }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ exp.period }} • {{ exp.duration }}</div>
                    <p class="text-gray-700 dark:text-gray-300 mt-3">{{ exp.description }}</p>
                    <div class="flex flex-wrap gap-2 mt-4">
                      <span
                        v-for="tech in exp.technologies"
                        :key="tech"
                        class="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300"
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

const title = ref('')
const icon = ref('')
const data = ref(null)
const quickFacts = ref(portfolioData.quickFacts)
const hobbies = ref(portfolioData.hobbies)

watch(() => props.type, (newType) => {
  if (!newType) return

  const modalConfig = {
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

  const config = modalConfig[newType]
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
