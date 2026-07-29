# Agents — ADC Traxión Design System

## What this repo is

**`@adc/traxion-ui`** — shared design system for ADC apps (Motor de Tracción and future products).

| In this repo | Elsewhere |
|--------------|-----------|
| shadcn `components/ui`, ADC shell `components/adc-traxion`, tokens `styles/globals.css`, styleguide app | App logic, domains, APIs (e.g. `neuforce-app-platform`) |

## Rules (DS team)

1. Components live here; app teams **consume** via npm/git — see [docs/CONSUMING.md](./docs/CONSUMING.md).
2. Use shadcn `components/ui` only; brand pieces under `components/adc-traxion/`.
3. **Never hardcode colors** — CSS variables in `styles/globals.css` only.
4. Bump **semver** in `package.json` when exports or component APIs change.
5. Styleguide must stay green: `npm run dev`, `npm run build`.

## Docs

- Integration for app teams: [docs/CONSUMING.md](./docs/CONSUMING.md)
- Brand rules: [design.md](./design.md)

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
