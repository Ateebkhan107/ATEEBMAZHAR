# Ateeb Mazhar - Portfolio

React 19 + Vite, Tailwind CSS, Framer Motion, and React Three Fiber. The dark neon-green identity and desktop scenes are retained, with a lightweight mobile experience.

## Local development and verification

Use Node.js 24.x on Vercel. The supported local range is Node 20.19.x or later in 20.x, or Node 22.12.0 and later. Commit `package-lock.json` with dependency changes.

```sh
npm install
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

The preview serves `dist`, not source files. There is no TypeScript/typecheck script in this JavaScript project. Do not commit `node_modules`, `dist`, `.env*` files, or `.vercel` (except the empty `.env.example` template).

## Deploy to Vercel

1. Import the existing GitHub repository `Ateebkhan107/ATEEBMAZHAR` in Vercel and select its root directory.
2. Choose framework **Vite**, install command **npm install**, build command **npm run build**, output directory **dist**, and Node.js **24.x**.
3. Review optional environment settings below, deploy, and test the generated preview URL before making it the production domain. Git pushes to the configured production branch (currently `main`) trigger production builds through the Vercel Git integration.
4. After the production domain is known, set `SITE_URL` to that exact HTTPS origin in Vercel and redeploy. Optionally set `SOCIAL_IMAGE_URL` to an actual public HTTPS social preview image. Do not use a temporary preview URL as the canonical production origin.

`vercel.json` supplies a static SPA fallback, basic response security headers, immutable caching for hashed build assets, and shorter caching for project images and fonts. Navigation uses native section anchors. Existing static files take precedence. The Vite defaults supply the build/output settings, so there are no conflicting command overrides in this file. See [Vercel's Vite documentation](https://vercel.com/docs/frameworks/frontend/vite).

## Environment and contact form

`.env.example` lists optional names without credentials. For local overrides, copy it to `.env.local`. Vite replaces browser variables at build time; changes require a rebuild/redeployment.

- `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`: intentionally public EmailJS browser configuration. The original public identifiers remain defaults so existing integration behavior is preserved. Set all three together when switching services. **Never supply an EmailJS private key, mailbox password, or other private token here.** Environment variables do not hide `VITE_` values from visitors.
- `SITE_URL`: optional build-only HTTPS production origin, without a path. Generates canonical/OG URL metadata and a single-page `sitemap.xml`. Blank means no invented canonical or sitemap URL. Section fragments are not separate sitemap pages. `robots.txt` is always generated during the build.
- `SOCIAL_IMAGE_URL`: optional absolute public HTTPS image URL for Open Graph and Twitter large-image cards. Without it, title/description metadata and a summary card are provided.

The contact form validates name, email, and a 10-5000 character message, prevents duplicate pending submissions, and reports success only after EmailJS accepts the request. Failures retain the message and offer direct email. Configure the EmailJS template's recipient and reply-to fields (`user_name`, `user_email`, `message`), allow only the intended production/preview origins, and enable provider-side abuse controls/rate limits. Browser validation is not server-side abuse prevention.

Actual delivery, account ownership, template status, quotas, sender configuration, and allowed origins require an owner-run test in EmailJS after deployment. No test email was sent during this audit.

## Remaining maintenance and configuration

- The project links currently point to the existing GitHub **profile**, not individual repositories. Supply real repository URLs if they should be linked. CaseFlow and Flamzi have no live URLs configured.
- Confirm the profile at `github.com/ateebmazhar` is intended; the repository owner is `Ateebkhan107`. The audit did not change either identity.
- Seven npm advisories remain in the Tailwind 3 development toolchain (five high, two moderate); production dependency audit reports zero. The suggested force fix migrates to Tailwind 4, which needs a separate visual regression review. Do not run `npm audit fix --force` blindly. Build only trusted source and configuration.
- Three.js emits a `THREE.Clock` deprecation warning through React Three Fiber. It does not prevent rendering. The deferred Three.js core chunk remains above Vite's 500 KB warning threshold; do not suppress the warning or remove effects simply to hide it.
- Fonts are self-hosted Latin WOFF2 subsets with `font-display: swap` and system fallbacks. Licenses are included in `public/fonts`. No private backend credentials are needed for this static application.
- See [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) for completed checks and unverified items.

## Performance verification

See [PERFORMANCE_AUDIT.md](PERFORMANCE_AUDIT.md) for the measured before/after
results, mobile changes, remaining limits, and push commands.

The production browser suite checks all eight requested widths, mobile asset
requests, images, menus, dialogs, project demos, filters, mocked contact responses,
and adaptive device modes. It never sends an external email. Install the optional
QA runner without changing the application lockfile:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
# In one terminal:
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
# In another terminal:
npm run verify:production
```

`PORTFOLIO_URL`, `BROWSER_EXECUTABLE_PATH`, `PLAYWRIGHT_MODULE_PATH`, and
`PERF_REPORT_DIR` optionally customize the runner. Results and screenshots default
to the system temporary directory under `portfolio-verification`.

The compact mobile layout has a dedicated check: `npm run verify:mobile`.
It covers 320, 375, 390, and 430 px, all four carousel projects, keyboard controls,
native horizontal touch swipes, vertical touch scrolling over the carousel,
expandable content, contact validation, and nested-scroll/overflow regressions.
See `MOBILE_LAYOUT_AUDIT.md` for the before/after page-height measurements.
