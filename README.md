# PowerSell Landing

Marketing waitlist site for PowerSell, an AI sales enablement product. A dark landing page: hero with an agent pipeline preview, a three step How it Works section, an FAQ, and a waitlist signup that stores emails in the browser until a backend exists.

The visual language uses a pure-black canvas with lifted viridian accents and near-white text. Every brand decision lives in one editable token file; the main page opts into dark tokens via `html.dark`.

## Stack

- [Vite](https://vitejs.dev/) with React 18 and TypeScript
- Tailwind CSS mapped to CSS variables, no raw brand hex in components
- No backend; waitlist signups persist to `localStorage`

## Quick start

```bash
npm install
npm run dev      # serves http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
```

## Adding a page

Every root-level `.html` file is a page — no config edits needed. A page is two files:

1. `<name>.html` — copy of `index.html` with a new `<title>` and the script src pointed at `/src/pages/<name>.tsx`
2. `src/pages/<name>.tsx` — `mountPage(<PageShell>…</PageShell>)` using design-system token classes only

Scaffold one with `npm run page:new -- pricing "Pricing"`. The build emits `dist/manifest.json` listing all pages; `npm run listen` runs the local watcher that streams Vercel deploy logs and auto-opens newly deployed pages in the browser.

## Editing the design system

All visual tokens live in `src/design-system/tokens.css`. Change a value there and it propagates site wide through the Tailwind mapping in `tailwind.config.ts`.

```css
--color-primary: #40826d;   /* CTAs, accents, step numbers (light) */
--color-canvas: #f9f6ee;    /* page background (light) */
--color-foreground: #343434; /* headings, footer (light) */
--radius: 0.5rem;
```

Dark mode overrides live under `.dark` in the same file (pure black canvas, lifted primary). Pages opt in with `class="dark"` on `<html>` (see `index.html` and `dark.html`).

Tints (soft circles, section bands, borders) derive from `--color-primary` with `color-mix`, so a single edit rebrands the accents everywhere.

Page copy, the How it Works steps, the hero agent pipeline, and FAQ content live in `src/design-system/tokens.ts` next to the visual tokens.

## Project layout

```
src/
  design-system/   tokens.css (visual) + tokens.ts (content)
  components/      Nav, Hero, HowItWorks, WaitlistForm, Waitlist, Faq, Footer
  lib/waitlist.ts  email validation + localStorage store
```

`src/lib/waitlist.ts` exposes `submitWaitlist(email)` with a stable result contract, ready to swap for an API call later.

## Reference

The product app this site markets lives at `/Users/kaan/.superset/projects/PowerSell/` (read only reference for tokens and copy; this repo never modifies it).
