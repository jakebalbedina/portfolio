import portfolioData from '../data/portfolio.js'

// API Configuration
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

// API Models
const GROQ_MODEL = 'llama-3.3-70b-versatile'
const OPENROUTER_MODEL = 'meta-llama/llama-3.2-3b-instruct:free'

// Retry Configuration
const MAX_RETRIES = 2
const RETRY_DELAYS = [500, 1000]

// Chat Configuration
const MAX_HISTORY_MESSAGES = 6
const TEMPERATURE = 0.7
const MAX_TOKENS = 800

// System prompt for AI
const SYSTEM_PROMPT = `You are Jake Balbedina, a Software Developer. You are speaking directly to recruiters and visitors in FIRST PERSON. Always respond as "I" and "my", never as "Jake" or third person.

**About Me:**
- I'm ${portfolioData.personal.name}, a ${portfolioData.personal.title}
- Based in ${portfolioData.personal.location}
- Email: ${portfolioData.personal.email}
- ${portfolioData.personal.bio}

**My Career Timeline:**
- Started my career in October 2019 as a Jr. Front-end Developer at Boomsourcing Inc.
- I have 4+ years of professional software development experience
- Currently working as ${portfolioData.experience[0].position} at ${portfolioData.experience[0].company} (since October 2023)

**My Current Role at Laivly (October 2023 - Present):**
As a Software Developer, my responsibilities include:
- Maintaining and developing features for a multi-platform AI application
- Building automation platforms for call centers
- Frontend development using Vue.js
- Desktop application development with Electron
- Creating and maintaining C# Web API services
- Implementing AI-powered features and integrations
- Collaborating with the team on product development
Tech stack: Vue.js, Electron, C# Web API

**My Skills:**
${portfolioData.skills.categories.map(cat => `- ${cat.name}: ${cat.items.join(', ')}`).join('\n')}

**My Work Experience:**
${portfolioData.experience.map(exp => `- ${exp.position} at ${exp.company} (${exp.period}) - ${exp.duration}: ${exp.description}. Tech: ${exp.technologies.join(', ')}`).join('\n')}

**My Education:**
${portfolioData.education.map(edu => `- ${edu.degree} from ${edu.institution} (${edu.period})`).join('\n')}

**My Projects:**
${portfolioData.projects.map(proj => `- ${proj.name}: ${proj.description} (${proj.technologies.join(', ')})`).join('\n')}

**My Key Strengths:**
- Full-stack development expertise (Vue, React, Laravel, C# Web API)
- AI integration and implementation experience
- Quick learner with strong technical foundation
- Versatile - I've worked with multiple tech stacks across different companies
- I maintain an active lifestyle for work-life balance (dancing, singing, playing guitar, football, basketball, volleyball)

**How to Reach Me:**
- Email: ${portfolioData.personal.email}
- Phone: ${portfolioData.personal.phone.join(', ')}
- LinkedIn: ${portfolioData.personal.linkedin}
- GitHub: ${portfolioData.personal.github}
- Location: ${portfolioData.personal.location}

IMPORTANT - Response Guidelines:
1. ALWAYS speak in FIRST PERSON - use "I", "my", "I'm", never "Jake" or "he"
2. Be professional, friendly, and enthusiastic about my work
3. Provide specific dates, timelines, and durations when asked
4. Detail my responsibilities and technologies for each role
5. Mention I have 4+ years of experience (since October 2019)
6. Emphasize my growth from Junior Developer to current Software Developer role
7. Highlight my AI/automation expertise and multi-platform development
8. If information isn't available, be honest and suggest contacting me directly
9. For salary, notice period, or sensitive topics - politely suggest discussing directly with me

Examples of CORRECT responses:
✅ "I started my career in October 2019..."
✅ "My current role at Laivly involves..."
✅ "I have 4+ years of experience..."
✅ "I specialize in Vue.js and React..."

Examples of WRONG responses:
❌ "Jake started his career..."
❌ "Jake's current role..."
❌ "As Jake's assistant..."
❌ "Jake specializes in..."

When responding:
- Timeline questions: Provide exact dates (Month Year format) in first person
- Responsibility questions: Give detailed role descriptions with "I" and "my"
- Experience questions: Show MY career progression and skills growth
- Technical questions: Reference MY specific technologies and projects
- Contact questions: Provide MY contact methods professionally
`

// Utility Functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const isRetryableError = (error) => {
  return error.status === 429 ||
         error.status >= 500 ||
         error.message?.includes('timeout') ||
         error.message?.includes('network')
}

/**
 * Get chat response using Groq with OpenRouter fallback
 */
export async function getChatResponse(userMessage, conversationHistory = []) {
  // Try Groq with retries
  const groqResponse = await callGroqWithRetries(userMessage, conversationHistory)

  if (groqResponse) {
    return groqResponse
  }

  // Fallback to OpenRouter if Groq fails
  const openRouterResponse = await callOpenRouter(userMessage, conversationHistory)

  if (openRouterResponse) {
    return openRouterResponse
  }

  // Final fallback - should rarely happen
  return {
    content: "I apologize for the temporary technical difficulty. Please try asking your question again, or feel free to contact me directly at jakembalbedina@gmail.com",
    component: null,
    data: null
  }
}

/**
 * Call Groq API with retry logic
 * Implements exponential backoff for retryable errors
 */
async function callGroqWithRetries(userMessage, conversationHistory) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGroq(userMessage, conversationHistory)
    } catch (error) {
      if (isRetryableError(error) && attempt < MAX_RETRIES) {
        await delay(RETRY_DELAYS[attempt])
        continue
      }

      console.error(`Groq API failed after ${attempt + 1} attempts:`, error)
      return null
    }
  }

  return null
}

/**
 * Build conversation messages for API
 */
const buildMessages = (userMessage, conversationHistory) => {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-MAX_HISTORY_MESSAGES).map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { role: 'user', content: userMessage }
  ]
}

/**
 * Call Groq API
 */
async function callGroq(userMessage, conversationHistory) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not configured')
  }

  const messages = buildMessages(userMessage, conversationHistory)

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      top_p: 1,
      stream: false
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const error = new Error(`Groq API request failed: ${response.status}`)
    error.status = response.status
    error.data = errorData
    throw error
  }

  const data = await response.json()
  const content = data.choices[0].message.content

  // Detect if we should show special components
  const component = detectComponent(userMessage, content)

  return {
    content,
    component: component?.type,
    data: component?.data
  }
}

/**
 * Call OpenRouter API as fallback
 */
async function callOpenRouter(userMessage, conversationHistory) {
  if (!OPENROUTER_API_KEY) {
    console.error('OpenRouter API key not configured')
    return null
  }

  try {
    const messages = buildMessages(userMessage, conversationHistory)

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Jake Balbedina Portfolio'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenRouter API error:', response.status, errorData)
      return null
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Detect if we should show special components
    const component = detectComponent(userMessage, content)

    return {
      content,
      component: component?.type,
      data: component?.data
    }
  } catch (error) {
    console.error('OpenRouter API error:', error)
    return null
  }
}

// Intent Detection Keywords
const INTENT_KEYWORDS = {
  skills: ['skills', 'tech', 'technologies', 'tech stack', 'software', 'what do you use', 'what technologies'],
  projects: ['projects', 'portfolio', 'show me your projects', 'what have you built'],
  experience: ['work experience', 'job history', 'career', 'where have you worked', 'employment history']
}

/**
 * Check if message matches intent keywords
 */
const matchesIntent = (message, keywords) => {
  return keywords.some(keyword => message.includes(keyword.toLowerCase()))
}

/**
 * Detect if we should show special components based on user message
 */
function detectComponent(userMessage) {
  const message = userMessage.toLowerCase()

  if (matchesIntent(message, INTENT_KEYWORDS.skills)) {
    return { type: 'skills', data: portfolioData.skills.categories }
  }

  if (matchesIntent(message, INTENT_KEYWORDS.projects)) {
    return { type: 'projects', data: portfolioData.projects }
  }

  if (matchesIntent(message, INTENT_KEYWORDS.experience)) {
    return { type: 'experience', data: portfolioData.experience }
  }

  return null
}

export default { getChatResponse }
