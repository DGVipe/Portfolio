# CLAUDE.md

Guidance for Claude Code in this repository. Everything needed is in this file. Keep it short.

## 1. Know the Project

**One-page portfolio: Hero → About → Recent work → Contact, in English and Spanish.**

- Next.js 16 (App Router, Cache Components on), Tailwind v4 configured in CSS, shadcn/ui, `next-themes`, `sonner`, `lucide-react`. No backend; the contact form opens a `mailto:` link.
- Key files:
  - [`src/content/site.ts`](src/content/site.ts): all portfolio content (name, about, projects, socials)
  - [`src/lib/i18n/messages.ts`](src/lib/i18n/messages.ts): interface strings, `en` and `es`
  - [`src/app/layout.tsx`](src/app/layout.tsx): theme, locale cookie, `Suspense` + skeleton
  - [`src/components/page-skeleton.tsx`](src/components/page-skeleton.tsx): loading shell
  - [`src/components/site-controls.tsx`](src/components/site-controls.tsx): ES/EN button + theme switch
  - [`src/app/globals.css`](src/app/globals.css): theme tokens, `brand` color, `brand-gradient`, `grain`

## 2. Follow the Conventions

**Match what's already there.**

- **Content vs. interface text.** Portfolio content goes in `site.ts` as a `Text`: a plain string for both languages or `{ en, es }`. Buttons, labels, errors and ARIA text go in `messages.ts` under both `en` and `es`. In components: `const { t, tx } = useI18n()`, with `t.x` for interface strings and `tx(field)` for content.
- **Sections are client components** so the language switches live without a reload.
- **shadcn here is `radix-nova` (Radix), so `asChild` is correct.** This differs from the receipts project. Add primitives with `npx shadcn@latest add <name>` into `src/components/ui/`; don't hand-edit them. `cn` comes from the `cn` package via `@/lib/utils`.
- **Next.js 16 differs from older versions.** Before using a Next API, read its guide in `node_modules/next/dist/docs/` (see [`AGENTS.md`](AGENTS.md)).
- **Placeholders stay placeholders.** Descriptions are Lorem Ipsum and personal details are `Your Name` / `hello@example.com` until the user supplies real ones. Don't write bios or project descriptions, and don't fill in real personal data.

## 3. Ask Before Guessing

**Ambiguous request? Ask, don't assume.**

- If the request could reasonably mean two things, ask one short question that names the options.
- Ask when the answer changes what ships: which section, which layout, the wording in either language.
- Don't ask what the code already answers. Look it up first.
- When a small assumption is safe, make it and say so in your reply.

## 4. Keep It Simple and Surgical

**Minimum code that solves the request. Touch only what you must.**

- No features, abstractions or config beyond what was asked. If it could be half the code, rewrite it.
- Don't reformat, rename or "improve" neighboring code. Match the existing style.
- Remove only the imports and code that your own change left unused. Mention other dead code; don't delete it.
- Every changed line should trace back to the request.

## 5. Respect the Invariants

**These break things quietly if ignored.**

- Every interface string exists in both `en` and `es`. Never hardcode text in a component.
- Keep reads of `cookies()`, `headers()` and `new Date()` inside the `<Suspense fallback={<PageSkeleton />}>` in `layout.tsx`. Outside it, the Cache Components build fails.
- `PageSkeleton` mirrors the header and hero and has no text. If you change their layout, update it in the same change.
- Theme and language controls keep both states in the DOM and toggle them with CSS, so the server and client render the same thing. Read `resolvedTheme` only after mount. Don't add `disableTransitionOnChange`; it kills the switch animation.
- Server components can't pass functions to client components. Pass data, like the `titles` map.
- `target="_blank"` links need `rel="noopener noreferrer"`. Gate motion with `motion-safe:` / `motion-reduce:`.

## 6. Verify Before Done

**Define what "working" means, then check it.**

```bash
npx tsc --noEmit                      # always
npm run lint                          # always
npm run build                         # always; catches Cache Components errors
npx next start -p 3100                # then check UI changes in a browser
SKELETON_DELAY_MS=3000 npm run dev    # to inspect the loading skeleton
```

- For UI changes, check in Playwright at 1440px and 390px, in both languages and both themes, with no console errors.

---

**These guidelines are working if:** diffs stay small and in the right file, both languages and both themes keep working, the skeleton still matches the page, and checks pass before the work is reported done.
