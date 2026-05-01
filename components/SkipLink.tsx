'use client';

/**
 * WCAG 2.4.1 — Bypass Blocks
 * Visually hidden until focused; appears as a styled button on Tab key press.
 * Allows keyboard users to skip the fixed Navbar and jump straight to main content.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100px',
        left: '16px',
        padding: '10px 20px',
        background: '#7c3aed',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.875rem',
        borderRadius: '8px',
        textDecoration: 'none',
        zIndex: 9999,
        transition: 'top 0.2s',
      }}
      onFocus={(e) => { e.currentTarget.style.top = '16px'; }}
      onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
    >
      Skip to main content
    </a>
  );
}
