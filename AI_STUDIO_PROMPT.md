Continue this existing Taqwa Agency website. Preserve its design, copy, architecture image, and all 13 routes. Do not regenerate a new design or replace its content with a generic agency template.

This repository has already been adapted from a Sites/Vinext/Cloudflare project into React + Vite with a Node.js server. Use `npm ci` and `npm run dev` for preview, and `npm run build` followed by `npm start` for production. The server accepts PORT and binds to 0.0.0.0. Keep package.json and package-lock.json synchronized.

Preserve the responsive typography improvements, mobile-first layout, native anchor navigation, tap-to-expand service cards, reduced-motion behavior, mouse-only cursor halo, gentle card tilt, and touch feedback. Keep content usable with keyboard navigation. No humans, faces, or silhouettes.

First verify the preview and production build. Check widths of 360, 390, 430, 768, 1024, and 1440 pixels. Check for horizontal overflow and text clipping. Verify keyboard controls, the mobile menu, resource filters, service expansion, and both discovery steps. Check reduced-motion mode too.

Connect the existing POST /api/inquiries endpoint to a persistent Firestore database provisioned in my Google environment. The existing adapter supports Cloud Run service identity and FIRESTORE_PROJECT_ID. If the preview environment requires a different server-side Firebase integration, adapt only the storage function while retaining server validation and failure handling. Do not store leads only in browser storage or on an ephemeral filesystem. Do not make inquiry records publicly readable. Do not ask visitors to sign in. Do not show success unless the database write actually succeeds.

No Gemini API is needed to run this agency website. Do not add a chatbot, paid AI feature, authentication wall, or new product without being asked. Preserve the existing portfolio notice until verified case studies are supplied. Email notifications are not configured; do not imply that they are.

Ask me for the final domain before setting SITE_URL. Do not deploy or create paid infrastructure without clearly identifying the requested action in my Google account. Keep secrets server-side. Explain any setup that remains before the inquiry form is usable.
