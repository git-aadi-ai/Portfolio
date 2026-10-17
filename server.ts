import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const ADITYA_KNOWLEDGE_BASE = `
VERIFIED PROFILE & BACKGROUND OF ADITYA KUMAR JHA:

Name: Aditya Kumar Jha
Role / Headline: Aspiring AI Engineer | B.Tech CSE (AI) Student | Aspiring SDE
Status: OPEN FOR SDE & FREELANCE opportunities

Education:
- Degree: B.Tech in Computer Science & Engineering (Artificial Intelligence)
- Institution: Pranveer Singh Institute of Technology (PSIT), Kanpur (Affiliated to AKTU)
- Duration: 2024 – Present
- Academic Performance: Overall CGPA 8.5 / 10.0 (SGPA Sem 1: 8.41 | Sem 2: 8.41 | Sem 3: 8.52 | Sem 4: 8.45)
- Senior Secondary (CBSE 2024): Gaurav Memorial International School, Kanpur — 85.1%
- Secondary (CBSE 2022): Gaurav Memorial International School, Kanpur — 90.02%

Projects:
1. INTERVUIQ:
   - Description: AI-powered interview preparation and career development platform.
   - Technologies: React, TypeScript, Node.js, Express, Google Gemini, Firebase Authentication, Firestore.
   - Key Features:
     * 120+ curated DSA questions
     * Company/topic/difficulty/pattern/solved/search filtering
     * AI DSA Coach
     * AI mock interviews
     * Speech Coach (speaking volume, filler-word usage, speaking tempo / WPM)
     * Resume / ATS Analyzer with compatibility scoring and AI feedback
     * Structured diagnostic feedback and scoring
     * Career preparation features

2. YUNIVENT:
   - Description: Event management mobile application.
   - Technologies: Flutter, Firebase (Authentication, Firestore/Database).
   - Key Features:
     * Event creation & scheduling
     * Student & participant registration
     * User profile management
     * Real-time Firebase authentication & database integration

Patent:
- Title: "Intelligent Irrigation Control System with Automated Watering Based on Real-Time Data"
- Indian Patent Application Number: 202511077093 A
- Filing Date: 13/08/2025
- Publication Date: 05/09/2025 (Patent Office Journal No. 36/2025)
- Team: Co-inventor among a 10-member team.
- Technologies & Hardware:
  * ESP8266 Wi-Fi microcontroller
  * Blynk IoT Cloud platform
  * Soil moisture sensor with automated water pump relay
  * DHT11 temperature & humidity sensing
  * PIR motion security sensing
  * I2C LCD telemetry display

Technical Skills:
- Programming Languages: Python, C/C++, Java
- Core Subjects: Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Object-Oriented Programming (OOPS)
- Web & App Development: React, TypeScript, Node.js, Express, Flutter, Firebase, Web Development (HTML, CSS, JavaScript)
- Tools: VS Code, Android Studio, Git/GitHub
- Languages: English, Hindi

Certifications & Workshops:
- NVIDIA Training / Coursera: AI Infrastructure and Operations Fundamentals (Credential ID: XS36A92INGIJ, Issued August 13, 2026)
- HackerRank: Skill Certificates in Python, SQL, and Problem Solving; 5-Star Gold Badge in Problem Solving
- Generative AI Workshop — Techgyan Technologies, at IIT Kanpur (Antaragni), 17 August 2025
- Infosys Springboard: Programming Fundamentals using Python – Part 1 (9 October 2025); Bootstrap, HTML5, Python for Data Science, and CSS3
- Simplilearn SkillUp: Introduction to Flutter Course (10 December 2025)

Verified Contact & Profile Links:
- GitHub: https://github.com/git-aadi-ai
- LeetCode: https://leetcode.com/u/adityajha_12345/
- LinkedIn: https://linkedin.com/in/aditya-jha-a16514367
- Email: 2k24.csai1a.2412094@gmail.com
`;

const SYSTEM_INSTRUCTION = `You are Aditya Kumar Jha's personal portfolio AI assistant.

Answer questions about Aditya using ONLY the verified information provided in your context.

Be concise, professional, friendly and conversational.

You may explain Aditya's:
- education (B.Tech CSE AI at PSIT Kanpur, CGPA 8.5)
- projects (IntervuIQ, Yunivent)
- technical skills (Python, C/C++, Java, React, Node.js, Express, Flutter, Firebase, DSA)
- patent ("Intelligent Irrigation Control System with Automated Watering Based on Real-Time Data")
- certifications & achievements (HackerRank 5-Star Problem Solving, Generative AI workshop at IIT Kanpur)
- career direction (Aspiring AI Engineer / SDE)
- verified portfolio links (GitHub: https://github.com/git-aadi-ai, LeetCode: https://leetcode.com/u/adityajha_12345/, LinkedIn: linkedin.com/in/aditya-jha-a16514367, Email: 2k24.csai1a.2412094@gmail.com)

CRITICAL RULES FOR APPOINTMENT & MEETING INQUIRIES:
- When a user asks anything related to booking an appointment, scheduling a meeting, discussing a project, hiring, collaboration, arranging a call, or connecting with Aditya:
  * Do NOT claim that you have access to Aditya's calendar or that you can automatically book appointments.
  * Do NOT say "I don't have direct access to Aditya's calendar...".
  * Instead, respond enthusiastically and clearly, for example:
    "Absolutely! You can send Aditya an appointment request directly by email. Include your preferred date, time, and what you'd like to discuss, or use the Request Appointment button below to launch a prefilled email."
  * Note that the email draft is a request sent directly to Aditya's inbox.

CRITICAL RULES FOR UNRELATED QUESTIONS:
- If a user asks questions completely unrelated to Aditya, his projects, skills, or engineering portfolio (e.g. general trivia, unrelated homework, unrelated topics), politely explain that you are specifically designed as Aditya Kumar Jha's portfolio assistant to answer questions regarding his work, skills, and projects.

Never invent or assume:
- employment
- internships
- companies
- achievements
- technologies
- metrics
- personal information
- experience that is not explicitly provided.

If the information is not available, say:
"I don't have verified information about that yet. You can contact Aditya directly to know more."

Do not pretend to be Aditya.
You are his portfolio AI assistant.

Context Knowledge:
${ADITYA_KNOWLEDGE_BASE}`;

// Helper to detect appointment/meeting intent
function detectAppointmentIntent(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  const keywords = [
    'appointment',
    'schedule',
    'meeting',
    'meet with',
    'book',
    'call with',
    'arrange a call',
    'hire',
    'hiring',
    'collaborat',
    'work with',
    'discuss a project',
    'connect with',
    'interview',
  ];
  return keywords.some((kw) => lower.includes(kw));
}

// API Health Check for container probes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Route for AI Assistant with multi-model fallback and retry
app.post('/api/ai/ask', async (req, res) => {
  const { question, history } = req.body;

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Please provide a valid question.' });
  }

  const isAppointmentIntent = detectAppointmentIntent(question);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // If API key is not yet set up, provide a graceful, helpful response
    if (isAppointmentIntent) {
      return res.json({
        answer:
          "Absolutely! You can send Aditya an appointment request directly by email with your preferred date, time, and discussion topic. Click the Request Appointment button below to start.",
        isAppointmentIntent: true,
      });
    }
    return res.json({
      answer:
        "Aditya Kumar Jha is an aspiring AI Engineer and B.Tech CSE (AI) student at PSIT Kanpur (CGPA 8.5). He built IntervuIQ (AI career platform) and Yunivent, and co-invented a published IoT irrigation patent. Feel free to contact him directly at 2k24.csai1a.2412094@gmail.com.",
      isAppointmentIntent: false,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format conversation contents
    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: question.trim() }],
    });

    // Model fallback sequence for resilience against transient high demand (503 / 429)
    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-3.7-flash',
      'gemini-3.1-flash-lite',
    ];

    let lastError: any = null;
    let generatedText: string | null = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
            topP: 0.95,
          },
        });

        if (response?.text) {
          generatedText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} unavailable or rate-limited, trying next fallback:`, err?.message || err);
        // Brief delay before trying next fallback model
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    if (!generatedText) {
      // If all live API models are temporarily experiencing spikes, provide a deterministic verified answer
      const qLower = question.toLowerCase();
      let fallbackAnswer = '';

      if (isAppointmentIntent) {
        fallbackAnswer =
          "Absolutely! You can send Aditya an appointment request directly by email. Please include your preferred date, time, and what you'd like to discuss using the Request Appointment button below.";
      } else if (qLower.includes('intervuiq')) {
        fallbackAnswer =
          "IntervuIQ is Aditya's AI-powered interview preparation and career platform. It features 120+ curated DSA questions, company & difficulty filtering, AI DSA Coach, Speech Coach, ATS Resume Analyzer, and AI mock interviews built with React, TypeScript, Node.js, Express, Gemini, and Firebase.";
      } else if (qLower.includes('yunivent')) {
        fallbackAnswer =
          "Yunivent is an event management mobile application developed by Aditya using Flutter and Firebase. It supports event scheduling, participant registrations, and real-time database management.";
      } else if (qLower.includes('patent') || qLower.includes('irrigation')) {
        fallbackAnswer =
          "Aditya co-invented a published Indian patent titled 'Intelligent Irrigation Control System with Automated Watering Based on Real-Time Data' (App No: 202511077093 A). It utilizes ESP8266 Wi-Fi, Blynk IoT Cloud, soil moisture sensors, DHT11 sensors, and an automated water pump.";
      } else if (qLower.includes('skill') || qLower.includes('tech') || qLower.includes('stack')) {
        fallbackAnswer =
          "Aditya's technical expertise spans Python, C/C++, Java, React, TypeScript, Node.js, Express, Flutter, Firebase, and Data Structures & Algorithms (HackerRank 5-Star Problem Solver).";
      } else if (qLower.includes('opportunit') || qLower.includes('hire') || qLower.includes('work') || qLower.includes('status')) {
        fallbackAnswer =
          "Aditya is currently open for SDE roles and freelance software/AI engineering opportunities. You can reach out directly via email at 2k24.csai1a.2412094@gmail.com or connect on LinkedIn.";
      } else {
        fallbackAnswer =
          "Aditya Kumar Jha is an aspiring AI Engineer and B.Tech CSE (AI) student at PSIT Kanpur with an 8.5 CGPA. He has created platforms like IntervuIQ, published an IoT patent on smart irrigation, and has strong skills in Python, DSA, React, and Firebase.";
      }

      return res.json({
        answer: fallbackAnswer,
        isAppointmentIntent: isAppointmentIntent || detectAppointmentIntent(fallbackAnswer),
      });
    }

    const answer =
      generatedText ||
      "I don't have verified information about that yet. You can contact Aditya directly to know more.";

    const detectedInAnswer = detectAppointmentIntent(answer);

    return res.json({
      answer,
      isAppointmentIntent: isAppointmentIntent || detectedInAnswer,
    });
  } catch (error: any) {
    console.error('Error generating AI answer:', error);
    // Graceful, friendly user-facing error message - never expose raw JSON / ApiError
    if (isAppointmentIntent) {
      return res.json({
        answer:
          "Absolutely! You can send Aditya an appointment request directly by email with your preferred date, time, and topic to discuss. Click the button below to compose your request.",
        isAppointmentIntent: true,
      });
    }
    return res.status(500).json({
      error: 'The AI assistant is temporarily busy. Please try again in a few moments or contact Aditya directly via email.',
    });
  }
});

async function startServer() {
  const distPath = path.join(process.cwd(), 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));

  if (process.env.NODE_ENV === 'production' || hasDist) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
