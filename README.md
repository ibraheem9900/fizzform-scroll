# FIZZFORM — Scroll-driven can launch page

A premium React + Tailwind landing page for FIZZFORM sparkling botanical soda. The experience is designed around a scroll-linked product reveal: the hero can enters from below, grows, rotates, shifts into focus, and reveals its label as the visitor scrolls.

## Highlights

- Sticky 300vh hero with scroll-progress choreography
- Generated 3D condensation-covered can render
- Responsive navigation and mobile menu
- Ritual, ingredients, flavor selector, and starter-pack sections
- Flavor tabs with live panel updates
- Reduced-motion support and visible keyboard focus states

## Local development

```bash
pnpm install
pnpm dev
```

The app is a static Vite + React frontend. The generated can is served from WebDev-managed storage and referenced in `client/src/pages/Home.tsx`.

## Branch flow

- `main` — production-ready merged branch
- `feat/scroll-motion-site` — implementation branch for the scroll-driven experience

## Brand direction

The visual system uses a high-contrast tomato red / warm cream palette with acid-lime accents, Space Grotesk display type, and DM Mono metadata to make the site feel editorial, energetic, and tactile.
