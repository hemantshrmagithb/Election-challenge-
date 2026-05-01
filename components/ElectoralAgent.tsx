'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, getAgentResponse, QUICK_QUESTIONS } from '@/lib/agentKnowledge';
import { useLang } from '@/context/LanguageContext';

/** Generates unique IDs using a ref-safe counter instead of module-level mutable state */
function useIdGenerator() {
  const counterRef = useRef(0);
  return useCallback(() => `msg-${++counterRef.current}-${Date.now()}`, []);
}

/**
 * Escapes HTML entities to prevent XSS before applying markdown formatting.
 * This is the critical security fix for dangerouslySetInnerHTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Formats markdown-like content to HTML. Input is sanitized first. */
function formatContent(content: string, isAgent: boolean): string {
  // Only sanitize user content — agent content is from our trusted knowledge base
  const safe = isAgent ? content : escapeHtml(content);

  return safe
    .replace(/^## (.+)$/gm, '<h3 style="color:#00d4ff;font-size:1rem;font-weight:700;margin-bottom:8px">$1</h3>')
    .replace(/^---$/gm, '<hr style="border-color:rgba(255,255,255,0.1);margin:10px 0"/>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f0f4ff">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^• (.+)$/gm, '<div style="display:flex;gap:8px;margin:4px 0"><span style="color:#00d4ff;flex-shrink:0">•</span><span>$1</span></div>')
    .replace(/^✅ (.+)$/gm, '<div style="display:flex;gap:8px;margin:6px 0"><span style="flex-shrink:0">✅</span><span>$1</span></div>')
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:2px solid #7c3aed;padding-left:12px;margin:8px 0;color:rgba(240,244,255,0.7)">$1</blockquote>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

function createWelcomeMessage(lang: 'en' | 'hi'): ChatMessage {
  const content = lang === 'en'
    ? `## 👋 Hello! I'm the Electoral Intelligence Agent\n\nI'm your dedicated, strictly **non-partisan** guide to everything about the U.S. election process.\n\n**I can help you with:**\n🗳️ Registration procedures • 📍 Polling booth protocols • ⚖️ Constitutional law\n📬 Mail-in voting • 🏛️ Electoral College • 🔍 Fact-checking misinformation\n📋 First-time voter guide • 🔄 Recounts & audits\n\nAsk me anything — or click one of the quick questions below!`
    : `## 👋 नमस्ते! मैं चुनावी बुद्धिमत्ता एजेंट हूँ\n\nमैं अमेरिकी चुनाव प्रक्रिया के बारे में आपकी समर्पित, पूरी तरह से **गैर-पक्षपाती** मार्गदर्शिका हूँ।\n\n**मैं आपकी मदद कर सकता हूँ:**\n🗳️ पंजीकरण प्रक्रिया • 📍 मतदान केंद्र प्रोटोकॉल • ⚖️ संवैधानिक कानून\n📬 मेल-इन वोटिंग • 🏛️ इलेक्टोरल कॉलेज • 🔍 गलत सूचना की तथ्य-जाँच\n📋 पहली बार मतदाता मार्गदर्शिका • 🔄 पुनर्गणना और ऑडिट\n\nमुझसे कुछ भी पूछें — या नीचे दिए गए त्वरित प्रश्नों में से एक पर क्लिक करें!`;

  return { id: 'welcome', role: 'agent', content, timestamp: new Date() };
}

export default function ElectoralAgent() {
  const { t, lang } = useLang();
  const genId = useIdGenerator();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage('en')]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync welcome message on language change if it's the only message
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([createWelcomeMessage(lang)]);
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: genId(), role: 'user', content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 400 + Math.random() * 800;
    await new Promise((r) => setTimeout(r, delay));

    const response = getAgentResponse(trimmed, lang);
    const agentMsg: ChatMessage = { id: genId(), role: 'agent', content: response, timestamp: new Date() };
    setMessages((prev) => [...prev, agentMsg]);
    setIsTyping(false);
  }, [genId, lang]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }, [sendMessage, input]);

  return (
    <div
      className="chat-container"
      role="region"
      aria-label="Electoral Intelligence Agent chat"
    >
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="pulse-ring">
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
            🧠
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f0f4ff' }}>{t('agentTitle')}</div>
          <div style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            {t('agentOnline')}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <span className="badge badge-cyan">⚖️ {t('agentNeutral')}</span>
          <span className="badge badge-green">✅ {t('agentVerified')}</span>
        </div>
      </div>

      {/* Messages — aria-live so screen readers announce new agent replies */}
      <div
        className="chat-messages"
        aria-live="polite"
        aria-atomic="false"
        aria-label="Chat messages"
        role="log"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.role}`}>
            {msg.role === 'agent' && <span className="agent-label">🧠 {t('agentTitle')}</span>}
            <div
              dangerouslySetInnerHTML={{ __html: formatContent(msg.content, msg.role === 'agent') }}
              style={{ lineHeight: 1.6 }}
            />
            <div suppressHydrationWarning style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: '6px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message agent">
            <span className="agent-label">🧠 {t('agentTitle')}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="typing-dots">
                <span /><span /><span />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(240,244,255,0.4)' }}>{t('agentConsulting')}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {QUICK_QUESTIONS[lang].slice(0, 6).map((q) => (
          <button key={q} className="quick-chip" onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <textarea
          ref={textareaRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('agentInputPlaceholder')}
          rows={1}
          style={{ lineHeight: 1.5 }}
        />
        <button
          className="btn-primary"
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          style={{ padding: '12px 18px', opacity: !input.trim() || isTyping ? 0.5 : 1 }}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
