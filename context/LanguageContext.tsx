'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, TranslationKeys } from '@/lib/translations';

export type Lang = 'en' | 'hi';

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKeys) => string;
  rawT: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  toggle: () => {},
  t: (key) => '',
  rawT: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKeys) => translations[lang][key] || key,
    [lang]
  );

  const rawT = useCallback(
    (en: string, hi: string) => (lang === 'en' ? en : hi),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, rawT }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
