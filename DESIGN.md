# flodlol.dev — Design System & Site Architecture

This document details everything about **flodlol.dev** (Jonas Meuleman's personal portfolio website), including its purpose, technology stack, visual design system, file structure, and implementation details.

---

## 1. Project Overview
- **Owner**: Jonas Meuleman (known online as **flodlol**).
- **Background**: Industrial Engineering student at KU Leuven building webapps, developer tooling, and productivity software.
- **Site Goal**: Personal portfolio showcasing selected active work (e.g., Study-Track, Hand-Outs), past projects (Statics NVM, Clowbie, Tag-Timeline), smaller Python tools, and a timeline of growth by building software.
- **URL**: [https://flodlol.dev](https://flodlol.dev)

---

## 2. Tech Stack & Dependencies
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19, TypeScript 5
- **Icons**: `@phosphor-icons/react` + Custom inline SVGs (`SkillLogo.tsx`)
- **Styling**: CSS Modules (`home.module.css`) + Global CSS variables (`globals.css`)
- **OG & Analytics**: Dynamic OpenGraph images (`next/og`) & Google Analytics (`G-9TSXZ3V92H`)
- **Custom Scripts**: `scripts/patch-next-css-hmr.mjs` for HMR stability in Next 16

---

## 3. Visual Design System

### Color Palette (Tokens in `src/styles/globals.css`)
| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--paper` | `#080808` | Primary dark background |
| `--surface` | `#0d0d0e` | Card & section container surface |
| `--surface-raised` | `#121214` | Modal & elevated element background |
| `--ink` | `#f2f2f0` | High-contrast text & titles |
| `--muted` | `#88888c` | Subtitles, dates, meta info |
| `--signal` | `#9dacff` | Soft periwinkle accent color |
| `--line` | `rgba(255, 255, 255, 0.12)` | Subtle glass borders & dividers |

### Glassmorphism & Atmospheric Effects
- **Aurora Light Streaks**: Created via `::before` & `::after` fixed pseudo-elements with `linear-gradient(116deg, ...)`, `filter: blur(44px) saturate(145%)`, and `mix-blend-mode: screen`.
- **Glass Containers**: Styled with backdrop blur (`backdrop-filter: blur(52px)`), 1px semi-transparent borders, and multi-stop diagonal linear-gradients (`linear-gradient(108deg, ...)`).
- **Transitions**: Smooth 160ms - 240ms hover states with subtle Y-axis elevation (`translateY(-2px)`).

---

## 4. Architecture & Content Schema

```
src/
├── app/
│   ├── api/github/stars/route.ts   # GitHub stargazers count proxy endpoint with 1h cache
│   ├── components/                 # UI Components
│   │   ├── BrowserWindow.tsx        # Styled simulated browser window frame
│   │   ├── ContactSection.tsx       # Email, Discord copy, social links
│   │   ├── GithubStarsButton.tsx    # Live stargazer badge fetching from API
│   │   ├── HeroTimeline.tsx         # Chronological vertical timeline
│   │   ├── ModalCarousel.tsx        # Touch & arrow screenshot gallery carousel
│   │   ├── PastProjectsSection.tsx  # Past projects & collapsible Python tools
│   │   ├── ProjectCards.tsx         # Card list + View Transition detail modal + Lightbox
│   │   ├── ProjectsSection.tsx      # Current active work section
│   │   ├── SkillLogo.tsx            # Custom SVG logos for technologies
│   │   └── TypingName.tsx           # Animated typewriter effect ("Jonas" / "flodlol")
│   ├── content/                    # Data Source of Truth (Typed TypeScript)
│   │   ├── projects.ts              # Projects data (cards, stack, modal blocks)
│   │   ├── skill-timeline.ts        # Historical timeline nodes
│   │   └── skills.ts                # Hero skills list
│   ├── layout.tsx                   # Metadata, SEO JSON-LD schema, GA script
│   ├── opengraph-image.tsx          # Dynamic OG image generator mirroring hero design
│   ├── page.tsx                     # Main single-page portfolio layout
│   ├── robots.ts & sitemap.ts       # SEO indexing rules
└── styles/
    ├── globals.css                  # Color variables, resets, selection & view-transitions
    └── pages/home.module.css        # Responsive CSS module for main page & components
```

---

## 5. Maintenance & Design Rules for Future Work
1. **No Tailwind CSS**: Keep all styles in CSS Modules (`home.module.css` or scoped module files).
2. **Content First**: Place project descriptions, links, logos, and screenshots in `src/app/content/projects.ts` rather than hardcoding in components.
3. **Preserve Micro-interactions**: Ensure all interactive elements feature hover states, keyboard accessibility, and respect `prefers-reduced-motion`.
4. **Follow Icon Conventions**: Use Phosphor Icons (`weight="regular"`) or SVG stroke icons consistent with `SkillLogo.tsx`.
