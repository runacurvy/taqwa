# Taqwa Agency for Google AI Studio

A portable React + Vite website with a Node.js server, generated HTML for every route, larger responsive typography, and motion that respects reduced-motion preferences. The original Taqwa design, copy, image, pages, and interactive discovery form are preserved. There is no ChatGPT sign-in requirement in this application.

## Run

Use Node.js 22.13 or later.

```sh
npm ci
npm run dev
```

The development server listens on port 3000 (or PORT) on all interfaces. In a hosted editor, use its forwarded preview URL. Do not open localhost on a different device.

```sh
npm run check
npm test
npm run build
npm start
```

The build prerenders all 13 routes and a 404 page. Production serves that HTML and hydrates it with React, keeping content available to crawlers and visitors before JavaScript loads. Navigation uses normal links, so direct URLs and browser back/forward work.

## Import into Google AI Studio

Google's documented route is Build mode → Add files (+) → Import from GitHub. Select the repository and the `ai-studio-readable-motion` branch if branch selection is available. If the importer only reads the default branch, first merge the migration pull request after reviewing it, or copy this branch into a separate repository. This branch deliberately replaces the old Sites-specific project structure; do not merge it into a deployment that still expects Vinext without changing that deployment too.

After import, paste the contents of AI_STUDIO_PROMPT.md into the builder. The project is prepared for AI Studio, but has not been opened or deployed inside the user's Google account.

Official guide: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

## Typography and interaction changes

- Body copy scales from 17px to 19px at the default browser font setting.
- Buttons, navigation, form labels, resource links, and supporting text use approximately 16px.
- Secondary metadata uses 13–15px; image captions use 12px.
- Mobile resources use full-width covers and larger titles.
- Tablet layouts provide more room for the approach sequence and service cards.
- Cards reveal on scroll, tilt gently under a mouse pointer, and expand on tap.
- A desktop-only cursor halo keeps the native cursor visible.
- Tap feedback and pressed states confirm touch interaction.
- Reduced-motion settings disable these effects. No motion is needed to access content.

## Inquiry storage: setup required

The server validates project inquiries and can save them to Google Firestore through its REST API. This is a replacement for the original Cloudflare D1 backend, not a migration of existing inquiry records.

To enable production saving:

1. Create or select a Google Cloud project and create a Firestore database in Native mode.
2. Set FIRESTORE_PROJECT_ID on the server. FIRESTORE_DATABASE_ID defaults to `(default)`.
3. Assign the Cloud Run service an identity with permission to create Firestore documents in that project. Prefer a scoped custom IAM role; `roles/datastore.user` is a broader predefined option.
4. Keep browser access to the inquiries collection denied. The backend uses its service identity and IAM, so visitors do not need to sign in.
5. Test a sample inquiry after deployment and verify it appears in Firestore before using the form for client leads.

No key is bundled or exposed to the browser. On Cloud Run, the adapter gets a short-lived access token from the Google metadata service. AI Studio preview identity support must be checked in the actual account. If that environment does not provide the required identity, let AI Studio connect its provisioned Firestore instance to the same validated endpoint.

For local database testing, run a Firestore emulator and set FIRESTORE_EMULATOR_HOST and FIRESTORE_PROJECT_ID. The adapter deliberately ignores the emulator setting in production.

Without a configured and accessible database, form submission returns a visible error and never claims to have saved an inquiry. No email notifications or visitor account system are included.

Firestore: https://firebase.google.com/docs/firestore/use-rest-api
Service identity: https://docs.cloud.google.com/run/docs/securing/service-identity

## Public deployment

AI Studio can deploy to Cloud Run. A Dockerfile is also included. Set access to allow public visitors for the agency website. The Google project, deployment, service identity, and billing are managed in your Google account.

Set SITE_URL to the final domain during the build to generate canonical links and sitemap.xml. Without it, no guessed canonical origin is emitted. Update this value and rebuild when moving domains.

## Edit

- `src/site.tsx`: page content and interactive UI.
- `src/globals.css`: typography, layout, and responsive styles.
- `src/motion.tsx`: pointer, touch, and scroll effects.
- `src/routes.tsx`: route map and titles.
- `public/architecture.webp`: original architectural image.
- `server/inquiries.mjs`: validation and Firestore adapter.
- `server/index.mjs`: API and static/development serving.
- `scripts/prerender.mjs`: route HTML and metadata generation.

## Current content status

Case studies are still marked as being prepared. The three resource guides are readable. Do not invent client outcomes, testimonials, or downloadable products. No humans, faces, or silhouettes should be added.

## Arabic version

All 13 public pages have Fusha Arabic counterparts under `/ar`, with RTL layout, Arabic metadata and a language switch that preserves the current page. Both languages are prerendered. Set `SITE_URL` at build time for canonical and alternate-language links. Arabic form labels are translated while stable backend enum values are preserved. Arabic content currently lives in `src/site-ar.tsx`; English content lives in `src/site.tsx`. Both require code edits until a CMS is connected.

## Resource administration: proposed next phase

There is currently no admin dashboard, resource upload endpoint, or administrator login. Public resources are authored in code. Do not present a hidden URL or client-side password check as access control.

For the Google-hosted version, the proposed implementation is Firebase Authentication for administrator sign-in, Firestore for resource records, and Cloud Storage for PDFs and cover images. Server endpoints must verify the Firebase ID token and an explicitly assigned admin role on every management request. Credentials and role assignment remain server-side. Database and storage rules must also prevent unauthorized writes and public access to drafts. Ordinary visitors need no login for published public resources.

The dashboard should support: an English and Arabic title, summary and article body; category and format; cover image and alternative text; file upload; draft/published status; previews; editing and unpublishing. Use one stable resource ID for both translations. Permit publishing a language only when its required content is complete. Validate file type and size server-side, and store draft files privately. Only expose published metadata and permitted downloads through public queries. Existing static guides should be migrated without changing their URLs.

Before implementation, configure the Firebase project, enable Authentication and file storage, and designate the initial administrator through trusted server administration. This phase is not included in the current Arabic update.
