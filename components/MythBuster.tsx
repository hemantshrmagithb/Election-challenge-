'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';

const MYTHS = [
  {
    en: {
      myth: 'Non-citizens can easily vote',
      fact: 'It is a federal felony (52 U.S.C. § 10307). Voter rolls cross-referenced with citizenship databases. Documented cases are extremely rare and prosecuted.',
      severity: 'High Risk Myth',
    },
    hi: {
      myth: 'गैर-नागरिक आसानी से वोट दे सकते हैं',
      fact: 'यह एक संघीय अपराध है (52 U.S.C. § 10307)। मतदाता सूची का नागरिकता डेटाबेस के साथ मिलान किया जाता है। प्रमाणित मामले अत्यंत दुर्लभ हैं और उन पर मुकदमा चलाया जाता है।',
      severity: 'उच्च जोखिम मिथक',
    },
    law: '52 U.S.C. § 10307',
  },
  {
    en: {
      myth: 'Voting machines are easily hacked',
      fact: 'Machines are air-gapped during elections. Paper audit trails exist in 49 states. DHS classified election infrastructure as "critical infrastructure" in 2017.',
      severity: 'High Risk Myth',
    },
    hi: {
      myth: 'वोटिंग मशीनों को आसानी से हैक किया जा सकता है',
      fact: 'चुनाव के दौरान मशीनें इंटरनेट से नहीं जुड़ी होतीं (Air-gapped)। 49 राज्यों में पेपर ऑडिट ट्रेल मौजूद हैं। DHS ने 2017 में चुनाव बुनियादी ढांचे को "महत्वपूर्ण बुनियादी ढांचे" के रूप में वर्गीकृत किया।',
      severity: 'उच्च जोखिम मिथक',
    },
    law: 'CISA Advisory 2020',
  },
  {
    en: {
      myth: 'Dead people vote in large numbers',
      fact: 'NVRA mandates regular voter roll purges using death records. Heritage Foundation\'s fraud database shows isolated cases over decades — not systemic fraud.',
      severity: 'Medium Risk Myth',
    },
    hi: {
      myth: 'मृत लोग बड़ी संख्या में वोट देते हैं',
      fact: 'NVRA मृत्यु रिकॉर्ड का उपयोग करके मतदाता सूची की नियमित सफाई का आदेश देता है। हेरिटेज फाउंडेशन का धोखाधड़ी डेटाबेस दशकों में अलग-थलग मामले दिखाता है — व्यवस्थित धोखाधड़ी नहीं।',
      severity: 'मध्यम जोखिम मिथक',
    },
    law: 'NVRA § 8',
  },
  {
    en: {
      myth: 'Mail-in voting is rife with fraud',
      fact: 'Multiple peer-reviewed studies show fraud rates below 0.0001%. Five all-mail states have run clean elections for decades. Signatures are verified.',
      severity: 'High Risk Myth',
    },
    hi: {
      myth: 'मेल-इन वोटिंग धोखाधड़ी से भरी है',
      fact: 'कई सहकर्मी-समीक्षित शोध 0.0001% से कम धोखाधड़ी दर दिखाते हैं। पांच ऑल-मेल राज्यों ने दशकों से स्वच्छ चुनाव चलाए हैं। हस्ताक्षरों का सत्यापन किया जाता है।',
      severity: 'उच्च जोखिम मिथक',
    },
    law: 'MIT Election Lab 2022',
  },
  {
    en: {
      myth: 'Your vote doesn\'t count',
      fact: 'Hundreds of elections decided by fewer than 10 votes each cycle. A 2017 VA House race ended in a literal tie, resolved by drawing names from a bowl.',
      severity: 'Civic Harm Myth',
    },
    hi: {
      myth: 'आपका वोट मायने नहीं रखता',
      fact: 'हर चक्र में सैकड़ों चुनावों का फैसला 10 से कम वोटों से होता है। 2017 की VA हाउस रेस शाब्दिक बराबरी पर समाप्त हुई, जिसका समाधान कटोरे से नाम निकालकर किया गया।',
      severity: 'नागरिक हानि मिथक',
    },
    law: 'FEC & State Records',
  },
];

export default function MythBuster() {
  const { t, lang } = useLang();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ fontSize: '1.5rem' }}>🔍</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 700, color: '#f0f4ff', fontSize: '1.1rem' }}>{t('mythTitleInner')}</h3>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.8rem' }}>
            {t('mythSubtitleInner')}
          </p>
        </div>
        <span className="badge badge-red" style={{ marginLeft: 'auto' }}>
          {MYTHS.length} {t('mythCountSuffix')}
        </span>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {MYTHS.map((item, i) => (
          <div
            key={i}
            className="myth-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(expanded === i ? null : i); } }}
            role="button"
            tabIndex={0}
            aria-expanded={expanded === i}
            aria-label={`Myth: ${item[lang].myth}. Click to ${expanded === i ? 'collapse' : 'reveal'} fact.`}
            id={`myth-card-${i}`}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }}>
                {expanded === i ? '✅' : '❌'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f43f5e', textDecoration: 'line-through', opacity: 0.85 }}>
                    "{item[lang].myth}"
                  </span>
                  <span className="badge badge-red" style={{ fontSize: '0.6rem' }}>{item[lang].severity}</span>
                </div>

                {expanded === i && (
                  <div className="fact" style={{ marginTop: '14px', animation: 'fadeInUp 0.25s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.1em' }}>✅ {t('factLabel')}</span>
                      <span className="badge badge-green" style={{ fontSize: '0.6rem' }}>{t('factSource')}: {item.law}</span>
                    </div>
                    <p style={{ color: '#f0f4ff', fontSize: '0.875rem', lineHeight: 1.7 }}>{item[lang].fact}</p>
                  </div>
                )}
              </div>
              <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '0.8rem', flexShrink: 0, marginTop: '2px' }}>
                {expanded === i ? '▲' : '▼'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
