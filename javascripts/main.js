const themeStorageKey = 'guanshan-theme';
const langStorageKey = 'guanshan-lang';

const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeLabel = themeToggle?.querySelector('.theme-toggle-label');
const langToggle = document.querySelector('[data-lang-toggle]');
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');

const themeLabelMap = {
  zh: { dark: '夜间', light: '日间' },
  en: { dark: 'Night', light: 'Day' },
};

const langAriaLabel = {
  zh: '切换到英文',
  en: 'Switch to Chinese',
};

let currentLang = 'zh';
let currentTheme = themeMedia.matches ? 'dark' : 'light';

const updateThemeLabel = (theme) => {
  if (!themeLabel) {
    return;
  }
  const labels = themeLabelMap[currentLang] ?? themeLabelMap.zh;
  themeLabel.textContent = theme === 'dark' ? labels.dark : labels.light;
};

const updateThemePressed = (theme) => {
  if (!themeToggle) {
    return;
  }
  themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
};

const applyTheme = (theme, persist = true) => {
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
    if (persist) {
      window.localStorage.setItem(themeStorageKey, theme);
    }
    currentTheme = theme;
    updateThemeLabel(theme);
    updateThemePressed(theme);
  } else {
    root.removeAttribute('data-theme');
    if (persist) {
      window.localStorage.removeItem(themeStorageKey);
    }
    currentTheme = themeMedia.matches ? 'dark' : 'light';
    updateThemeLabel(currentTheme);
    updateThemePressed(currentTheme);
  }
};

const savedTheme = window.localStorage.getItem(themeStorageKey);
applyTheme(savedTheme, false);

const toggleTheme = () => {
  const current = root.getAttribute('data-theme') || (themeMedia.matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
};

themeToggle?.addEventListener('click', (event) => {
  if (event.shiftKey) {
    applyTheme(null);
    return;
  }
  toggleTheme();
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

const setLang = (lang, persist = true) => {
  currentLang = lang === 'en' ? 'en' : 'zh';
  root.setAttribute('data-lang', currentLang);
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hans' : 'en';
  if (persist) {
    window.localStorage.setItem(langStorageKey, currentLang);
  }
  if (langToggle) {
    langToggle.setAttribute('aria-label', currentLang === 'zh' ? langAriaLabel.zh : langAriaLabel.en);
  }
  updateThemeLabel(currentTheme);
};

const savedLang = window.localStorage.getItem(langStorageKey);
setLang(savedLang === 'en' ? 'en' : 'zh', false);

langToggle?.addEventListener('click', () => {
  const next = currentLang === 'zh' ? 'en' : 'zh';
  setLang(next);
});

const yearSlots = document.querySelectorAll('[data-year]');
const currentYear = String(new Date().getFullYear());
yearSlots.forEach((slot) => {
  slot.textContent = currentYear;
});

