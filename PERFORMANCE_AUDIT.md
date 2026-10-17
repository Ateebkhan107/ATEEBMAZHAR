# Portfolio performance and mobile audit — 17 October 2026

**Follow-up:** this report records the first performance pass. The later compact
mobile layout, current screenshots, and latest verification are documented in
[MOBILE_LAYOUT_AUDIT.md](MOBILE_LAYOUT_AUDIT.md). The measurements below are
preserved as historical evidence for that first pass.

Changes are implemented locally. Nothing has been committed, pushed, or deployed.
The dark, neon-green identity, desktop sculpture, globe, project demos, resume,
case studies, contact integration, and all main sections remain available.

## Root causes confirmed before editing

1. **Mobile downloaded and initialized desktop 3D.** A 390 px touch viewport
   requested 1,397,810 bytes of decoded JavaScript and created two canvases at
   initial load: the fixed 1,200-star field and hero sculpture. Contact added a
   deferred globe. Lazy imports alone did not prevent mobile initialization.
2. **Chunk boundaries pulled 3D into critical preloads.** Shared React exports
   ended up inside the manually grouped React Three Fiber chunk. Production HTML
   preloaded Three.js core and Fiber even when a scene was dynamically imported.
3. **Google Fonts blocked rendering.** Baseline Lighthouse attributed roughly
   992 ms of estimated blocking delay to the external font stylesheet. Three
   families plus additional subsets required cross-origin stylesheet/font requests.
4. **Typing caused repeated hero renders.** Two state updates per character,
   on a 26 ms timer, re-rendered the whole hero and its scene wrapper for seconds.
5. **Nonessential code loaded upfront.** All project recreations, dialogs,
   terminal, EmailJS SDK, and lower sections shared the initial dependency graph.
   React Router provided no actual routing beyond the single-page wrapper/logo.
6. **Mobile retained desktop decoration and density.** Large scene blocks,
   blurred ambient layers, backdrop filters, continuous decorative animation,
   sprawling previews, desktop spacing, and small form input text added work
   and vertical length. Navbar state was also updated from a scroll listener.

The technology section already used an SVG grid; unused Ball/Computers scenes
and unused PNG technology icons were not active network/rendering bottlenecks.
There is no GSAP or third-party smooth-scroll library in the application.

## Implemented changes

| Area | Result |
| --- | --- |
| Adaptive effects | A reactive capability check combines viewport, pointer/hover support, reduced motion, data-saving/slow-connection hints, and available CPU/memory hints. Unsupported capability APIs retain sensible fallbacks. No user-agent sniffing. |
| Mobile 3D | No imports or initialization of Three.js/Fiber, stars, sculpture, globe, or custom cursor. Static inline SVG compositions retain the cyber aesthetic. |
| Desktop 3D | Scenes initialize near the viewport during idle time. Existing off-screen/hidden-tab loop pausing remains. DPR is capped at 1.5 for sculpture/globe and 1 for stars; stars fall from 1,200 to 500; globe geometry is lighter. The inaccurate hardcoded “60 FPS” badge is removed. |
| Critical bundles | React has its own explicit vendor group, preventing the accidental 3D preload dependency. Framer Motion uses `m` and asynchronously loaded `domAnimation` features through `LazyMotion`. |
| Sections and overlays | Works, Experience, Tech, and Contact are split with Suspense. Dialogs and project recreations import on use; mobile previews mount only when expanded. EmailJS imports only on a valid submission. Hero content stays eager. |
| Hero | Responsive `clamp()` typography, a compact static mobile core, aligned CTA grid, narrower terminal header, and reserved terminal height. Terminal updates are isolated and reveal whole lines only on enhanced devices; mobile shows its content immediately. The scroll cue uses a visible-only CSS animation. |
| Navigation | Compact 44 px mobile utility targets, bounded scrolling menu, transform/opacity opening transition, Escape/outside-click dismissal, and resize cleanup. IntersectionObserver replaces the scroll listener. |
| About and experience | Smaller mobile gutters/spacing, readable text and compact metrics/timeline cards. No biography or career entries deleted. |
| Projects | Compact mobile summaries and tech badges, real Prepzii/SkaleKraft screenshots, aspect-ratio reservation, `object-fit: contain`, lazy decoding/loading, 480/960 px WebP variants, `srcset` and `sizes`. Full features remain in case studies; all recreations remain accessible. Desktop keeps its editorial demos. |
| Technology | Three-column mobile SVG grid with smaller icons and touch targets. The inspector is sticky only at desktop widths. Hover/tap scaling is gated by enhanced mode. |
| Contact | Full-width fields, 16 px inputs to avoid iOS focus zoom, full-width mobile submit button, compact static SVG globe, and preserved pending/success/error behavior. |
| Scrolling | Native mobile anchor scrolling, cleaned event/observer lifecycles, no added JavaScript animation loops, no mobile blur/backdrop filters or repeating pulse effects. |
| Fonts and hosting | Self-hosted Latin WOFF2 fonts with `font-display: swap`, critical font preloads, and included OFL licenses. Vercel caches hashed build assets immutably, images for one day, and fonts for one week. |
| Dependencies | Removed unused `react-router-dom` and synchronized the lockfile. Existing desktop 3D dependencies remain intentionally. |

Main implementation points: `src/hooks/usePerformanceMode.js`,
`src/components/DeferredScene.jsx`, `HeroTerminal.jsx`, `ProjectPreview.jsx`,
`src/App.jsx`, `src/index.css`, `vite.config.js`, and `vercel.json`.

## Measured production results

Measurements use a saved original production build and the final Vite production
preview, headless installed Chrome, and Lighthouse's default simulated mobile
throttling (4× CPU slowdown, approximately 1.6 Mbps). These are local laboratory
measurements, not production field Core Web Vitals or physical-device results.

| Metric | Before | After |
| --- | ---: | ---: |
| Lighthouse mobile Performance | 79 | 95 |
| First Contentful Paint | 3.4 s | 2.0 s |
| Largest Contentful Paint | 4.2 s | 2.6 s |
| Total Blocking Time | 20 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Initial-page transferred resources | 510 KiB | 231 KiB |
| Initial mobile decoded JavaScript | 1,397,810 B | 358,607 B |
| Initial mobile WebGL canvases | 2 | 0 |
| Page height at 390 px, previews closed | 18,553 px | 13,239 px |

Mobile decoded JavaScript falls approximately **74%**, initial transfer about
**55%**, and mobile page length about **29%**. Added screenshots are below the fold
and lazy-loaded. Cold-load resource totals do not represent all later interactions.
See `reports/lighthouse-summary.json`, the original Lighthouse audit data in
`reports/lighthouse-before.json` / `reports/lighthouse-after.json` (screenshot
payloads omitted), and `reports/browser-results.json`.

**LCP remains slightly above the requested 2.5 s threshold.** The score exceeds
90, but this does not establish compliance on every device or network. INP was
not measured; TBT must not be interpreted as INP. Production field data and actual
device profiling are needed to validate the interaction target.

## Scroll CPU profile

A separate Chromium DevTools `Performance.getMetrics` comparison used fresh
390 × 844 touch contexts, waited 2.5 seconds after each load, then performed the
same fifty native 100 px scroll steps over approximately 5.1 seconds. No other
browser tests ran during this comparison; this is one sample per build.

| Main-thread work during the scroll sample | Before | After |
| --- | ---: | ---: |
| Total task time | 1,067.97 ms | 96.56 ms |
| Script time | 330.83 ms | 13.87 ms |
| Layout time | 55.60 ms | 1.06 ms |
| Style recalculation time | 171.98 ms | 3.92 ms |

That sample uses approximately **91% less main-thread task time**. It does not
measure GPU time, real touch latency, sustained physical-device FPS, or INP.
Raw counters are saved in `reports/scroll-profile.json`.

## Actual verification

- `npm run build`: passes. The retained, dynamically loaded Three.js core still
  produces Vite's >500 KB chunk warning; it is not suppressed.
- `npm run lint`: passes with zero errors/warnings. `git diff --check`: passes.
- Production preview serves `dist` on port 4173. Vercel JSON parses and package
  dependency/engine fields agree with the lockfile. No deployment was performed,
  so deployed cache headers, edge behavior, and remote build remain unverified.
- Automated Chromium checks cover **320, 360, 375, 390, 430, 768, 1024, and
  1440 px**. Sections render without document horizontal overflow. Loaded images
  decode successfully. Mobile requests exclude 3D/cursor/demo modules until use.
- Additional touch viewport checks at **320 × 568**, **390 × 844**,
  **360 × 800**, and **768 × 1024** confirm the menu fits, inputs remain 16 px,
  and no horizontal overflow or canvases appear. These emulate dimensions and
  touch capabilities in Chromium; they do not emulate the Safari engine.
- Menus open, close via navigation/Escape, and remain bounded. Resume, case-study,
  command-palette search, terminal commands, Prepzii tabs, Flamzi countdown,
  experience filtering, and technology selection pass.
- Contact validation, pending state, one mocked submission, success/reset, and
  a separately mocked provider HTTP 500 pass. Failure retains the message.
  **All provider requests were intercepted; no external email was sent.**
- Reduced-motion, simulated two-core CPU, save-data, and tablet-touch modes create
  no canvases and request no 3D/cursor modules, including after scrolling to Contact.
- Additional checks inspect expanded previews at 320 px and content bounds at
  touch and mouse-driven 768/1024 px after entrance transitions settle.
- No application JavaScript exceptions were captured. Desktop Three.js retains
  the upstream `THREE.Clock` deprecation warning.
- Mobile and desktop screenshots were inspected. Captures are included at
  `reports/mobile-hero.png` and `reports/desktop-hero.png`. Full section screenshots
  and the browser suite's latest output are also available in the temporary QA
  output directory shown by the runner.

The reusable runner is `scripts/verify-production.cjs` / `npm run verify:production`.
See README for optional Playwright setup and environment overrides.

## Remaining limits

- No physical iPhone/Android tests, Safari/WebKit/Firefox tests, field INP, or
  production Vercel measurements are claimed.
- CaseFlow and Flamzi have no supplied original screenshots or public live URLs.
  Their branded covers and interactive recreations are labeled accordingly.
  Screenshots of the actual public Prepzii and SkaleKraft sites were captured on
  this audit date; see `public/projects/README.md` for provenance.
- EmailJS account configuration, allowlists, quotas, and mailbox delivery still
  require an owner-controlled live submission after deployment.
- Existing GitHub links lead to the supplied profile rather than project repos.
  These were preserved, as were all supplied live links and personal details.
- Capability hints are a conservative enhancement policy, not a GPU benchmark.
  Resizing a previously enhanced desktop to mobile cannot undo already downloaded
  modules, but it unmounts the scenes. Fresh mobile loads avoid those downloads.

## Push these changes to GitHub

The working branch at audit time was `main`. Create a review branch:

```sh
cd /Users/ateebmazhar/Desktop/my-portfolio
git switch -c codex/mobile-performance
git add README.md PERFORMANCE_AUDIT.md MOBILE_LAYOUT_AUDIT.md index.html package.json package-lock.json vite.config.js vercel.json src public/fonts public/projects reports scripts
git commit -m "Optimize portfolio performance and mobile experience"
git push -u origin codex/mobile-performance
```

Open a pull request against `main` in `Ateebkhan107/ATEEBMAZHAR`. A Vercel Git
integration may create a preview automatically; verify that preview before merging.
