// src/components/LangDropdown.js
import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import './LangDropdown.css';

export default function LangDropdown() {
  const { lang, setLang, LANG_META } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANG_META[lang];

  return (
    <div className="lang-wrap" ref={ref}>
      <button
        className={`lang-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="lang-flag">{current.flag}</span>
        <span className="lang-name">{current.name}</span>
        <span className="lang-chevron">▼</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {Object.entries(LANG_META).map(([code, meta]) => (
            <div
              key={code}
              className={`lang-option ${lang === code ? 'active' : ''}`}
              onClick={() => { setLang(code); setOpen(false); }}
            >
              <span className="lang-flag">{meta.flag}</span>
              <span className="lang-option-name">{meta.name}</span>
              {lang === code && <span className="lang-check">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
