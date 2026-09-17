# Shashank Sheelavantar — Developer Portfolio

An interactive, data-driven developer portfolio built with React, Vite, Tailwind CSS, and React Three Fiber.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check it
```

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Vite. No config needed.
3. Done — no environment variables are required for the site to work.

## What's real vs. what's a placeholder

Per the brief, nothing is invented:

- **Experience** (`src/data/experience.js`): Algorithm365 is listed with placeholder role/dates/description — replace with the real details.
- **Certifications** (`src/data/certifications.js`): empty until real certificates are added, in the documented shape.
- **GitHub stats** (`src/data/devStats.js` + `src/hooks/useGithubStats.js`): shown as `—` until wired to the real GitHub API (the fetch call is written in a comment in the hook, ready to uncomment/adapt).
- **LeetCode stats**: same pattern (`useLeetcodeStats.js`) — LeetCode has no official public API, so this is a seam for a proxy/scraper later.
- **Project links** (`src/data/projects.js`): `links.demo` / `links.github` are `null` and render as disabled "coming soon" — fill in real URLs once available.
- **Resume**: `profile.resumeUrl` points to `/resume.pdf`. Add your actual resume PDF to `public/resume.pdf` — the Download/View Resume buttons already link there.
- **Education** (`src/data/profile.js`): placeholder — add your real degree/institution.

## Where things live (data-driven content)

```
src/data/
├── profile.js         name, role, intro, email, GitHub/LinkedIn, resume path
├── skills.js           skill categories + the technology-cloud list
├── experience.js       Algorithm365 entry + the 3-milestone career timeline
├── projects.js         InternHub / Study Buddy / ProjectHub + case-study copy
├── certifications.js   empty — add real certificates here
├── devStats.js          GitHub/LeetCode placeholder structures
└── dsa.js                sorting/searching/graph algorithms, complexities, code
```

Edit these files to change any content — components read from them rather than hardcoding text.

## 3D scenes vs. CSS-3D sections — a note on scope

Real React Three Fiber (actual WebGL) is used for the two places 3D adds the most value:

- **Hero developer workspace** (`src/scenes/DeveloperDesk.jsx`) — click the monitor, laptop, keyboard, coffee cup, phone, books, terminal, or GitHub object to jump to that section.
- **Technology cloud** (`src/scenes/TechnologyScene.jsx`) — floating, clickable tech nodes.

The career timeline, project cards, and backend architecture diagram use CSS 3D transforms (`perspective`/`rotateX`/`rotateY`) and animated SVG instead of full Three.js scenes. This was a deliberate call: those sections are about reading content quickly, and a lighter interactive treatment keeps the site fast and reliable rather than adding more WebGL scenes (with their own cameras/lighting/GPU cost) for content that doesn't need it. Both `src/scenes/` (real 3D) and the CSS-3D components are wired for the same click-to-explore interactions described in the brief.

If you'd like any of those turned into full Three.js scenes instead, the data (`careerTimeline`, `projects`) is already shaped to drop into a scene component the same way `techCloud` does.

## Performance & accessibility checklist (implemented)

- 3D scenes are behind `React.lazy` + `Suspense`, so Three.js only loads when a scene actually mounts (confirmed via `npm run build` — the 3D bundle is a separate ~900KB chunk, not part of the ~340KB main bundle).
- `useWebGLSupport()` detects missing WebGL and swaps in a static SVG illustration / list fallback — navigation never depends on 3D rendering.
- Custom cursor, magnetic buttons, and camera auto-rotation are all disabled under `prefers-reduced-motion` and on touch-only devices (`pointer: fine` media query).
- Cursor trail uses a fixed pool of DOM nodes (no per-frame element creation) and all animation is `requestAnimationFrame` + `transform`-only.
- Keyboard navigation, `aria-label`s, and focus-visible outlines are present on interactive controls (nav, theme toggle, mobile menu, DSA controls, dialogs).
- Mobile: 3D canvases render at `dpr: 1` with antialiasing/shadows disabled below the `768px` breakpoint.

## Tech stack

React 19, Vite, Tailwind CSS, React Router, React Three Fiber + drei, Three.js, Lucide React icons (GitHub/LinkedIn icons are hand-drawn SVGs since the installed lucide-react version no longer ships brand glyphs).
