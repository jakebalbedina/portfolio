<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-900">
    <!-- Messages area - Centered like ChatGPT -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto overscroll-contain"
      @scroll="handleScroll"
    >
      <div class="max-w-3xl mx-auto px-4 py-6 sm:px-6">
        <!-- Welcome message (only when no messages) -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div class="text-5xl sm:text-6xl">👋</div>
          <div class="text-center space-y-2">
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
              Hi! I'm Jake's AI Assistant
            </h2>
            <p class="text-base text-gray-600 dark:text-gray-400 max-w-md">
              Ask me about Jake's experience, skills, or projects
            </p>
          </div>
        </div>

        <!-- Messages - Clean spacing -->
        <div v-if="messages.length > 0" class="space-y-6 py-4">
          <TransitionGroup name="message">
            <MessageBubble
              v-for="message in messages"
              :key="message.id"
              :message="message"
            />
          </TransitionGroup>

          <!-- Typing indicator -->
          <TypingIndicator v-if="isTyping" />
        </div>
      </div>
    </div>

    <!-- Scroll to bottom button - Floating like ChatGPT -->
    <Transition name="fade">
      <button
        v-if="showScrollButton && messages.length > 0"
        @click="scrollToBottomSmooth"
        class="fixed bottom-36 sm:bottom-40 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
        aria-label="Scroll to bottom"
      >
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </button>
    </Transition>

    <!-- Suggested prompts - Sticky above input -->
    <div class="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div class="max-w-3xl mx-auto px-4 py-3 sm:px-6">
        <!-- Mobile: Horizontal scroll -->
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory sm:hidden">
          <button
            v-for="prompt in suggestedPrompts"
            :key="prompt.text"
            @click="handlePromptClick(prompt)"
            class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0 snap-start touch-manipulation"
          >
            <span class="text-lg">{{ prompt.icon }}</span>
            <span class="font-medium text-gray-900 dark:text-white text-xs whitespace-nowrap">{{ prompt.text }}</span>
          </button>
        </div>

        <!-- Desktop: Grid -->
        <div class="hidden sm:grid grid-cols-4 gap-2">
          <button
            v-for="prompt in suggestedPrompts"
            :key="prompt.text"
            @click="handlePromptClick(prompt)"
            class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
          >
            <span class="text-lg">{{ prompt.icon }}</span>
            <span class="font-medium text-gray-900 dark:text-white text-xs">{{ prompt.text }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Input area - Sticky bottom like ChatGPT -->
    <div class="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="max-w-3xl mx-auto px-4 py-4 sm:px-6">
        <form @submit.prevent="sendMessage" class="relative">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Message Jake's assistant..."
            class="w-full px-4 py-3 pr-12 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            :disabled="isTyping"
            @keydown="handleKeydown"
          />
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isTyping"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white transition-colors duration-200 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg v-if="!isTyping" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>
        <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          AI assistant powered by Jake's portfolio data
        </p>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      :isOpen="isModalOpen"
      :type="modalType"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import MessageBubble from './MessageBubble.vue'
import TypingIndicator from './TypingIndicator.vue'
import Modal from './Modal.vue'
import { getChatResponse } from '../utils/chatbot'

// Constants
const STORAGE_KEY = 'chatHistory'
const SCROLL_THRESHOLD = 100
const TYPING_DELAY = 1000
const MAX_STORAGE_SIZE = 5 * 1024 * 1024 // 5MB limit for localStorage

// State
const messages = ref([])
const inputMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)
const messageHistory = ref([])
const historyIndex = ref(-1)
const isModalOpen = ref(false)
const modalType = ref(null)
const showScrollButton = ref(false)

// Suggested prompts for welcome screen
const suggestedPrompts = [
  { icon: '👤', text: 'About Jake', description: 'Learn about background & bio', type: 'about' },
  { icon: '⚡', text: 'Skills & Tech', description: 'View technical expertise', type: 'skills' },
  { icon: '🚀', text: 'Projects', description: 'Explore portfolio work', type: 'projects' },
  { icon: '💼', text: 'Experience', description: 'See work history', type: 'experience' }
]

// Lifecycle
onMounted(() => {
  const savedMessages = localStorage.getItem(STORAGE_KEY)
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages)
    scrollToBottom()
  }
})

// Storage
const saveMessages = () => {
  const data = JSON.stringify(messages.value)
  // Check storage size to prevent quota exceeded errors
  if (data.length < MAX_STORAGE_SIZE) {
    localStorage.setItem(STORAGE_KEY, data)
  } else {
    console.warn('Chat history exceeds storage limit. Keeping only recent messages.')
    // Keep only last 20 messages
    messages.value = messages.value.slice(-20)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
  }
}

// Scrolling
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const scrollToBottomSmooth = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (messagesContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
    showScrollButton.value = scrollHeight - scrollTop - clientHeight > SCROLL_THRESHOLD
  }
}

// Message Handling
const createMessage = (type, content, additionalData = {}) => ({
  id: Date.now() + (type === 'bot' ? 1 : 0),
  type,
  content,
  timestamp: new Date(),
  ...additionalData
})

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isTyping.value) return

  const userInput = inputMessage.value.trim()
  const userMessage = createMessage('user', userInput)

  messages.value.push(userMessage)
  messageHistory.value.push(userInput)
  historyIndex.value = -1
  inputMessage.value = ''

  saveMessages()
  scrollToBottom()

  isTyping.value = true

  try {
    const response = await getChatResponse(userInput, messages.value)
    await new Promise(resolve => setTimeout(resolve, TYPING_DELAY))

    const botMessage = createMessage('bot', response.content, {
      component: response.component,
      data: response.data
    })

    messages.value.push(botMessage)
    saveMessages()
    scrollToBottom()
  } catch (error) {
    console.error('Error getting response:', error)
    const errorMessage = createMessage('bot',
      "I apologize, but I'm having trouble processing your request right now. Please try again!"
    )
    messages.value.push(errorMessage)
    saveMessages()
    scrollToBottom()
  } finally {
    isTyping.value = false
  }
}

// Modal Handling
const handleOpenModal = (type) => {
  modalType.value = type
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  modalType.value = null
}

// Handle prompt click
const handlePromptClick = (prompt) => {
  if (prompt.type) {
    handleOpenModal(prompt.type)
  }
}

// Keyboard Navigation
const handleKeydown = (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (messageHistory.value.length === 0) return

    if (historyIndex.value === -1) {
      historyIndex.value = messageHistory.value.length - 1
    } else if (historyIndex.value > 0) {
      historyIndex.value--
    }

    if (historyIndex.value >= 0) {
      inputMessage.value = messageHistory.value[historyIndex.value]
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (messageHistory.value.length === 0 || historyIndex.value === -1) return

    if (historyIndex.value < messageHistory.value.length - 1) {
      historyIndex.value++
      inputMessage.value = messageHistory.value[historyIndex.value]
    } else {
      historyIndex.value = -1
      inputMessage.value = ''
    }
  }
}

// Clear Messages
const clearMessages = () => {
  messages.value = []
  messageHistory.value = []
  historyIndex.value = -1
  inputMessage.value = ''
  localStorage.removeItem(STORAGE_KEY)
}

// Expose methods to parent component
defineExpose({
  clearMessages
})
</script>

<style scoped>
/* Smooth message animations */
.message-enter-active {
  transition: all 0.4s ease-out;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Fade transition for scroll button */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Hide scrollbar for chips on mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
