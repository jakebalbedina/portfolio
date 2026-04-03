<template>
  <div class="w-full max-w-[80rem] h-[calc(100vh-200px)] flex flex-col">
    <!-- Chat container with glassmorphism -->
    <div class="glass rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full border-2 border-white/20 dark:border-white/10">

      <!-- Messages area -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
        @scroll="handleScroll"
      >
        <!-- Welcome message -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full space-y-6">
          <div class="text-6xl animate-bounce">👋</div>
          <h2 class="text-3xl font-bold gradient-text text-center">
            Hey! I'm Jake's AI Assistant
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-center max-w-md">
            Ask me anything about Jake's experience, skills, projects, or how to get in touch!
          </p>

          <!-- Suggested prompts -->
          <SuggestedPrompts @openModal="handleOpenModal" />
        </div>

        <!-- Messages -->
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

      <!-- Suggested prompts (shown after first message) -->
      <div v-if="messages.length > 0 && !isTyping" class="px-6 pb-4 relative">
        <!-- Scroll to bottom button - centered above chips -->
        <Transition name="fade-scale">
          <div
            v-if="showScrollButton"
            class="flex justify-center mb-3"
          >
            <button
              @click="scrollToBottomSmooth"
              class="group px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-500 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              aria-label="Scroll to bottom"
            >
              <span class="text-sm font-medium">New messages</span>
              <svg class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </Transition>
        <SuggestedPrompts
          @openModal="handleOpenModal"
          :compact="true"
        />
      </div>

      <!-- Input area -->
      <div class="p-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <form @submit.prevent="sendMessage" class="flex gap-3">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Ask me anything about Jake..."
            class="flex-1 px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200/50 dark:border-gray-700/50 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
            :disabled="isTyping"
            @keydown="handleKeydown"
          />
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isTyping"
            class="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            <span v-if="!isTyping">Send</span>
            <span v-else>...</span>
          </button>
        </form>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Powered by AI • Responses may vary
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
import SuggestedPrompts from './SuggestedPrompts.vue'
import TypingIndicator from './TypingIndicator.vue'
import Modal from './Modal.vue'
import { getChatResponse } from '../utils/chatbot'

// Constants
const STORAGE_KEY = 'chatHistory'
const SCROLL_THRESHOLD = 100
const TYPING_DELAY = 1000

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
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
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
