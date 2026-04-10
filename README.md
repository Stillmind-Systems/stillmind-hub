# Stillmind Hub

A modern, minimalistic landing page for Stillmind Systems ecosystem.

## Features
- 100% Vanilla HTML/CSS/JS
- Responsive design (mobile-first)
- Dark premium theme with cyan neon accents
- Smooth animations and interactions
- Download tracking (console logs)
- GitHub Pages / Cloudflare Pages ready
- Security hardening (CSP + headers for supported hosts)

## Deployment
1. Fork/clone this repo
2. Enable GitHub Pages
3. Done!

## Security (important)
- `index.html` includes a **Content Security Policy** via a `<meta http-equiv="Content-Security-Policy">` tag.
- `_headers` adds common **security headers** for hosts that support it (ex: Cloudflare Pages / Netlify).
- GitHub Pages does **not** support custom response headers in the same way; the CSP meta still helps, but server-side protections depend on your hosting.

## Local Preview
```bash
open /Users/macuser/Desktop/stillmind-hub/index.html
```

## Files Structure
```
stillmind-hub/
├── index.html
├── style.css
├── app.js
├── apps/
│   ├── logic-time-machine.apk
│   └── stillmind-tool.exe
└── assets/
    └── logo.svg
```

