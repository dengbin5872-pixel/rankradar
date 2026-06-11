// src/components/Topbar.js
import { useState } from 'react';
import { useLang } from '../context/LangContext';
import LangDropdown from './LangDropdown';
import './Topbar.css';

export default function Topbar() {
  const { t } = useLang();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <header className="topbar">
      <span className="topbar-title">{t('page_title')}</span>
      <div className="topbar-sep" />
      <span className="topbar-sub">{t('page_sub')}</span>
      <span className="topbar-badge">{t('badge_ai')}</span>

      <div className="topbar-spacer" />

      <select className="asin-select">
        <option>B08N5WRWNW · Self</option>
        <option>B0C1234567 · Comp</option>
      </select>

      <LangDropdown />

      <button className="topbar-btn btn-ghost">{t('btn_export')}</button>
      <button
        className="topbar-btn btn-primary"
        onClick={handleRefresh}
        disabled={refreshing}
      >
        {refreshing ? '…' : t('btn_analyze')}
      </button>
    </header>
  );
}
