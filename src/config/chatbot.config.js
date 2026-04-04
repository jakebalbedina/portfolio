/**
 * Chatbot API Configuration
 * Central configuration for API keys, models, and retry settings
 */

export const API_CONFIG = {
  // API Keys (from environment variables)
  GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
  OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY,

  // Model Selection
  MODELS: {
    GROQ: 'llama-3.3-70b-versatile',
    OPENROUTER: 'meta-llama/llama-3.2-3b-instruct:free',
  },

  // Retry Settings
  RETRY: {
    MAX_RETRIES: 2,
    DELAYS: [500, 1000], // Exponential backoff in ms
  },

  // Chat Settings
  CHAT: {
    MAX_HISTORY_MESSAGES: 6,
    TEMPERATURE: 0.7,
    MAX_TOKENS: 800,
  },

  // API Endpoints
  ENDPOINTS: {
    GROQ: 'https://api.groq.com/openai/v1/chat/completions',
    OPENROUTER: 'https://openrouter.ai/api/v1/chat/completions',
  },
}

// Intent Detection Keywords
export const INTENT_KEYWORDS = {
  skills: ['skill', 'technology', 'tech stack', 'programming', 'languages', 'framework'],
  projects: ['project', 'portfolio', 'work', 'built', 'developed', 'github'],
  experience: ['experience', 'job', 'work history', 'career', 'position', 'company'],
  contact: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github'],
}
