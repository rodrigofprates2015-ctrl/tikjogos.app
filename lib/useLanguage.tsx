import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { type Language, getTranslation } from './translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextValue {
  lang: Language;
  t: (path: string, defaultValue?: string) => string;
  setLang: (lang: Language) => void;
  languages: { code: Language; label: string }[];
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'pt', label: 'PT-BR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ESP' },
];

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('pt');

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    AsyncStorage.setItem('tikjogos_language', newLang);
  };

  // Load saved language on mount
  useMemo(() => {
    AsyncStorage.getItem('tikjogos_language').then((saved) => {
      if (saved === 'en' || saved === 'es' || saved === 'pt') {
        setLangState(saved);
      }
    });
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const t = (path: string, defaultValue?: string): string => {
      const result = getTranslation(lang, path);
      return result !== path ? result : defaultValue ?? path;
    };
    return { lang, t, setLang, languages: LANGUAGES };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
