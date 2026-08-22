# Rymn Hub ✦ Personal Portfolio

A modern, fast, dark-premium personal hub. This project is the main entry
point (`rymn.me`) that routes visitors to dedicated, specialised portfolios
(development, design, motion & branding).

## Tech Stack

- **Framework:** React 19 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** lucide-react

## Local Development

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

## Project Structure

```
src/
  components/   UI building blocks (Header, Hero, GatewayCard, ...)
  data/         Content — edit gateways.ts to change portfolio links/copy
  types/        Shared TypeScript interfaces
  lib/          Small shared utilities (easing, etc.)
```

To point the gateway cards at your real portfolio subdomains, edit the
`url` fields in `src/data/gateways.ts`.

## Build for Production (FTP deployment)

```
npm run build
```

This type-checks the project and outputs a fully static site into `dist/`.
Vite is configured with `base: './'` so every asset reference is relative —
the contents of `dist/` can be uploaded as-is via FTP to the root of the
`rymn.me` domain (or any subfolder) with no additional configuration.

1. Run `npm run build`
2. Upload the entire contents of `dist/` (not the folder itself) to your
   web root via FTP
3. Point `rymn.me` at that directory — done

## Preview the production build locally

```
npm run preview
```
