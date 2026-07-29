# Consuming @adc/traxion-ui

This repo is **two things**:

1. **Publishable package** `@adc/traxion-ui` — components, shell, theme (for apps like `neuforce-app-platform`).
2. **Styleguide app** — Next.js demo (`npm run dev`) — unchanged workflow for the DS team.

Neuforce and other ADC apps **import the package**; they do **not** fork or edit component source in their repos.

---

## Install (local monorepo)

In the consumer `package.json`:

```json
{
  "dependencies": {
    "@adc/traxion-ui": "file:../adc-design-system"
  }
}
```

Pin git consumers with a tag or SHA:

```json
"@adc/traxion-ui": "github:christiansilv4/adc-traxion#v0.1.0"
```

---

## Next.js consumer setup

### 1. `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@adc/traxion-ui"],
};

export default nextConfig;
```

### 2. `tsconfig.json` paths

So `@/` inside DS source resolves when transpiled:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@adc/traxion-ui/*": ["../adc-design-system/*"]
    }
  }
}
```

Adjust the relative path to match your layout.

### 3. Theme CSS

In the consumer root layout:

```tsx
import "@adc/traxion-ui/styles/globals.css";
```

Consumer must use **Tailwind v4** + PostCSS like this repo (`@tailwindcss/postcss`).

### 4. Import components

```tsx
import { Button } from "@adc/traxion-ui/components/ui/button";
import { AppSidebar } from "@adc/traxion-ui/components/adc-traxion/app-sidebar";
import { cn } from "@adc/traxion-ui/lib/utils";
```

### 5. Fonts

Copy font setup from `app/layout.tsx` in this repo (Geist / variables) or align with your app.

---

## Export map

| Import | Content |
|--------|---------|
| `@adc/traxion-ui/styles/globals.css` | Design tokens + Tailwind theme |
| `@adc/traxion-ui/components/ui/*` | shadcn primitives |
| `@adc/traxion-ui/components/adc-traxion/*` | ADC shell (sidebar, header, KPI patterns) |
| `@adc/traxion-ui/lib/utils` | `cn()` helper |
| `@adc/traxion-ui/hooks/*` | Shared hooks |

---

## Versioning

- Bump `@adc/traxion-ui` semver on breaking token or component API changes.
- Consumers pin explicit versions; do not track `main` in production.

---

## Missing a component?

Open a PR or ticket **in this repo** (`adc-design-system`). Do not duplicate primitives in consumer apps.
