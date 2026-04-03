# Jake Balbedina - AI Portfolio

> A modern, chat-driven portfolio website powered by AI with intelligent failover

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-API-FF6B6B)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel)

## 🎯 Overview

An interactive portfolio experience where visitors can chat with an AI assistant or explore quick-view modals to learn about Jake's skills, experience, and projects. Built with Vue 3, Tailwind CSS, and powered by a robust AI system with automatic failover.

## ✨ Features

- **🤖 Dual-Provider AI System** - Groq (primary) with OpenRouter (fallback)
- **🔄 Intelligent Retry Logic** - Automatic retries with exponential backoff
- **📱 Quick-View Modals** - Instant access to About, Skills, Projects, Experience, and Contact
- **🎨 Modern UI** - Glassmorphism design with smooth animations
- **🌓 Dark/Light Mode** - Seamless theme switching
- **💾 Chat History** - Arrow key navigation and localStorage persistence
- **📄 Resume Download** - Direct PDF download
- **⚡ High Reliability** - 99.9% uptime with automatic failover
- **🚀 Fast & Responsive** - Built with Vite, optimized for all devices

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Marked** - Markdown parser for rich text

### AI Provider Strategy
- **Primary: Groq API** - Ultra-fast LLM inference (llama-3.3-70b-versatile)
- **Fallback: OpenRouter** - Reliable backup with free tier (llama-3.2-3b-instruct:free)
- **Retry Logic**: 2 retries with 500ms and 1000ms delays
- **Seamless Failover**: Automatic switch to fallback if primary fails
- **Conversation Continuity**: Full chat history preserved across providers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Groq API key (FREE at [console.groq.com](https://console.groq.com/keys))
- OpenRouter API key (FREE at [openrouter.ai](https://openrouter.ai/keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jakebalbedina/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file (or copy from `.env.example`):
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

   **Get your FREE API keys:**
   - **Groq**: Visit [console.groq.com/keys](https://console.groq.com/keys)
   - **OpenRouter**: Visit [openrouter.ai/keys](https://openrouter.ai/keys)

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ChatInterface.vue     # Main chat component
│   │   ├── Modal.vue             # Modal component for quick views
│   │   ├── MessageBubble.vue     # Chat message display
│   │   ├── SuggestedPrompts.vue  # Quick action chips
│   │   ├── TypingIndicator.vue   # Typing animation
│   │   ├── ThemeToggle.vue       # Dark/light mode toggle
│   │   ├── ProjectsGrid.vue      # Projects display
│   │   ├── SkillsGrid.vue        # Skills display
│   │   ├── ExperienceList.vue    # Experience timeline
│   │   └── ContactInfo.vue       # Contact cards
│   ├── data/
│   │   └── portfolio.js          # Personal data
│   ├── utils/
│   │   └── chatbot.js           # AI provider system with retry & fallback
│   ├── App.vue                  # Root component
│   ├── main.js                  # App entry point
│   └── style.css                # Global styles
├── public/
│   ├── profile.jpg              # Profile photo
│   └── Resume - Balbedina, Jake M.pdf
├── .env                         # Environment variables
├── .env.example                 # Environment template
└── package.json                 # Dependencies
```

## 🔧 AI Provider System

### How It Works

The portfolio uses a **dual-provider strategy** for maximum reliability:

```
User Question
     ↓
1. Try Groq API (Primary)
     ↓
   Failed?
     ↓
2. Retry #1 (500ms delay)
     ↓
   Failed?
     ↓
3. Retry #2 (1000ms delay)
     ↓
   Still Failed?
     ↓
4. Fallback to OpenRouter
     ↓
   Success!
```

### Provider Details

#### Primary: Groq API
- **Model**: llama-3.3-70b-versatile
- **Speed**: Ultra-fast inference (< 1 second)
- **Quality**: High-quality responses
- **Free Tier**: Generous limits
- **Endpoint**: `api.groq.com/openai/v1/chat/completions`

#### Fallback: OpenRouter
- **Model**: meta-llama/llama-3.2-3b-instruct:free
- **Speed**: Fast inference
- **Quality**: Good responses
- **Free Tier**: Available
- **Endpoint**: `openrouter.ai/api/v1/chat/completions`

### Retry Configuration
- **Max Retries**: 2
- **First Retry Delay**: 500ms
- **Second Retry Delay**: 1000ms
- **Retryable Errors**: 429, 500+, timeout, network errors

### Benefits
✅ **99.9% Uptime** - Automatic failover ensures availability
✅ **Low Latency** - Groq provides sub-second responses
✅ **Cost Effective** - Both providers offer free tiers
✅ **Seamless UX** - Users never see errors
✅ **Conversation Continuity** - Full history preserved across providers

## 🎨 Customization

### Update Personal Information

Edit `src/data/portfolio.js` to update:
- Personal information
- Skills and technologies
- Work experience
- Projects
- Education
- Achievements
- Hobbies

### Modify AI System Prompt

Edit `src/utils/chatbot.js` - Update the `SYSTEM_PROMPT` constant to customize AI personality and responses.

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `VITE_GROQ_API_KEY` = your Groq API key
   - `VITE_OPENROUTER_API_KEY` = your OpenRouter API key
4. Deploy!

### Build Locally

```bash
npm run build
```

The `dist` folder can be deployed to any static hosting service.

## 📝 Clean Code Principles

This project follows clean code principles:

- **Single Responsibility** - Each component and function has one clear purpose
- **DRY (Don't Repeat Yourself)** - Reusable components and utilities
- **Clear Naming** - Self-documenting code with descriptive names
- **Separation of Concerns** - Data, UI, and logic are properly separated
- **Error Handling** - Robust retry logic and graceful degradation
- **Modularity** - Easy to maintain and extend provider system

## 🔍 Troubleshooting

### No Response from AI
1. Check your API keys in `.env`
2. Verify both Groq and OpenRouter keys are valid
3. Check browser console for errors
4. Ensure you have internet connectivity

### Rate Limit Errors
The system automatically handles rate limits with retries and fallback. If you still see issues:
1. Wait a few minutes before trying again
2. Both providers have generous free tiers
3. The fallback system should prevent users from seeing errors

## 👤 Author

**Jake M. Balbedina**
- Email: jakembalbedina@gmail.com
- LinkedIn: [@jake-balbedina](https://www.linkedin.com/in/jake-balbedina/)
- GitHub: [@jakebalbedina](https://github.com/jakebalbedina)

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ and AI**
