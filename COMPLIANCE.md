# Compliance Infrastructure

This site includes a two-layer compliance system protecting your APC and PDPA obligations.

## Layer 1 — Active Consent Marker (PatientConsentMarker.jsx)

The inquiry form submit button is **disabled by default**.
It only activates after the patient explicitly ticks the PDPA consent checkbox.

This creates a timestamped, intent-verified consent record for every inquiry submitted.

**What this protects:**
- Satisfies PDPA 2010 Section 6 (consent as a condition of data processing)
- Satisfies PDPA 2010 Section 7 (notice and choice principle)  
- Creates active (not passive) consent — the gold standard for sensitive personal data
- Removes "I didn't know my data would be collected" as a patient complaint

**What the consent text covers:**
- Explicit purpose limitation (medical inquiry only)
- Reference to Privacy Policy (with working link)
- Withdrawal of consent pathway
- Correct statutory reference (PDPA 2010 + 2024 amendments)

## Layer 2 — Digital Firewall (vercel.json)

Seven HTTP security headers applied at the edge, before any content is served.

| Header | Protection |
|--------|-----------|
| `X-Content-Type-Options: nosniff` | Prevents MIME-type sniffing attacks |
| `X-Frame-Options: DENY` | Blocks clickjacking — site cannot be embedded in iframes |
| `X-XSS-Protection: 1; mode=block` | Browser-level cross-site scripting filter |
| `Strict-Transport-Security` | Forces HTTPS for 2 years — all traffic encrypted |
| `Referrer-Policy` | Controls what URL data is shared with third-party links |
| `Permissions-Policy` | Explicitly blocks camera, microphone, geolocation, payment APIs |
| `Content-Security-Policy` | Whitelists every resource source — no unauthorised scripts can load |

**What this protects:**
- Patient data cannot be intercepted in transit (HSTS)
- No third-party scripts can be injected into the page (CSP)
- Clinic site cannot be cloned in an iframe for phishing (X-Frame-Options)
- No unauthorised access to device hardware (Permissions-Policy)

## Summary

Every patient inquiry submitted through this site:
1. Required explicit, active PDPA consent before submission
2. Was transmitted over encrypted HTTPS
3. Was protected from script injection, clickjacking, and MIME attacks at the server edge

This infrastructure was designed and implemented by MedPresence —
Malaysia's only doctor-led medical web agency.
