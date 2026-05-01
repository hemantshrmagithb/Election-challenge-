'use client';

import { useState, useEffect } from 'react';
import { LanguageProvider, useLang } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ElectoralPulse from '@/components/ElectoralPulse';
import ElectoralAgent from '@/components/ElectoralAgent';
import VoterJourney from '@/components/VoterJourney';
import LawLibrary from '@/components/LawLibrary';
import MythBuster from '@/components/MythBuster';
import FloatingStats from '@/components/FloatingStats';

function PageContent() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Cosmic animated background */}
      <div className="cosmic-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="grid-overlay" />

      <Navbar />
      <FloatingStats />

      <main id="main-content" role="main" style={{ position: 'relative', zIndex: 1, paddingBottom: '80px' }}>

        {/* ── HERO ── */}
        <HeroSection />

        {/* ── ELECTORAL PULSE ── */}
        <section id="pulse" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="section-label">{t('pulseLabel')}</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f0f4ff', marginBottom: '12px' }}>
                💓 {t('pulseTitle')}
              </h2>
              <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.9rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
                {t('pulseSubtitle')}
              </p>
            </div>
            <div className="glass-card" style={{ padding: '24px', borderRadius: '24px' }}>
              <ElectoralPulse />
            </div>
          </div>
        </section>

        {/* ── AGENT + MYTH BUSTER (Stacked Vertically) ── */}
        <section id="agent" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="section-label">{t('agentLabel')}</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f0f4ff', marginBottom: '12px' }}>
                🧠 {t('agentTitle')}
              </h2>
              <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.9rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
                {t('agentSubtitle')}
              </p>
            </div>
            
            {/* Stacked Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
              <div style={{ width: '100%' }}>
                <ElectoralAgent />
              </div>
              
              {/* Myth Buster section label repeated for timeline feel if needed, or just the component */}
              <div className="glass-card" style={{ padding: '32px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <p className="section-label">{t('mythLabel')}</p>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f0f4ff', marginBottom: '8px' }}>
                    🔍 {t('mythTitle')}
                  </h2>
                  <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
                    {t('mythSubtitle')}
                  </p>
                </div>
                <MythBuster />
              </div>
            </div>
          </div>
        </section>

        {/* ── VOTER JOURNEY ── */}
        <section id="journey" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="section-label">{t('journeyLabel')}</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f0f4ff', marginBottom: '12px' }}>
                🗺️ {t('journeyTitle')}
              </h2>
              <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                {t('journeySubtitle')}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '28px' }}>
                <VoterJourney />
              </div>
              {/* Rights panels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '🚫', title: t('journeyDenyTitle'), items: [t('journeyDenyItem1'), t('journeyDenyItem2'), t('journeyDenyItem3'), t('journeyDenyItem4')], color: '#10b981' },
                  { icon: '⚠️', title: t('journeyReportTitle'), items: [t('journeyReportItem1'), t('journeyReportItem2'), t('journeyReportItem3'), t('journeyReportItem4')], color: '#f59e0b' },
                  { icon: '✅', title: t('journeyHistoryTitle'), items: [t('journeyHistoryItem1'), t('journeyHistoryItem2'), t('journeyHistoryItem3')], color: '#00d4ff' },
                ].map((panel) => (
                  <div key={panel.title} className="glass-card" style={{ padding: '18px', borderColor: `${panel.color}22` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{panel.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: panel.color }}>{panel.title}</span>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {panel.items.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', color: 'rgba(240,244,255,0.7)', fontSize: '0.82rem' }}>
                          <span style={{ color: panel.color, flexShrink: 0, marginTop: '2px' }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LAW LIBRARY ── */}
        <section id="laws" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="section-label">{t('lawLabel')}</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f0f4ff', marginBottom: '12px' }}>
                📚 {t('lawTitle')}
              </h2>
              <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                {t('lawSubtitle')}
              </p>
            </div>
            <div className="glass-card" style={{ padding: '28px' }}>
              <LawLibrary />
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '7px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>🗳️</div>
              <span style={{ fontWeight: 700, background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t('footerRights')}
              </span>
            </div>
            <p style={{ color: 'rgba(240,244,255,0.35)', fontSize: '0.78rem', lineHeight: 1.7 }}>
              {t('footerText')}
            </p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {['vote.gov', 'EAC.gov', 'Ballotpedia', 'League of Women Voters'].map((src) => (
                <span key={src} className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>{src}</span>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
