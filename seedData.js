// Seed Data for AI Learning Tracker

export const DEFAULT_STUDENTS = [
  { id: "s1", name: "Aarav Sharma", joinedDate: "2026-05-01" },
  { id: "s2", name: "Kabir Mehta", joinedDate: "2026-05-01" },
  { id: "s3", name: "Diya Patel", joinedDate: "2026-05-02" },
  { id: "s4", name: "Isha Iyer", joinedDate: "2026-05-02" },
  { id: "s5", name: "Rohan Verma", joinedDate: "2026-05-03" },
  { id: "s6", name: "Priya Nair", joinedDate: "2026-05-03" },
  { id: "s7", name: "Amit Joshi", joinedDate: "2026-05-04" },
  { id: "s8", name: "Neha Gupta", joinedDate: "2026-05-04" }
];

export const DEFAULT_SUBJECTS = [
  { 
    id: "sub1", 
    name: "Prompt Engineering", 
    description: "System prompts, chain-of-thought, few-shot prompting, and context optimization." 
  },
  { 
    id: "sub2", 
    name: "Midjourney & GenArt", 
    description: "Image generation, parameters, style references, pan/zoom, and aspect ratios." 
  },
  { 
    id: "sub3", 
    name: "LLM APIs & Tool Use", 
    description: "Integrating APIs, function calling, JSON mode, and structured outputs." 
  },
  { 
    id: "sub4", 
    name: "AI Agents & Workflows", 
    description: "Building multi-agent systems, memory retrieval (RAG), and sequential loops." 
  },
  { 
    id: "sub5", 
    name: "No-Code AI Apps", 
    description: "Building fast prototypes using tools like v0, Bolt.new, and Replit Agent." 
  }
];

// Sample grades to populate the app on first load.
// Points are on a scale of 0 to 100.
export const DEFAULT_GRADES = [
  // Aarav Sharma
  { studentId: "s1", subjectId: "sub1", score: 92, feedback: "Excellent use of structural prompts. Very good logic breakdown.", date: "2026-05-08" },
  { studentId: "s1", subjectId: "sub2", score: 85, feedback: "Understood prompt parameters well, but could improve composition.", date: "2026-05-12" },
  { studentId: "s1", subjectId: "sub3", score: 88, feedback: "API calls are solid. Handled rate limiting gracefully.", date: "2026-05-18" },
  { studentId: "s1", subjectId: "sub4", score: 90, feedback: "Built a great customer support agent with routing.", date: "2026-05-22" },
  { studentId: "s1", subjectId: "sub5", score: 94, feedback: "Created a stunning dashboard using v0. Fast and clean.", date: "2026-05-26" },

  // Kabir Mehta
  { studentId: "s2", subjectId: "sub1", score: 88, feedback: "Good prompts, but could be more concise.", date: "2026-05-08" },
  { studentId: "s2", subjectId: "sub2", score: 96, feedback: "Outstanding creative eye. Midjourney styles were perfect.", date: "2026-05-12" },
  { studentId: "s2", subjectId: "sub3", score: 82, feedback: "API response parsing needs a bit more error handling.", date: "2026-05-18" },
  { studentId: "s2", subjectId: "sub4", score: 84, feedback: "Agent loops were functioning but had some redundant calls.", date: "2026-05-22" },
  { studentId: "s2", subjectId: "sub5", score: 90, feedback: "Nice app layout, deployment worked perfectly.", date: "2026-05-26" },

  // Diya Patel
  { studentId: "s3", subjectId: "sub1", score: 95, feedback: "Superb structured prompts. Zero hallucination achieved.", date: "2026-05-08" },
  { studentId: "s3", subjectId: "sub2", score: 90, feedback: "Very creative prompts. Great use of --sref parameters.", date: "2026-05-12" },
  { studentId: "s3", subjectId: "sub3", score: 96, feedback: "Perfect implementation of structured output and function calls.", date: "2026-05-18" },
  { studentId: "s3", subjectId: "sub4", score: 98, feedback: "Exceptional multi-agent RAG workflow. Professional grade.", date: "2026-05-22" },
  { studentId: "s3", subjectId: "sub5", score: 95, feedback: "Stunning v0 + React components, great responsiveness.", date: "2026-05-26" },

  // Isha Iyer
  { studentId: "s4", subjectId: "sub1", score: 84, feedback: "Understand formatting, needs better system prompt design.", date: "2026-05-08" },
  { studentId: "s4", subjectId: "sub2", score: 88, feedback: "Excellent lighting prompts, great image coherence.", date: "2026-05-12" },
  { studentId: "s4", subjectId: "sub3", score: 90, feedback: "Well structured code, easy to read and run.", date: "2026-05-18" },
  { studentId: "s4", subjectId: "sub4", score: 87, feedback: "Agent successfully retrieves vector data.", date: "2026-05-22" },
  { studentId: "s4", subjectId: "sub5", score: 89, feedback: "Smooth UI, good functionality.", date: "2026-05-26" },

  // Rohan Verma
  { studentId: "s5", subjectId: "sub1", score: 79, feedback: "Prompting is functional but lacks advanced constraints.", date: "2026-05-08" },
  { studentId: "s5", subjectId: "sub2", score: 82, feedback: "Good imagery. Try blending multiple reference images.", date: "2026-05-12" },
  { studentId: "s5", subjectId: "sub3", score: 80, feedback: "Basic API calls work. Needs JSON schema validation.", date: "2026-05-18" },
  { studentId: "s5", subjectId: "sub4", score: 83, feedback: "Agent is functional but sometimes enters infinite loops.", date: "2026-05-22" },
  { studentId: "s5", subjectId: "sub5", score: 86, feedback: "App styling is decent, but layout breaks on mobile.", date: "2026-05-26" },

  // Priya Nair
  { studentId: "s6", subjectId: "sub1", score: 91, feedback: "Excellent prompt chaining for complex reasoning tasks.", date: "2026-05-08" },
  { studentId: "s6", studentId: "sub2", score: 84, feedback: "Solid results, prompt structures are clean.", date: "2026-05-12" },
  { studentId: "s6", subjectId: "sub3", score: 89, feedback: "Great implementation of streaming responses.", date: "2026-05-18" },
  { studentId: "s6", subjectId: "sub4", score: 92, feedback: "Superb LangGraph implementation. Highly resilient.", date: "2026-05-22" },
  { studentId: "s6", subjectId: "sub5", score: 91, feedback: "Interactive and fun frontend, very responsive.", date: "2026-05-26" },

  // Amit Joshi
  { studentId: "s7", subjectId: "sub1", score: 80, feedback: "Good basic prompts. Needs work on parameter styling.", date: "2026-05-08" },
  { studentId: "s7", subjectId: "sub2", score: 80, feedback: "Experiment more with image weight parameter (--iw).", date: "2026-05-12" },
  { studentId: "s7", subjectId: "sub3", score: 78, feedback: "API tokens were hardcoded; move them to env files next time.", date: "2026-05-18" },
  { studentId: "s7", subjectId: "sub4", score: 81, feedback: "Basic RAG setup is working fine.", date: "2026-05-22" },
  { studentId: "s7", subjectId: "sub5", score: 85, feedback: "Good use of layout templates, functional app.", date: "2026-05-26" },

  // Neha Gupta
  { studentId: "s8", subjectId: "sub1", score: 86, feedback: "Good understanding of role-based instructions.", date: "2026-05-08" },
  { studentId: "s8", subjectId: "sub2", score: 91, feedback: "Excellent texture and detail prompts in Midjourney.", date: "2026-05-12" },
  { studentId: "s8", subjectId: "sub3", score: 85, feedback: "Good API integrations. Handled error cases nicely.", date: "2026-05-18" },
  { studentId: "s8", subjectId: "sub4", score: 88, feedback: "Agent works well, prompt loops are clean.", date: "2026-05-22" },
  { studentId: "s8", subjectId: "sub5", score: 90, feedback: "Created a lovely user interface with Bolt.new.", date: "2026-05-26" }
];
