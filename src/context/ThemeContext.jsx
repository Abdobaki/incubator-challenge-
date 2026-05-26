import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DEFAULT_COLORS = {
  primary: '#3B82F6',
  accent: '#00D4FF',
  violet: '#8B5CF6',
  glow: '#4F46E5',
  background: '#0D1225',
  panel: '#131929',
  nav: '#0D1225',
  surface: '#1A2240',
};

const CSS_VARS_MAP = {
  primary: '--electric',
  accent: '--accent',
  violet: '--violet',
  glow: '--glow',
  background: '--navy-950',
  panel: '--navy-900',
  nav: '--navy-800',
  surface: '--navy-800',
};

function hexToRgb(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return `${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}`;
}

function loadConfig() {
  try {
    const raw = localStorage.getItem('bis-theme-config');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ...DEFAULT_COLORS };
}

function loadBgImages() {
  try {
    const raw = localStorage.getItem('bis-bg-images');
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function applyColors(colors) {
  const root = document.documentElement;
  Object.entries(CSS_VARS_MAP).forEach(([key, cssVar]) => {
    if (colors[key]) root.style.setProperty(cssVar, colors[key]);
  });
  root.style.setProperty('--primary-rgb', hexToRgb(colors.primary || DEFAULT_COLORS.primary));
  root.style.setProperty('--accent-rgb', hexToRgb(colors.accent || DEFAULT_COLORS.accent));
}

function applyBgImages(images) {
  const root = document.documentElement;
  let hasAny = false;
  Object.entries(images).forEach(([section, url]) => {
    if (url) {
      hasAny = true;
      root.style.setProperty(`--bg-${section}`, `url(${url})`);
      root.style.setProperty(`--bg-${section}-active`, '1');
      root.style.setProperty(`--bg-${section}-overlay`, 'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55))');
    } else {
      root.style.removeProperty(`--bg-${section}`);
      root.style.removeProperty(`--bg-${section}-active`);
      root.style.removeProperty(`--bg-${section}-overlay`);
    }
  });
  if (hasAny) root.setAttribute('data-bg-active', '');
  else root.removeAttribute('data-bg-active');
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('bis-theme') || 'light'; } catch { return 'light'; } });
  const [colors, setColors] = useState(loadConfig);
  const [bgImages, setBgImages] = useState(loadBgImages);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bis-theme', theme);
    applyBgImages(bgImages);
  }, [theme, bgImages]);

  useEffect(() => { applyColors(colors); localStorage.setItem('bis-theme-config', JSON.stringify(colors)); }, [colors]);
  useEffect(() => { localStorage.setItem('bis-bg-images', JSON.stringify(bgImages)); }, [bgImages]);

  const toggleTheme = useCallback(() => setTheme(p => (p === 'dark' ? 'light' : 'dark')), []);
  const updateThemeConfig = useCallback((partial) => setColors(p => ({ ...p, ...partial })), []);
  const resetThemeConfig = useCallback(() => setColors({ ...DEFAULT_COLORS }), []);

  const setSectionBg = useCallback((section, url) => setBgImages(p => ({ ...p, [section]: url })), []);
  const removeSectionBg = useCallback((section) => setBgImages(p => { const n = { ...p }; delete n[section]; return n; }), []);

  return (
    <ThemeContext.Provider value={{
      theme, toggleTheme, colors, updateThemeConfig, resetThemeConfig, defaultColors: DEFAULT_COLORS,
      bgImages, setSectionBg, removeSectionBg,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
