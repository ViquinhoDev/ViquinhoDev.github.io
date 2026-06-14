/* ============================================
   ViquinhoDev Portfolio — Main Script
   ============================================ */

const CONFIG = {
  emails: ["contato@viquinhodev.com", "vicente@viquinhodev.com"],
  phone: "+55 (11) 99999-9999",
  phoneLink: "+5511999999999",
  formAction: "https://formsubmit.co/contato@viquinhodev.com",
  githubRepos: "https://github.com/viquinhodev?tab=repositories",
  defaultTheme: "dark",
  defaultLang: "pt",
};

const socialLinks = [
  { name: "GitHub", url: "https://github.com/viquinhodev", icon: "github" },
  { name: "Discord", url: "https://discord.com/users/viquinhodev", icon: "discord" },
  { name: "Dev.to", url: "https://dev.to/viquinhodev", icon: "devto" },
  { name: "LinkedIn", url: "https://linkedin.com/in/viquinhodev", icon: "linkedin" },
  { name: "Instagram", url: "https://instagram.com/viquinhodev", icon: "instagram" },
  { name: "CodePen", url: "https://codepen.io/viquinhodev", icon: "codepen" },
];

const projects = [
  {
    title: "ViquinhoChat",
    descPt: "Serviço de chat privado e criptografado com interface moderna e tema gamer.",
    descEn: "Private encrypted chat service with a modern gamer-themed interface.",
    techs: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Farme Aura",
    descPt: "Jogo estilo gamer dark com sistema de dificuldade e interface personalizada.",
    descEn: "Dark gamer-style game with difficulty system and custom interface.",
    techs: ["JavaScript", "Game Design", "CSS"],
  },
  {
    title: "Operação Comunidade Taboi",
    descPt: "Painel interativo com autenticação, calendário e sistema de informações.",
    descEn: "Interactive panel with authentication, calendar, and info system.",
    techs: ["HTML", "CSS", "JavaScript"],
  },
];

const languages = [
  "HTML5", "CSS3", "JavaScript", "Python", "Java", "Bash", "TypeScript", "SQL",
];

const tools = [
  { name: "GitHub", icon: "github" },
  { name: "VS Code", icon: "vscode" },
  { name: "Git", icon: "git" },
  { name: "Visual Studio", icon: "visualstudio" },
  { name: "CodePen", icon: "codepen" },
  { name: "Figma", icon: "figma" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Terminal", icon: "terminal" },
];

let currentLang = localStorage.getItem("lang") || CONFIG.defaultLang;
let currentTheme = localStorage.getItem("theme") || CONFIG.defaultTheme;

function t(key) {
  return translations[currentLang]?.[key] || translations.pt[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });

  document.getElementById("lang-label").textContent = currentLang.toUpperCase();
  document.getElementById("form-submit-btn").textContent = t("contact.form.submit");

  renderProjects();
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");
  if (sun && moon) {
    sun.style.display = theme === "dark" ? "block" : "none";
    moon.style.display = theme === "light" ? "block" : "none";
  }

  document.getElementById("theme-toggle").setAttribute(
    "aria-label",
    theme === "dark" ? t("theme.light") : t("theme.dark")
  );
}

function toggleTheme() {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

function toggleLang() {
  currentLang = currentLang === "pt" ? "en" : "pt";
  localStorage.setItem("lang", currentLang);
  applyTranslations();
  applyTheme(currentTheme);
}

function renderContactMethods() {
  const container = document.getElementById("contact-methods");
  if (!container) return;

  container.innerHTML = [
    ...CONFIG.emails.map(
      (email) =>
        `<a href="mailto:${email}" class="contact-method">${icon("mail")}<span>${email}</span></a>`
    ),
    `<a href="tel:${CONFIG.phoneLink}" class="contact-method">${icon("phone")}<span>${CONFIG.phone}</span></a>`,
  ].join("");
}

function renderSocialLinks(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = socialLinks
    .map(
      (s) =>
        `<a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.name}" title="${s.name}">${icon(s.icon)}</a>`
    )
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  container.innerHTML = projects
    .map((p) => {
      const desc = currentLang === "en" ? p.descEn : p.descPt;
      const techs = p.techs.map((tech) => `<span class="project-tech">${tech}</span>`).join("");
      return `
        <article class="project-card">
          <div class="project-icon">${icon("code")}</div>
          <h4>${p.title}</h4>
          <p>${desc}</p>
          <div class="project-techs">${techs}</div>
        </article>`;
    })
    .join("");
}

function renderSkills() {
  const langContainer = document.getElementById("language-tags");
  const toolsContainer = document.getElementById("tools-grid");

  if (langContainer) {
    langContainer.innerHTML = languages
      .map((lang) => `<span class="skill-tag">${lang}</span>`)
      .join("");
  }

  if (toolsContainer) {
    toolsContainer.innerHTML = tools
      .map((tool) => `<div class="tool-card">${icon(tool.icon)}<span>${tool.name}</span></div>`)
      .join("");
  }
}

function renderSpecialtyIcons() {
  document.querySelectorAll(".specialty-icon[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (name) el.innerHTML = icon(name);
  });
}

function renderProjectsButton() {
  const btn = document.querySelector(".projects-all-btn");
  if (!btn || btn.querySelector(".svg-icon")) return;
  const label = btn.querySelector("span");
  if (label) btn.insertBefore(document.createRange().createContextualFragment(icon("external")), label);
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-mobile");

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("open", !expanded);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = t("contact.form.sending");
  status.className = "form-status";
  status.classList.remove("show");

  const formData = new FormData(form);

  try {
    const response = await fetch(CONFIG.formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.textContent = t("contact.form.success");
      status.className = "form-status success show";
      form.reset();
    } else {
      throw new Error("Form submit failed");
    }
  } catch {
    status.textContent = t("contact.form.error");
    status.className = "form-status error show";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t("contact.form.submit");
  }
}

function init() {
  applyTheme(currentTheme);
  applyTranslations();
  renderContactMethods();
  renderSocialLinks("social-links");
  renderSocialLinks("footer-social-links");
  renderSkills();
  renderSpecialtyIcons();
  renderProjectsButton();
  setupMobileMenu();

  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
  document.getElementById("lang-toggle")?.addEventListener("click", toggleLang);
  document.getElementById("contact-form")?.addEventListener("submit", handleFormSubmit);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
