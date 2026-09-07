# Taqwa Agency website source

This archive contains the complete tracked source of the website, including all pages, styling, generated architectural imagery, shared UI components, dependency lockfile, database schema, migrations, and build configuration.

## Stack
React 19, TypeScript, Vinext (Vite-based Next.js-compatible framework), Tailwind CSS, Radix UI primitives, and a Cloudflare Worker with D1/Drizzle for inquiries.

This is application source, not an installable WordPress theme. WordPress requires a separate adaptation.

## Run locally
Use Node.js 22.13 or newer. The supplied build helpers target Linux; use Linux or WSL on Windows.

```sh
npm ci
npm run dev
```

Use the local URL printed by the development server. Dependencies are restored from package-lock.json. node_modules is intentionally not included.

To build:

```sh
npm run build
```

## Where to edit
- app/site.tsx: page content, shared header/footer, interactive services, resources, and discovery form.
- app/globals.css: visual design and responsive styles.
- app/page.tsx: homepage entry point.
- app/our-story/, app/what-we-do/, app/portfolio/, app/resources/, app/contact/: page routes.
- app/layout.tsx, app/sitemap.ts, app/robots.ts: site metadata and search configuration.
- public/architecture.webp: original architectural image used on the site.
- app/api/inquiries/route.ts: server-side validation and inquiry storage.
- db/schema.ts and drizzle/: inquiry database structure and migrations.

## Hosting and the inquiry form
The current deployment uses Sites hosting on Cloudflare Workers. The project discovery form writes to a Cloudflare D1 database bound as DB. On another deployment, provision that binding and apply the supplied migration, or adapt the form backend to your chosen database/form service. The ZIP includes the schema, not live inquiries or the hosted database.

The .openai/hosting.json file identifies the existing Sites project. Keep it when working on that same project; do not use its project ID to create an unrelated deployment. Independent hosting requires adapting the Sites-specific build/hosting configuration. This is not a static HTML upload for ordinary PHP hosting.

The site's own pages do not require ChatGPT authentication. The current sign-in gate is a hosting access setting, not a login requirement built into the page components. app/chatgpt-auth.ts is an unused optional starter helper.

## Before a public launch
- Replace the absolute origins in app/layout.tsx, app/sitemap.ts, and app/robots.ts with the final public domain. Those files currently contain a pre-publication origin that differs from the deployed URL.
- Add verified portfolio case studies; the current portfolio intentionally says they are in preparation.
- Connect inquiry email notifications if needed. They are not implemented in this version.
- Test the form against the target database after deployment.

## Included and excluded
All tracked project files are included unchanged, including starter documentation and third-party notices. This HANDOFF.md provides the Taqwa-specific overview; README.md is the original starter documentation. Existing starter tests are not a comprehensive test suite for Taqwa.

Excluded: installed dependencies, build output, Git history, runtime caches, credentials, and live database records. These are not required source code.
