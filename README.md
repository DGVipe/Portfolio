[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](https://ui.shadcn.com/)

# Portfolio

My personal portfolio.

Built with Next.js 16, Tailwind CSS v4 and shadcn/ui.

**Status:** deployed at https://www.diegoalveal.com/

## Quick start

**Requirements:** Node 20.9+.

```bash
npm install
npm run dev
SKELETON_DELAY_MS=3000 npm run dev   # skeleton testing
```

## Editing content

- **Portfolio content** (name, about, skills, projects, socials) is in
  [`src/content/site.ts`](src/content/site.ts).
- **Interface text** (buttons, labels, errors, ARIA) is in
  [`src/lib/i18n/messages.ts`](src/lib/i18n/messages.ts).
- **Project screenshots** go in `public/projects/`.

## Deployment

Import the repo on [Vercel](https://vercel.com/new) and keep the default settings.

Set `url` in [`src/content/site.ts`](src/content/site.ts) to your production domain.

## License

[MIT](LICENSE) © 2026 Diego Alveal

The MIT License covers the source code only. Content in `src/content/` and `public/` is © 2026 Diego Alveal, all rights reserved, and may not be
reused without permission.
