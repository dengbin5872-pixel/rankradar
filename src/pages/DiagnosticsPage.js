// src/pages/DiagnosticsPage.js
import { useState } from 'react';
import { useLang } from '../context/LangContext';
import DiagnosticCard, { EvStep, StrategyItem, Tag } from '../components/DiagnosticCard';
import './DiagnosticsPage.css';

const RATIO_HISTORY = [
  { date: '6/4', org: 52 }, { date: '6/5', org: 49 }, { date: '6/6', org: 55 },
  { date: '6/7', org: 47 }, { date: '6/8', org: 44 }, { date: '6/9', org: 43 },
  { date: '6/10', org: 38 },
];

const DAY_DATA = {
  d0: { total: 47, totalDir: 'down', chgPct: '30%', ad: 29, org: 18, orgPct: 38 },
  d1: { total: 67, totalDir: 'up',   chgPct: '12%', ad: 35, org: 32, orgPct: 48 },
  d2: { total: 60, totalDir: 'down', chgPct: '5%',  ad: 33, org: 27, orgPct: 45 },
};

export default function DiagnosticsPage() {
  const { t } = useLang();
  const [activeDay, setActiveDay] = useState('d0');
  const day = DAY_DATA[activeDay];

  return (
    <div className="diag-page">

      {/* Date nav */}
      <div className="date-row">
        {[['d2', 'd2_label'], ['d1', 'd1_label'], ['d0', 'd0_label']].map(([key, labelKey]) => (
          <button
            key={key}
            className={`date-btn ${activeDay === key ? 'active' : ''}`}
            onClick={() => setActiveDay(key)}
          >
            {t(labelKey)}
          </button>
        ))}
        <span className="date-hint">{t('date_hint')}</span>
      </div>

      {/* Overview grid */}
      <div className="ov-grid">
        <div className="ov-card">
          <div className="ov-label">{t('ov_total')}</div>
          <div className="ov-value">{day.total}</div>
          <div className={`ov-change c-${day.totalDir}`}>
            {day.totalDir === 'down' ? '↓' : '↑'} {day.chgPct} {t('vs_yest')}
          </div>
          <div className="ov-sub" style={{ color: 'var(--red)', fontWeight: 500 }}>{t('anomaly')}</div>
        </div>
        <div className="ov-card">
          <div className="ov-label">{t('ov_ad')}</div>
          <div className="ov-value" style={{ color: 'var(--orange)' }}>{day.ad}</div>
          <div className="ov-change c-down">↓ 18% · ACoS 34%</div>
          <div className="ov-sub">$127.4 {t('spend')}</div>
        </div>
        <div className="ov-card">
          <div className="ov-label">{t('ov_organic')}</div>
          <div className="ov-value" style={{ color: 'var(--green)' }}>{day.org}</div>
          <div className="ov-change c-down">↓ 46% · {day.orgPct}% {t('share')}</div>
          <div className="ov-sub">{t('normal_range')}</div>
        </div>
        <div className="ov-card">
          <div className="ov-label">{t('ov_ratio')}</div>
          <div className="ov-value" style={{ fontSize: 20, paddingTop: 4 }}>
            {day.orgPct}% / {100 - day.orgPct}%
          </div>
          <div className="ratio-track">
            <div className="ratio-org" style={{ width: `${day.orgPct}%` }} />
            <div className="ratio-ad" />
          </div>
          <div className="ratio-labels">
            <span style={{ color: 'var(--green)', fontSize: '10.5px' }}>{t('organic')} {day.orgPct}%</span>
            <span style={{ color: 'var(--orange)', fontSize: '10.5px' }}>{t('paid_ads')} {100 - day.orgPct}%</span>
          </div>
          <div className="ov-sub" style={{ color: 'var(--yellow)', fontWeight: 500, marginTop: 4 }}>{t('ad_heavy')}</div>
        </div>
      </div>

      {/* Spark chart */}
      <div className="spark-card">
        <div className="spark-head">
          <span className="spark-title">{t('spark_title')}</span>
          <div className="spark-legend">
            {[['var(--blue)', 'leg_total'], ['var(--orange)', 'leg_ad'], ['var(--green)', 'leg_organic']].map(([color, key]) => (
              <div key={key} className="spark-leg">
                <div className="spark-dot" style={{ background: color }} />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 760 56" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <line x1="0" y1="28" x2="760" y2="28" stroke="var(--border-sm)" strokeWidth="1" />
          <polygon points="0,10 108,8 216,12 324,6 432,9 540,5 648,8 760,28 760,56 0,56" fill="rgba(59,130,246,.06)" />
          <polyline points="0,10 108,8 216,12 324,6 432,9 540,5 648,8 760,28" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinejoin="round" />
          <polyline points="0,20 108,17 216,22 324,16 432,19 540,15 648,18 760,40" fill="none" stroke="var(--orange)" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="4,3" opacity=".7" />
          <polyline points="0,28 108,26 216,30 324,24 432,27 540,23 648,26 760,48" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinejoin="round" opacity=".8" />
          <circle cx="760" cy="28" r="4" fill="var(--red)" stroke="white" strokeWidth="1.5" />
        </svg>
        <div className="spark-dates">
          {['6/3','6/4','6/5','6/6','6/7','6/8','6/9'].map(d => <span key={d}>{d}</span>)}
          <span style={{ color: 'var(--red)', fontWeight: 600 }}>{t('today')}</span>
        </div>
      </div>

      {/* Diagnosis section */}
      <div className="sec-label">
        <span>{t('sec_diag')}</span>
        <span className="sec-count">{t('diag_count')}</span>
        <div className="sec-line" />
      </div>

      {/* D1: Critical */}
      <DiagnosticCard
        type="critical" icon="🚨" confidence="91%" defaultOpen={true}
        title={t('page_title') === 'Diagnostics'
          ? 'Core keyword "wireless earbuds" lost ad placement today — direct cause of order drop'
          : t('page_title') === '智能诊断'
          ? '核心词 "wireless earbuds" 今日广告位消失 → 直接导致订单下滑'
          : '核心詞 "wireless earbuds" 今日廣告位消失 → 直接導致訂單下滑'}
        subtitle="Campaign budget consumed by low-CVR keywords · est. ~14 orders lost"
      >
        <div className="ev-chain-label">{t('ev_chain')}</div>
        <EvStep num={1}>Orders today <Tag variant="red">47</Tag> vs yesterday <code>67</code> — <Tag variant="red">↓30%</Tag>, exceeds 20% threshold</EvStep>
        <EvStep num={2}>Scanned 10 keywords for organic shifts — all within ±3 positions. <strong>Organic factor ruled out.</strong></EvStep>
        <EvStep num={3}>Ad placement: <Tag variant="orange">"wireless earbuds"</Tag> had <strong>zero impressions all day</strong> — yesterday held P2.</EvStep>
        <EvStep num={4}>SP-API: campaign <Tag variant="orange">Campaign_All_KW</Tag> budget <code>$80</code> exhausted at <strong>10:14 AM</strong>.</EvStep>
        <EvStep num={5} variant="root">
          <strong>Root cause:</strong> <Tag variant="red">"wireless headset gaming"</Tag> + <Tag variant="red">"bluetooth speaker earbuds"</Tag> consumed <code>$52.1</code> (65%) generating <Tag variant="red">0 orders</Tag>.
        </EvStep>

        <div className="dt-wrap" style={{ marginTop: 14 }}>
          <table className="dt">
            <thead><tr>
              <th>{t('th_kw')}</th><th>{t('th_ad_today')}</th><th>{t('th_ad_yest')}</th>
              <th>{t('th_spend')}</th><th>{t('th_orders')}</th><th>{t('th_cvr')}</th><th>{t('th_verdict')}</th>
            </tr></thead>
            <tbody>
              <tr className="dr">
                <td><strong>wireless earbuds</strong> ⭐</td>
                <td><span className="rp rp-n">{t('none')}</span></td><td><span className="rp rp-g">P2</span></td>
                <td><code>$0.0</code></td><td style={{color:'var(--red)'}}><code>0</code></td>
                <td>—</td><td><Tag variant="red">{t('budget_gone')}</Tag></td>
              </tr>
              <tr>
                <td>wireless headset gaming</td>
                <td><span className="rp rp-m">P5</span></td><td><span className="rp rp-m">P6</span></td>
                <td><code>$31.2</code></td><td><code>0</code></td>
                <td style={{color:'var(--red)'}}><code>0%</code></td><td><Tag variant="red">{t('low_cvr')}</Tag></td>
              </tr>
              <tr>
                <td>bluetooth speaker earbuds</td>
                <td><span className="rp rp-m">P4</span></td><td><span className="rp rp-m">P5</span></td>
                <td><code>$20.9</code></td><td><code>1</code></td>
                <td style={{color:'var(--yellow)'}}><code>1.8%</code></td><td><Tag variant="yellow">{t('low_cvr')}</Tag></td>
              </tr>
              <tr>
                <td>noise cancelling earphones</td>
                <td><span className="rp rp-g">P1</span></td><td><span className="rp rp-g">P1</span></td>
                <td><code>$18.4</code></td><td><code>6</code></td>
                <td style={{color:'var(--green)'}}><code>12.3%</code></td><td><Tag variant="green">{t('normal')}</Tag></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="strat-section">
          <div className="strat-section-label">{t('strat_label')}</div>
          <div className="strat-grid">
            <StrategyItem letter="A" tagStyle="fast" tag={t('tag_fast')}
              main="Raise campaign daily budget to $130+ — keeps core keyword running all day"
              detail="Budget ran out at 10:14 AM. $130 ensures full-day coverage." />
            <StrategyItem letter="B" tagStyle="safe" tag={t('tag_optimal')} defaultChosen
              main="Negate or cut bids on low-CVR keywords (gaming headset → $0.30, BT speaker → $0.50)"
              detail="Frees the $52 wasted budget. Negate 0% CVR immediately; reduce 1.8% and monitor 3 days." />
            <StrategyItem letter="C" tagStyle="struct" tag={t('tag_structural')}
              main='Create a dedicated campaign for "wireless earbuds" only, with $50 exclusive budget'
              detail="Structurally isolates the core keyword. Requires learning period." />
          </div>
        </div>
      </DiagnosticCard>

      {/* D2: Warning */}
      <DiagnosticCard type="warning" icon="⚠️" confidence="78%"
        title='Competitor overtook you on "true wireless earbuds" — both organic rank and ad placement'
        subtitle="B0C1234567 surged sharply today · est. ~4 orders diverted"
      >
        <div className="ev-chain-label">{t('ev_chain')}</div>
        <EvStep num={1}>Organic rank for <Tag variant="orange">"true wireless earbuds"</Tag> dropped <code>#53</code> → <Tag variant="red">#68</Tag> (−15)</EvStep>
        <EvStep num={2}>Competitor B0C1234567: organic <code>#42</code> → <Tag variant="red">#11</Tag>, ad: none → <Tag variant="red">P1</Tag></EvStep>
        <EvStep num={3} variant="root"><strong>Competitor launched aggressive push</strong>, held P1 from 08:00–14:00, captured ~60% of clicks.</EvStep>
        <div className="strat-section">
          <div className="strat-section-label">{t('strat_label')}</div>
          <div className="strat-grid">
            <StrategyItem letter="A" tagStyle="fast" tag={t('tag_fast')} defaultChosen
              main='Raise bid on "true wireless earbuds" to reclaim P1–P3 ad placement'
              detail="210K monthly searches — worth contesting. Monitor 3 days, assess ROI." />
            <StrategyItem letter="B" tagStyle="watch" tag={t('tag_watch')}
              main="Monitor for 3 days — competitor may be testing, not committing"
              detail="Some competitors run short bursts. Zero cost, but traffic loss continues." />
          </div>
        </div>
      </DiagnosticCard>

      {/* D3: Info */}
      <DiagnosticCard type="info" icon="ℹ️" confidence="84%"
        title="Platform-wide traffic below baseline today — cyclical pattern, no action needed"
        subtitle="Category-wide BSR decline confirmed · typical Tuesday trough"
      >
        <div className="ev-chain-label">{t('ev_chain')}</div>
        <EvStep num={1}>Competitors also saw BSR drops — <Tag variant="blue">category-wide −12%</Tag>. Not ASIN-specific.</EvStep>
        <EvStep num={2}><strong>Tuesdays and Wednesdays</strong> consistently run 20–30% below weekend peaks.</EvStep>
        <EvStep num={3} variant="info"><strong>Conclusion:</strong> ~8 orders due to platform cycle. No listing, ad, or pricing changes needed.</EvStep>
        <div className="info-box">✓ No action required. Orders expected to recover to 55–65 range from Wednesday onward.</div>
      </DiagnosticCard>

      {/* D4: Positive */}
      <DiagnosticCard type="positive" icon="🚀" confidence="95%"
        title="3 keywords hit organic Top 3 today — natural traffic share rising"
        subtitle='"sport earbuds waterproof" · "usb c earbuds" · "long battery earbuds" — contributed +11 orders'
      >
        <div className="ev-chain-label">{t('ev_chain')}</div>
        <EvStep num={1}>Consistent ad spend drove velocity — algorithm promoted them to <Tag variant="green">organic Top 3</Tag>.</EvStep>
        <EvStep num={2} variant="good"><strong>Organic rank now stable</strong> — gradually reduce bids. Reallocate budget to KWs still climbing. Improves TACoS.</EvStep>
        <div className="dt-wrap" style={{ marginTop: 14 }}>
          <table className="dt">
            <thead><tr>
              <th>{t('th_kw')}</th><th>{t('th_org_yest')}</th><th>{t('th_org_today')}</th>
              <th>{t('th_ad_today')}</th><th>{t('th_action')}</th>
            </tr></thead>
            <tbody>
              {[
                ['sport earbuds waterproof', '#3', '#1', 'P1', t('bid_down_15')],
                ['usb c earbuds', '#4', '#2', 'P1', t('bid_down_10')],
                ['long battery earbuds', '#6', '#3', 'P2', t('bid_down_10')],
              ].map(([kw, oy, ot, ad, action]) => (
                <tr key={kw}>
                  <td>{kw}</td>
                  <td><span className="rp rp-g">{oy}</span></td>
                  <td><span className="rp rp-g">{ot}</span></td>
                  <td><span className="rp rp-g">{ad}</span></td>
                  <td style={{ color: 'var(--green)', fontSize: 12, fontWeight: 500 }}>{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DiagnosticCard>

      {/* Traffic Health */}
      <div className="sec-label" style={{ marginTop: 8 }}>
        <span>{t('sec_health')}</span><div className="sec-line" />
      </div>
      <div className="health-row">
        {[
          { label: t('hm_today'), value: '38%', pct: 38, color: 'var(--yellow)', target: t('target_4565'), status: t('below_target'), statusColor: 'var(--yellow)' },
          { label: t('hm_7d'),    value: '41%', pct: 41, color: 'var(--orange)', target: t('target_50'),   status: t('five_days'),    statusColor: 'var(--orange)' },
          { label: 'TACoS',       value: '18.4%', pct: 46, color: 'var(--green)', target: t('target_tacos'), status: t('in_range'),  statusColor: 'var(--green)' },
        ].map((m, i) => (
          <div key={i} className="hm-card">
            <div className="hm-label">{m.label}</div>
            <div className="hm-value" style={{ color: m.color }}>{m.value}</div>
            <div className="hm-bar"><div className="hm-fill" style={{ width: `${m.pct}%`, background: m.color }} /></div>
            <div className="hm-range"><span>0%</span><span>{m.target}</span><span>{i === 2 ? '40%' : '100%'}</span></div>
            <div className="hm-status" style={{ color: m.statusColor }}>{m.status}</div>
          </div>
        ))}
      </div>

      {/* Ratio history */}
      <div className="rh-card">
        <div className="rh-inner-label">{t('rh_title')}</div>
        <div className="rh-inner">
          {RATIO_HISTORY.map(r => (
            <div key={r.date} className="rh-row">
              <div className="rh-date">{r.date}</div>
              <div className="rh-track">
                <div className="rh-org" style={{ width: `${r.org}%` }} />
                <div className="rh-ad" />
              </div>
              <div className="rh-nums">
                <span className="rh-o">{r.org}%</span>
                <span style={{ color: 'var(--text-400)' }}> / </span>
                <span className="rh-a">{100 - r.org}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rh-legend">
          <div className="rh-leg"><div className="rh-dot" style={{ background: 'var(--green)' }} /><span style={{ color: 'var(--text-500)' }}>{t('organic')}</span></div>
          <div className="rh-leg"><div className="rh-dot" style={{ background: 'var(--orange)', opacity: .7 }} /><span style={{ color: 'var(--text-500)' }}>{t('paid_ads')}</span></div>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-400)' }}>{t('health_ref')}</span>
        </div>
      </div>

      {/* Competitor table */}
      <div className="sec-label"><span>{t('sec_comp')}</span><div className="sec-line" /></div>
      <div className="comp-card">
        <div className="comp-head">
          <div>
            <div className="comp-head-title">{t('comp_title')}</div>
            <div className="comp-head-sub">{t('comp_sub')}</div>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-400)' }}>B08N5WRWNW vs B0C1234567</span>
        </div>
        <table className="ct">
          <thead><tr>
            <th>{t('th_kw')}</th>
            <th>{t('th_self_org_y')}</th><th>{t('th_self_org_t')}</th><th>{t('th_self_ad')}</th>
            <th>{t('th_comp_org_y')}</th><th>{t('th_comp_org_t')}</th><th>{t('th_comp_ad')}</th>
            <th>{t('th_status')}</th>
          </tr></thead>
          <tbody>
            <tr className="alert-row">
              <td><div className="kw-cell"><div className="alert-dot" /><strong>true wireless earbuds</strong></div></td>
              <td><span className="rp rp-b">#53</span></td><td><span className="rp rp-b">#68</span></td><td><span className="rp rp-n">{t('none')}</span></td>
              <td><span className="rp rp-m">#42</span></td><td><span className="rp rp-g">#11</span></td><td><span className="rp rp-g">P1</span></td>
              <td><span className="status-tag st-danger">{t('comp_overtook')}</span></td>
            </tr>
            <tr>
              <td>wireless earbuds</td>
              <td><span className="rp rp-g">#7</span></td><td><span className="rp rp-g">#7</span></td><td><span className="rp rp-n">{t('none')}</span></td>
              <td><span className="rp rp-m">#12</span></td><td><span className="rp rp-g">#10</span></td><td><span className="rp rp-m">P5</span></td>
              <td><span className="status-tag st-warn">{t('comp_closing')}</span></td>
            </tr>
            <tr>
              <td>noise cancelling earphones</td>
              <td><span className="rp rp-g">#4</span></td><td><span className="rp rp-g">#4</span></td><td><span className="rp rp-g">P1</span></td>
              <td><span className="rp rp-m">#15</span></td><td><span className="rp rp-m">#15</span></td><td><span className="rp rp-n">{t('none')}</span></td>
              <td><span className="status-tag st-ok">{t('you_lead')}</span></td>
            </tr>
            <tr>
              <td>sport earbuds waterproof</td>
              <td><span className="rp rp-g">#3</span></td><td><span className="rp rp-g">#1</span></td><td><span className="rp rp-g">P1</span></td>
              <td><span className="rp rp-m">#22</span></td><td><span className="rp rp-m">#24</span></td><td><span className="rp rp-n">{t('none')}</span></td>
              <td><span className="status-tag st-ok">{t('dominant')}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
