/**
 * Portfolio Data
 * Central data source for all portfolio information
 * Used by chatbot AI and UI components
 */
export const portfolioData = {
  // Personal Information
  personal: {
    name: "Jake M. Balbedina",
    title: "Software Developer",
    bio: "Passionate full-stack developer with expertise in modern web technologies. Currently building AI-powered applications and automation platforms.",
    emoji: "💻",
    location: "Legazpi City, Philippines",
    email: "jakembalbedina@gmail.com",
    phone: ["+63 997 932 1632", "+63 976 181 7962"],
    linkedin: "https://www.linkedin.com/in/jake-balbedina/",
    github: "https://github.com/jakebalbedina",
    address: "Unit 2 Lot 20 Block 3 Ecoville Subdivision Rawis Legazpi City"
  },

  // Technical Skills
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "Vue"],
    backend: ["Node.js", "PHP", "Laravel", "C# Web API"],
    database: ["MySQL", "PostgreSQL"],
    tools: ["Git Version Control", "Claude Code"],
    categories: [
      {
        name: "Frontend Development",
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "Vue"]
      },
      {
        name: "Backend Development",
        items: ["Node.js", "PHP", "Laravel", "C# Web API"]
      },
      {
        name: "Database",
        items: ["MySQL", "PostgreSQL"]
      },
      {
        name: "Tools & Others",
        items: ["Git Version Control", "Claude Code"]
      }
    ]
  },

  // Work Experience
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
    },
    {
      company: "Genius Giant",
      position: "Freelance Backend Developer",
      period: "April 2020 - October 2023",
      duration: "3 years 7 months",
      description: "Creating API endpoints using Laravel and a MySQL database for a mobile application, specifically a social media app.",
      technologies: ["Laravel", "MySQL", "API Development"],
      current: false
    },
    {
      company: "Boomsourcing Inc.",
      position: "Jr. Front-end Developer",
      period: "October 2019 - March 2020",
      duration: "6 months",
      description: "Training on frontend development focuses on the basics of HTML, CSS, and Javascript. It also includes discussions on ReactJS, NodeJS, and Postgres.",
      technologies: ["HTML", "CSS", "JavaScript", "ReactJS", "NodeJS"],
      current: false
    }
  ],

  // Education
  education: [
    {
      institution: "Bicol University College of Science",
      degree: "Bachelor of Science in Computer Science",
      period: "June 2015 - May 2019",
      graduated: true
    }
  ],

  // Achievements
  achievements: [
    {
      title: "Accelerated Program",
      year: "2007",
      description: "Participated in accelerated learning program"
    }
  ],

  // Projects
  projects: [
    {
      name: "Portfolio Website",
      description: "AI-powered chat-driven portfolio website built with Vue 3",
      technologies: ["Vue 3", "Tailwind CSS", "OpenAI API"],
      github: "https://github.com/jakebalbedina/portfolio",
      type: "personal"
    },
    {
      name: "Backend API",
      description: "TypeScript-based backend API service",
      technologies: ["TypeScript", "Node.js"],
      github: "https://github.com/jakebalbedina/backend-api",
      type: "personal"
    },
    {
      name: "NextRegSite",
      description: "Registration site built with Next.js and TypeScript",
      technologies: ["TypeScript", "Next.js"],
      github: "https://github.com/jakebalbedina/NextRegSite",
      type: "personal"
    },
    {
      name: "Simple Messaging Project",
      description: "Real-time messaging application",
      technologies: ["JavaScript"],
      github: "https://github.com/jakebalbedina/simple-messaging-project",
      type: "personal"
    },
    {
      name: "Geo Location App",
      description: "Location-based application",
      technologies: ["JavaScript"],
      github: "https://github.com/jakebalbedina/geo-location",
      type: "personal"
    },
    {
      name: "Customer Support Widget System",
      description: "Simple customer support widget implementation",
      technologies: ["TypeScript"],
      github: "https://github.com/jakebalbedina/simple-customer-support-widget-system",
      type: "personal"
    }
  ],

  // Hobbies & Interests
  hobbies: [
    "Dancing",
    "Singing",
    "Playing Guitar",
    "Football",
    "Basketball",
    "Volleyball"
  ],

  // Career Highlights
  quickFacts: [
    "4+ years of professional development experience",
    "Specialized in Vue.js and React",
    "Full-stack developer with AI integration expertise",
  ]
}

export default portfolioData
