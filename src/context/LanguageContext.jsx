import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: { code: 'en', label: 'EN', direction: 'ltr', name: 'English' },
  fr: { code: 'fr', label: 'FR', direction: 'ltr', name: 'Français' },
  ar: { code: 'ar', label: 'ع', direction: 'rtl', name: 'العربية' },
};

function getInitialLang() {
  try {
    const saved = localStorage.getItem('bis-lang');
    if (saved && languages[saved]) return saved;
  } catch {}
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = languages[lang].direction;
  }, [lang]);

  const switchLang = (code) => {
    setLang(code);
    document.documentElement.lang = code;
    document.documentElement.dir = languages[code].direction;
    try { localStorage.setItem('bis-lang', code); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
