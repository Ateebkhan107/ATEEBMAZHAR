# Production readiness audit - 16 October 2026

The repository builds and runs as a static Vite application. The existing sections, visual identity, animated background, sculpture, globe, and project demos are retained. No commit, push, or Vercel deployment was performed.

## Completed fixes

- Removed unused `react-tilt`, which blocked a fresh `npm install` due to its React 18 type peer dependency, plus unused `maath` and vertical-timeline dependencies. Regenerated the lockfile and installed compatible security patches. Added a supported Node engine range.
- Added the standard Vercel SPA rewrite for the existing BrowserRouter, plus nosniff, frame protection, and referrer-policy headers. No conflicting deployment configurations or absolute local runtime paths were found.
- Deferred the 3D scene modules and the contact globe until needed. Reserved scene dimensions to avoid loading shifts. Render loops stop off screen and in hidden documents. Reduced-motion users receive static scenes while retaining globe drag interaction. Removed `dispose={null}` from active generated geometry so Fiber can clean it up. Added scene error/WebGL-unavailable fallbacks.
- Added Framer Motion reduced-motion configuration and honored it in typing, repeated scrolling indicator, and imperative scrolling. Existing effects remain enabled for users without that preference.
- Added a synchronous duplicate-submit guard, accessible labels/field errors/status, autocomplete, input length limits, and public EmailJS configuration overrides. Success still depends on EmailJS's actual resolved response. Removed the unsubstantiated encrypted-gateway label. Clipboard errors are handled; copy and terminal focus timers are cleaned up.
- Added accessible modal names, focus trapping/restoration, Escape handling, scroll locking, and portals above the navigation. Technology nodes are keyboard-operable buttons. Decorative SVGs are hidden from assistive technology.
- Corrected narrow-screen navigation breakpoints, hero text wrapping, nested grid sizing, project/mockup header wrapping, and contact/resume controls. Static Prepzii mockup buttons are explicitly disabled and identified as static previews; working tabs and answer selection remain interactive.
- Changed project GitHub labels to “GitHub Profile” because all supplied links lead to the profile. No repository or live URLs were invented. Programmatic external tabs use noopener/noreferrer.
- Applied the requested exact title/description, Open Graph and Twitter metadata. Added optional build-time canonical, social image, robots and sitemap support without assuming a domain.
- Repaired the invalid resume PDF (broken cross-reference table and overflowing unwrapped content) using exactly its existing text. Verified one-page strict parsing and inspected its rendered PNG. PDF files are marked binary in Git.
- Added environment/deployment exclusions, an empty `.env.example`, and deployment documentation.

## Actual command and browser results

| Check | Result |
| --- | --- |
| `npm install` | PASS; dependency resolution succeeds without legacy-peer-deps or force |
| `npm run build` | PASS under local Node 20.20.2 and bundled Node 24.19.0; latest final build used Node 24 |
| `npm run lint` | PASS; zero errors/warnings |
| Typecheck | Not available: JavaScript project, no existing typecheck script |
| Local production preview | PASS, served `dist` at `http://127.0.0.1:4173` |
| Asset HTTP checks | PASS: all 25 generated/public files returned 200 with exact matching bytes, including resume, favicon, technology images, JS and CSS |
| Relative imports and exact filename case | PASS; static inspection of every relative import |
| Manifest/lockfile synchronization | PASS for dependency, development dependency and engine fields |
| Vercel JSON | Parses; standard documented SPA rewrite; platform behavior requires deployment to verify |
| Metadata modes | PASS; isolated fixture build generated canonical, image metadata, valid sitemap XML and sitemap robots directive; default build has no invented canonical/sitemap |
| Repository hygiene | PASS; environment files, dependencies, output and Vercel local state ignored; no tracked node_modules/dist/env files |
| Secret scan | No private-key/provider-token patterns found in tracked files or all committed history; manually reviewed browser configuration |
| `npm audit --omit=dev --json` | PASS: zero production dependency advisories |
| Full npm audit | Seven remaining development-tool advisories: five high, two moderate |
| `git diff --check` | PASS |

Browser verification used Codex's in-app browser, not separate Chrome, Safari, Firefox or Edge installations. All six section anchors render (`hero`, `about`, `projects`, `experience`, `tech`, `contact`), with one primary heading and no missing fragment targets. At 320, 390, 768, 1024, 1280 and 1440 px, document and navigation horizontal-overflow checks passed. Mobile screenshots were inspected and confirmed the corrected hero, form and project layouts.

Verified interactions: mobile menu opens and closes on navigation; contact navigation; resume opens/closes and points to the existing PDF; command search launches the terminal; terminal `projects` command and Escape work; Prepzii case study opens/closes; Prepzii tutor/predictor tabs switch; Flamzi focus countdown runs and pauses; experience filtering and technology selection work. Blank and malformed-email submissions show actual accessible validation errors without sending a message. The animated sculpture, star field and globe render. No application console errors were observed; React Three Fiber emits a `THREE.Clock` deprecation warning.

## Security findings and remaining risks

- EmailJS's original service/template IDs and browser public key are intentionally public, not private credentials. Existing defaults are preserved and can be overridden with the three documented `VITE_EMAILJS_*` values. Private provider keys/mailbox credentials must never be placed in these variables. No credentials were deleted or rotated.
- Seven advisories remain in `braces`, `chokidar`, `micromatch`, `fast-glob`, `postcss-selector-parser`, `postcss-nested`, and Tailwind 3's dependency chain. npm's proposed force fix is a Tailwind 4 migration. That migration was not performed because it requires a separate visual regression pass. These are build-tool risks; only trusted source/configuration should be built. The production dependency audit is clean.
- Three.js core remains 722.85 KB minified / 184.26 KB gzip in a deferred chunk. The Vite large-chunk warning is retained. No measured Lighthouse/Core Web Vitals score, CPU/GPU profile, real-device touch test or memory profile is claimed.
- Secret scanning is pattern-based plus source review, not proof that every possible credential format is absent.

## Owner checks before production release

1. Import the correct repository/team in Vercel and select the settings below. Inspect the remote build, headers, nested URL refresh, and assets after deployment. Local Vite preview does not execute Vercel routing/headers and is not Linux hosting validation.
2. In EmailJS, verify ownership, connected email service, recipient, reply-to mapping, template availability, quota and origin allowlist. Enable provider-side abuse protection and send an owner-controlled test message after deployment. No external email was sent; live submission, error response and actual mailbox delivery were not tested. Loading/error/success paths and duplicate guards were source-reviewed.
3. Supply the final production `SITE_URL`, then rebuild for canonical/OG URL/sitemap. Optionally supply a real `SOCIAL_IMAGE_URL`; a social preview image is not invented or generated automatically.
4. Supply actual project repository URLs if desired. CaseFlow and Flamzi have no configured live URLs. Confirm the intended GitHub profile: the existing site links to `ateebmazhar`, while the repository belongs to `Ateebkhan107`; neither was replaced.
5. Check LinkedIn manually. HTTP checks confirmed Prepzii (redirect to www), SkaleKraft and GitHub returned 200; LinkedIn returned a challenge response, which does not verify the profile content. External project functionality was not audited.
6. Test separately in modern Chrome, Safari, Firefox and Edge, including real touch devices, reduced-motion settings, WebGL-disabled mode, focus cycling and email submission. Reduced-motion, visibility pausing and WebGL fallback were reviewed in code; no OS preference change or GPU instrumentation was performed.
7. Schedule the Tailwind dependency migration with visual regression checks and monitor upstream Fiber/Three.js deprecation compatibility.

## Recommended Vercel settings

| Setting | Value |
| --- | --- |
| Repository | `Ateebkhan107/ATEEBMAZHAR` |
| Root directory | Repository root |
| Framework | Vite |
| Node.js | 24.x |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `main` (confirm in Vercel) |

Reference: [Vercel's official Vite deployment and SPA guidance](https://vercel.com/docs/frameworks/frontend/vite).

## Files modified or added

- `.env.example`
- `.gitattributes`
- `.gitignore`
- `PRODUCTION_READINESS.md`
- `README.md`
- `index.html`
- `package-lock.json`
- `package.json`
- `public/resume.pdf`
- `src/App.jsx`
- `src/components/CaseStudyModal.jsx`
- `src/components/CommandPalette.jsx`
- `src/components/Contact.jsx`
- `src/components/DeferredScene.jsx`
- `src/components/Footer.jsx`
- `src/components/Hero.jsx`
- `src/components/Icons.jsx`
- `src/components/InteractiveTerminal.jsx`
- `src/components/Navbar.jsx`
- `src/components/ResumeModal.jsx`
- `src/components/Tech.jsx`
- `src/components/Works.jsx`
- `src/components/canvas/Earth.jsx`
- `src/components/canvas/HeroCore.jsx`
- `src/components/canvas/SceneCanvas.jsx`
- `src/components/canvas/Stars.jsx`
- `src/components/index.js`
- `src/components/mockups/CaseFlowMockup.jsx`
- `src/components/mockups/FlamziMockup.jsx`
- `src/components/mockups/PrepziiMockup.jsx`
- `src/components/mockups/SkaleKraftMockup.jsx`
- `src/hooks/useDialog.js`
- `src/index.css`
- `vercel.json`
- `vite.config.js`

## Commit and push

No changes have been committed or pushed. Review the diff first, then run:

```sh
cd /Users/ateebmazhar/Desktop/my-portfolio
git diff --check
git add .gitattributes .gitignore .env.example README.md PRODUCTION_READINESS.md index.html package.json package-lock.json vite.config.js vercel.json public/resume.pdf src
git commit -m "Prepare portfolio for Vercel production deployment"
git push origin main
```

If the repository is already connected to Vercel, pushing `main` may trigger its production deployment. Confirm the intended project before pushing.
