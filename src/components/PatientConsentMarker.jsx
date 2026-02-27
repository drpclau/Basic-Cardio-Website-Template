import { useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

/**
 * PatientConsentMarker
 * ─────────────────────────────────────────────────────────────────
 * PDPA 2010 (amended 2024) Active Consent Component.
 * Submit gate: form remains disabled until patient explicitly ticks.
 *
 * Props:
 *   onConsentChange(bool)  — fires on every toggle
 *   accentColor            — hex, matches the template's accent (default: #1a1a1a)
 *   privacyPolicyAction    — callback when Privacy Policy link is clicked
 *   doctorName             — "Dr. [Name]" placeholder
 */
export function PatientConsentMarker({
  onConsentChange,
  accentColor = '#1a1a1a',
  privacyPolicyAction,
  doctorName = 'Dr. [Name]',
}) {
  const [ticked, setTicked] = useState(false);

  const toggle = () => {
    const next = !ticked;
    setTicked(next);
    if (onConsentChange) onConsentChange(next);
  };

  return (
    <div style={{
      background: ticked ? 'rgba(0,0,0,0.03)' : 'transparent',
      border: `1px solid ${ticked ? accentColor : '#d0ccc4'}`,
      borderRadius: 2,
      padding: '16px 18px',
      margin: '20px 0',
      transition: 'all 0.25s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Custom checkbox */}
        <div
          onClick={toggle}
          role="checkbox"
          aria-checked={ticked}
          tabIndex={0}
          onKeyDown={e => e.key === ' ' && toggle()}
          style={{
            width: 18, height: 18, flexShrink: 0, marginTop: 2,
            border: `2px solid ${ticked ? accentColor : '#aaa'}`,
            background: ticked ? accentColor : 'transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', transition: 'all 0.2s',
            borderRadius: 1,
          }}
        >
          {ticked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <label
          onClick={toggle}
          style={{
            fontFamily: 'inherit',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            color: '#555',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <strong style={{ color: '#222', fontWeight: 600 }}>
            I give my express consent
          </strong>{' '}
          for {doctorName}'s clinic to collect, process, and store the personal data
          submitted in this form for the purposes of this medical inquiry, in
          accordance with the{' '}
          <strong style={{ color: '#222' }}>
            Personal Data Protection Act 2010 (PDPA Malaysia)
          </strong>
          {' '}and its 2024 amendments. I understand I may withdraw consent at any
          time by contacting the clinic directly. I have read and agree to the{' '}
          <span
            onClick={e => { e.stopPropagation(); if (privacyPolicyAction) privacyPolicyAction(); }}
            style={{
              color: accentColor, textDecoration: 'underline',
              textUnderlineOffset: 3, cursor: 'pointer', fontWeight: 500,
            }}
          >
            Privacy Policy
          </span>
          .
        </label>
      </div>

      {/* Compliance badge strip */}
      <div style={{
        marginTop: 12, paddingTop: 10,
        borderTop: '1px solid rgba(0,0,0,0.07)',
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <ShieldCheck size={11} color={accentColor} />
          <span style={{ fontFamily: 'inherit', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', fontWeight: 500 }}>
            PDPA 2010 Compliant
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Lock size={11} color={accentColor} />
          <span style={{ fontFamily: 'inherit', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', fontWeight: 500 }}>
            Data Encrypted in Transit
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <ShieldCheck size={11} color={accentColor} />
          <span style={{ fontFamily: 'inherit', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', fontWeight: 500 }}>
            APC-Safe Architecture
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * ConsentGatedButton
 * ─────────────────────────────────────────────────────────────────
 * Wrap any submit button with this. Automatically gates on consent.
 * Visual state: locked grey → active accent colour.
 */
export function ConsentGatedButton({
  consented,
  onClick,
  children,
  accentColor = '#1a1a1a',
  accentTextColor = '#fff',
}) {
  return (
    <button
      type="submit"
      disabled={!consented}
      onClick={consented ? onClick : undefined}
      style={{
        width: '100%',
        padding: '15px 24px',
        background: consented ? accentColor : '#e0ddd8',
        color: consented ? accentTextColor : '#aaa',
        border: 'none',
        cursor: consented ? 'pointer' : 'not-allowed',
        fontFamily: 'inherit',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      {consented ? (
        <>
          <ShieldCheck size={14} />
          {children}
        </>
      ) : (
        <>
          <Lock size={14} />
          Consent Required to Submit
        </>
      )}
    </button>
  );
}
