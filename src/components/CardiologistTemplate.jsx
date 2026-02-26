import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, ArrowRight, X, Heart, Activity, Zap } from 'lucide-react';

// ─── Legal Content ────────────────────────────────────────────────────────────
const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  lastUpdated: 'January 2026',
  sections: [
    { heading: 'Information We Collect', body: 'We collect personal information that you voluntarily provide when scheduling consultations, submitting enquiries, or communicating with our clinic. This may include your name, contact details, and relevant medical history shared for the purpose of clinical assessment.' },
    { heading: 'How We Use Your Information', body: 'Your information is used solely for the provision of medical care, appointment scheduling, and clinical correspondence. We do not sell, rent, or share your personal data with third parties except where required by law or with your explicit consent.' },
    { heading: 'Data Security', body: 'All personal and medical data is stored securely in compliance with the Personal Data Protection Act 2010 (PDPA) of Malaysia. Access is restricted to authorised clinical and administrative personnel only.' },
    { heading: 'Retention of Data', body: 'Medical records are retained in accordance with Malaysian Ministry of Health guidelines. You may request access to, correction of, or deletion of your personal data by contacting our clinic directly.' },
    { heading: 'Cookies & Website Analytics', body: 'Our website may use anonymised analytics cookies to understand visitor behaviour and improve user experience. No personally identifiable information is collected through cookies without your consent.' },
    { heading: 'Contact Us', body: 'For any privacy-related enquiries, please contact our clinic at clinic@dr[name].com.my or by calling +603 XXXX XXXX.' },
  ]
};

const TERMS = {
  title: 'Terms & Conditions',
  lastUpdated: 'January 2026',
  sections: [
    { heading: 'Medical Disclaimer', body: 'The information provided on this website is for general informational purposes only and does not constitute medical advice. It is not a substitute for professional medical consultation, diagnosis, or treatment. Always seek the advice of a qualified physician for any medical condition.' },
    { heading: 'Appointment & Consultation Policy', body: 'All consultations are subject to availability. Appointments must be confirmed at least 24 hours in advance. Cancellations without prior notice may result in a cancellation fee. Dr. [Name] reserves the right to decline or terminate a consultation at clinical discretion.' },
    { heading: 'Accuracy of Information', body: 'We endeavour to keep all information on this website accurate and up to date. However, we make no warranties regarding the completeness or accuracy of any content. Clinical practices and guidelines may change, and information should not be relied upon as current medical guidance.' },
    { heading: 'Intellectual Property', body: 'All content on this website — including text, images, and design — is the intellectual property of Dr. [Name] and may not be reproduced, distributed, or used without express written permission.' },
    { heading: 'Limitation of Liability', body: 'To the extent permitted by law, Dr. [Name] and associated clinical staff shall not be liable for any direct, indirect, or consequential loss arising from reliance on information provided on this website.' },
    { heading: 'Governing Law', body: 'These terms are governed by the laws of Malaysia. Any disputes shall be subject to the exclusive jurisdiction of the Malaysian courts.' },
  ]
};

// ─── ECG Line SVG ─────────────────────────────────────────────────────────────
const EcgLine = ({ color = 'rgba(220,38,38,0.35)', width = '100%', animated = false }) => (
  <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ width, height: 80, display: 'block' }}>
    {animated && (
      <defs>
        <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor={color} />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor="transparent" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="3s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
    )}
    <polyline
      points="0,40 80,40 120,40 140,10 160,70 180,5 200,75 220,40 260,40 340,40 380,40 400,28 420,52 440,40 520,40 560,40 580,15 600,65 620,10 640,70 660,40 740,40 780,40 800,28 820,52 840,40 920,40 960,40 980,20 1000,60 1020,8 1040,72 1060,40 1140,40 1200,40"
      fill="none"
      stroke={animated ? 'url(#ecgGrad)' : color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Legal Modal ──────────────────────────────────────────────────────────────
const LegalModal = ({ doc, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(4,8,20,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: 'cFadeIn 0.2s ease'
    }} onClick={onClose}>
      <div style={{
        background: '#0d1526', width: '100%', maxWidth: 820,
        maxHeight: '88vh', overflowY: 'auto',
        padding: '52px 60px 60px',
        borderTop: '1px solid rgba(220,38,38,0.4)',
        animation: 'cSlideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 22, right: 26,
          background: 'none', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
          padding: '6px 8px', color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center'
        }}><X size={16} /></button>

        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#dc2626', marginBottom: 14, fontWeight: 600 }}>Legal</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 700, color: '#f0f4ff', marginBottom: 6, letterSpacing: '-0.02em' }}>{doc.title}</h2>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginBottom: 36 }}>Last updated: {doc.lastUpdated}</div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 36 }}>
          {doc.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 600, color: '#e2e8f8', marginBottom: 10 }}>{s.heading}</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 44, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onClose} style={{
            fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '13px 30px',
            background: '#dc2626', color: '#fff', border: 'none', cursor: 'pointer',
            transition: 'background 0.2s', fontWeight: 600
          }}>Close</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CardiologistTemplate = () => {
  const [scrolled, setScrolled] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate the "BPM" counter
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 2);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: '#f0f4ff', background: '#040814', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes cFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes cSlideUp { from { transform:translateY(50px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        @keyframes pulseRing { 0%,100% { transform:scale(1); opacity:0.6 } 50% { transform:scale(1.18); opacity:0 } }
        @keyframes lineScroll { from { stroke-dashoffset: 800 } to { stroke-dashoffset: 0 } }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes blinkDot { 0%,100%{opacity:1} 50%{opacity:0.2} }

        * { box-sizing:border-box; margin:0; padding:0; }

        /* ── NAV ── */
        .c-nav {
          position:fixed; top:0; left:0; right:0; z-index:200;
          display:flex; justify-content:space-between; align-items:center;
          padding:22px 56px;
          transition: all 0.4s ease;
        }
        .c-nav.scrolled {
          background:rgba(4,8,20,0.92);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(220,38,38,0.2);
          padding:14px 56px;
        }
        .c-nav-logo {
          display:flex; align-items:center; gap:10px;
          font-family:'Syne',sans-serif; font-size:1rem; font-weight:700;
          color:#f0f4ff; letter-spacing:0.06em; text-transform:uppercase;
        }
        .c-nav-logo-dot {
          width:8px; height:8px; border-radius:50%; background:#dc2626;
          animation:blinkDot 0.8s ease-in-out infinite;
        }
        .c-nav-links { display:flex; gap:32px; list-style:none; }
        .c-nav-links a {
          text-decoration:none; color:rgba(240,244,255,0.55);
          font-family:'Outfit',sans-serif; font-size:0.82rem; letter-spacing:0.04em;
          font-weight:400; transition:color 0.2s;
        }
        .c-nav-links a:hover { color:#f0f4ff; }
        .c-nav-cta {
          font-family:'Outfit',sans-serif; font-size:0.78rem; letter-spacing:0.1em;
          text-transform:uppercase; font-weight:600;
          padding:10px 24px; background:#dc2626; color:#fff; border:none;
          cursor:pointer; transition:background 0.25s;
        }
        .c-nav-cta:hover { background:#b91c1c; }

        /* ── HERO ── */
        .c-hero {
          min-height:100vh;
          display:grid; grid-template-columns:1fr 1fr;
          position:relative; overflow:hidden;
        }
        .c-hero-bg {
          position:absolute; inset:0;
          background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(30,10,10,0.9) 0%, #040814 70%);
        }
        .c-hero-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px);
          background-size:60px 60px;
        }
        .c-hero-left {
          position:relative; z-index:2;
          display:flex; flex-direction:column; justify-content:center;
          padding:120px 60px 80px 56px;
        }
        .c-hero-eyebrow {
          display:flex; align-items:center; gap:10px;
          font-size:0.68rem; letter-spacing:0.24em; text-transform:uppercase;
          color:#dc2626; font-weight:600; margin-bottom:32px;
        }
        .c-hero-eyebrow-line { width:28px; height:1px; background:#dc2626; }
        h1.c-hero-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(3.2rem,5.5vw,5.8rem);
          font-weight:800; line-height:0.95;
          letter-spacing:-0.03em;
          color:#f0f4ff;
          margin-bottom:32px;
        }
        h1.c-hero-title span { color:#dc2626; }
        .c-hero-sub {
          font-size:1rem; line-height:1.75; color:rgba(240,244,255,0.55);
          max-width:420px; margin-bottom:52px; font-weight:300;
        }
        .c-hero-actions { display:flex; gap:14px; align-items:center; }
        .c-btn-primary {
          font-family:'Outfit',sans-serif; font-size:0.8rem; letter-spacing:0.12em;
          text-transform:uppercase; font-weight:600;
          padding:16px 36px; background:#dc2626; color:#fff; border:none;
          cursor:pointer; transition:all 0.3s;
          display:flex; align-items:center; gap:10px;
        }
        .c-btn-primary:hover { background:#b91c1c; letter-spacing:0.16em; }
        .c-btn-outline {
          font-family:'Outfit',sans-serif; font-size:0.8rem; letter-spacing:0.1em;
          text-transform:uppercase; font-weight:500;
          padding:15px 28px; background:transparent;
          color:rgba(240,244,255,0.6); border:1px solid rgba(240,244,255,0.2);
          cursor:pointer; transition:all 0.25s;
        }
        .c-btn-outline:hover { border-color:rgba(240,244,255,0.5); color:#f0f4ff; }

        .c-hero-right {
          position:relative; z-index:2;
          display:flex; align-items:center; justify-content:center;
          padding:80px 56px;
        }
        .c-hero-card {
          width:100%; max-width:340px;
          background:rgba(13,21,38,0.8);
          border:1px solid rgba(220,38,38,0.25);
          backdrop-filter:blur(20px);
          padding:0;
          position:relative;
        }
        .c-hero-card-img {
          width:100%; aspect-ratio:3/4;
          background:linear-gradient(160deg,#1a0a0a 0%,#0d1526 60%,#1a0a0a 100%);
          position:relative; overflow:hidden;
          display:flex; align-items:flex-end;
        }
        .c-hero-card-img::before {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(0deg, rgba(13,21,38,0.95) 0%, transparent 50%);
          z-index:1;
        }
        .c-hero-card-name {
          position:relative; z-index:2;
          padding:28px 28px 0;
          font-family:'Syne',sans-serif; font-size:1.5rem; font-weight:700; color:#f0f4ff;
        }
        .c-hero-card-title {
          padding:6px 28px 0;
          font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase;
          color:#dc2626; font-weight:600;
        }
        .c-hero-card-stats {
          display:grid; grid-template-columns:1fr 1fr 1fr;
          border-top:1px solid rgba(220,38,38,0.2);
          margin-top:24px;
        }
        .c-hero-stat {
          padding:16px 18px;
          border-right:1px solid rgba(220,38,38,0.15);
          text-align:center;
        }
        .c-hero-stat:last-child { border-right:none; }
        .c-hero-stat-num {
          font-family:'Syne',sans-serif; font-size:1.5rem; font-weight:700; color:#f0f4ff;
          line-height:1;
        }
        .c-hero-stat-label { font-size:0.62rem; letter-spacing:0.1em; color:rgba(240,244,255,0.4); margin-top:4px; text-transform:uppercase; }

        /* Pulse ring decoration */
        .c-pulse-wrap {
          position:absolute; top:32px; right:32px; z-index:10;
          width:56px; height:56px; display:flex; align-items:center; justify-content:center;
        }
        .c-pulse-ring {
          position:absolute; width:48px; height:48px; border-radius:50%;
          border:1px solid rgba(220,38,38,0.5);
          animation:pulseRing 1.6s ease-out infinite;
        }
        .c-pulse-ring:nth-child(2) { animation-delay:0.4s; width:36px; height:36px; }
        .c-pulse-dot {
          width:12px; height:12px; border-radius:50%; background:#dc2626; z-index:1;
          animation:blinkDot 0.8s ease-in-out infinite;
        }

        /* ECG divider */
        .c-ecg-divider { width:100%; overflow:hidden; line-height:0; }

        /* ── ABOUT ── */
        .c-about {
          background:#040814;
          padding:120px 56px;
          display:grid; grid-template-columns:1fr 1.6fr; gap:100px; align-items:start;
          position:relative;
        }
        .c-about::before {
          content:'';
          position:absolute; left:0; top:0; bottom:0; width:3px;
          background:linear-gradient(to bottom, transparent, #dc2626 30%, #dc2626 70%, transparent);
        }
        .c-section-tag {
          font-size:0.65rem; letter-spacing:0.24em; text-transform:uppercase;
          color:#dc2626; font-weight:600; margin-bottom:20px;
          display:flex; align-items:center; gap:10px;
        }
        .c-section-tag::after { content:''; flex:1; height:1px; background:rgba(220,38,38,0.3); max-width:40px; }
        h2.c-section-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(2rem,3.5vw,3.2rem);
          font-weight:800; line-height:1.05;
          letter-spacing:-0.03em; color:#f0f4ff;
          margin-bottom:0;
        }
        h2.c-section-title em { font-style:normal; color:#dc2626; }
        .c-about-body {
          font-size:1rem; line-height:1.85;
          color:rgba(240,244,255,0.6); margin-bottom:44px; font-weight:300;
        }
        .c-stats-row { display:flex; gap:0; border:1px solid rgba(220,38,38,0.2); }
        .c-stat-box {
          flex:1; padding:24px 20px; text-align:center;
          border-right:1px solid rgba(220,38,38,0.15);
          position:relative; overflow:hidden;
          transition:background 0.3s;
        }
        .c-stat-box:last-child { border-right:none; }
        .c-stat-box:hover { background:rgba(220,38,38,0.07); }
        .c-stat-num {
          font-family:'Syne',sans-serif; font-size:2.2rem; font-weight:800;
          color:#f0f4ff; line-height:1;
        }
        .c-stat-label { font-size:0.7rem; letter-spacing:0.1em; color:rgba(240,244,255,0.4); margin-top:6px; text-transform:uppercase; }
        .c-about-sidebar { padding-top:4px; }
        .c-credential-list { display:flex; flex-direction:column; gap:0; }
        .c-cred-item {
          display:flex; align-items:center; gap:14px;
          padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .c-cred-icon { width:32px; height:32px; background:rgba(220,38,38,0.12); border:1px solid rgba(220,38,38,0.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .c-cred-text { font-size:0.88rem; color:rgba(240,244,255,0.7); }
        .c-cred-sub { font-size:0.72rem; color:rgba(240,244,255,0.3); margin-top:2px; letter-spacing:0.04em; }

        /* ── CONDITIONS ── */
        .c-conditions { background:#070e1f; padding:120px 56px; position:relative; overflow:hidden; }
        .c-conditions::after {
          content:'CONDITIONS';
          position:absolute; right:-20px; top:50%; transform:translateY(-50%) rotate(90deg);
          font-family:'Syne',sans-serif; font-size:8rem; font-weight:800;
          color:rgba(220,38,38,0.04); white-space:nowrap; pointer-events:none;
          letter-spacing:0.1em;
        }
        .c-conditions-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:64px; }
        .c-conditions-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
          background:rgba(220,38,38,0.1);
        }
        .c-cond-card {
          background:#070e1f; padding:40px 32px;
          position:relative; overflow:hidden;
          cursor:default; transition:background 0.3s;
          border:1px solid transparent;
        }
        .c-cond-card:hover { background:#0d1526; border-color:rgba(220,38,38,0.25); }
        .c-cond-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:#dc2626; transform:scaleX(0); transform-origin:left;
          transition:transform 0.4s ease;
        }
        .c-cond-card:hover::before { transform:scaleX(1); }
        .c-cond-num { font-size:0.62rem; letter-spacing:0.2em; color:rgba(220,38,38,0.5); font-weight:600; margin-bottom:20px; text-transform:uppercase; }
        .c-cond-name { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:700; margin-bottom:14px; line-height:1.2; color:#f0f4ff; }
        .c-cond-body { font-size:0.84rem; line-height:1.75; color:rgba(240,244,255,0.45); font-weight:300; }

        /* ── PROCEDURES ── */
        .c-procedures { background:#040814; padding:120px 56px; }
        .c-proc-header { display:grid; grid-template-columns:1fr 1fr; gap:80px; margin-bottom:64px; align-items:end; }
        .c-proc-intro { font-size:0.92rem; line-height:1.8; color:rgba(240,244,255,0.5); font-weight:300; }
        .c-proc-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; }
        .c-proc-item {
          display:grid; grid-template-columns:auto 1fr auto;
          align-items:center; gap:20px;
          padding:22px 28px;
          border-bottom:1px solid rgba(255,255,255,0.06);
          border-right:1px solid rgba(255,255,255,0.06);
          transition:background 0.25s;
          cursor:default;
        }
        .c-proc-item:nth-child(even) { border-right:none; }
        .c-proc-item:nth-last-child(-n+2) { border-bottom:none; }
        .c-proc-item:hover { background:rgba(220,38,38,0.05); }
        .c-proc-item:hover .c-proc-arrow { color:#dc2626; opacity:1; }
        .c-proc-num { font-family:'Syne',sans-serif; font-size:0.7rem; color:rgba(220,38,38,0.4); font-weight:700; min-width:28px; }
        .c-proc-text {}
        .c-proc-name { font-size:0.98rem; font-weight:500; color:#f0f4ff; }
        .c-proc-type { font-size:0.7rem; letter-spacing:0.08em; color:rgba(240,244,255,0.35); margin-top:3px; text-transform:uppercase; }
        .c-proc-arrow { color:rgba(255,255,255,0.15); opacity:0; transition:all 0.2s; }

        /* ── MEDIA ── */
        .c-media { background:#070e1f; padding:120px 56px; }
        .c-media-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:56px; }
        .c-media-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .c-media-card {
          background:#0d1526; border:1px solid rgba(255,255,255,0.06); padding:36px 28px;
          position:relative; overflow:hidden; transition:border-color 0.3s;
        }
        .c-media-card:hover { border-color:rgba(220,38,38,0.35); }
        .c-media-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg, #dc2626, transparent);
          transform:scaleX(0); transform-origin:left; transition:transform 0.4s;
        }
        .c-media-card:hover::after { transform:scaleX(1); }
        .c-media-tag { font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:#dc2626; font-weight:600; margin-bottom:18px; }
        .c-media-title { font-family:'Syne',sans-serif; font-size:1.05rem; font-weight:600; line-height:1.4; color:#e2e8f8; margin-bottom:18px; }
        .c-media-meta { font-size:0.74rem; color:rgba(240,244,255,0.35); }

        /* ── RESEARCH ── */
        .c-research { background:#040814; padding:120px 56px; }
        .c-research-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:56px; }
        .c-research-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .c-research-card {
          border:1px solid rgba(255,255,255,0.08); padding:36px 28px;
          position:relative; transition:all 0.3s; cursor:default;
        }
        .c-research-card:hover { border-color:rgba(220,38,38,0.4); background:rgba(220,38,38,0.04); }
        .c-research-num {
          font-family:'Syne',sans-serif; font-size:3rem; font-weight:800;
          color:rgba(220,38,38,0.1); line-height:1; margin-bottom:16px;
        }
        .c-research-title { font-family:'Syne',sans-serif; font-size:0.98rem; font-weight:600; line-height:1.45; color:#e2e8f8; margin-bottom:16px; }
        .c-research-meta { font-size:0.72rem; color:rgba(240,244,255,0.35); }

        /* ── CTA ── */
        .c-cta {
          background:linear-gradient(135deg, #0d0505 0%, #1a0808 50%, #040814 100%);
          padding:130px 56px;
          display:grid; grid-template-columns:1.2fr 1fr; gap:100px; align-items:center;
          position:relative; overflow:hidden;
        }
        .c-cta::before {
          content:'';
          position:absolute; left:-200px; top:-200px;
          width:600px; height:600px; border-radius:50%;
          background:radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%);
          pointer-events:none;
        }
        .c-cta-tagline {
          font-family:'Syne',sans-serif;
          font-size:clamp(2.4rem,4.5vw,4rem);
          font-weight:800; line-height:1.05;
          letter-spacing:-0.03em; color:#f0f4ff;
        }
        .c-cta-tagline span { color:#dc2626; }
        .c-cta-sub { font-size:1rem; color:rgba(240,244,255,0.5); margin-top:20px; margin-bottom:40px; line-height:1.7; font-weight:300; }
        .c-contact-list { display:flex; flex-direction:column; gap:0; }
        .c-contact-item {
          display:grid; grid-template-columns:48px 1fr;
          align-items:center; gap:18px;
          padding:20px 0; border-bottom:1px solid rgba(255,255,255,0.07);
        }
        .c-contact-icon {
          width:44px; height:44px; border:1px solid rgba(220,38,38,0.3);
          display:flex; align-items:center; justify-content:center;
          color:#dc2626;
        }
        .c-contact-label { font-size:0.65rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(240,244,255,0.35); }
        .c-contact-value { font-size:0.92rem; color:#f0f4ff; margin-top:3px; font-weight:400; }

        /* ── FOOTER ── */
        .c-footer {
          background:#020610; padding:28px 56px;
          border-top:1px solid rgba(220,38,38,0.15);
        }
        .c-footer-top { display:flex; justify-content:space-between; align-items:center; padding-bottom:18px; margin-bottom:18px; border-bottom:1px solid rgba(255,255,255,0.06); }
        .c-footer-reg { display:flex; gap:28px; }
        .c-footer-reg span { font-size:0.72rem; color:rgba(240,244,255,0.3); letter-spacing:0.04em; }
        .c-footer-bottom { display:flex; justify-content:space-between; align-items:center; }
        .c-footer-copy { font-size:0.72rem; color:rgba(240,244,255,0.2); }
        .c-footer-legal { display:flex; gap:20px; align-items:center; }
        .c-footer-link {
          font-size:0.72rem; color:rgba(240,244,255,0.35);
          background:none; border:none; cursor:pointer; padding:0;
          text-decoration:underline; text-underline-offset:3px; transition:color 0.2s;
        }
        .c-footer-link:hover { color:#dc2626; }
        .c-footer-sep { color:rgba(255,255,255,0.15); font-size:0.72rem; }

        .c-ghost-link {
          font-size:0.78rem; color:rgba(240,244,255,0.4);
          background:none; border:none; cursor:pointer; padding:0;
          text-decoration:underline; text-underline-offset:3px; transition:color 0.2s;
          font-family:'Outfit',sans-serif; letter-spacing:0.04em;
        }
        .c-ghost-link:hover { color:#dc2626; }

        @media(max-width:960px){
          .c-hero,.c-about,.c-proc-header,.c-cta { grid-template-columns:1fr; gap:40px; }
          .c-hero { padding:100px 24px 60px; }
          .c-hero::before { display:none; }
          .c-hero-right { justify-content:flex-start; padding:0 24px 60px; }
          .c-hero-card { max-width:100%; }
          .c-about,.c-procedures,.c-conditions,.c-media,.c-research,.c-cta { padding:80px 24px; }
          .c-conditions-grid,.c-media-grid,.c-research-grid { grid-template-columns:1fr; }
          .c-proc-grid { grid-template-columns:1fr; }
          .c-proc-item { border-right:none !important; }
          .c-proc-item:nth-last-child(-n+2) { border-bottom:1px solid rgba(255,255,255,0.06); }
          .c-proc-item:last-child { border-bottom:none; }
          .c-nav { padding:16px 24px; }
          .c-nav.scrolled { padding:12px 24px; }
          .c-nav-links { display:none; }
          .c-footer-top,.c-footer-bottom { flex-direction:column; gap:10px; align-items:flex-start; }
          .c-footer-reg { flex-wrap:wrap; }
          .c-conditions-header,.c-media-header,.c-research-header { flex-direction:column; align-items:flex-start; gap:12px; }
          .c-about::before { display:none; }
        }
      `}</style>

      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className={`c-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="c-nav-logo">
          <div className="c-nav-logo-dot" />
          DR. [NAME]
        </div>
        <ul className="c-nav-links">
          <li><a href="#about">About Us</a></li>
          <li><a href="#conditions">Conditions</a></li>
          <li><a href="#procedures">Procedures</a></li>
          <li><a href="#media">Media &amp; Publication</a></li>
          <li><a href="#research">Research</a></li>
        </ul>
        <button className="c-nav-cta">Consult Now</button>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="c-hero">
        <div className="c-hero-bg" />
        <div className="c-hero-grid" />

        <div className="c-hero-left">
          <div className="c-hero-eyebrow">
            <div className="c-hero-eyebrow-line" />
            Interventional Cardiologist · Kuala Lumpur
          </div>
          <h1 className="c-hero-title">
            YOUR<br />
            HEART.<br />
            OUR<br />
            <span>MISSION.</span>
          </h1>
          <p className="c-hero-sub">
            Advanced cardiac care grounded in evidence-based precision. Specialist treatment for the full spectrum of cardiovascular conditions — in accordance with the Malaysian Medical Council Ethical Code.
          </p>
          <div className="c-hero-actions">
            <button className="c-btn-primary">
              Schedule Consult <ArrowRight size={14} />
            </button>
            <button className="c-btn-outline">View CV</button>
          </div>
        </div>

        <div className="c-hero-right">
          <div className="c-hero-card">
            <div className="c-pulse-wrap">
              <div className="c-pulse-ring" />
              <div className="c-pulse-ring" />
              <div className="c-pulse-dot" />
            </div>
            <div className="c-hero-card-img">
              <div style={{ position: 'relative', zIndex: 2, padding: '0 0 0 0', width: '100%' }}>
                <div className="c-hero-card-name">Dr. [Name]</div>
                <div className="c-hero-card-title">MRCP · FACC · Cardiologist</div>
              </div>
            </div>
            <div className="c-hero-card-stats">
              <div className="c-hero-stat">
                <div className="c-hero-stat-num">20+</div>
                <div className="c-hero-stat-label">Yrs Exp.</div>
              </div>
              <div className="c-hero-stat">
                <div className="c-hero-stat-num" style={{ color: '#dc2626' }}>5k+</div>
                <div className="c-hero-stat-label">Procedures</div>
              </div>
              <div className="c-hero-stat">
                <div className="c-hero-stat-num">15+</div>
                <div className="c-hero-stat-label">Publications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECG Divider */}
      <div className="c-ecg-divider" style={{ background: '#040814' }}>
        <EcgLine color="rgba(220,38,38,0.3)" animated={true} />
      </div>

      {/* ── ABOUT US ────────────────────────────────────── */}
      <section id="about" className="c-about">
        <div className="c-about-sidebar">
          <div className="c-section-tag">About Us</div>
          <h2 className="c-section-title" style={{ marginBottom: 32 }}>
            Precision<br />
            at every<br />
            <em>heartbeat.</em>
          </h2>
          <div className="c-stats-row">
            <div className="c-stat-box">
              <div className="c-stat-num">20+</div>
              <div className="c-stat-label">Years</div>
            </div>
            <div className="c-stat-box">
              <div className="c-stat-num" style={{ color: '#dc2626' }}>5k+</div>
              <div className="c-stat-label">Procedures</div>
            </div>
            <div className="c-stat-box">
              <div className="c-stat-num">15+</div>
              <div className="c-stat-label">Papers</div>
            </div>
          </div>
        </div>
        <div>
          <p className="c-about-body" style={{ marginTop: 52 }}>
            Dr. [Name] is a verified interventional cardiologist providing advanced cardiovascular care with a focus on coronary artery disease, heart failure, arrhythmia management, and preventive cardiology. With over two decades of practice, the approach is grounded in thorough evidence-based methodology and the highest standards of patient-centred care — consistent with the Malaysian Medical Council Ethical Code.
          </p>
          <div className="c-credential-list">
            {[
              { label: 'MRCP (UK)', sub: 'Member of the Royal College of Physicians' },
              { label: 'FACC', sub: 'Fellow of the American College of Cardiology' },
              { label: 'MMC Verified Specialist', sub: 'Malaysian Medical Council Reg: 78910' },
              { label: 'NSR Registered', sub: 'National Specialist Register: 123456' },
            ].map((c) => (
              <div key={c.label} className="c-cred-item">
                <div className="c-cred-icon">
                  <Heart size={14} color="#dc2626" />
                </div>
                <div>
                  <div className="c-cred-text">{c.label}</div>
                  <div className="c-cred-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECG Divider */}
      <div className="c-ecg-divider" style={{ background: '#070e1f' }}>
        <EcgLine color="rgba(220,38,38,0.2)" />
      </div>

      {/* ── CONDITIONS ──────────────────────────────────── */}
      <section id="conditions" className="c-conditions">
        <div className="c-conditions-header">
          <div>
            <div className="c-section-tag">Conditions</div>
            <h2 className="c-section-title">What We <em>Treat.</em></h2>
          </div>
          <button className="c-ghost-link">All conditions →</button>
        </div>
        <div className="c-conditions-grid">
          {[
            { name: 'Coronary Artery Disease', body: 'Comprehensive assessment and intervention for blocked or narrowed coronary arteries, including stenting, angioplasty, and medical management pathways.' },
            { name: 'Heart Failure', body: 'Evidence-based management of acute and chronic heart failure, incorporating pharmacotherapy, device therapy, and multidisciplinary rehabilitation programmes.' },
            { name: 'Arrhythmia & EP', body: 'Diagnosis and treatment of abnormal heart rhythms including atrial fibrillation, SVT, and ventricular arrhythmias via ablation and device implantation.' },
            { name: 'Hypertension', body: 'Structured risk stratification, lifestyle optimisation, and pharmacological management for resistant and secondary hypertension cases.' },
            { name: 'Valvular Heart Disease', body: 'Evaluation and management of mitral, aortic, and other valve pathologies with guidance on intervention timing and post-procedural follow-up.' },
            { name: 'Preventive Cardiology', body: 'Proactive cardiovascular risk reduction through lipid management, diabetes optimisation, lifestyle medicine, and long-term wellness strategy.' },
          ].map((c, i) => (
            <div key={c.name} className="c-cond-card">
              <div className="c-cond-num">0{i + 1}</div>
              <div className="c-cond-name">{c.name}</div>
              <div className="c-cond-body">{c.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCEDURES ──────────────────────────────────── */}
      <section id="procedures" className="c-procedures">
        <div className="c-proc-header">
          <div>
            <div className="c-section-tag">Procedures</div>
            <h2 className="c-section-title">What We <em>Offer.</em></h2>
          </div>
          <p className="c-proc-intro">
            From diagnostic evaluation to complex interventional procedures, all services are delivered with precision and guided by the most current clinical evidence and international cardiology standards.
          </p>
        </div>
        <div className="c-proc-grid">
          {[
            { name: 'Coronary Angiography', type: 'Diagnostic · Interventional' },
            { name: 'Percutaneous Coronary Intervention', type: 'Interventional' },
            { name: 'Echocardiography', type: 'Diagnostic Imaging' },
            { name: 'Cardiac Stress Testing', type: 'Diagnostic' },
            { name: 'Electrophysiology Study', type: 'Diagnostic · EP' },
            { name: 'Catheter Ablation', type: 'Interventional · EP' },
            { name: 'Pacemaker Implantation', type: 'Device Therapy' },
            { name: 'ICD / CRT Implantation', type: 'Device Therapy' },
          ].map((p, i) => (
            <div key={p.name} className="c-proc-item">
              <div className="c-proc-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="c-proc-text">
                <div className="c-proc-name">{p.name}</div>
                <div className="c-proc-type">{p.type}</div>
              </div>
              <div className="c-proc-arrow"><ArrowRight size={14} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ECG Divider */}
      <div className="c-ecg-divider" style={{ background: '#070e1f' }}>
        <EcgLine color="rgba(220,38,38,0.18)" />
      </div>

      {/* ── MEDIA AND PUBLICATION ───────────────────────── */}
      <section id="media" className="c-media">
        <div className="c-media-header">
          <div>
            <div className="c-section-tag">Media and Publication</div>
            <h2 className="c-section-title">In the <em>Spotlight.</em></h2>
          </div>
          <button className="c-ghost-link">All features →</button>
        </div>
        <div className="c-media-grid">
          {[
            { tag: 'Media Feature', title: 'Heart Disease in Malaysia: A Growing Public Health Emergency', meta: 'The Star Health · March 2024' },
            { tag: 'TV Appearance', title: 'Understanding Atrial Fibrillation — Live Interview', meta: 'Astro Awani · January 2024' },
            { tag: 'Press Coverage', title: 'Minimally Invasive Cardiac Procedures: What to Expect', meta: 'New Straits Times · November 2023' },
          ].map((m) => (
            <div key={m.title} className="c-media-card">
              <div className="c-media-tag">{m.tag}</div>
              <div className="c-media-title">{m.title}</div>
              <div className="c-media-meta">{m.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESEARCH ────────────────────────────────────── */}
      <section id="research" className="c-research">
        <div className="c-research-header">
          <div>
            <div className="c-section-tag">Research</div>
            <h2 className="c-section-title">Clinical <em>Insights.</em></h2>
          </div>
          <button className="c-ghost-link">All publications →</button>
        </div>
        <div className="c-research-grid">
          {[
            { num: '01', tag: 'Journal Article', title: 'Long-Term Outcomes in Percutaneous Coronary Intervention: A Ten-Year Cohort Study', meta: 'Malaysian Heart Journal · 2024' },
            { num: '02', tag: 'Clinical Research', title: 'Atrial Fibrillation Prevalence and Risk Stratification in Urban Southeast Asian Populations', meta: 'Asia-Pacific Cardiology · 2023' },
            { num: '03', tag: 'Conference Paper', title: 'Device Therapy Outcomes in Advanced Heart Failure: A Multi-Centre Analysis', meta: 'APEC Cardiology Congress · 2023' },
          ].map((m) => (
            <div key={m.title} className="c-research-card">
              <div className="c-research-num">{m.num}</div>
              <div className="c-media-tag">{m.tag}</div>
              <div className="c-research-title">{m.title}</div>
              <div className="c-research-meta">{m.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA / CONTACT ───────────────────────────────── */}
      <section className="c-cta">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="c-section-tag">Get In Touch</div>
          <div className="c-cta-tagline">
            Begin your<br />
            <span>recovery</span><br />
            journey.
          </div>
          <p className="c-cta-sub">
            Every second counts when it comes to cardiac health. Don't wait — speak with a specialist today.
          </p>
          <button className="c-btn-primary">
            Secure an Inquiry <ArrowRight size={14} />
          </button>
        </div>
        <div className="c-contact-list" style={{ position: 'relative', zIndex: 1 }}>
          {[
            { icon: <Phone size={16} />, label: 'Phone', value: '+603 XXXX XXXX' },
            { icon: <Mail size={16} />, label: 'Email', value: 'clinic@dr[name].com.my' },
            { icon: <MapPin size={16} />, label: 'Location', value: 'Kuala Lumpur, Malaysia' },
          ].map((c) => (
            <div key={c.label} className="c-contact-item">
              <div className="c-contact-icon">{c.icon}</div>
              <div>
                <div className="c-contact-label">{c.label}</div>
                <div className="c-contact-value">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="c-footer">
        <div className="c-footer-top">
          <div className="c-footer-reg">
            <span>NSR: 123456</span>
            <span>MMC Reg: 78910</span>
            <span>MRCP · FACC Accredited</span>
          </div>
          <div className="c-footer-legal">
            <button className="c-footer-link" onClick={() => setLegalDoc(PRIVACY_POLICY)}>Privacy Policy</button>
            <span className="c-footer-sep">|</span>
            <button className="c-footer-link" onClick={() => setLegalDoc(TERMS)}>Terms &amp; Conditions</button>
          </div>
        </div>
        <div className="c-footer-bottom">
          <div className="c-footer-copy">© 2026 Dr. [Name]. All Rights Reserved.</div>
          <div className="c-footer-copy">Kuala Lumpur, Malaysia</div>
        </div>
      </footer>
    </div>
  );
};

export default CardiologistTemplate;
