'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fa';

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
}>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  const handleSetLang = (l: Language) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.lang = l;
      document.documentElement.style.fontFamily = l === 'fa'
        ? "'Vazirmatn', sans-serif"
        : "'Inter', sans-serif";
      localStorage.setItem('lang', l);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved === 'fa' || saved === 'en') {
      handleSetLang(saved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
