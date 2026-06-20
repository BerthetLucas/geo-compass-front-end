# UI Redesign — GEO Compass

**Date:** 2026-06-20
**Inspiration:** Unicorn Studio (minimal premium, editorial, intentional)
**Approach:** Token-first, then components. Layout unchanged.

---

## Goals

- Élever le look de générique shadcn → premium minimal
- Garder light/dark support
- Conserver vert comme couleur primaire, le raffiner
- Améliorer lisibilité des données (ranking, chiffres)
- Ajouter micro-interactions significatives

## Out of Scope

- Structure layout (sidebar + mobile nav)
- Nouvelles fonctionnalités
- Scroll-triggered animations
- Internationalisation

---

## Section 1 — Tokens Globaux

### Couleurs

Vert actuel trop désaturé (chroma 0.118). On monte vers emerald riche.

```css
/* Light mode */
--primary: oklch(0.50 0.19 162);
--primary-foreground: oklch(0.98 0.02 162);
--background: oklch(0.99 0 0);
--card: oklch(0.97 0.003 162);          /* léger tint vert */
--card-foreground: oklch(0.10 0 0);
--border: oklch(0.88 0.008 162);        /* hint vert subtil */
--muted: oklch(0.95 0.003 162);
--muted-foreground: oklch(0.48 0 0);

/* Dark mode */
--background: oklch(0.08 0.005 240);    /* near-black, légèrement bleu-froid */
--card: oklch(0.12 0.006 240);
--primary: oklch(0.68 0.19 162);        /* emerald plus vif */
--border: oklch(1 0 0 / 8%);
--muted: oklch(0.15 0.004 240);
```

### Typographie

Passer de fonts système vers Google Fonts via `next/font`:

| Rôle | Font | Usage |
|------|------|-------|
| Heading | Plus Jakarta Sans | Titres de page, noms de marques, rang |
| Body | Inter | Labels, paragraphes, UI |
| Mono | JetBrains Mono | Chiffres de ranking, compteurs |

Configuration dans `app/[locale]/layout.tsx` + variables CSS `--font-sans`, `--font-heading`, `--font-mono`.

### Radius

`0.45rem` → `0.625rem`

Cards plus rondes, look plus premium. Mise à jour de `--radius` uniquement, les ratios relatifs (`--radius-sm`, `--radius-md`, etc.) suivent automatiquement.

### Shadows

Ajout de shadow custom sur cards en light mode :

```css
--shadow-card: 0 1px 3px oklch(0 0 0 / 0.06), 0 4px 12px oklch(0 0 0 / 0.04);
--shadow-card-hover: 0 4px 8px oklch(0 0 0 / 0.08), 0 12px 24px oklch(0 0 0 / 0.06);
```

En dark mode, les shadows sont remplacées par des bordures légèrement plus visibles (déjà géré par `--border`).

---

## Section 2 — Composants

### Sidebar (`components/layout/app-menu.tsx`)

- **Logo** : icône `Hexagon` avec couleur primary + légère glow en dark (`drop-shadow-[0_0_6px_oklch(0.68_0.19_162/_0.5)]`)
- **Nav items actifs** : remplacer le bg pill shadcn par `border-l-2 border-primary bg-primary/8 text-primary`
- **Nav items hover** : micro-slide de l'icône (+2px translateX) via motion
- **Footer** : séparateur `<Separator />` au-dessus du sign-out

### Ranking Cards (`components/dashboard/daily-brand-rank-card.tsx`)

- **Shadow** : appliquer `var(--shadow-card)` + `var(--shadow-card-hover)` au hover
- **Hover** : `-translate-y-1` (au lieu de `-translate-y-0.5`)
- **Badge rank #1** : ring + subtle glow en dark (`shadow-[0_0_12px_var(--primary)/40]`)
- **Progress bar** : animer de 0% → valeur au mount avec motion (`animate={{ width: share }}`)
- **Chiffre mentions** : `text-xl` (au lieu de `text-base`), plus prominent

### Tabs Dashboard (`components/dashboard/ranking-tabs.tsx`)

- **TabsList** : fond transparent + `border-b border-border` (style underline editorial)
- **TabsTrigger** : `pb-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary`
- **Transition content** : `AnimatePresence` + fade cross sur changement de tab

### Auth Forms (`components/auth/auth-form/auth-form.tsx`, `register-form.tsx`)

- Card centrée avec `box-shadow: var(--shadow-card)` en light
- Champ focus : ring primary `ring-primary/50` plus visible
- Bouton submit : fond primary plein avec hover `hover:brightness-110`

### Prompt Cards (`components/prompts/prompt-card.tsx`)

- Même traitement shadow que ranking cards
- Hover : `-translate-y-0.5` + shadow hover

---

## Section 3 — Animations

### Existant à affiner

| Élément | Changement |
|---------|-----------|
| `fadeUp` easing | `[0.25, 0.46, 0.45, 0.94]` (plus snappy) |
| Hover cards | Spring motion (`type: "spring", stiffness: 300, damping: 20`) |

### Nouveau

| Élément | Animation |
|---------|-----------|
| Progress bar ranking | `motion.div` animate `width` de 0 → valeur, `delay` par rank |
| Tab content | `AnimatePresence` mode `wait` + `opacity` 0→1 |
| Sidebar nav icon hover | `whileHover={{ x: 2 }}` via `motion.span` |

### Ce qu'on ne touche pas

- Pas de scroll-triggered animations
- Pas d'entrées de page complexes
- Pas de skeleton redesign

---

## Fichiers Impactés

| Fichier | Type de changement |
|---------|--------------------|
| `app/globals.css` | Tokens couleurs, shadows, variables |
| `app/[locale]/layout.tsx` | Import fonts next/font |
| `components/layout/app-menu.tsx` | Nav active style, logo glow, motion icon |
| `components/dashboard/daily-brand-rank-card.tsx` | Shadow, hover, progress animation, badge glow |
| `components/dashboard/ranking-tabs.tsx` | Tabs underline style, AnimatePresence |
| `components/auth/auth-form/auth-form.tsx` | Card shadow, ring focus |
| `components/auth/register-form/register-form.tsx` | Card shadow, ring focus |
| `components/prompts/prompt-card.tsx` | Shadow, hover |
| `lib/motion.ts` | Affiner easing, ajouter variants |
