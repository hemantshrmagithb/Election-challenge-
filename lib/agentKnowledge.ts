export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export const QUICK_QUESTIONS = {
  en: [
    'How do I register to vote?',
    'What is the Electoral College?',
    'Do I need a photo ID to vote?',
    'How are mail-in ballots verified?',
    'What are my rights if I am denied a vote?',
    'Can I vote if I am currently in line?',
  ],
  hi: [
    'मैं मतदान के लिए पंजीकरण कैसे करूँ?',
    'इलेक्टोरल कॉलेज क्या है?',
    'क्या मुझे वोट देने के लिए फोटो आईडी की आवश्यकता है?',
    'मेल-इन मतपत्रों का सत्यापन कैसे किया जाता है?',
    'यदि मुझे वोट देने से मना किया जाता है तो मेरे अधिकार क्या हैं?',
    'क्या मैं वोट दे सकता हूँ यदि मैं वर्तमान में लाइन में हूँ?',
  ]
};

const KNOWLEDGE_BASE = {
  en: [
    {
      keywords: ['register', 'registration', 'how to vote', 'enroll'],
      response: `## 🗳️ Voter Registration 101\n\nRegistration is the first step to making your voice heard. Here's what you need to know:\n\n• **Eligibility:** You must be a U.S. citizen, 18+ by Election Day, and meet your state's residency requirements.\n• **Where to Register:** Visit **vote.gov** to register online, or do it in person at your DMV, or by mail.\n• **Deadlines:** These vary wildly! Some states have same-day registration (like CA, CO, MI), while others require registration up to 30 days before.\n\n> **Tip:** Check your status at least 45 days before any election to ensure no clerical errors have occurred.`,
    },
    {
      keywords: ['electoral college', '538', '270', 'how president is elected'],
      response: `## 🏛️ The Electoral College Explained\n\nThe U.S. President is not elected by direct popular vote, but by the Electoral College.\n\n• **The Math:** There are **538** total electors. A candidate needs **270** to win.\n• **Distribution:** Each state gets electors equal to its Congressional delegation (House + Senate).\n• **Winner-Take-All:** In 48 states and DC, the candidate who wins the popular vote gets *all* that state's electors. Maine and Nebraska use a proportional system.\n\n--- \n*Source: Article II, Section 1 of the U.S. Constitution.*`,
    },
    {
      keywords: ['id', 'photo id', 'identification', 'documents'],
      response: `## 🪪 Voter ID Requirements\n\nID laws vary significantly by state:\n\n• **Strict Photo ID:** States like GA and TX require a government-issued photo ID.\n• **Non-Strict ID:** Some states allow non-photo IDs or signature matching.\n• **No ID Required:** Many states (like NY, CA) only require a signature match for registered voters.\n\n✅ **Provisional Ballots:** Under the **Help America Vote Act (HAVA)**, if you lack ID but believe you are eligible, you have a legal right to cast a *provisional ballot*.`,
    },
    {
      keywords: ['rights', 'denied', 'line', 'intimidation'],
      response: `## ⚖️ Your Constitutional Voting Rights\n\nIf you encounter issues at the polls, remember:\n\n• **Stay in Line:** If you are in line when the polls close, the law mandates you **must** be allowed to vote.\n• **Assistance:** You have the right to receive help from a person of your choice (except your employer or union rep).\n• **Provisional Voting:** If your name is not on the rolls, you have a right to a provisional ballot.\n\n> **Need Help?** Call the non-partisan Election Protection Hotline at **866-OUR-VOTE**.`,
    },
  ],
  hi: [
    {
      keywords: ['पंजीकरण', 'कैसे वोट करें', 'नामांकन'],
      response: `## 🗳️ मतदाता पंजीकरण 101\n\nपंजीकरण अपनी आवाज़ उठाने का पहला कदम है। यहाँ आपको क्या जानना चाहिए:\n\n• **पात्रता:** आपको अमेरिकी नागरिक होना चाहिए, चुनाव के दिन तक 18+ होना चाहिए, और अपने राज्य की निवास आवश्यकताओं को पूरा करना चाहिए।\n• **कहाँ पंजीकरण करें:** ऑनलाइन पंजीकरण करने के लिए **vote.gov** पर जाएँ, या अपने DMV में जाकर, या मेल द्वारा करें।\n• **समय सीमा:** ये बहुत अलग होती हैं! कुछ राज्यों में उसी दिन पंजीकरण होता है (जैसे CA, CO, MI), जबकि अन्य में 30 दिन पहले तक पंजीकरण की आवश्यकता होती है।\n\n> **सुझाव:** किसी भी चुनाव से कम से कम 45 दिन पहले अपनी स्थिति की जाँच करें ताकि यह सुनिश्चित हो सके कि कोई लिपिकीय त्रुटि नहीं हुई है।`,
    },
    {
      keywords: ['इलेक्टोरल कॉलेज', '538', '270', 'राष्ट्रपति कैसे चुना जाता है'],
      response: `## 🏛️ इलेक्टोरल कॉलेज का विवरण\n\nअमेरिकी राष्ट्रपति का चुनाव सीधे लोकप्रिय वोट से नहीं, बल्कि इलेक्टोरल कॉलेज द्वारा किया जाता है।\n\n• **गणित:** कुल **538** निर्वाचक होते हैं। जीतने के लिए उम्मीदवार को **270** की आवश्यकता होती है।\n• **वितरण:** प्रत्येक राज्य को उसके कांग्रेसी प्रतिनिधिमंडल (हाउस + सीनेट) के बराबर निर्वाचक मिलते हैं।\n• **विजेता-सब-लेता-है:** 48 राज्यों और DC में, लोकप्रिय वोट जीतने वाले उम्मीदवार को उस राज्य के *सभी* निर्वाचक मिलते हैं। मेन और नेब्रास्का आनुपातिक प्रणाली का उपयोग करते हैं।\n\n--- \n*स्रोत: अमेरिकी संविधान का अनुच्छेद II, धारा 1।*`,
    },
    {
      keywords: ['आईडी', 'फोटो आईडी', 'पहचान', 'दस्तावेज'],
      response: `## 🪪 मतदाता आईडी आवश्यकताएँ\n\nआईडी कानून राज्य के अनुसार काफी भिन्न होते हैं:\n\n• **सख्त फोटो आईडी:** GA और TX जैसे राज्यों में सरकार द्वारा जारी फोटो आईडी की आवश्यकता होती है।\n• **गैर-सख्त आईडी:** कुछ राज्य गैर-फोटो आईडी या हस्ताक्षर मिलान की अनुमति देते हैं।\n• **कोई आईडी आवश्यक नहीं:** कई राज्यों (जैसे NY, CA) में पंजीकृत मतदाताओं के लिए केवल हस्ताक्षर मिलान की आवश्यकता होती है।\n\n✅ **अनंतिम मतपत्र (Provisional Ballots):** **हेल्प अमेरिका वोट एक्ट (HAVA)** के तहत, यदि आपके पास आईडी नहीं है लेकिन आपको लगता है कि आप पात्र हैं, तो आपके पास *अनंतिम मतपत्र* डालने का कानूनी अधिकार है।`,
    },
    {
      keywords: ['अधिकार', 'मना', 'लाइन', 'डराना'],
      response: `## ⚖️ आपके संवैधानिक मतदान अधिकार\n\nयदि आप मतदान केंद्रों पर समस्याओं का सामना करते हैं, तो याद रखें:\n\n• **लाइन में रहें:** यदि मतदान बंद होने पर आप लाइन में हैं, तो कानून कहता है कि आपको मतदान करने की **अनुमति दी जानी चाहिए**।\n• **सहायता:** आपको अपनी पसंद के व्यक्ति (आपके नियोक्ता या यूनियन प्रतिनिधि को छोड़कर) से सहायता प्राप्त करने का अधिकार है।\n• **अनंतिम मतदान:** यदि आपका नाम सूची में नहीं है, तो आपके पास अनंतिम मतपत्र का अधिकार है।\n\n> **मदद चाहिए?** गैर-पक्षपाती चुनाव संरक्षण हॉटलाइन को **866-OUR-VOTE** पर कॉल करें।`,
    },
  ]
};

/** Pre-built keyword → response index for O(1) avg lookup */
const KEYWORD_INDEX: Record<'en' | 'hi', Map<string, string>> = { en: new Map(), hi: new Map() };
for (const lang of ['en', 'hi'] as const) {
  for (const entry of KNOWLEDGE_BASE[lang]) {
    for (const kw of entry.keywords) {
      KEYWORD_INDEX[lang].set(kw, entry.response);
    }
  }
}

const FALLBACK_RESPONSE = {
  en: `I'm sorry, I don't have specific data on that. I am strictly focused on the election process, constitutional laws, and voter rights. \n\nTry asking about **registration**, **voter ID**, or the **Electoral College**.`,
  hi: `क्षमा करें, मेरे पास उस पर विशिष्ट डेटा नहीं है। मैं पूरी तरह से चुनाव प्रक्रिया, संवैधानिक कानूनों और मतदाता अधिकारों पर केंद्रित हूँ। \n\n**पंजीकरण**, **मतदाता आईडी**, या **इलेक्टोरल कॉलेज** के बारे में पूछने का प्रयास करें।`,
} as const;

export function getAgentResponse(input: string, lang: 'en' | 'hi' = 'en'): string {
  const lowerInput = input.toLowerCase();
  const index = KEYWORD_INDEX[lang];

  // Fast path: O(k) where k = number of keywords (small)
  for (const [keyword, response] of index) {
    if (lowerInput.includes(keyword)) return response;
  }

  return FALLBACK_RESPONSE[lang];
}
