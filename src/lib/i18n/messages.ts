import type { Locale } from "./locale";

/**
 * Interface strings (navigation, buttons, form labels, errors, ARIA labels).
 * Portfolio content (about, projects…) lives in `src/content/site.ts`.
 */
const en = {
  nav: { about: "About", work: "Work", contact: "Contact" },
  navLabels: { main: "Main", mobile: "Mobile", footer: "Footer" },
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  cv: { label: "CV", download: "Download CV" },
  switchLanguage: "Cambiar a español",
  toggleTheme: "Dark mode",

  hero: {
    greeting: "Hi, I'm",
    viewWork: "View my work",
    getInTouch: "Get in touch",
    scrollToAbout: "Scroll to About section",
  },

  about: { skills: "Skills & tools", photoOf: (name: string) => `Photo of ${name}` },

  work: {
    title: "Selected work",
    viewProject: "View project",
    source: "Source",
    opensInNewTab: "(opens in a new tab)",
    sourceFor: (title: string) => `code for ${title} (opens in a new tab)`,
    screenshotOf: (title: string) => `Screenshot of ${title}`,
  },

  contact: {
    copyEmail: "Copy email address",
    copied: "Email copied to clipboard",
    copyFailed: "Couldn't copy — please copy it manually.",
    form: {
      label: "Contact form",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message here...",
      send: "Send message",
      subject: (name: string) => `Portfolio inquiry from ${name}`,
      opening: "Opening your email app…",
      openingHint: (email: string) => `If nothing happens, email me directly at ${email}.`,
      errors: {
        nameRequired: "Please enter your name.",
        emailRequired: "Please enter your email.",
        emailInvalid: "Please enter a valid email address.",
        messageShort: "Message should be at least 10 characters.",
      },
    },
  },

  footer: { backToTop: "Back to top" },
};

export type Messages = typeof en;
export type FormErrorKey = keyof Messages["contact"]["form"]["errors"];

const es: Messages = {
  nav: { about: "Sobre mí", work: "Proyectos", contact: "Contacto" },
  navLabels: { main: "Principal", mobile: "Móvil", footer: "Pie de página" },
  skipToContent: "Saltar al contenido",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  cv: { label: "CV", download: "Descargar CV" },
  switchLanguage: "Switch to English",
  toggleTheme: "Modo oscuro",

  hero: {
    greeting: "Hola, soy",
    viewWork: "Ver mis proyectos",
    getInTouch: "Contáctame",
    scrollToAbout: "Ir a la sección Sobre mí",
  },

  about: { skills: "Habilidades y herramientas", photoOf: (name) => `Foto de ${name}` },

  work: {
    title: "Trabajo destacado",
    viewProject: "Ver proyecto",
    source: "Código",
    opensInNewTab: "(se abre en una pestaña nueva)",
    sourceFor: (title) => `de ${title} (se abre en una pestaña nueva)`,
    screenshotOf: (title) => `Captura de ${title}`,
  },

  contact: {
    copyEmail: "Copiar correo",
    copied: "Correo copiado al portapapeles",
    copyFailed: "No se pudo copiar, cópialo manualmente.",
    form: {
      label: "Formulario de contacto",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Tu mensaje aquí...",
      send: "Enviar mensaje",
      subject: (name) => `Consulta desde el portafolio de ${name}`,
      opening: "Abriendo tu app de correo…",
      openingHint: (email) => `Si no pasa nada, escríbeme directamente a ${email}.`,
      errors: {
        nameRequired: "Ingresa tu nombre.",
        emailRequired: "Ingresa tu correo.",
        emailInvalid: "Ingresa un correo válido.",
        messageShort: "El mensaje debe tener al menos 10 caracteres.",
      },
    },
  },

  footer: { backToTop: "Volver arriba" },
};

export const MESSAGES: Record<Locale, Messages> = { en, es };
