# Portfolio

My personal one-page portfolio: Hero → About → Recent work → Contact, in English and Spanish,
with light and dark themes.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4 and shadcn/ui. There is
no backend: the contact form opens the visitor's email app with the message pre-filled.

**Status:** deployed at https://www.diegoalveal.com/

## Quick start

**Requirements:** Node 20.9+.

```bash
npm install
npm run dev                          # http://localhost:3000
SKELETON_DELAY_MS=3000 npm run dev   # keep the loading skeleton on screen to inspect it
```

## Editing content

- **Portfolio content** (name, about, skills, projects, socials) is in
  [`src/content/site.ts`](src/content/site.ts). Any text field takes a plain string for both
  languages, or `{ en, es }`.
- **Interface text** (buttons, labels, errors, ARIA) is in
  [`src/lib/i18n/messages.ts`](src/lib/i18n/messages.ts), under both `en` and `es`.
- **Project screenshots** go in `public/projects/`. Set `image` on the project to one path, or to
  `{ en, es }` for a screenshot per language. Without one, a gradient placeholder is shown.

## Deployment

Import the repo on [Vercel](https://vercel.com/new) and keep the default settings. No environment
variables are needed.

Set `url` in [`src/content/site.ts`](src/content/site.ts) to your production domain. The
canonical URL and the social preview image are built from it.

## License

[MIT](LICENSE) © 2026 Diego Alveal

The MIT License covers the source code only. Content in `src/content/` and `public/` (text,
photos, screenshots and CV files) is © 2026 Diego Alveal, all rights reserved, and may not be
reused without permission.
