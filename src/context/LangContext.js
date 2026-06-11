// src/context/LangContext.js
import { createContext, useContext, useState } from 'react';
import { LANGS, LANG_META } from '../data/i18n';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('zh-cn');
  const t = (key) => LANGS[lang]?.[key] ?? LANGS.en?.[key] ?? key;
  return (
    <LangContext.Provider value={{ lang, setLang, t, LANG_META }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
