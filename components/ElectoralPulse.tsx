'use client';

import { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { STATE_NODES, StateNode, REGION_COLORS, TOTAL_REGIONS } from '@/lib/stateData';
import { useLang } from '@/context/LanguageContext';

// ── CONSTANTS (created once, never re-allocated) ─────────────────────────────
const OVERLAY_BACKDROP_STYLE: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 2000,
  background: 'rgba(5, 11, 24, 0.8)', backdropFilter: 'blur(12px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '24px', animation: 'fadeInUp 0.25s ease',
};

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
  textTransform: 'uppercase', marginBottom: '8px',
};

const STAT_BOX_STYLE: React.CSSProperties = {
  borderRadius: '12px', padding: '14px', textAlign: 'center',
};

const STAT_VALUE_STYLE: React.CSSProperties = {
  fontSize: '1.5rem', fontWeight: 900,
};

const STAT_LABEL_STYLE: React.CSSProperties = {
  fontSize: '0.68rem', color: 'rgba(240,244,255,0.5)', marginTop: '2px',
};

const CONTENT_BOX_STYLE: React.CSSProperties = {
  borderRadius: '12px', padding: '14px',
};

/** Pre-compute filterable region legend entries (static) */
const LEGEND_REGIONS = Object.entries(REGION_COLORS)
  .filter(([region]) => !['Southwest', 'Mountain', 'Capital'].includes(region));

// ── STATIC SVG GRID (memoized — never re-renders) ───────────────────────────
const GridLines = memo(function GridLines() {
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#00d4ff" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#00d4ff" strokeWidth="0.5" />
      ))}
    </svg>
  );
});

// ── DATA OVERLAY (explodes from node on click) ──────────────────────────────
function DataOverlay({ node, onClose }: { node: StateNode; onClose: () => void }) {
  const { t, rawT } = useLang();

  // Esc key handler — the UI promises "press Esc to close"
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div onClick={onClose} style={OVERLAY_BACKDROP_STYLE}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="pulse-overlay-card"
        style={{
          background: 'rgba(12, 20, 42, 0.96)',
          border: `1px solid ${node.color}55`,
          borderRadius: '24px', padding: '36px', maxWidth: '520px', width: '100%',
          boxShadow: `0 0 80px ${node.color}20, 0 32px 80px rgba(0,0,0,0.6)`,
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Glow ring */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          borderRadius: '50%', background: `radial-gradient(circle, ${node.color}18, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Close */}
        <button onClick={onClose} aria-label="Close overlay" style={{
          position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', width: 32, height: 32,
          color: 'rgba(240,244,255,0.6)', cursor: 'pointer', fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '14px',
            background: node.color + '20', border: `2px solid ${node.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', fontWeight: 900, color: node.color, fontFamily: 'var(--font-mono)',
            boxShadow: `0 0 24px ${node.color}40`,
          }}>
            {node.abbr}
          </div>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#f0f4ff' }}>
              {rawT(node.name.en, node.name.hi)}
            </h2>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: node.color + '18', color: node.color, border: `1px solid ${node.color}33`, fontSize: '0.6rem' }}>
                {node.ev} {t('pulseOverlayEv')}
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>
                {node.region}
              </span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, ${node.color}44, transparent)`, marginBottom: '20px' }} />

        {/* ── Turnout Stats ── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ ...SECTION_LABEL_STYLE, color: '#00d4ff' }}>
            📊 {t('pulseOverlayTurnout')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ ...STAT_BOX_STYLE, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div style={{ ...STAT_VALUE_STYLE, color: '#00d4ff' }}>{node.turnout2024}%</div>
              <div style={STAT_LABEL_STYLE}>{t('pulseOverlay2024')}</div>
            </div>
            <div style={{ ...STAT_BOX_STYLE, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div style={{ ...STAT_VALUE_STYLE, color: node.turnoutDelta >= 0 ? '#10b981' : '#f43f5e' }}>
                {node.turnoutDelta >= 0 ? '+' : ''}{node.turnoutDelta}%
              </div>
              <div style={STAT_LABEL_STYLE}>{t('pulseOverlayVs2020')}</div>
            </div>
          </div>
          <div className="progress-bar" style={{ marginTop: '8px' }}>
            <div className="progress-fill" style={{ width: `${node.turnout2024}%`, transition: 'width 1.2s ease' }} />
          </div>
        </div>

        {/* ── Constitutional Rights ── */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ ...SECTION_LABEL_STYLE, color: '#a78bfa' }}>
            ⚖️ {t('pulseOverlayRights')}
          </div>
          <div style={{ ...CONTENT_BOX_STYLE, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}>
            <p style={{ color: 'rgba(240,244,255,0.78)', fontSize: '0.83rem', lineHeight: 1.65 }}>
              {rawT(node.rights.en, node.rights.hi)}
            </p>
            <div style={{ marginTop: '8px' }}>
              <span className="badge" style={{ background: node.color + '18', color: node.color, border: `1px solid ${node.color}33`, fontSize: '0.58rem' }}>
                🪪 {rawT(node.voterIdType.en, node.voterIdType.hi)}
              </span>
            </div>
          </div>
        </div>

        {/* ── AI Analysis ── */}
        <div>
          <div style={{ ...SECTION_LABEL_STYLE, color: '#10b981' }}>
            🧠 {t('pulseOverlayAiAnalysis')}
          </div>
          <div style={{ ...CONTENT_BOX_STYLE, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <p style={{ color: 'rgba(240,244,255,0.78)', fontSize: '0.83rem', lineHeight: 1.65 }}>
              {rawT(node.insight.en, node.insight.hi)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: 'rgba(240,244,255,0.3)' }}>
            {t('pulseOverlayCloseHint')}
          </span>
          <span className="badge badge-green" style={{ fontSize: '0.58rem' }}>
            ✅ {t('pulseOverlayVerified')}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ElectoralPulse() {
  const { t, rawT, lang } = useLang();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<StateNode | null>(null);
  const [exploredIds, setExploredIds] = useState<Set<string>>(new Set());

  const handleNodeClick = useCallback((node: StateNode) => {
    setSelectedNode(node);
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(node.id);
      return next;
    });
  }, []);

  /** Stable close handler for overlay (avoid re-creating on every render) */
  const handleOverlayClose = useCallback(() => setSelectedNode(null), []);

  /** Pre-compute connection lines once — O(n²) at mount, O(1) per render */
  const connectionLines = useMemo(() => {
    const lines: { key: string; x1: string; y1: string; x2: string; y2: string; stroke: string }[] = [];
    for (let i = 0; i < STATE_NODES.length; i++) {
      for (let j = i + 1; j < STATE_NODES.length; j++) {
        const a = STATE_NODES[i];
        const b = STATE_NODES[j];
        const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        if (dist <= 20) {
          lines.push({
            key: `${a.id}-${b.id}`,
            x1: `${a.x}%`, y1: `${a.y}%`,
            x2: `${b.x}%`, y2: `${b.y}%`,
            stroke: `${a.color}22`,
          });
        }
      }
    }
    return lines;
  }, []);

  const progress = Math.round((exploredIds.size / TOTAL_REGIONS) * 100);
  const badgeEarned = progress >= 75;

  return (
    <>
      {selectedNode && <DataOverlay node={selectedNode} onClose={handleOverlayClose} />}

      {/* ── Progress Bar (Gamification) ── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.05em' }}>
              🏆 {t('pulseProgressLabel')}
            </span>
            <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>
              {exploredIds.size}/{TOTAL_REGIONS} {t('pulseExplored')}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: progress >= 75 ? '#10b981' : '#00d4ff' }}>
              {progress}%
            </span>
            {badgeEarned && (
              <span className="badge badge-green" style={{ fontSize: '0.6rem', animation: 'chaosPulse 2s ease-in-out infinite' }}>
                🎖️ {t('pulseBadgeEarned')}
              </span>
            )}
          </div>
        </div>
        <div className="progress-bar" style={{ height: '6px' }}>
          <div className="progress-fill" style={{ width: `${progress}%`, background: badgeEarned ? 'linear-gradient(90deg, #10b981, #00d4ff)' : undefined, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* ── Interactive SVG Map ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '2 / 1', minHeight: '360px', background: 'rgba(0,0,0,0.25)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {/* Static aesthetic grid */}
        <GridLines />

        {/* Pre-computed connection lines */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {connectionLines.map((line) => (
            <line key={line.key} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke={line.stroke} strokeWidth="1" strokeDasharray="4 4" />
          ))}
        </svg>

        {/* ── STATE NODES ── */}
        {STATE_NODES.map((node) => {
          const isHovered = hoveredId === node.id;
          const isExplored = exploredIds.has(node.id);
          const baseSize = 28 * node.scale;
          const size = isHovered ? baseSize * 1.25 : baseSize;

          return (
            <div
              key={node.id}
              role="button"
              tabIndex={0}
              aria-label={`${node.name.en} — ${node.ev} Electoral Votes`}
              id={`node-${node.id}`}
              onClick={() => handleNodeClick(node)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNodeClick(node); } }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: 'absolute',
                left: `${node.x}%`, top: `${node.y}%`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
                zIndex: isHovered ? 10 : 1,
                cursor: 'pointer',
                transition: 'transform 0.25s ease',
              }}
            >
              {/* Pulse rings (heartbeat on hover) */}
              {isHovered && (
                <>
                  <div className="map-pulse-ring" style={{ width: size * 2.8, height: size * 2.8, border: `1.5px solid ${node.color}`, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', position: 'absolute', borderRadius: '50%', animationDelay: '0s' }} />
                  <div className="map-pulse-ring" style={{ width: size * 3.6, height: size * 3.6, border: `1px solid ${node.color}`, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', position: 'absolute', borderRadius: '50%', animationDelay: '0.3s' }} />
                </>
              )}

              {/* Glow */}
              <div style={{
                position: 'absolute', inset: -12, borderRadius: '50%',
                background: `radial-gradient(circle, ${node.color}${isHovered ? '30' : '12'}, transparent 70%)`,
                transition: 'all 0.3s', pointerEvents: 'none',
              }} />

              {/* Core node */}
              <div style={{
                width: size, height: size, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${node.color}cc, ${node.color}66)`,
                border: `2px solid ${isExplored ? '#10b981' : node.color}`,
                boxShadow: `0 0 ${isHovered ? 20 : 8}px ${node.color}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: `${Math.max(9, 7 * node.scale)}px`,
                fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)',
                transition: 'all 0.3s ease', position: 'relative',
                animation: isHovered ? 'heartbeat 1s ease-in-out infinite' : undefined,
              }}>
                {node.abbr}
                {isExplored && (
                  <div style={{
                    position: 'absolute', top: -3, right: -3,
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#10b981', border: '1.5px solid #050b18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '5px',
                  }}>✓</div>
                )}
              </div>

              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(12, 20, 42, 0.95)', border: `1px solid ${node.color}44`,
                  borderRadius: '10px', padding: '8px 12px', whiteSpace: 'nowrap',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)', pointerEvents: 'none',
                  animation: 'fadeInUp 0.15s ease',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#f0f4ff' }}>
                    {rawT(node.name.en, node.name.hi)}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '3px' }}>
                    <span style={{ fontSize: '0.65rem', color: node.color }}>{node.ev} EVs</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(240,244,255,0.4)' }}>•</span>
                    <span style={{ fontSize: '0.65rem', color: node.turnoutDelta >= 0 ? '#10b981' : '#f43f5e' }}>
                      {node.turnout2024}% {lang === 'en' ? 'turnout' : 'मतदान'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Map Label ── */}
        <div style={{ position: 'absolute', bottom: 12, left: 16, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.65rem', color: 'rgba(240,244,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {t('pulseClickHint')}
          </span>
        </div>

        {/* Region legend */}
        <div style={{ position: 'absolute', top: 12, right: 16, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {LEGEND_REGIONS.map(([region, color]) => (
            <span key={region} className="badge" style={{ background: color + '18', color, border: `1px solid ${color}33`, fontSize: '0.55rem' }}>
              {region}
            </span>
          ))}
        </div>
      </div>

      {/* ── Quick Stats Bar ── */}
      <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {[
          { v: '538', l: t('floatingTotalEv'), c: '#00d4ff' },
          { v: '270', l: t('floatingToWin'), c: '#a78bfa' },
          { v: '51', l: t('statStateTitle'), c: '#10b981' },
          { v: `${exploredIds.size}`, l: t('pulseExplored'), c: '#f59e0b' },
        ].map((s) => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '6px 12px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: s.c }}>{s.v}</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(240,244,255,0.45)' }}>{s.l}</span>
          </div>
        ))}
      </div>
    </>
  );
}
