# Implementation: PowerSell Marketing Landing Page

> Source plan: .cursor/plans/powersell_landing_7e28dbf4.plan.md

## 1. OBJECTIVE
**Primary Goal**: Build a concise light-mode Vite + React marketing site for PowerSell in this workspace, porting the reference app’s cream/viridian/charcoal design system into one editable token surface, with waitlist, How it Works, and FAQ — then polish the repo README via the git-repo-polish skill.

**Success Criteria**:
- [ ] `npm install && npm run dev` serves a light cream (`#F9F6EE`) page with viridian (`#40826D`) CTAs
- [ ] Sections present: Nav, Hero + waitlist CTA, How it Works (3 steps), Waitlist, FAQ, Footer
- [ ] Components use semantic token classes only (no scattered brand hex)
- [ ] Editing `--color-primary` in `tokens.css` updates accents site-wide
- [ ] Waitlist validates email, shows success/error, persists to `localStorage`
- [ ] README documents purpose, stack, run commands, and how to edit design tokens
- [ ] PowerSell app at `/Users/kaan/.superset/projects/PowerSell/` is not modified

## 2. CONTEXT
**Current State**: Workspace `/Users/kaan/Cursor/Cursor-Demo-July` is nearly empty (README title only, `.cursor/` rules/skills). No existing web app.

**Reference product**: `/Users/kaan/.superset/projects/PowerSell/` — Next.js 14 AI sales enablement app. Design tokens in `src/styles/globals.css`; marketing copy and How it Works in `src/pages/index.tsx`; favicon at `public/favicon.png`.

**Technology Stack**: Vite + React 18 + TypeScript + Tailwind CSS. Light mode only. No Next.js, auth, or workflow code.

**Project Structure** (target at repo root):
```
package.json, vite.config.ts, tsconfig.json, tailwind.config.ts, postcss.config.js
index.html
src/main.tsx, App.tsx, index.css
src/design-system/tokens.css, tokens.ts
src/components/{Nav,Hero,HowItWorks,WaitlistForm,Faq,Footer}.tsx
src/lib/waitlist.ts
public/favicon.png
```

**Constraints**:
- Match PowerSell visual language (cream canvas, viridian primary, charcoal text/footer, `0.5rem` radius)
- Concise page; one job per section
- Design system must be easy to edit via centralized tokens
- Do not invent backend waitlist APIs or modify PowerSell
- User prefers no affirmations in chat responses

## 3. REQUIREMENTS
**Functional**:
- Sticky nav with PowerSell wordmark, “AI Sales Enablement”, anchors to How it Works / Waitlist / FAQ
- Hero: brand-first PowerSell signal, headline “Supercharge Your Sales Process With AI”, one support sentence, email + Join Waitlist CTA; optional desktop skeleton mock matching PowerSell
- How it Works: Research & Analysis → Product Matching → Personalized Outreach (numbered viridian circles)
- Waitlist section with validation + localStorage persistence via `submitWaitlist(email)` helper (API-ready later)
- FAQ: 4–6 items covering product, audience, AI agents (Company Profiler, Pain Point Analyzer, Product Matcher, Outreach Generator), waitlist, high-level privacy
- Charcoal footer with “AI-powered sales enablement”

**Non-Functional**:
- Light mode only; mobile + desktop readable
- 2–3 light CSS motions (hero stagger, step hover, FAQ open)
- Semantic Tailwind mapped to CSS variables

**Technical Specs**:
- Tokens: canvas `#F9F6EE`, charcoal `#343434`, primary `#40826D`, hover `#366a59`, white `#FFFFFF`, radius `0.5rem`
- Font: distinctive sans (e.g. DM Sans), not Inter/Roboto/Arial
- Waitlist: client-side only; structure for future endpoint swap

## 4. IMPLEMENTATION APPROACH
**Strategy**: Scaffold Vite React TS + Tailwind at repo root → port tokens into `tokens.css`/`tokens.ts` → build section components on semantic classes → waitlist helper → visual polish → run git-repo-polish for README/foundation.

**Key Components**:
- `src/design-system/tokens.css` — editable CSS variables
- `src/design-system/tokens.ts` — copy, FAQ, waitlist strings, typed refs
- `src/components/*` — page sections
- `src/lib/waitlist.ts` — validate + localStorage

**Files to create**: listed in plan Key files section + `.gitignore`, improved `README.md`, optional `CONTRIBUTING.md` / `LICENSE` per polish skill judgment.

**Files to modify**: replace stub `README.md`

**Dependencies**: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `tailwindcss-animate` (optional)

**Skills to follow**:
1. Build landing per plan
2. Then read and follow `.claude/skills/git-repo-polish/SKILL.md` (and checklist/templates) with focus on README + light foundation (`.gitignore`, package metadata). Pass markdown through no-dash-copy-editor conventions. Do not invent features or security claims. Prefer README quality over a full OSS sweep.

## 5. VALIDATION
**Testing**: Manual — `npm run dev`; submit invalid/valid waitlist emails; resize mobile; change primary token and confirm propagation.
**Quality Checks**: Typecheck/build succeeds; no brand hex in components; README commands work from fresh clone.

## 6. TASK SEQUENCE
1. Scaffold Vite + React + TS + Tailwind at repo root; wire `index.css` to import `tokens.css`.
2. Create `src/design-system/tokens.css` and `tokens.ts` with PowerSell palette and marketing copy; map Tailwind in `tailwind.config.ts` to CSS variables only.
3. Build `Nav`, `Hero`, `HowItWorks`, `WaitlistForm`, `Faq`, `Footer`; compose in `App.tsx`.
4. Implement `src/lib/waitlist.ts` (validation + localStorage) and wire WaitlistForm success/error UI.
5. Copy favicon from PowerSell `public/favicon.png`; add light CSS motion; verify responsive layout and token propagation.
6. **Run git-repo-polish skill**: strengthen README (what/who, stack, quick start, design-token editing path); add `.gitignore` and other foundation docs as appropriate; style-pass markdown; verify docs match what was built.
