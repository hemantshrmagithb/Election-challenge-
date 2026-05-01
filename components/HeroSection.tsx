'use client';

import { useLang } from '@/context/LanguageContext';
import { TranslationKeys } from '@/lib/translations';

interface HeroStat {
  value: string;
  titleKey: TranslationKeys;
  noteKey: TranslationKeys;
  icon: string;
}

const STATS: HeroStat[] = [
  { value: '538', titleKey: 'statEvTitle', noteKey: 'statEvNote', icon: '🗺️' },
  { value: '270', titleKey: 'statWinTitle', noteKey: 'statWinNote', icon: '🎯' },
  { value: '27',  titleKey: 'statLawTitle', noteKey: 'statLawNote', icon: '📜' },
  { value: '51',  titleKey: 'statStateTitle', noteKey: 'statStateNote', icon: '🏛️' },
];



export default function HeroSection() {
  const { t } = useLang();

  const scrollToAgent = () => {
    document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToPulse = () => {
    document.getElementById('pulse')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative' }}>

      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.72rem', padding: '6px 16px' }}>
            💓 {t('heroBadge')}
          </span>
        </div>

        {/* Headline — main h1 for SEO */}
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px', letterSpacing: '-0.02em' }}>
          <span className="gradient-text">{t('heroTitlePart1')}</span>
          <br />
          <span style={{ color: '#f0f4ff' }}>{t('heroTitlePart2')}</span>
        </h1>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          <button className="btn-primary" onClick={scrollToAgent} id="hero-cta-agent" style={{ fontSize: '0.9rem', padding: '14px 28px' }}>
            🧠 {t('heroCtaAgent')}
          </button>
          <button className="btn-chaos" onClick={scrollToPulse} id="hero-cta-pulse">
            💓 {t('heroCtaPulse')}
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })} id="hero-cta-journey">
            📋 {t('heroCtaJourney')}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '700px', margin: '0 auto' }}>
          {STATS.map((stat) => (
            <div key={stat.titleKey} className="glass-card" style={{ padding: '18px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00d4ff', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(240,244,255,0.45)', marginTop: '4px', lineHeight: 1.3 }}>
                {t(stat.titleKey)}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(240,244,255,0.25)', marginTop: '2px' }}>
                {t(stat.noteKey)}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.4 }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {t('heroScroll')}
          </div>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
