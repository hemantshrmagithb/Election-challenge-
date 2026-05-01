'use client';

import { useLang } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, toggle, t } = useLang();

  const NAV_ITEMS = [
    { id: 'hero',    label: t('navHome') },
    { id: 'pulse',   label: t('navPulse') },
    { id: 'agent',   label: t('navAgent') },
    { id: 'journey', label: t('navJourney') },
    { id: 'laws',    label: t('navLibrary') },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(5, 11, 24, 0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px', height: '60px',
      display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        onClick={() => scrollTo('hero')}
        role="button"
        id="nav-logo"
      >
        <div style={{
          width: 32, height: 32, borderRadius: '8px',
          background: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
        }}>🗳️</div>
        <span style={{ fontWeight: 800, fontSize: '0.95rem', background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', whiteSpace: 'nowrap' }}>
          {t('logoTitle')}
        </span>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: '4px', marginLeft: '8px', flex: 1, overflowX: 'auto' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className="nav-link"
            onClick={() => scrollTo(item.id)}
            style={{ background: 'none', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.82rem' }}
            id={`nav-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Language Toggle */}
      <div className="lang-toggle" id="lang-toggle">
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={lang !== 'en' ? toggle : undefined}
          style={{ cursor: 'pointer' }}
        >EN</button>
        <button
          className={lang === 'hi' ? 'active' : ''}
          onClick={lang !== 'hi' ? toggle : undefined}
          style={{ cursor: 'pointer' }}
        >हिं</button>
      </div>

      {/* CTA */}
      <button
        className="btn-primary"
        onClick={() => scrollTo('agent')}
        style={{ fontSize: '0.75rem', padding: '7px 14px', whiteSpace: 'nowrap', flexShrink: 0 }}
        id="nav-cta"
      >
        🧠 {t('navAskAgent')}
      </button>
    </nav>
  );
}
