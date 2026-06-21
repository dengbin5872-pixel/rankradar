// src/App.js
import { useState } from 'react';
import { LangProvider } from './context/LangContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DiagnosticsPage from './pages/DiagnosticsPage';
import SetupPage from './pages/SetupPage';
import AuthPage from './pages/AuthPage';
import './App.css';

function AppLayout() {
  const { user, loading, signOut } = useAuth();
  const [activePage, setActivePage] = useState('diagnostics');

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: 'var(--bg)',
        color: 'var(--text-400)', fontSize: 14
      }}>
        Loading...
      </div>
    );
  }

  // Show login/register if not logged in
  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'diagnostics': return <DiagnosticsPage />;
      case 'setup': return <SetupPage />;
      default: return (
        <div style={{ padding: 40, color: 'var(--text-400)', fontSize: 14 }}>
          {activePage} — coming soon
        </div>
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onSignOut={signOut} user={user} />
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
    <AuthProvider>
      <LangProvider>
        <AppLayout />
      </LangProvider>
    </AuthProvider>
  );
}
