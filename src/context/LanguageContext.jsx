import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: { code: 'en', label: 'EN', direction: 'ltr', name: 'English' },
  fr: { code: 'fr', label: 'FR', direction: 'ltr', name: 'Français' },
  ar: { code: 'ar', label: 'ع', direction: 'rtl', name: 'العربية' },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const switchLang = (code) => {
    setLang(code);
    document.documentElement.lang = code;
    document.documentElement.dir = languages[code].direction;
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
