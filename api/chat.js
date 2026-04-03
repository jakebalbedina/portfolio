/**
 * Vercel Serverless Function for Chat API
 * Endpoint: /api/chat
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, conversationHistory = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Get OpenAI API key from environment
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    if (!OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OpenAI API key not configured',
        fallback: true
      })
    }

    // Portfolio data (same as frontend)
    const portfolioData = {
      personal: {
        name: "Jake M. Balbedina",
        title: "Software Developer",
        bio: "Passionate full-stack developer with expertise in modern web technologies. Currently building AI-powered applications and automation platforms. DOST Scholar with a strong foundation in computer science and a love for creating innovative solutions.",
        location: "Legazpi City, Philippines",
        email: "jakembalbedina@gmail.com",
        phone: ["+63 997 932 1632", "+63 976 181 7962"],
        linkedin: "https://www.linkedin.com/in/jake-balbedina/",
        github: "https://github.com/jakebalbedina"
      },
      skills: {
        categories: [
          { name: "Frontend Development", items: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "Vue"] },
          { name: "Backend Development", items: ["Node.js", "PHP", "Laravel", "C# Web API"] },
          { name: "Database", items: ["MySQL"] },
          { name: "Tools & Others", items: ["Git Version Control", "Claude Code"] }
        ]
      },
      experience: [
        {
          company: "Laivly",
          position: "Software Developer",
          period: "October 2023 - Present",
          duration: "Current",
          description: "Maintaining and developing features for a multi-platform AI application and automation platform for call centers using Vue.js, Electron, and C# Web API.",
          technologies: ["Vue.js", "Electron", "C# Web API"],
          current: true
        },
        {
          company: "Cloud Panda PH Inc.",
          position: "Software Engineer",
          period: "October 2021 - January 2023",
          duration: "1 year 4 months",
          description: "Revamping Inventory and POS System from CodeIgniter to ReactJs with a Laravel backend.",
          technologies: ["ReactJS", "Laravel", "CodeIgniter"],
          current: false
        }
      ],
      education: [
        {
          institution: "Bicol University College of Science",
          degree: "Bachelor of Science in Computer Science",
          period: "June 2015 - May 2019"
        }
      ],
      projects: [
        { name: "Portfolio Website", description: "AI-powered chat-driven portfolio website", technologies: ["Vue 3", "Tailwind CSS", "OpenAI API"] },
        { name: "Backend API", description: "TypeScript-based backend API service", technologies: ["TypeScript", "Node.js"] }
      ],
      achievements: [
        { title: "DOST Scholar", period: "2015-2019" },
        { title: "Accelerated Program", year: "2007" }
      ],
      hobbies: ["Dancing", "Singing", "Playing Guitar", "Football", "Basketball", "Volleyball"]
    }

    // System prompt
    const systemPrompt = `You are Jake Balbedina's AI assistant. You help visitors learn about Jake's professional background, skills, and experience.

Here is Jake's information:
- Name: ${portfolioData.personal.name}
- Title: ${portfolioData.personal.title}
- Location: ${portfolioData.personal.location}
- Email: ${portfolioData.personal.email}
- Bio: ${portfolioData.personal.bio}

Skills: ${portfolioData.skills.categories.map(cat => cat.items.join(', ')).join(' | ')}
Experience: Currently ${portfolioData.experience[0].position} at ${portfolioData.experience[0].company}
Education: ${portfolioData.education[0].degree} from ${portfolioData.education[0].institution}

Be friendly, professional, and enthusiastic about Jake's work. Keep responses conversational but informative.`

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('OpenAI API error:', errorData)
      throw new Error('OpenAI API request failed')
    }

    const data = await openaiResponse.json()
    const content = data.choices[0].message.content

    // Detect if we should show special components
    const component = detectComponent(message, content, portfolioData)

    return res.status(200).json({
      content,
      component: component?.type,
      data: component?.data
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({
      error: 'Failed to process chat request',
      message: error.message,
      fallback: true
    })
  }
}

/**
 * Detect if we should show special components
 */
function detectComponent(userMessage, aiResponse, portfolioData) {
  const message = userMessage.toLowerCase()
  const response = aiResponse.toLowerCase()

  const matchesIntent = (text, keywords) => {
    return keywords.some(keyword => text.includes(keyword.toLowerCase()))
  }

  if (matchesIntent(message, ['projects', 'portfolio', 'built', 'created']) ||
      matchesIntent(response, ['project', 'built', 'created'])) {
    return { type: 'projects', data: portfolioData.projects }
  }

  if (matchesIntent(message, ['skills', 'technologies', 'tech stack']) ||
      matchesIntent(response, ['skill', 'technolog'])) {
    return { type: 'skills', data: portfolioData.skills.categories }
  }

  if (matchesIntent(message, ['experience', 'job', 'career', 'worked']) ||
      matchesIntent(response, ['experience', 'worked', 'career'])) {
    return { type: 'experience', data: portfolioData.experience }
  }

  if (matchesIntent(message, ['contact', 'email', 'reach', 'phone', 'hire']) ||
      matchesIntent(response, ['contact', 'reach', 'email'])) {
    return { type: 'contact', data: portfolioData.personal }
  }

  return null
}
