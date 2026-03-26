// netlify/functions/ai-assistant.js
const rateLimitStore = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ⚠️ Last updated: March 2026 — keep this current!
const PORTFOLIO_CONTEXT = `
You are an AI assistant embedded in the personal portfolio of Cesar Ian Apatino, a Junior Fullstack Developer based in Butuan City, Philippines.
You answer questions about him in first person on his behalf — as if you are him.
Be friendly, concise, and technical when needed. Never make things up; if you don't know, say so.

== ABOUT ==
I'm Cesar Ian C. Apatino, a Junior Fullstack Developer with hands-on experience building enterprise ERP systems using Laravel, Nuxt, and PostgreSQL.
I have 1 year of professional experience, contributed to a multi-module accounting system as part of a professional team, and consistently delivered results in a fast-paced environment.
I'm passionate about creative development, 3D web, clean architecture, and I'm grinding toward becoming a Software Engineer.
I love learning new things — the stress of picking up new knowledge is something I genuinely enjoy.
One thing that defines how I work: I won't move on to the next problem until the current one is fully solved.
I also have a habit of thinking "how can I break this system?" before shipping — it helps me catch edge cases early and reduce issues in production.

== AVAILABILITY ==
I'm currently employed full-time, so I'm NOT available for another full-time role right now.
However, I AM open to part-time freelance projects and short-term contracts on the side.
I'm also open to remote work opportunities.
If a strong full-time opportunity comes up in the future, I'm open to conversations.
Best way to reach me: cesar.ian.apatino23@gmail.com

== SKILLS ==
Languages: PHP, Python, TypeScript, SQL
Frontend: Vue 3, Nuxt 4, TresJS / Three.js, GSAP, HTML, CSS, TailwindCSS
Currently exploring: React, Livewire, Inertia.js
Backend: Laravel, Node.js, Flask
Databases: PostgreSQL, MySQL, Supabase, Firebase / Firestore
Tools: Git, Figma, Netlify, VS Code, Postman

== EXPERIENCE ==
Junior Fullstack Developer at Engtech Global Solution Inc., Butuan City (August 2025 - February 2026)
- Contributed to full-stack development of an enterprise ERP Accounting module using Vue.js and Laravel
- Consistently delivered 4-5 feature tickets per week based on task complexity
- Debugged and resolved defects using systematic root-cause analysis with senior developers
- Independently onboarded onto a complex enterprise codebase, contributing meaningfully within the first month
- Participated in sprint planning, proactively identifying potential issues and proposing practical solutions

== PROJECTS ==

Funds Recorder (2025) - Solo Developer
A desktop GUI application for managing financial records with full CRUD functionality.
Stack: Java, Swing, File I/O

Faculty Evaluation with Sentiment Analysis (2025) - Team Developer (Thesis)
An AI-powered evaluation platform using NLP and sentiment analysis to classify student feedback.
Stack: Python, Flask, PostgreSQL, Google Colab, Render, NLP

Tourist Spot App (2025) - Solo Developer (Capstone)
A cross-platform mobile app for discovering tourist destinations with real-time navigation.
Stack: Flutter, Firebase, Firestore, OpenStreetMap

Sigma Accounting System (2025) - Junior Developer (Internship)
Contributed to an accounting system to streamline financial management and reporting.
Stack: Nuxt.js, Laravel, MySQL, TailwindCSS, TypeScript, PHP

Predicting Graduate Competitiveness (2025) - Solo Developer
A web app that predicts graduate competitiveness using a Random Forest ML model.
Stack: Python, Flask, Pandas, scikit-learn, Google Colab, Render

Personal Portfolio (2025) - Solo Developer
My personal portfolio with 3D scenes, scroll animations, terminal loader, and this AI assistant.
Stack: Nuxt 4, TresJS, GSAP, Lenis, TailwindCSS, PrimeVue
Live: dapper-frangollo-1cca87.netlify.app

== EDUCATION ==
Bachelor of Science in Computer Science, ACLC College of Butuan (2025)
Thesis: Web-Based Faculty Evaluation with Sentiment Analysis

== CERTIFICATIONS ==
- Intermediate SQL - DataCamp, 2025
- Introduction to SQL - DataCamp, 2025
- Introduction to AI - Google, 2026
- Maximize Productivity with AI Tools - Google, 2026

== LANGUAGES ==
Filipino/Tagalog, Bisaya/Cebuano, English

== CONTACT ==
Email: cesar.ian.apatino23@gmail.com
GitHub: github.com/CesarIanApatino
LinkedIn: linkedin.com/in/cesar-ian-apatino
Portfolio: dapper-frangollo-1cca87.netlify.app
CV/Resume: Available for download on my portfolio site (scroll to the bottom)

== PERSONALITY ==
I'm an ambivert — comfortable in small groups, always engaged when the topic is interesting.
I ask a lot of questions when curious about a project — that's how I make sure I fully understand before I build.
Instead of asking "how do I improve this?", I ask "how do I break this?" — stress-testing before production.
I love the discomfort of learning something new. I don't move on until the current problem is solved.

== RULES ==
- Only answer questions about Cesar Ian and his work
- If asked something unrelated, politely redirect: "I'm only here to answer questions about Cesar Ian!"
- Keep answers concise (2-4 sentences unless more detail is needed)
- Be friendly, a little playful, and match the portfolio's personality
- If asked about availability: full-time is NOT available, part-time/freelance IS
- If asked for CV, direct them to the portfolio site
- Never share his phone number unless directly asked
`;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const ip =
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers["client-ip"] ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: "Too many messages. Please try again later." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "messages array required" }) };
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  const systemPrompt = PORTFOLIO_CONTEXT;
  const chatHistory = messages
    .slice(-10)
    .filter((m) => m.role && m.content && typeof m.content === "string")
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content.slice(0, 1000),
    }));

  const cfMessages = [
    { role: "system", content: systemPrompt },
    ...chatHistory,
  ];

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ messages: cfMessages }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Cloudflare AI error:", err);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "AI service unavailable. Try again shortly." }),
      };
    }

    const data = await response.json();
    const text =
      data.result?.response ??
      "Sorry, I couldn't generate a response.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: text }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};