// src/pages/SetupPage.js
import { useState } from 'react';
import { useLang } from '../context/LangContext';
import './SetupPage.css';

const MAX_KEYWORDS = 20; // Starter plan limit

export default function SetupPage() {
  const { t } = useLang();

  // Self ASIN
  const [selfAsin, setSelfAsin] = useState('');
  const [selfAsinSaved, setSelfAsinSaved] = useState('');
  const [selfAsinError, setSelfAsinError] = useState('');

  // Competitor ASINs
  const [compInput, setCompInput] = useState('');
  const [compAsins, setCompAsins] = useState([]);
  const [compError, setCompError] = useState('');

  // Keywords
  const [kwInput, setKwInput] = useState('');
  const [keywords, setKeywords] = useState([
    'wireless earbuds',
    'noise cancelling earphones',
    'sport earbuds waterproof',
    'usb c earbuds',
    'long battery earbuds',
  ]);
  const [kwError, setKwError] = useState('');

  // Save state
  const [saved, setSaved] = useState(false);

  // ASIN validation
  const validateAsin = (val) => /^B0[A-Z0-9]{8}$/.test(val.trim().toUpperCase());

  const handleSelfAsin = (e) => {
    setSelfAsin(e.target.value.toUpperCase());
    setSelfAsinError('');
    setSaved(false);
  };

  const handleSelfAsinBlur = () => {
    if (selfAsin && !validateAsin(selfAsin)) {
      setSelfAsinError('ASIN 格式不正确，应为 B0 开头的10位字母数字');
    }
  };

  const addCompAsin = () => {
    const val = compInput.trim().toUpperCase();
    if (!val) return;
    if (!validateAsin(val)) { setCompError('ASIN 格式不正确'); return; }
    if (compAsins.includes(val)) { setCompError('该竞品已添加'); return; }
    if (val === selfAsin) { setCompError('不能添加自营 ASIN 为竞品'); return; }
    if (compAsins.length >= 3) { setCompError('Starter 版最多添加 3 个竞品'); return; }
    setCompAsins([...compAsins, val]);
    setCompInput('');
    setCompError('');
    setSaved(false);
  };

  const removeComp = (asin) => {
    setCompAsins(compAsins.filter(a => a !== asin));
    setSaved(false);
  };

  const addKeyword = () => {
    const val = kwInput.trim().toLowerCase();
    if (!val) return;
    if (keywords.includes(val)) { setKwError('该关键词已添加'); return; }
    if (keywords.length >= MAX_KEYWORDS) { setKwError(`Starter 版最多 ${MAX_KEYWORDS} 个关键词`); return; }
    setKeywords([...keywords, val]);
    setKwInput('');
    setKwError('');
    setSaved(false);
  };

  const removeKw = (kw) => {
    setKeywords(keywords.filter(k => k !== kw));
    setSaved(false);
  };

  const handleKwKeyDown = (e) => {
    if (e.key === 'Enter') addKeyword();
  };

  const handleCompKeyDown = (e) => {
    if (e.key === 'Enter') addCompAsin();
  };

  const handleSave = () => {
    if (!selfAsin) { setSelfAsinError('请输入自营 ASIN'); return; }
    if (!validateAsin(selfAsin)) { setSelfAsinError('ASIN 格式不正确'); return; }
    if (keywords.length === 0) { setKwError('请至少添加一个关键词'); return; }
    setSelfAsinSaved(selfAsin);
    setSaved(true);
    // In production: save to Supabase here
  };

  return (
    <div className="setup-page">

      {/* Header */}
      <div className="setup-header">
        <div>
          <div className="setup-title">品类设置</div>
          <div className="setup-sub">配置你的 ASIN 和追踪关键词，系统每天自动扫描排名</div>
        </div>
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✓ 已保存' : '保存设置'}
        </button>
      </div>

      {saved && (
        <div className="save-success-bar">
          ✓ 设置已保存，系统将在今日东部时间 00:00 开始首次扫描
        </div>
      )}

      <div className="setup-grid">

        {/* Left column */}
        <div className="setup-col">

          {/* Self ASIN */}
          <div className="setup-card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon">🎯</span>
                自营 ASIN
              </div>
              <span className="card-badge badge-required">必填</span>
            </div>
            <div className="card-desc">输入你在亚马逊美国站销售的产品 ASIN，格式为 B0 开头的10位编码</div>

            <div className="input-row">
              <input
                className={`asin-input ${selfAsinError ? 'input-error' : selfAsin && validateAsin(selfAsin) ? 'input-ok' : ''}`}
                value={selfAsin}
                onChange={handleSelfAsin}
                onBlur={handleSelfAsinBlur}
                placeholder="例：B08N5WRWNW"
                maxLength={10}
                spellCheck={false}
              />
              {selfAsin && validateAsin(selfAsin) && (
                <span className="input-check">✓</span>
              )}
            </div>
            {selfAsinError && <div className="input-error-msg">{selfAsinError}</div>}

            {selfAsin && validateAsin(selfAsin) && (
              <div className="asin-preview">
                <div className="preview-label">预览</div>
                <a
                  href={`https://www.amazon.com/dp/${selfAsin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="preview-link"
                >
                  amazon.com/dp/{selfAsin} ↗
                </a>
              </div>
            )}

            <div className="card-hint">
              <span>💡</span>
              <span>在亚马逊商品页面 URL 中找到 /dp/ 后面的编码，或在卖家后台 Manage Inventory 中查看</span>
            </div>
          </div>

          {/* Competitor ASINs */}
          <div className="setup-card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon">⚔️</span>
                竞品 ASIN
              </div>
              <span className="card-badge badge-optional">可选</span>
            </div>
            <div className="card-desc">添加竞品 ASIN，系统会同步追踪竞品的关键词排名变化</div>

            <div className="input-row">
              <input
                className={`asin-input ${compError ? 'input-error' : ''}`}
                value={compInput}
                onChange={e => { setCompInput(e.target.value.toUpperCase()); setCompError(''); }}
                onKeyDown={handleCompKeyDown}
                placeholder="例：B0C1234567"
                maxLength={10}
                spellCheck={false}
              />
              <button className="add-btn" onClick={addCompAsin}>添加</button>
            </div>
            {compError && <div className="input-error-msg">{compError}</div>}

            {compAsins.length > 0 && (
              <div className="tag-list">
                {compAsins.map(asin => (
                  <div key={asin} className="asin-tag">
                    <span className="tag-icon">⚔️</span>
                    <span className="tag-text">{asin}</span>
                    <button className="tag-remove" onClick={() => removeComp(asin)}>×</button>
                  </div>
                ))}
              </div>
            )}

            <div className="quota-bar">
              <span>竞品配额</span>
              <span>{compAsins.length} / 3 <span style={{color:'var(--text-400)'}}>（Starter 版）</span></span>
            </div>
            <div className="quota-track">
              <div className="quota-fill" style={{width: `${(compAsins.length/3)*100}%`}} />
            </div>
          </div>

          {/* Scan settings */}
          <div className="setup-card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon">📡</span>
                扫描设置
              </div>
            </div>
            <div className="scan-options">
              <div className="scan-option active">
                <div className="scan-opt-top">
                  <span className="scan-opt-name">美国三大地区</span>
                  <span className="scan-check">✓</span>
                </div>
                <div className="scan-opt-desc">美东 · 美中 · 美西 同步扫描</div>
              </div>
              <div className="scan-option active">
                <div className="scan-opt-top">
                  <span className="scan-opt-name">自然排名</span>
                  <span className="scan-check">✓</span>
                </div>
                <div className="scan-opt-desc">Organic position 1–100</div>
              </div>
              <div className="scan-option active">
                <div className="scan-opt-top">
                  <span className="scan-opt-name">广告位</span>
                  <span className="scan-check">✓</span>
                </div>
                <div className="scan-opt-desc">Sponsored P1 / P2 / P3</div>
              </div>
              <div className="scan-option locked">
                <div className="scan-opt-top">
                  <span className="scan-opt-name">每日4次扫描</span>
                  <span className="lock-badge">Pro</span>
                </div>
                <div className="scan-opt-desc">当前：每日1次</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right column - Keywords */}
        <div className="setup-col">
          <div className="setup-card kw-card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon">🔍</span>
                追踪关键词
              </div>
              <span className="card-badge badge-required">必填</span>
            </div>
            <div className="card-desc">输入你想追踪排名的关键词，每行一个，建议从核心出单词开始</div>

            <div className="input-row">
              <input
                className={`kw-input ${kwError ? 'input-error' : ''}`}
                value={kwInput}
                onChange={e => { setKwInput(e.target.value); setKwError(''); }}
                onKeyDown={handleKwKeyDown}
                placeholder="输入关键词，按 Enter 添加"
              />
              <button className="add-btn" onClick={addKeyword}>添加</button>
            </div>
            {kwError && <div className="input-error-msg">{kwError}</div>}

            {/* Quota */}
            <div className="quota-bar">
              <span>关键词配额</span>
              <span style={{color: keywords.length >= MAX_KEYWORDS ? 'var(--red)' : 'var(--text-500)'}}>
                {keywords.length} / {MAX_KEYWORDS}
                <span style={{color:'var(--text-400)'}}> （Starter 版）</span>
              </span>
            </div>
            <div className="quota-track">
              <div
                className="quota-fill"
                style={{
                  width: `${(keywords.length/MAX_KEYWORDS)*100}%`,
                  background: keywords.length >= MAX_KEYWORDS ? 'var(--red)' : 'var(--orange)'
                }}
              />
            </div>

            {/* Keyword list */}
            <div className="kw-list">
              {keywords.length === 0 && (
                <div className="kw-empty">还没有关键词，在上方输入框添加</div>
              )}
              {keywords.map((kw, i) => (
                <div key={kw} className="kw-item">
                  <span className="kw-num">{i + 1}</span>
                  <span className="kw-text">{kw}</span>
                  <div className="kw-badges">
                    {i < 3 && <span className="kw-core-badge">核心词</span>}
                  </div>
                  <button className="kw-remove" onClick={() => removeKw(kw)}>×</button>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="kw-tips">
              <div className="tips-title">💡 关键词建议</div>
              <div className="tips-list">
                <div className="tip-item">
                  <span className="tip-dot tip-green" />
                  <span>优先添加历史出单关键词（广告报告中转化率最高的词）</span>
                </div>
                <div className="tip-item">
                  <span className="tip-dot tip-orange" />
                  <span>包含 2–4 个词的长尾词比单个词更精准</span>
                </div>
                <div className="tip-item">
                  <span className="tip-dot tip-blue" />
                  <span>竞品也会用这些词追踪，建议添加竞品的核心词</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom save bar */}
      <div className="setup-bottom-bar">
        <div className="bottom-bar-info">
          {selfAsin && validateAsin(selfAsin) ? (
            <span style={{color:'var(--green)'}}>✓ ASIN 已配置</span>
          ) : (
            <span style={{color:'var(--text-400)'}}>⚪ 请输入自营 ASIN</span>
          )}
          <span style={{color:'var(--text-300)'}}>·</span>
          <span style={{color: keywords.length > 0 ? 'var(--green)' : 'var(--text-400)'}}>
            {keywords.length > 0 ? `✓ ${keywords.length} 个关键词` : '⚪ 请添加关键词'}
          </span>
          {compAsins.length > 0 && (
            <>
              <span style={{color:'var(--text-300)'}}>·</span>
              <span style={{color:'var(--green)'}}>✓ {compAsins.length} 个竞品</span>
            </>
          )}
        </div>
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✓ 已保存' : '保存并开始追踪'}
        </button>
      </div>

    </div>
  );
}
