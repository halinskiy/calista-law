# Calista Law

Site for a law firm advising designers on the UK Global Talent visa.

Concept site. The firm is fictional; the immigration facts are not. Every figure and rule in
`src/content/visa.ts` was checked against primary sources in July 2026 (Statement of Changes HC 1691,
caseworker guidance v18.0, the Home Office fees table) and the page carries a verification date.
Nothing here is legal advice.

## Stack

- Vite + React + TypeScript
- three.js via react-three-fiber for the hero field and the fork transition
- Lenis for smooth scroll, driven from the GSAP ticker so scroll-linked work runs in one tick

## Architecture

The heavy scene lives only on the home page. Every informational route is plain DOM and is lazy
loaded, so `three` never enters their import graph — a visitor reading the criteria pays for React
and nothing else. `vite.config.ts` splits the `webgl` chunk to keep that honest.

Motion is one protocol: `src/lib/motion.ts` animates plain numbers (`fit()`, springs), and those
numbers are poured into transforms or shader uniforms. Nothing animates the DOM directly.

The fork transition reads `getBoundingClientRect()` of empty anchor divs every frame and places
particles into them. Layout owns the geometry, the scene owns the pixels. Targets that move with
scroll are never sprung toward — a spring chasing a scroll-driven target always lags and judders.

## Development

```bash
pnpm install
pnpm dev
pnpm build
node shoot.mjs   # screenshots to ~/Desktop/calista-law-screenshots
```

Pushes to `main` deploy to GitHub Pages via Actions.
