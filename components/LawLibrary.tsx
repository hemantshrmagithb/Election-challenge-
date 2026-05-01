'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';

const LAWS = [
  {
    en: {
      name: '15th Amendment',
      summary: 'Cannot deny vote based on race or color',
      full: 'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. Passed after the Civil War to protect Black Americans\' voting rights.',
      category: 'Amendment',
    },
    hi: {
      name: '15वाँ संशोधन',
      summary: 'जाति या रंग के आधार पर वोट देने से मना नहीं किया जा सकता',
      full: 'संयुक्त राज्य अमेरिका के नागरिकों के वोट देने के अधिकार को संयुक्त राज्य अमेरिका या किसी भी राज्य द्वारा जाति, रंग या दासता की पिछली स्थिति के आधार पर अस्वीकार या कम नहीं किया जाएगा। गृहयुद्ध के बाद अश्वेत अमेरिकियों के मतदान अधिकारों की रक्षा के लिए पारित किया गया।',
      category: 'संशोधन',
    },
    year: '1870',
    icon: '⚖️',
    color: '#7c3aed',
  },
  {
    en: {
      name: '19th Amendment',
      summary: 'Women\'s suffrage — right to vote regardless of sex',
      full: 'Granted women the right to vote after a 72-year suffrage movement led by Susan B. Anthony, Elizabeth Cady Stanton, and millions of advocates. The U.S. was the 17th country globally to grant women\'s suffrage.',
      category: 'Amendment',
    },
    hi: {
      name: '19वाँ संशोधन',
      summary: 'महिलाओं का मताधिकार — लिंग की परवाह किए बिना वोट देने का अधिकार',
      full: 'सुसान बी. एंथोनी, एलिजाबेथ कैडी स्टैंटन और लाखों अधिवक्ताओं के नेतृत्व में 72 साल के मताधिकार आंदोलन के बाद महिलाओं को वोट देने का अधिकार दिया गया। अमेरिका महिलाओं को मताधिकार देने वाला विश्व का 17वाँ देश था।',
      category: 'संशोधन',
    },
    year: '1920',
    icon: '🏛️',
    color: '#db2777',
  },
  {
    en: {
      name: '24th Amendment',
      summary: 'Abolished poll taxes in federal elections',
      full: 'Poll taxes were used throughout the South to prevent poor voters — especially Black Americans — from voting. This amendment ended the practice in federal elections. Harper v. Virginia (1966) extended the ban to state elections.',
      category: 'Amendment',
    },
    hi: {
      name: '24वाँ संशोधन',
      summary: 'संघीय चुनावों में पोल टैक्स को समाप्त कर दिया गया',
      full: 'गरीब मतदाताओं — विशेष रूप से अश्वेत अमेरिकियों — को वोट देने से रोकने के लिए पूरे दक्षिण में पोल टैक्स का उपयोग किया गया था। इस संशोधन ने संघीय चुनावों में इस प्रथा को समाप्त कर दिया। हार्पर बनाम वर्जीनिया (1966) ने इस प्रतिबंध को राज्य के चुनावों तक बढ़ा दिया।',
      category: 'संशोधन',
    },
    year: '1964',
    icon: '💰',
    color: '#d97706',
  },
  {
    en: {
      name: '26th Amendment',
      summary: 'Lowered voting age to 18',
      full: 'Lowered the voting age from 21 to 18. Driven by the Vietnam War era argument: "Old enough to fight, old enough to vote." Ratified in just 100 days — the fastest ratification of any Constitutional amendment.',
      category: 'Amendment',
    },
    hi: {
      name: '26वाँ संशोधन',
      summary: 'मतदान की आयु घटाकर 18 वर्ष कर दी गई',
      full: 'मतदान की आयु 21 से घटाकर 18 कर दी गई। वियतनाम युद्ध के समय के तर्क से प्रेरित: "लड़ने के लिए पर्याप्त उम्र, वोट देने के लिए पर्याप्त उम्र।" केवल 100 दिनों में अनुसमर्थित — किसी भी संवैधानिक संशोधन का सबसे तेज़ अनुसमर्थन।',
      category: 'संशोधन',
    },
    year: '1971',
    icon: '🎓',
    color: '#059669',
  },
  {
    en: {
      name: 'Voting Rights Act',
      summary: 'Banned discriminatory voting practices',
      full: 'Landmark legislation banning literacy tests, grandfather clauses, and other tools used to disenfranchise Black voters. Section 5 required certain states with histories of discrimination to preclear election law changes with the DOJ. Shelby County v. Holder (2013) weakened Section 5.',
      category: 'Federal Law',
    },
    hi: {
      name: 'मतदान अधिकार अधिनियम',
      summary: 'भेदभावपूर्ण मतदान प्रथाओं पर प्रतिबंध लगा दिया गया',
      full: 'साक्षरता परीक्षणों, ग्रैंडफादर क्लॉज और अश्वेत मतदाताओं को मताधिकार से वंचित करने के लिए उपयोग किए जाने वाले अन्य उपकरणों पर प्रतिबंध लगाने वाला ऐतिहासिक कानून। धारा 5 के तहत भेदभाव के इतिहास वाले कुछ राज्यों को DOJ के साथ चुनाव कानून परिवर्तनों को पूर्व-स्वीकृत (Preclear) करना आवश्यक था। शेल्बी काउंटी बनाम होल्डर (2013) ने धारा 5 को कमजोर कर दिया।',
      category: 'संघीय कानून',
    },
    year: '1965',
    icon: '📜',
    color: '#0891b2',
  },
  {
    en: {
      name: 'NVRA 1993',
      summary: '"Motor Voter" — registration at DMV & public agencies',
      full: 'The National Voter Registration Act required states to offer voter registration at the DMV, disability services, and other public agencies. Dramatically increased registration rates. Also requires states to maintain accurate voter rolls.',
      category: 'Federal Law',
    },
    hi: {
      name: 'NVRA 1993',
      summary: '"मोटर वोटर" — DMV और सार्वजनिक एजेंसियों पर पंजीकरण',
      full: 'नेशनल वोटर रजिस्ट्रेशन एक्ट के तहत राज्यों को DMV, विकलांगता सेवाओं और अन्य सार्वजनिक एजेंसियों पर मतदाता पंजीकरण की पेशकश करना आवश्यक था। पंजीकरण दरों में नाटकीय रूप से वृद्धि हुई। राज्यों को सटीक मतदाता सूची बनाए रखने की भी आवश्यकता है।',
      category: 'संघीय कानून',
    },
    year: '1993',
    icon: '🚗',
    color: '#7c3aed',
  },
  {
    en: {
      name: 'HAVA 2002',
      summary: 'Created EAC; mandated provisional ballots & accessibility',
      full: 'Help America Vote Act created the Election Assistance Commission (EAC) following the 2000 election controversies. Mandated provisional ballots, accessible voting systems, and federal standards for voter ID and registration databases.',
      category: 'Federal Law',
    },
    hi: {
      name: 'HAVA 2002',
      summary: 'EAC बनाया गया; अनंतिम मतपत्र और सुलभता अनिवार्य की गई',
      full: '2000 के चुनावी विवादों के बाद हेल्प अमेरिका वोट एक्ट ने चुनाव सहायता आयोग (EAC) बनाया। अनंतिम मतपत्र, सुलभ मतदान प्रणाली और मतदाता आईडी और पंजीकरण डेटाबेस के लिए संघीय मानक अनिवार्य किए गए।',
      category: 'संघीय कानून',
    },
    year: '2002',
    icon: '🗳️',
    color: '#059669',
  },
];

export default function LawLibrary() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  /** Internal categories used for filtering. Display labels come from the law data. */
  const CATEGORIES = ['All', 'Amendment', 'Federal Law'] as const;
  type Category = typeof CATEGORIES[number];

  const categoryLabels: Record<Category, string> = lang === 'en'
    ? { 'All': 'All', 'Amendment': 'Amendment', 'Federal Law': 'Federal Law' }
    : { 'All': 'सभी', 'Amendment': 'संशोधन', 'Federal Law': 'संघीय कानून' };

  const filtered = LAWS.filter((l) =>
    activeCategory === 'All' || l.en.category === activeCategory
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ fontSize: '1.5rem' }}>📚</div>
        <div>
          <h3 style={{ fontWeight: 700, color: '#f0f4ff', fontSize: '1.1rem' }}>{t('lawTitle')}</h3>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.8rem' }}>{t('lawSubtitle')}</p>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Law cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
        {filtered.map((law) => {
          const idx = LAWS.indexOf(law);
          const isOpen = expanded === idx;
          return (
            <div
              key={law.en.name}
              className="stat-card"
              style={{ cursor: 'pointer', borderColor: isOpen ? `${law.color}55` : 'rgba(255,255,255,0.08)', transition: 'all 0.3s ease' }}
              onClick={() => setExpanded(isOpen ? null : idx)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(isOpen ? null : idx); } }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`law-detail-${idx}`}
              aria-label={`${law[lang].name}, ${law.year}. ${isOpen ? 'Collapse' : 'Expand'} for full text.`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '12px',
                  background: law.color + '22', border: `1px solid ${law.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                }}>
                  {law.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f0f4ff' }}>{law[lang].name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: law.color + '18', color: law.color, border: `1px solid ${law.color}33`, fontSize: '0.6rem' }}>
                      {law.year}
                    </span>
                    <span className="badge badge-purple" style={{ fontSize: '0.6rem' }}>{law[lang].category}</span>
                  </div>
                  <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.8rem', marginTop: '8px', lineHeight: 1.5 }}>
                    {law[lang].summary}
                  </p>
                </div>
              </div>

              {isOpen && (
                <div
                  id={`law-detail-${idx}`}
                  role="region"
                  aria-label={`Full text of ${law[lang].name}`}
                  style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: law.color + '0d',
                    border: `1px solid ${law.color}22`,
                    borderRadius: '12px',
                    animation: 'fadeInUp 0.2s ease',
                  }}
                >
                  <p style={{ color: '#f0f4ff', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    {law[lang].full}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
