// src/pages/AuthPage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    // Validation
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }
    if (!email.includes('@')) {
      setError('请输入有效的邮箱地址');
      return;
    }
    if (password.length < 6) {
      setError('密码至少需要6位');
      return;
    }
    if (mode === 'register' && password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message === 'Invalid login credentials'
          ? '邮箱或密码错误，请重试'
          : error.message);
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message === 'User already registered'
          ? '该邮箱已注册，请直接登录'
          : error.message);
      } else {
        setSuccess('注册成功！请检查邮箱完成验证，然后登录。');
        setMode('login');
        setPassword('');
        setConfirmPassword('');
      }
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-mark">📡</div>
          <div>
            <div className="auth-logo-name">RankRadar</div>
            <div className="auth-logo-sub">Amazon Intelligence</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
          >
            登录
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
          >
            注册账号
          </button>
        </div>

        {/* Title */}
        <div className="auth-title">
          {mode === 'login' ? '欢迎回来' : '创建你的账号'}
        </div>
        <div className="auth-sub">
          {mode === 'login'
            ? '登录后开始追踪你的 Amazon 关键词排名'
            : '免费注册，14天试用全部功能'}
        </div>

        {/* Success message */}
        {success && (
          <div className="auth-success">{success}</div>
        )}

        {/* Form */}
        <div className="auth-form">
          <div className="auth-field">
            <label className="auth-label">邮箱地址</label>
            <input
              className={`auth-input ${error && !email ? 'auth-input-error' : ''}`}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">
              密码
              {mode === 'login' && (
                <span className="auth-forgot" onClick={() => alert('功能开发中')}>忘记密码？</span>
              )}
            </label>
            <input
              className={`auth-input ${error && !password ? 'auth-input-error' : ''}`}
              type="password"
              placeholder={mode === 'register' ? '至少6位' : '输入密码'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'register' && (
            <div className="auth-field">
              <label className="auth-label">确认密码</label>
              <input
                className={`auth-input ${error && confirmPassword !== password ? 'auth-input-error' : ''}`}
                type="password"
                placeholder="再次输入密码"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />
            </div>
          )}

          {/* Error message */}
          {error && <div className="auth-error">⚠ {error}</div>}

          {/* Submit button */}
          <button
            className={`auth-btn ${loading ? 'auth-btn-loading' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? '处理中...'
              : mode === 'login' ? '登录' : '创建账号'}
          </button>

          {/* Switch mode */}
          <div className="auth-switch">
            {mode === 'login' ? (
              <>还没有账号？<span onClick={() => { setMode('register'); setError(''); }}>免费注册</span></>
            ) : (
              <>已有账号？<span onClick={() => { setMode('login'); setError(''); }}>直接登录</span></>
            )}
          </div>
        </div>

        {/* Features preview */}
        {mode === 'register' && (
          <div className="auth-features">
            <div className="auth-feat-item">
              <span className="auth-feat-icon">📊</span>
              <span>追踪关键词在美东/中/西三区的实时排名</span>
            </div>
            <div className="auth-feat-item">
              <span className="auth-feat-icon">🧠</span>
              <span>AI 自动分析订单变化原因，给出调整建议</span>
            </div>
            <div className="auth-feat-item">
              <span className="auth-feat-icon">⚔️</span>
              <span>实时监控竞品排名动态，抢先一步反应</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
