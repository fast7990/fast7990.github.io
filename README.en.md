# Online Tools Collection

An online tools website built with Vue 3 + Vite, offering a variety of practical tools and fun frontend experiments, plus a few standalone static pages. Everything runs entirely in the browser — no backend server required.

> Live site: [https://fast7990.github.io/](https://fast7990.github.io/) · [中文文档](./README.md)

## Practical Tools

| Tool | Description | Path |
|------|-------------|------|
| JSON Formatter | Format, minify, and validate JSON data | [#/json-formatter](https://fast7990.github.io/#/json-formatter) |
| Image to Base64 | Convert images to Base64 encoding, with drag & drop upload | [#/image-to-base64](https://fast7990.github.io/#/image-to-base64) |
| QR Code Generator | Generate customizable QR codes, downloadable | [#/qrcode-generator](https://fast7990.github.io/#/qrcode-generator) |
| Markdown Preview | Edit and preview Markdown documents in real time | [#/markdown-preview](https://fast7990.github.io/#/markdown-preview) |
| LifeMap | Record life's important places and journeys on a map | [page/lifemap/](https://fast7990.github.io/page/lifemap/) |
| 3D Solar System | Interactive 3D solar system with camera control and time-speed adjustment | [page/earth3d/](https://fast7990.github.io/page/earth3d/) |

LifeMap and the 3D Solar System are standalone static pages under `page/`, independent of the main app.

## Fun Experiments

Entry: [#/experiments](https://fast7990.github.io/#/experiments)

| Experiment | Description | Path |
|------------|-------------|------|
| Particle Collision | Explore physical collision effects in a particle system | [#/experiments/particle-collision](https://fast7990.github.io/#/experiments/particle-collision) |
| Gradient Generator | Randomly generate beautiful gradient color schemes, exportable as CSS | [#/experiments/gradient-generator](https://fast7990.github.io/#/experiments/gradient-generator) |
| Audio Visualizer | Visualize audio waveforms with cool music spectrum effects | [#/experiments/audio-visualizer](https://fast7990.github.io/#/experiments/audio-visualizer) |
| 3D Rotating Cube | A rotating cube built with CSS 3D transforms | [#/experiments/3d-cube](https://fast7990.github.io/#/experiments/3d-cube) |
| Wave Animation | Smooth wave effects using SVG path animation | [#/experiments/wave-animation](https://fast7990.github.io/#/experiments/wave-animation) |
| Starry Night | Dynamic starry background with twinkling and moving stars | [#/experiments/starry-night](https://fast7990.github.io/#/experiments/starry-night) |

## Visual Design

- Dark theme with neon gradient style
- Full-screen particle background animation
- Glassmorphism containers
- Responsive design for desktop, tablet, and mobile

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 5
- **Routing**: Vue Router 4 (hash mode, ideal for static GitHub Pages deployment)
- **Particles**: tsparticles
- **QR Code**: qrcode
- **Markdown**: markdown-it
- **Styling**: CSS3 + CSS Variables

## Quick Start

```bash
# Enter the source directory
cd web

# Install dependencies
npm install

# Development server (http://localhost:5173 by default)
npm run dev

# Production build (output is copied to the repo root automatically)
npm run build

# Preview the build (http://localhost:4173 by default)
npm run preview
```

## Project Structure

```
.
├── web/                        # Main app frontend source
│   ├── src/
│   │   ├── components/         # Shared components (navbar, particles bg, tool card, glass container)
│   │   ├── views/              # Page views
│   │   │   ├── Home.vue        # Home page
│   │   │   ├── About.vue       # About page
│   │   │   ├── Experiments.vue # Experiments entry page
│   │   │   └── experiments/    # Individual experiment pages
│   │   ├── composables/        # Composables (clipboard, responsive breakpoints)
│   │   ├── router/             # Route configuration
│   │   ├── assets/             # Static assets and styles
│   │   ├── App.vue             # Root component
│   │   └── main.js             # Entry file
│   ├── scripts/
│   │   └── post-build.mjs      # Post-build script (copies output to repo root)
│   ├── vite.config.js
│   └── package.json
├── page/                       # Standalone static pages (build output)
│   ├── lifemap/                # LifeMap
│   └── earth3d/                # Interactive 3D Solar System
├── assets/                     # Main app build output (JS/CSS)
├── index.html                  # Main app entry (GitHub Pages homepage)
├── test-demo/                  # Technical spikes and experimental demos
├── README.md                   # Chinese documentation
└── README.en.md                # English documentation
```

## Deployment

The site is deployed via GitHub Pages:

1. Run `npm run build` inside `web/`
2. Build output (`index.html` and `assets/`) is copied to the repo root by `scripts/post-build.mjs`
3. Push the repo root contents to GitHub, and GitHub Pages publishes the site

Routing uses hash mode (`#/xxx`), so no server-side rewrite rules are needed — refreshing any sub-page will not return 404.

## Notes

1. All tools run entirely in the browser; no data is uploaded to any server
2. `assets/` and the root `index.html` are build artifacts — do not edit them manually; make changes in `web/src/`
3. Dark mode supported; visuals look best on a dark background

## Contact

For feedback or suggestions, email: fast7990@outlook.com
