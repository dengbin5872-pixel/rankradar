// src/components/Sidebar.js
import { useLang } from '../context/LangContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { key: 'nav_setup',     icon: '🎯', page: 'setup' },
  { key: 'nav_dashboard', icon: '📊', page: 'dashboard' },
  { key: 'nav_heatmap',   icon: '🌡️', page: 'heatmap' },
  { key: 'nav_diag',      icon: '🧠', page: 'diagnostics', badge: true },
];
const NAV_ANALYTICS = [
  { key: 'nav_comp',   icon: '⚔️', page: 'competitor' },
  { key: 'nav_health', icon: '💹', page: 'health', badge: true },
  { key: 'nav_log',    icon: '📡', page: 'log' },
  { key: 'nav_export', icon: '⬇️', page: 'export' },
];

export default function Sidebar({ activePage, onNavigate, onSignOut, user }) {
  const { t } = useLang();

  // Get display name from email
  const displayName = user?.email?.split('@')[0] || 'User';
  const avatarLetter = displayName[0]?.toUpperCase() || 'U';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-row">
          <div className="logo-mark">📡</div>
          <div>
            <div className="logo-name">RankRadar</div>
            <div className="logo-sub">{t('logo_sub')}</div>
          </div>
        </div>
        <div className="status-row">
          <div className="status-dot" />
          <span>{t('sys_status')}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group-label">{t('nav_grp_main')}</div>
        {NAV_ITEMS.map(item => (
          <div
            key={item.key}
            className={`nav-item ${activePage === item.page ? 'active' : ''}`}
            onClick={() => onNavigate(item.page)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{t(item.key)}</span>
            {item.badge && <span className="nav-badge">{t('badge_new')}</span>}
          </div>
        ))}

        <div className="nav-group-label" style={{ marginTop: 16 }}>{t('nav_grp_analytics')}</div>
        {NAV_ANALYTICS.map(item => (
          <div
            key={item.key}
            className={`nav-item ${activePage === item.page ? 'active' : ''}`}
            onClick={() => onNavigate(item.page)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{t(item.key)}</span>
            {item.badge && <span className="nav-badge">{t('badge_new')}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-row">
          <div className="user-avatar">{avatarLetter}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </div>
            <div className="user-plan">{t('user_plan')}</div>
          </div>
        </div>
        <div
          className="nav-item"
          style={{ marginTop: 4, color: 'rgba(255,255,255,.4)' }}
          onClick={onSignOut}
        >
          <span className="nav-icon">🚪</span>
          <span style={{ fontSize: 12 }}>退出登录</span>
        </div>
      </div>
    </aside>
  );
}
