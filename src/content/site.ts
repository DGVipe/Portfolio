/**
 * All portfolio content lives here. Edit this file to update the site —
 * no component changes required.
 *
 * Any text field accepts either a plain string (same in every language) or
 * `{ en: "...", es: "..." }`.
 * Interface strings (buttons, form labels…) live in `src/lib/i18n/messages.ts`.
 */
import type { Text } from "@/lib/i18n/locale";

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export type Project = {
  title: Text;
  /** Short label shown above the title (e.g. stack or category). */
  category: Text;
  /** Main description shown under the title. */
  summary: Text;
  /** One-line result/impact shown beside the summary. */
  outcome: Text;
  tags: string[];
  links?: { live?: string; source?: string };
  /**
   * Path to a screenshot in /public (e.g. "/projects/alpha.png"), or one per
   * language. When omitted a generated gradient placeholder is shown instead.
   */
  image?: Text;
  /** Two colors used for the placeholder cover gradient. */
  palette: [string, string];
};

const EMAIL = "dgvipedev@gmail.com";

export const site = {
  name: "Diego Alveal",
  role: { en: "Software Developer", es: "Desarrollador de software" } as Text,
  /** Used for the meta description. */
  description:
    "Software developer in Victoria, Chile. I build full-stack web apps and AI agents with technologies like Next.js, FastAPI and LangGraph, bringing reliable, efficient and accessible solutions.",
  url: "https://www.diegoalveal.com",
  location: "Victoria, Chile" as Text,
  email: EMAIL,
  /** CV file in /public, downloaded by the header's CV button — one path, or one per language. */
  cv: { en: "/cv-en.pdf", es: "/cv-es.pdf" } as Text,

  about: {
    title: { en: "About me", es: "Sobre mí" } as Text,
    paragraphs: [
      {
        en: "I'm a computer science engineer with a passion for learning and for building solutions that are long lasting, reliable, efficient, and accessible to anyone who needs them. I care about clean architecture, honest trade-offs, and leaving codebases as tidy as possible",
        es: "Soy ingeniero en computación y me apasiona aprender y construir soluciones que perduren y sean confiables, eficientes y accesibles para cualquiera que las necesite. Me importan la arquitectura limpia, la honestidad al evaluar compromisos técnicos y dejar el código lo más ordenado posible.",
      },
      {
        en: "Every problem has many possible solutions. Finding an efficient one and making it work is what excites me most, and it's what keeps me researching and discovering new ways to solve each challenge.",
        es: "Todo problema tiene muchas soluciones posibles. Encontrar una eficiente y hacerla funcionar es lo que más me entusiasma, y lo que me impulsa a investigar y descubrir nuevas formas de resolver cada desafío.",
      },
    ] as Text[],
    facts: [
      { label: { en: "Based in", es: "Ubicación" }, value: "Victoria, Chile" },
      { label: { en: "Focus", es: "Enfoque" }, value: { en: "Full-Stack Development", es: "Desarrollo Full-Stack" } },
      { label: { en: "Currently", es: "Actualmente" }, value: { en: "Artificial Intelligence", es: "Inteligencia Artificial" } },
    ] satisfies { label: Text; value: Text }[],
    skills: [
      { group: { en: "Languages", es: "Lenguajes" }, items: ["Python", "JavaScript", "TypeScript", "HTML5", "PHP", "CSS3", "SQL", "C"] },
      { group: { en: "Machine Learning & AI", es: "Machine Learning e IA" }, items: ["vLLM", "Ollama", "Qwen", "Claude", "Whisper", "FastMCP", "LangGraph", "LangChain", "Tesseract"] },
      { group: "Backend", items: ["FastAPI", "Node.js", "Firebase", "PostgreSQL", "MySQL", "Redis", "Convex"] },
      { group: "Frontend", items: ["React", "Next.js", "TailwindCSS", "shadcn/ui"] },
      { group: { en: "Mobile", es: "Móvil" }, items: ["Flutter", "React Native"] },
      { group: { en: "Tools & DevOps", es: "Herramientas y DevOps" }, items: ["Git", "Docker", "VS Code"] },
    ] satisfies { group: Text; items: string[] }[],
  },

  featuredProjects: [
    {
      title: { en: "Receipt Scanner", es: "Escáner de boletas" },
      category: { en: "OCR · Web app", es: "OCR · Aplicación web" },
      summary: {
        en: "Receipt-scanning web app that reads the store, date and total from a photo with in-browser OCR and saves them to Convex. Paginated receipt and store lists, Excel export, and an English and Spanish interface.",
        es: "Aplicación web para escanear boletas que lee la tienda, la fecha y el total desde una foto con OCR en el navegador y los guarda en Convex. Listas paginadas de boletas y tiendas, exportación a Excel e interfaz en inglés y español.",
      },
      outcome: {
        en: "An external OCR server isn't needed. Only the three extracted fields are sent and validated.",
        es: "No es necesario un servidor OCR externo. Solo se envían y validan los tres campos extraídos.",
      },
      tags: ["Next.js", "TypeScript", "Tesseract.js", "Convex", "Tailwind CSS", "Vercel"],
      links: {
        live: "https://project-ocr-receipts.vercel.app",
        source: "https://github.com/DGVipe/project-ocr-receipts",
      },
      image: { en: "/projects/receipt-scanner.png", es: "/projects/receipt-scanner-es.png" },
      palette: ["oklch(0.62 0.19 35)", "oklch(0.78 0.14 70)"],
    },
    {
      title: "CINAP",
      category: { en: "AI · Thesis project", es: "IA · Proyecto de título" },
      summary: {
        en: "Academic advising platform where teachers book and manage sessions with a conversational AI agent over web chat, voice and Telegram, synced with Google Calendar. Thesis project for Universidad Católica de Temuco and CINAP.",
        es: "Plataforma de asesorías académicas donde los docentes agendan y gestionan sesiones con un agente conversacional de IA por chat web, voz y Telegram, sincronizadas con Google Calendar. Proyecto de título para la Universidad Católica de Temuco y el CINAP.",
      },
      outcome: {
        en: "Under 2 s average response latency, validated across web, Telegram and voice with up to 10 concurrent users.",
        es: "Latencia promedio bajo 2 s, validada en web, Telegram y voz con hasta 10 usuarios simultáneos.",
      },
      tags: ["Next.js", "FastAPI", "LangGraph", "FastMCP", "vLLM", "Whisper", "Redis", "PostgreSQL"],
      links: { source: "https://github.com/patoskixd/Proyecto-Cinap" },
      image: "/projects/cinap.png",
      palette: ["oklch(0.45 0.14 265)", "oklch(0.65 0.12 200)"],
    },
  ] satisfies Project[],

  contact: {
    title: { en: "Contact", es: "Contacto" } as Text,
    blurb: {
      en: "Have a question or want to work together? Leave a message and I'll get back to you as soon as I can.",
      es: "¿Tienes una pregunta o quieres trabajar juntos? Déjame un mensaje y te responderé lo antes posible.",
    } as Text,
  },

  socials: [
    { label: "GitHub", href: "https://github.com/DGVipe", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/diego-alveal-vasquez/", icon: "linkedin" },
    { label: "Email", href: `mailto:${EMAIL}`, icon: "mail" },
  ] satisfies SocialLink[],

  /** Section ids in page order; labels come from the i18n messages (`nav`). */
  nav: ["about", "work", "contact"] as const,
};

export type SectionId = (typeof site.nav)[number];
