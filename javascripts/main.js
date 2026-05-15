const themeStorageKey = 'guanshan-theme';
const langStorageKey = 'guanshan-lang';

const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeLabel = themeToggle?.querySelector('.theme-toggle-label');
const langToggle = document.querySelector('[data-lang-toggle]');
const navBurger = document.querySelector('[data-nav-burger]');
const navLinks = document.querySelector('#primary-nav');
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');

const themeLabelMap = {
  zh: { dark: '夜间', light: '日间' },
  en: { dark: 'Night', light: 'Day' },
};

const langAriaLabel = {
  zh: '切换到英文',
  en: 'Switch to Chinese',
};

const titleMap = {
  zh: '官山山 · 企业级 Agent 平台架构',
  en: 'Guanshan · Enterprise Agent Platform Architect',
};

const descriptionMap = {
  zh: '官山山 · 腾讯云后台开发高级工程师。专注企业级 Agent 平台架构与大模型应用工程化：Agent Runtime、RAG、MCP、云沙盒、多租户 AI 平台。',
  en: 'Guanshan, Senior Backend Engineer at Tencent Cloud. Focused on enterprise agent platform architecture and LLM application engineering — Agent Runtime, RAG, MCP, cloud sandboxes, multi-tenant AI platforms.',
};

const metaDescription = document.querySelector('meta[name="description"]');

let currentLang = 'zh';
let currentTheme = themeMedia.matches ? 'dark' : 'light';

/* ============ Theme ============ */

const updateThemeLabel = (theme) => {
  if (!themeToggle) return;
  const labels = themeLabelMap[currentLang] ?? themeLabelMap.zh;
  const text = theme === 'dark' ? labels.dark : labels.light;
  themeToggle.querySelectorAll('.theme-toggle-label').forEach((node) => {
    node.textContent = text;
  });
};

const updateThemePressed = (theme) => {
  themeToggle?.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
};

const applyTheme = (theme, persist = true) => {
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
    if (persist) window.localStorage.setItem(themeStorageKey, theme);
    currentTheme = theme;
  } else {
    root.removeAttribute('data-theme');
    if (persist) window.localStorage.removeItem(themeStorageKey);
    currentTheme = themeMedia.matches ? 'dark' : 'light';
  }
  updateThemeLabel(currentTheme);
  updateThemePressed(currentTheme);
};

applyTheme(window.localStorage.getItem(themeStorageKey), false);

themeToggle?.addEventListener('click', (event) => {
  if (event.shiftKey) {
    applyTheme(null);
    return;
  }
  const current = root.getAttribute('data-theme') || (themeMedia.matches ? 'dark' : 'light');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

const systemChangeHandler = (event) => {
  if (root.getAttribute('data-theme') === null) {
    currentTheme = event.matches ? 'dark' : 'light';
    updateThemeLabel(currentTheme);
    updateThemePressed(currentTheme);
  }
};

if (typeof themeMedia.addEventListener === 'function') {
  themeMedia.addEventListener('change', systemChangeHandler);
} else if (typeof themeMedia.addListener === 'function') {
  themeMedia.addListener(systemChangeHandler);
}

/* ============ Language ============ */

const setLang = (lang, persist = true) => {
  currentLang = lang === 'en' ? 'en' : 'zh';
  root.setAttribute('data-lang', currentLang);
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hans' : 'en';
  document.title = titleMap[currentLang];
  metaDescription?.setAttribute('content', descriptionMap[currentLang]);
  if (persist) window.localStorage.setItem(langStorageKey, currentLang);
  langToggle?.setAttribute('aria-label', langAriaLabel[currentLang]);
  updateThemeLabel(currentTheme);
};

setLang(window.localStorage.getItem(langStorageKey) === 'en' ? 'en' : 'zh', false);

langToggle?.addEventListener('click', () => {
  setLang(currentLang === 'zh' ? 'en' : 'zh');
});

/* ============ Year stamp ============ */

const currentYear = String(new Date().getFullYear());
document.querySelectorAll('[data-year]').forEach((slot) => {
  slot.textContent = currentYear;
});

/* ============ Mobile burger ============ */

const closeMenu = () => {
  navLinks?.classList.remove('is-open');
  navBurger?.setAttribute('aria-expanded', 'false');
};

navBurger?.addEventListener('click', (event) => {
  event.stopPropagation();
  const open = navLinks?.classList.toggle('is-open');
  navBurger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') closeMenu();
});

document.addEventListener('click', (event) => {
  if (!navLinks?.classList.contains('is-open')) return;
  if (event.target.closest('.site-nav')) return;
  closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

/* ============ Scroll-spy nav active state ============ */

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a[href^="#"]')) : [];
const anchorById = new Map(
  navAnchors.map((a) => [a.getAttribute('href').slice(1), a])
);

if (sections.length && anchorById.size && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const anchor = anchorById.get(entry.target.id);
        if (!anchor) return;
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('is-active'));
          anchor.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-30% 0% -55% 0%', threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));
}

/* ============ Scroll progress bar + back-to-top ============ */

const progressBar = document.querySelector('[data-scroll-bar]');
const backToTop = document.querySelector('[data-back-to-top]');

const handleScroll = () => {
  const scrolled = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? Math.min(scrolled / docHeight, 1) : 0;
  if (progressBar) progressBar.style.width = `${ratio * 100}%`;
  if (backToTop) {
    if (scrolled > 600) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  }
};

let scrollRaf = 0;
window.addEventListener('scroll', () => {
  if (scrollRaf) return;
  scrollRaf = window.requestAnimationFrame(() => {
    handleScroll();
    scrollRaf = 0;
  });
}, { passive: true });
handleScroll();

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ Reveal on scroll ============ */

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
