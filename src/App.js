// src/App.js
import { useState } from 'react';
import { LangProvider } from './context/LangContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DiagnosticsPage from './pages/DiagnosticsPage';
import './App.css';

function AppLayout() {
  const [activePage, setActivePage] = useState('diagnostics');

  const renderPage = () => {
    switch (activePage) {
      case 'diagnostics': return <DiagnosticsPage />;
      default: return (
        <div style={{ padding: 40, color: 'var(--text-400)', fontSize: 14 }}>
          {activePage} — coming soon
        </div>
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="app-main">
        <Topbar />
        <div className="app-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppLayout />
    </LangProvider>
  );
}
