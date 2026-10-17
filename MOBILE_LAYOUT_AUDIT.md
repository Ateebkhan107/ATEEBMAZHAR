# Compact mobile layout — 17 October 2026

Implemented in the actual React/Vite codebase. The mobile composition changes
below apply at widths under 768 px. Desktop retains the existing editorial layouts,
sculpture, globe, project demos, typography, and neon-green visual identity.

## Page length

Measured from the production build with default closed disclosures and no
interaction-induced expansion. Previous heights come from the preceding
performance pass, rather than an artificially expanded comparison page.

| Width | Previous mobile page | Compact mobile page | Reduction |
| --- | ---: | ---: | ---: |
| 320 px | 14,459 px | 4,600 px | 68% |
| 375 px | 13,358 px | 4,270 px | 68% |
| 390 px | 13,239 px | 4,193 px | 68% |
| 430 px | 12,614 px | 4,144 px | 67% |

At 390 px, the default section heights are Hero 542 px, About 462 px, Projects
895 px, Experience 631 px, Tech 565 px, and Contact 763 px. Projects now presents
all four products in one horizontal region rather than four vertically stacked
showcases. These are content-driven heights; no section is forced to fill a viewport.
Expanding requested details naturally increases the document height.

Desktop document heights at 768, 1024, and 1440 px match the preceding build:
15,287, 11,279, and 10,337 px, respectively. A separate touch-device policy still
skips WebGL on tablets as established in the performance pass.

## What changed

- **Hero:** a dedicated mobile composition with the name, complete role/value
  statement, immediate project/resume actions, founder/education context, and
  social/terminal controls. The decorative scene block is removed; terminal logs
  expand on request. There is no viewport-height requirement or empty spacer.
- **Projects:** native horizontal overflow and CSS scroll snapping, four named
  navigation buttons, previous/next controls, a live position counter, visible
  swipe instructions, and Left/Right/Home/End keyboard support. IntersectionObserver
  updates the selected project during native swipes; there is no scroll listener,
  drag library, autoplay, or vertical scroll interception.
- **Project information:** every card retains its full description, role,
  category, technology list, case-study access, original live link where available,
  and GitHub profile link. Real Prepzii/SkaleKraft screenshots keep their aspect
  ratios. CaseFlow/Flamzi retain honest branded covers. Full case studies remain.
- **Interactive previews:** open in a focused dialog, keeping large recreations
  out of carousel height. The dialog locks page scrolling, provides a persistent
  close button, supports Escape, restores focus, and loads demo code on demand.
- **About:** identity, university, graduation, and founder context remain visible.
  Native details expose the complete story, engineering disciplines, developer
  dossier, and metrics. The desktop wrappers render their original children.
- **Experience:** all five roles remain visible with company, title, and date.
  Expandable entries retain every responsibility, tag, location, and role type.
  Existing filters remain available.
- **Technology:** one compact four-column icon grid replaces multiple vertically
  separated groups on mobile. A native category selector filters tools; tapping
  a tool reveals its proficiency, complete application notes, and project usage.
- **Contact/footer:** tighter form spacing, a three-row message field with all
  validation and submission behavior retained, 16 px input text, compact direct
  links/location, and no standalone mobile globe block. Footer gaps are reduced.
- **Shared layout:** smaller mobile gutters/section gaps and concise section
  headings establish hierarchy without shrinking body text into unreadable sizes.
  Disclosures expand the document itself, without nested vertical scroll panels.

## Verification

- `npm run build`, `npm run lint`, and `git diff --check` pass.
- `npm run verify:mobile` passes at 320 × 568, 375 × 844, 390 × 844, and 430 × 844.
  All four project buttons, keyboard navigation, case studies, interactive preview,
  and expandable About/Experience entries work. Horizontal page overflow is absent.
- Native touch events sent through Chrome DevTools change slides on a horizontal
  swipe. A vertical gesture over the carousel scrolls the page and preserves the
  selected slide. Both checks pass at every requested mobile width.
- The default mobile page contains no nested vertical scrolling region. Intentional
  dialogs use one vertical scroller while the background page is locked. Normal
  textarea text editing keeps its native input behavior.
- The complete `npm run verify:production` suite passes at 320, 360, 375, 390,
  430, 768, 1024, and 1440 px, including image decoding, navigation, resume,
  command palette/terminal, demo interactions, filters, adaptive modes, and contact
  validation plus mocked provider success and HTTP 500 failure. No email was sent.
- No application JavaScript exceptions were captured. Fresh mobile loads create
  zero WebGL canvases and do not request desktop 3D/cursor modules.
- Screenshots of mobile and desktop sections were inspected. No physical-device
  or Safari/WebKit testing is claimed; these are Chromium viewport/touch checks.

Raw evidence: `reports/mobile-density-before.json`, `reports/mobile-layout-results.json`,
`reports/compact-browser-results.json`. Visuals: `reports/mobile-compact-page.png`,
`reports/mobile-compact-hero.png`, and `reports/mobile-compact-projects.png`.

## Final loading measurement

Lighthouse on this exact production build reports **94 mobile Performance**,
**2.0 s FCP**, **2.7 s LCP**, **0 ms TBT**, and **0 CLS** under default simulated
mobile throttling. Mobile initial decoded JavaScript is 367,973 bytes and no 3D
modules are requested. This remains above the 90-point goal; LCP is still above
the earlier 2.5 s target. Field INP and physical-device performance remain unverified.

Initial transferred resources are 293 KiB. The shorter document brings real project
screenshots closer to the viewport, so the browser's native lazy-loading threshold
now fetches those images earlier than in the preceding, much taller page. The
previous 95-point/231 KiB result describes that preceding layout, not this build.
No score was substituted or averaged. Full evidence is preserved in
`reports/compact-lighthouse.json` and `reports/compact-lighthouse-summary.json`.

## Reproduce

With the optional Playwright setup documented in README:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
# Run from another terminal:
npm run verify:mobile
npm run verify:production
```

The original performance pass and unchanged deployment/push instructions remain in
`PERFORMANCE_AUDIT.md`. Changes remain local; no commit, push, or deployment was made.
