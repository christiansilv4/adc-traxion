# ADC Traxión Design System (`@adc/traxion-ui`)

Shared UI kit for ADC apps (Motor de Tracción and future products): **shadcn/ui** + **Tailwind v4** + ADC-branded shell.

| Role | What |
|------|------|
| **DS team** | Maintains this repo — components, tokens, styleguide |
| **App teams** (e.g. Neuforce) | Consume `@adc/traxion-ui` as a dependency — see [docs/CONSUMING.md](./docs/CONSUMING.md) |

## Styleguide (this repo)

```bash
npm install
npm run dev
```

Open [http://localhost:3000/styleguide](http://localhost:3000/styleguide).

Rules: [design.md](./design.md)

## Consume from another app

```bash
# in consumer package.json
"@adc/traxion-ui": "file:../adc-design-system"
```

Full integration: **[docs/CONSUMING.md](./docs/CONSUMING.md)**

## Package exports

- `styles/globals.css` — theme tokens
- `components/ui/*` — shadcn primitives
- `components/adc-traxion/*` — app shell, KPI patterns, nav
- `lib/utils`, `hooks/*`
