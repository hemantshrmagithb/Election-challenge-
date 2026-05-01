'use client';

import { useLang } from '@/context/LanguageContext';

/**
 * Floating glassmorphic stats bar — always visible at the bottom of the viewport.
 * Displays: 538 Total EVs · 270 To Win · 51 States+DC
 */
export default function FloatingStats() {
  const { t } = useLang();

  return (
    <div className="floating-stats" id="floating-stats">
      <div className="fs-item">
        <span className="fs-value" style={{ color: '#00d4ff' }}>538</span>
        <span className="fs-label">{t('floatingTotalEv')}</span>
      </div>
    </div>
  );
}
