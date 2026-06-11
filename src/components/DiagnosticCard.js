// src/components/DiagnosticCard.js
import { useState } from 'react';
import { useLang } from '../context/LangContext';
import './DiagnosticCard.css';

export default function DiagnosticCard({
  type = 'critical',   // 'critical' | 'warning' | 'positive' | 'info'
  icon,
  title,
  subtitle,
  confidence,
  defaultOpen = false,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { t } = useLang();

  return (
    <div className={`diag-card dc-${type} ${open ? 'open' : ''}`}>
      <div className="diag-head" onClick={() => setOpen(o => !o)}>
        <div className="di-icon">{icon}</div>
        <div className="di-text">
          <div className="di-title">{title}</div>
          {subtitle && <div className="di-sub">{subtitle}</div>}
        </div>
        <div className="di-conf">
          <span className="conf-label">{t('conf_lbl')}</span>
          <span className="conf-pill">{confidence}</span>
        </div>
        <span className="di-chevron">▼</span>
      </div>
      {open && (
        <div className="diag-body">
          {children}
        </div>
      )}
    </div>
  );
}

// Sub-component: Evidence step
export function EvStep({ num, variant = 'default', children }) {
  return (
    <div className={`ev-step ev-${variant}`}>
      <div className="ev-num">{num}</div>
      <div className="ev-text">{children}</div>
    </div>
  );
}

// Sub-component: Strategy option
export function StrategyItem({ letter, main, detail, tag, tagStyle = 'fast', defaultChosen = false }) {
  const [chosen, setChosen] = useState(defaultChosen);

  const handleClick = (e) => {
    // Find siblings and deselect them
    const grid = e.currentTarget.closest('.strat-grid');
    if (grid) {
      grid.querySelectorAll('.strat-item').forEach(el => el.classList.remove('chosen-active'));
    }
    setChosen(true);
  };

  return (
    <div className={`strat-item ${chosen ? 'chosen' : ''}`} onClick={handleClick}>
      <div className="strat-letter">{letter}</div>
      <div className="strat-body">
        <div className="strat-main">{main}</div>
        {detail && <div className="strat-detail">{detail}</div>}
        {tag && <span className={`strat-tag st-${tagStyle}`}>{tag}</span>}
      </div>
    </div>
  );
}

// Sub-component: Tag inline
export function Tag({ variant = 'orange', children }) {
  return <span className={`tag tag-${variant}`}>{children}</span>;
}
