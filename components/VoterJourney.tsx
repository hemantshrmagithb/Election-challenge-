'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';

const STEPS = [
  {
    step: '01',
    en: {
      title: 'Check Eligibility',
      detail: 'Must be a U.S. citizen, 18+ by Election Day, and a state resident. Felony restrictions vary by state.',
      law: '26th Amendment + State Law',
    },
    hi: {
      title: 'पात्रता जाँचें',
      detail: 'अमेरिकी नागरिक होना चाहिए, चुनाव के दिन तक 18+ होना चाहिए, और राज्य का निवासी होना चाहिए। दोषसिद्धि प्रतिबंध राज्य के अनुसार भिन्न होते हैं।',
      law: '26वाँ संशोधन + राज्य कानून',
    },
    icon: '✅',
    color: '#7c3aed',
  },
  {
    step: '02',
    en: {
      title: 'Register to Vote',
      detail: 'Register at vote.gov online, at the DMV (Motor Voter), by paper form, or in-person. Deadlines: Election Day to 30 days prior depending on state.',
      law: 'NVRA 1993',
    },
    hi: {
      title: 'मतदान के लिए पंजीकरण करें',
      detail: 'वोट.जीओवी पर ऑनलाइन, डीएमवी (मोटर वोटर) पर, पेपर फॉर्म द्वारा, या व्यक्तिगत रूप से पंजीकरण करें। समय सीमा: राज्य के आधार पर चुनाव के दिन से 30 दिन पहले तक।',
      law: 'NVRA 1993',
    },
    icon: '📋',
    color: '#0891b2',
  },
  {
    step: '03',
    en: {
      title: 'Know Your Election',
      detail: 'Presidential elections every 4 years. Congress every 2 years. Local elections often off-cycle. Check your county election website.',
      law: 'U.S. Constitution Art. I & II',
    },
    hi: {
      title: 'अपने चुनाव को जानें',
      detail: 'राष्ट्रपति चुनाव हर 4 साल में। कांग्रेस हर 2 साल में। स्थानीय चुनाव अक्सर अलग समय पर। अपने काउंटी चुनाव वेबसाइट की जाँच करें।',
      law: 'अमेरिकी संविधान अनुच्छेद I और II',
    },
    icon: '📅',
    color: '#059669',
  },
  {
    step: '04',
    en: {
      title: 'Research Candidates',
      detail: 'Use nonpartisan tools: Ballotpedia, Vote Smart, League of Women Voters guide. Understand ballot measures too.',
      law: 'Civic Best Practice',
    },
    hi: {
      title: 'उम्मीदवारों पर शोध करें',
      detail: 'गैर-पक्षपाती उपकरणों का उपयोग करें: बैलटपीडिया, वोट स्मार्ट, लीग ऑफ विमेन वोटर्स गाइड। बैलट उपायों को भी समझें।',
      law: 'नागरिक सर्वोत्तम अभ्यास',
    },
    icon: '🔍',
    color: '#d97706',
  },
  {
    step: '05',
    en: {
      title: 'Find Your Polling Place',
      detail: 'Use vote.gov or your state\'s election website. Know your polling hours — typically 7am–8pm. If in line when polls close, you can still vote.',
      law: 'State Election Law',
    },
    hi: {
      title: 'अपना मतदान केंद्र खोजें',
      detail: 'वोट.जीओवी या अपने राज्य की चुनाव वेबसाइट का उपयोग करें। अपने मतदान के घंटे जानें — आमतौर पर सुबह 7 बजे से रात 8 बजे तक। यदि मतदान बंद होने पर लाइन में हैं, तो भी वोट दे सकते हैं।',
      law: 'राज्य चुनाव कानून',
    },
    icon: '📍',
    color: '#db2777',
  },
  {
    step: '06',
    en: {
      title: 'Cast Your Vote',
      detail: 'Show required ID, receive ballot, go to private booth, mark clearly, submit to scanner or judge. Vote provisionally if your eligibility is questioned.',
      law: 'HAVA 2002',
    },
    hi: {
      title: 'अपना वोट डालें',
      detail: 'आवश्यक आईडी दिखाएं, मतपत्र प्राप्त करें, निजी बूथ पर जाएं, स्पष्ट रूप से निशान लगाएं, स्कैनर या जज को जमा करें। यदि आपकी पात्रता पर सवाल उठाया जाता है तो अनंतिम रूप से वोट करें।',
      law: 'HAVA 2002',
    },
    icon: '🗳️',
    color: '#7c3aed',
  },
  {
    step: '07',
    en: {
      title: 'Track Your Ballot',
      detail: 'If voting by mail, track your ballot at your state\'s election website. Call the Election Protection Hotline if anything goes wrong: 866-OUR-VOTE.',
      law: 'State Ballot Tracking System',
    },
    hi: {
      title: 'अपने मतपत्र को ट्रैक करें',
      detail: 'यदि मेल द्वारा मतदान कर रहे हैं, तो अपने राज्य की चुनाव वेबसाइट पर अपने मतपत्र को ट्रैक करें। यदि कुछ गलत होता है तो चुनाव सुरक्षा हॉटलाइन पर कॉल करें: 866-OUR-VOTE।',
      law: 'राज्य मतपत्र ट्रैकिंग प्रणाली',
    },
    icon: '📬',
    color: '#0891b2',
  },
];

export default function VoterJourney() {
  const { t, lang } = useLang();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <div style={{ fontSize: '1.5rem' }}>🗺️</div>
        <div>
          <h3 style={{ fontWeight: 700, color: '#f0f4ff', fontSize: '1.1rem' }}>{t('journeyMapTitle')}</h3>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.8rem' }}>{t('journeyMapSubtitle')}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {STEPS.map((step, i) => (
          <div key={i}>
            <div
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveStep(activeStep === i ? null : i); } }}
              id={`journey-step-${i}`}
              role="button"
              tabIndex={0}
              aria-expanded={activeStep === i}
              aria-controls={`journey-detail-${i}`}
              aria-label={`${t('journeyStepPrefix')} ${step.step}: ${step[lang].title}`}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              {/* Dot + connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 44, flexShrink: 0 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: activeStep === i ? step.color : step.color + '22',
                  border: `2px solid ${step.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s',
                  boxShadow: activeStep === i ? `0 0 16px ${step.color}66` : 'none',
                }}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: i < STEPS.length - 1 ? '0' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: step.color, fontWeight: 600 }}>
                    {t('journeyStepPrefix')} {step.step}
                  </span>
                  <span style={{ fontWeight: 600, color: '#f0f4ff', fontSize: '0.9rem' }}>{step[lang].title}</span>
                  <span className="badge" style={{ background: step.color + '18', color: step.color, border: `1px solid ${step.color}33`, fontSize: '0.6rem', marginLeft: 'auto' }}>
                    {activeStep === i ? '▲' : '▼'}
                  </span>
                </div>

                {activeStep === i && (
                  <div
                    id={`journey-detail-${i}`}
                    role="region"
                    aria-label={`Details for ${step[lang].title}`}
                    style={{
                      marginTop: '10px',
                      padding: '12px 14px',
                      background: step.color + '0d',
                      border: `1px solid ${step.color}33`,
                      borderRadius: '10px',
                      animation: 'fadeInUp 0.2s ease',
                    }}
                  >
                    <p style={{ color: '#f0f4ff', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '8px' }}>
                      {step[lang].detail}
                    </p>
                    <span className="badge" style={{ background: step.color + '18', color: step.color, border: `1px solid ${step.color}33`, fontSize: '0.6rem' }}>
                      ⚖️ {t('journeyLegalBasis')}: {step[lang].law}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div style={{
                width: '2px', height: '20px', marginLeft: '21px',
                background: `linear-gradient(to bottom, ${step.color}, ${STEPS[i + 1].color})`,
                opacity: 0.35,
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
