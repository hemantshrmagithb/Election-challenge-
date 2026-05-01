// ─────────────────────────────────────────────────────────────────────────────
// STATE / REGION DATA — US Electoral Map Nodes
// Each node = geographic position (% from top-left) + election analytics
// ─────────────────────────────────────────────────────────────────────────────

export interface StateNode {
  id: string;
  abbr: string;
  name: { en: string; hi: string };
  /** Position on the map (percentage from top-left) */
  x: number;
  y: number;
  /** Electoral Votes */
  ev: number;
  /** Voter turnout 2024 (%) */
  turnout2024: number;
  /** Turnout trend vs 2020 */
  turnoutDelta: number;
  /** Region cluster color */
  color: string;
  /** Size scale (based on EV weight) */
  scale: number;
  /** Key constitutional rights */
  rights: { en: string; hi: string };
  /** Local election insight */
  insight: { en: string; hi: string };
  /** Voter ID type */
  voterIdType: { en: string; hi: string };
  /** Region classification */
  region: string;
}

export const STATE_NODES: StateNode[] = [
  // ── NORTHEAST ──
  { id: 'NY', abbr: 'NY', name: { en: 'New York', hi: 'न्यूयॉर्क' }, x: 82, y: 22, ev: 28, turnout2024: 58.4, turnoutDelta: -2.1, color: '#7c3aed', scale: 1.3, region: 'Northeast', rights: { en: '15th, 19th, 26th Amendments fully enforced. No voter ID required — verification by signature match.', hi: '15वाँ, 19वाँ, 26वाँ संशोधन पूर्ण रूप से लागू। मतदाता पहचान की आवश्यकता नहीं — हस्ताक्षर मिलान द्वारा सत्यापन।' }, insight: { en: 'NY adopted automatic voter registration in 2023. Early voting expanded to 10 days. Mail voting saw 23% increase in 2024.', hi: 'NY ने 2023 में स्वचालित मतदाता पंजीकरण अपनाया। प्रारंभिक मतदान 10 दिन तक बढ़ाया गया। मेल वोटिंग में 2024 में 23% वृद्धि।' }, voterIdType: { en: 'No ID Required', hi: 'पहचान पत्र आवश्यक नहीं' } },
  { id: 'PA', abbr: 'PA', name: { en: 'Pennsylvania', hi: 'पेन्सिलवेनिया' }, x: 78, y: 28, ev: 19, turnout2024: 69.7, turnoutDelta: 1.3, color: '#0891b2', scale: 1.15, region: 'Northeast', rights: { en: 'Swing state with no-excuse mail voting since Act 77 (2019). Non-strict photo ID for first-time voters.', hi: 'एक्ट 77 (2019) के बाद बिना कारण मेल वोटिंग। पहली बार मतदाताओं के लिए गैर-सख्त फोटो पहचान।' }, insight: { en: 'Battleground state with razor-thin margins. 2024 margin was under 1.5%. Mail ballot curing allowed.', hi: 'अत्यंत कम अंतर वाला युद्धक्षेत्र राज्य। 2024 में अंतर 1.5% से कम। मेल बैलट सुधार की अनुमति।' }, voterIdType: { en: 'Non-Strict Photo ID', hi: 'गैर-सख्त फोटो पहचान' } },
  { id: 'MA', abbr: 'MA', name: { en: 'Massachusetts', hi: 'मैसाचुसेट्स' }, x: 88, y: 20, ev: 11, turnout2024: 72.1, turnoutDelta: 0.8, color: '#7c3aed', scale: 0.9, region: 'Northeast', rights: { en: 'Same-day voter registration. Automatic registration via RMV. No voter ID for most voters.', hi: 'उसी दिन मतदाता पंजीकरण। RMV के माध्यम से स्वचालित पंजीकरण। अधिकांश मतदाताओं के लिए पहचान नहीं।' }, insight: { en: 'Among the highest turnout states consistently. Implemented ranked-choice voting pilot in 2025.', hi: 'लगातार सबसे अधिक मतदान वाले राज्यों में। 2025 में रैंक्ड-चॉइस वोटिंग पायलट लागू।' }, voterIdType: { en: 'No ID Required', hi: 'पहचान पत्र आवश्यक नहीं' } },

  // ── SOUTHEAST ──
  { id: 'FL', abbr: 'FL', name: { en: 'Florida', hi: 'फ्लोरिडा' }, x: 76, y: 72, ev: 30, turnout2024: 65.5, turnoutDelta: -1.7, color: '#f43f5e', scale: 1.35, region: 'Southeast', rights: { en: 'Amendment 4 (2018) restored voting rights for 1.4M formerly incarcerated citizens. Photo ID required.', hi: 'संशोधन 4 (2018) ने 14 लाख पूर्व कैदियों के मतदान अधिकार बहाल किए। फोटो पहचान आवश्यक।' }, insight: { en: 'Moved from swing to lean-red in 2024. Cuban-American and Puerto Rican voters are key demographics.', hi: '2024 में स्विंग से लीन-रेड में स्थानांतरित। क्यूबन-अमेरिकन और प्यूर्टो रिकन मतदाता प्रमुख जनसांख्यिकी।' }, voterIdType: { en: 'Photo ID Required', hi: 'फोटो पहचान आवश्यक' } },
  { id: 'GA', abbr: 'GA', name: { en: 'Georgia', hi: 'जॉर्जिया' }, x: 73, y: 60, ev: 16, turnout2024: 68.9, turnoutDelta: 2.4, color: '#0891b2', scale: 1.1, region: 'Southeast', rights: { en: 'Strict photo ID required (SB 202). Automatic registration via DDS. Sunday early voting available.', hi: 'सख्त फोटो पहचान आवश्यक (SB 202)। DDS के माध्यम से स्वचालित पंजीकरण। रविवार को प्रारंभिक मतदान उपलब्ध।' }, insight: { en: 'Flipped blue in 2020, returned to battleground status. Fulton County processing speeds improved 40%.', hi: '2020 में ब्लू में बदला, युद्धक्षेत्र स्थिति में लौटा। फुल्टन काउंटी प्रसंस्करण गति 40% बेहतर।' }, voterIdType: { en: 'Strict Photo ID', hi: 'सख्त फोटो पहचान' } },
  { id: 'NC', abbr: 'NC', name: { en: 'North Carolina', hi: 'उत्तरी कैरोलिना' }, x: 77, y: 48, ev: 16, turnout2024: 68.2, turnoutDelta: 0.9, color: '#0891b2', scale: 1.1, region: 'Southeast', rights: { en: 'Photo ID law enacted 2023. Same-day registration during early voting. HBCU campuses are polling sites.', hi: 'फोटो पहचान कानून 2023 में लागू। प्रारंभिक मतदान के दौरान उसी दिन पंजीकरण। HBCU कैम्पस मतदान स्थल।' }, insight: { en: 'Perennial battleground. First state to implement bipartisan audit boards. Hurricane impact on 2024 logistics.', hi: 'सदैव युद्धक्षेत्र। द्विदलीय ऑडिट बोर्ड लागू करने वाला पहला राज्य। 2024 में तूफान का प्रभाव।' }, voterIdType: { en: 'Photo ID Required', hi: 'फोटो पहचान आवश्यक' } },

  // ── MIDWEST ──
  { id: 'MI', abbr: 'MI', name: { en: 'Michigan', hi: 'मिशिगन' }, x: 68, y: 24, ev: 15, turnout2024: 71.8, turnoutDelta: 3.1, color: '#059669', scale: 1.1, region: 'Midwest', rights: { en: 'Prop 3 (2022) enshrined voting rights in state constitution. 9 days early voting. No-excuse absentee.', hi: 'प्रस्ताव 3 (2022) ने राज्य संविधान में मतदान अधिकार स्थापित किए। 9 दिन प्रारंभिक मतदान। बिना कारण अनुपस्थित मतदान।' }, insight: { en: 'Blue wall state that flipped twice (2016, 2020). Detroit turnout increased 18% with new voting centers.', hi: 'ब्लू वॉल राज्य जो दो बार पलटा। नए वोटिंग केंद्रों से डेट्रॉइट मतदान 18% बढ़ा।' }, voterIdType: { en: 'Non-Strict Photo ID', hi: 'गैर-सख्त फोटो पहचान' } },
  { id: 'WI', abbr: 'WI', name: { en: 'Wisconsin', hi: 'विस्कॉन्सिन' }, x: 60, y: 22, ev: 10, turnout2024: 73.4, turnoutDelta: 1.6, color: '#059669', scale: 0.95, region: 'Midwest', rights: { en: 'Photo ID required since 2016. Same-day registration available. Students can use campus IDs.', hi: '2016 से फोटो पहचान आवश्यक। उसी दिन पंजीकरण उपलब्ध। छात्र कैम्पस पहचान का उपयोग कर सकते हैं।' }, insight: { en: 'Historically decided by <1%. Supreme Court rulings on redistricting in 2024 changed district maps significantly.', hi: 'ऐतिहासिक रूप से <1% से तय। 2024 में पुनर्वितरण पर सुप्रीम कोर्ट के फैसलों ने जिला मानचित्र बदले।' }, voterIdType: { en: 'Photo ID Required', hi: 'फोटो पहचान आवश्यक' } },
  { id: 'OH', abbr: 'OH', name: { en: 'Ohio', hi: 'ओहायो' }, x: 72, y: 32, ev: 17, turnout2024: 63.8, turnoutDelta: -0.5, color: '#059669', scale: 1.1, region: 'Midwest', rights: { en: 'Strict non-photo ID since 2023. 28 days early voting. Constitutional amendment on reproductive rights (2023) drove turnout.', hi: '2023 से सख्त गैर-फोटो पहचान। 28 दिन प्रारंभिक मतदान। प्रजनन अधिकार संशोधन (2023) ने मतदान बढ़ाया।' }, insight: { en: 'Shifted from swing to lean-red. Issue 1 (2023) constitutional amendment drove historic off-year turnout of 55%.', hi: 'स्विंग से लीन-रेड में स्थानांतरित। अंक 1 (2023) संशोधन ने ऐतिहासिक ऑफ-ईयर मतदान 55% तक पहुँचाया।' }, voterIdType: { en: 'Strict Non-Photo ID', hi: 'सख्त गैर-फोटो पहचान' } },

  // ── SOUTH / SOUTHWEST ──
  { id: 'TX', abbr: 'TX', name: { en: 'Texas', hi: 'टेक्सास' }, x: 45, y: 68, ev: 40, turnout2024: 60.4, turnoutDelta: 0.7, color: '#d97706', scale: 1.5, region: 'South', rights: { en: 'Strict photo ID (SB 1). No same-day registration. No online registration until 2024 pilot. 17 days early voting.', hi: 'सख्त फोटो पहचान (SB 1)। उसी दिन पंजीकरण नहीं। 2024 पायलट तक ऑनलाइन पंजीकरण नहीं। 17 दिन प्रारंभिक मतदान।' }, insight: { en: 'Second-largest EV prize (40). Harris County (Houston) processed 1.2M early votes. Growing Latino electorate.', hi: 'दूसरा सबसे बड़ा EV पुरस्कार (40)। हैरिस काउंटी ने 12 लाख प्रारंभिक मत संसाधित किए। बढ़ता लातीनी मतदाता।' }, voterIdType: { en: 'Strict Photo ID', hi: 'सख्त फोटो पहचान' } },
  { id: 'AZ', abbr: 'AZ', name: { en: 'Arizona', hi: 'एरिज़ोना' }, x: 25, y: 58, ev: 11, turnout2024: 63.1, turnoutDelta: -1.2, color: '#d97706', scale: 0.95, region: 'Southwest', rights: { en: 'Non-photo ID accepted. Extensive early voting (27 days). Maricopa County is largest election jurisdiction in US.', hi: 'गैर-फोटो पहचान स्वीकार्य। 27 दिन प्रारंभिक मतदान। मारिकोपा काउंटी अमेरिका का सबसे बड़ा चुनाव क्षेत्र।' }, insight: { en: 'Flipped blue in 2020. 2024 saw expanded ballot curing period. Tribal nations voting access improved.', hi: '2020 में ब्लू में बदला। 2024 में बैलट सुधार अवधि बढ़ाई। आदिवासी राष्ट्रों की मतदान पहुँच बेहतर।' }, voterIdType: { en: 'Non-Photo ID', hi: 'गैर-फोटो पहचान' } },
  { id: 'NV', abbr: 'NV', name: { en: 'Nevada', hi: 'नेवादा' }, x: 17, y: 38, ev: 6, turnout2024: 62.7, turnoutDelta: -0.8, color: '#d97706', scale: 0.85, region: 'West', rights: { en: 'Automatic voter registration. Same-day registration. No-excuse mail voting passed 2020.', hi: 'स्वचालित मतदाता पंजीकरण। उसी दिन पंजीकरण। 2020 में बिना कारण मेल वोटिंग पारित।' }, insight: { en: 'Culinary Workers Union drives historic Las Vegas turnout. Question 3 (ranked-choice) passed in 2024.', hi: 'क्यूलिनरी वर्कर्स यूनियन ने ऐतिहासिक लास वेगास मतदान चलाया। प्रश्न 3 (रैंक्ड-चॉइस) 2024 में पारित।' }, voterIdType: { en: 'No ID Required', hi: 'पहचान पत्र आवश्यक नहीं' } },

  // ── WEST COAST ──
  { id: 'CA', abbr: 'CA', name: { en: 'California', hi: 'कैलिफ़ोर्निया' }, x: 10, y: 42, ev: 54, turnout2024: 64.2, turnoutDelta: -0.3, color: '#db2777', scale: 1.6, region: 'West', rights: { en: 'AVR via DMV. No voter ID. Same-day registration. Vote centers replace traditional polling places. Ballots mailed to all voters.', hi: 'DMV के माध्यम से AVR। मतदाता पहचान नहीं। उसी दिन पंजीकरण। वोट केंद्रों ने पारंपरिक मतदान स्थानों की जगह ली।' }, insight: { en: 'Largest EV prize (54). Top-two primary system. 85% of voters now use mail ballots. LA County uses Ballot Marking Devices.', hi: 'सबसे बड़ा EV पुरस्कार (54)। टॉप-टू प्राइमरी सिस्टम। 85% मतदाता अब मेल बैलट का उपयोग करते हैं।' }, voterIdType: { en: 'No ID Required', hi: 'पहचान पत्र आवश्यक नहीं' } },
  { id: 'WA', abbr: 'WA', name: { en: 'Washington', hi: 'वॉशिंगटन' }, x: 12, y: 12, ev: 12, turnout2024: 75.8, turnoutDelta: 0.5, color: '#db2777', scale: 1.0, region: 'West', rights: { en: 'All-mail voting state since 2011. Automatic registration. Same-day registration. Pre-registration at 16.', hi: 'सारा-मेल वोटिंग राज्य 2011 से। स्वचालित पंजीकरण। उसी दिन पंजीकरण। 16 वर्ष में पूर्व-पंजीकरण।' }, insight: { en: 'One of 5 all-mail states. Highest turnout in the West. Pioneered ballot tracking systems.', hi: '5 ऑल-मेल राज्यों में से एक। पश्चिम में सबसे अधिक मतदान। बैलट ट्रैकिंग सिस्टम में अग्रणी।' }, voterIdType: { en: 'No ID (Mail Only)', hi: 'पहचान नहीं (केवल मेल)' } },

  // ── MOUNTAIN / PLAINS ──
  { id: 'CO', abbr: 'CO', name: { en: 'Colorado', hi: 'कोलोराडो' }, x: 32, y: 40, ev: 10, turnout2024: 76.3, turnoutDelta: 1.2, color: '#059669', scale: 0.95, region: 'Mountain', rights: { en: 'All-mail state. Risk-limiting audits pioneered here. Same-day registration. 15 days early voting.', hi: 'ऑल-मेल राज्य। रिस्क-लिमिटिंग ऑडिट यहाँ शुरू हुआ। उसी दिन पंजीकरण। 15 दिन प्रारंभिक मतदान।' }, insight: { en: 'Gold standard for election administration. Secretary of State office is a model for transparency nationwide.', hi: 'चुनाव प्रशासन का स्वर्ण मानक। सेक्रेटरी ऑफ स्टेट कार्यालय पारदर्शिता का राष्ट्रव्यापी मॉडल।' }, voterIdType: { en: 'No ID (Mail Only)', hi: 'पहचान नहीं (केवल मेल)' } },

  // ── DC ──
  { id: 'DC', abbr: 'DC', name: { en: 'Washington D.C.', hi: 'वॉशिंगटन डी.सी.' }, x: 81, y: 38, ev: 3, turnout2024: 62.8, turnoutDelta: -3.2, color: '#7c3aed', scale: 0.75, region: 'Capital', rights: { en: '23rd Amendment (1961) grants 3 EVs. No voting representation in Congress. Home Rule Act (1973) provides local governance.', hi: '23वाँ संशोधन (1961) 3 EV प्रदान करता है। कांग्रेस में मतदान प्रतिनिधित्व नहीं। होम रूल एक्ट (1973) स्थानीय शासन प्रदान करता है।' }, insight: { en: 'DC statehood remains an active legislative issue. Residents pay federal taxes but lack full congressional voting rights.', hi: 'DC राज्य का दर्जा एक सक्रिय विधायी मुद्दा। निवासी संघीय कर देते हैं लेकिन पूर्ण कांग्रेसीय मतदान अधिकारों से वंचित।' }, voterIdType: { en: 'No ID Required', hi: 'पहचान पत्र आवश्यक नहीं' } },
];

/** Total number of regions available for the voter journey progress tracker */
export const TOTAL_REGIONS = STATE_NODES.length;

/** Region color map for legend */
export const REGION_COLORS: Record<string, string> = {
  Northeast: '#7c3aed',
  Southeast: '#f43f5e',
  Midwest: '#059669',
  South: '#d97706',
  Southwest: '#d97706',
  West: '#db2777',
  Mountain: '#059669',
  Capital: '#7c3aed',
};
