# UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade GEO Compass from generic shadcn defaults to a premium minimal aesthetic — refined emerald palette, editorial typography, elevated components, and intentional micro-interactions.

**Architecture:** Token-first (globals.css → layout.tsx fonts → lib/motion.ts), then component-by-component. No new files created. No layout structure changes.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, shadcn/ui, Framer Motion (`motion` package), next/font/google.

## Global Constraints

- Layout structure (sidebar + mobile nav) must not change.
- No new dependencies — only packages already in package.json.
- Light/dark mode must both work correctly after each task.
- TypeScript must compile (`npm run typecheck`) after each task.
- `motion` is imported from `"motion/react"` (not `"framer-motion"`).

---

### Task 1: Global Color Tokens + Shadows + Radius

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS custom properties consumed by all subsequent tasks.

- [ ] **Step 1: Replace light mode color tokens**

In `app/globals.css`, replace the entire `:root` block with:

```css
:root {
  --background: oklch(0.99 0 0);
  --foreground: oklch(0.10 0 0);
  --card: oklch(0.97 0.003 162);
  --card-foreground: oklch(0.10 0 0);
  --popover: oklch(0.97 0.003 162);
  --popover-foreground: oklch(0.10 0 0);
  --primary: oklch(0.50 0.19 162);
  --primary-foreground: oklch(0.98 0.02 162);
  --secondary: oklch(0.93 0.006 162);
  --secondary-foreground: oklch(0.20 0.01 162);
  --muted: oklch(0.95 0.003 162);
  --muted-foreground: oklch(0.48 0 0);
  --accent: oklch(0.50 0.19 162);
  --accent-foreground: oklch(0.98 0.02 162);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.88 0.008 162);
  --input: oklch(0.88 0.008 162);
  --ring: oklch(0.50 0.19 162);
  --chart-1: oklch(0.845 0.143 164.978);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.596 0.145 163.225);
  --chart-4: oklch(0.508 0.118 165.612);
  --chart-5: oklch(0.432 0.095 166.913);
  --brand-openai: oklch(0.55 0.19 240);
  --brand-anthropic: oklch(0.63 0.17 60);
  --brand-google: oklch(0.57 0.22 25);
  --brand-meta: oklch(0.55 0.19 290);
  --brand-mistral: oklch(0.58 0.15 195);
  --radius: 0.625rem;
  --sidebar: oklch(0.97 0.003 162);
  --sidebar-foreground: oklch(0.10 0 0);
  --sidebar-primary: oklch(0.50 0.19 162);
  --sidebar-primary-foreground: oklch(0.98 0.02 162);
  --sidebar-accent: oklch(0.92 0.008 162);
  --sidebar-accent-foreground: oklch(0.20 0.01 162);
  --sidebar-border: oklch(0.88 0.008 162);
  --sidebar-ring: oklch(0.50 0.19 162);
  --shadow-card: 0 1px 3px oklch(0 0 0 / 0.06), 0 4px 12px oklch(0 0 0 / 0.04);
  --shadow-card-hover: 0 4px 8px oklch(0 0 0 / 0.08), 0 12px 24px oklch(0 0 0 / 0.06);
}
```

- [ ] **Step 2: Replace dark mode color tokens**

In `app/globals.css`, replace the entire `.dark` block with:

```css
.dark {
  --background: oklch(0.08 0.005 240);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.12 0.006 240);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.12 0.006 240);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.68 0.19 162);
  --primary-foreground: oklch(0.08 0.01 162);
  --secondary: oklch(0.18 0.008 240);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.15 0.004 240);
  --muted-foreground: oklch(0.65 0 0);
  --accent: oklch(0.68 0.19 162);
  --accent-foreground: oklch(0.08 0.01 162);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.68 0.19 162);
  --chart-1: oklch(0.845 0.143 164.978);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.596 0.145 163.225);
  --chart-4: oklch(0.508 0.118 165.612);
  --chart-5: oklch(0.432 0.095 166.913);
  --brand-openai: oklch(0.70 0.17 240);
  --brand-anthropic: oklch(0.78 0.15 60);
  --brand-google: oklch(0.72 0.20 25);
  --brand-meta: oklch(0.70 0.17 290);
  --brand-mistral: oklch(0.73 0.13 195);
  --sidebar: oklch(0.10 0.006 240);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.68 0.19 162);
  --sidebar-primary-foreground: oklch(0.08 0.01 162);
  --sidebar-accent: oklch(0.68 0.19 162 / 0.12);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 8%);
  --sidebar-ring: oklch(0.68 0.19 162);
  --shadow-card: none;
  --shadow-card-hover: none;
}
```

- [ ] **Step 3: Add shadow and font-mono to @theme inline**

In `app/globals.css`, inside the `@theme inline` block, add these lines immediately after `--font-heading: var(--font-heading);`:

```css
  --font-mono: var(--font-mono);
  --shadow-card: var(--shadow-card);
  --shadow-card-hover: var(--shadow-card-hover);
```

- [ ] **Step 4: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "style: refine color tokens — emerald primary, deeper dark, card shadows"
```

---

### Task 2: Typography — Swap Google Fonts

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `--font-heading`, `--font-sans`, `--font-mono` CSS variables from Task 1.
- Produces: `Plus_Jakarta_Sans` as heading, `Inter` as body, `JetBrains_Mono` as mono.

- [ ] **Step 1: Replace font imports and configuration**

Replace the entire font section at the top of `app/[locale]/layout.tsx`:

```tsx
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google"
```

Remove these lines:
```tsx
import { Geist, Geist_Mono, Roboto } from "next/font/google"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })
const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
```

Replace with:
```tsx
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
})
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})
```

- [ ] **Step 2: Update className on `<html>`**

Replace the className on the `<html>` element:

```tsx
className={cn(
  "antialiased",
  jetbrainsMono.variable,
  "font-sans",
  inter.variable,
  plusJakarta.variable
)}
```

- [ ] **Step 3: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "style: swap fonts — Plus Jakarta Sans heading, Inter body, JetBrains Mono"
```

---

### Task 3: Motion Variants

**Files:**
- Modify: `lib/motion.ts`

**Interfaces:**
- Produces:
  - `EASE_SNAPPY: readonly number[]` — used in `fadeUp`
  - `fadeUp` — existing, updated easing
  - `stagger` — existing, unchanged
  - `tabFade` — new variant for AnimatePresence tab transitions
  - `cardHoverSpring` — new spring config for card hover

- [ ] **Step 1: Update motion.ts**

Replace the entire content of `lib/motion.ts`:

```ts
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_SNAPPY = [0.25, 0.46, 0.45, 0.94] as const
export const EASE_IN = [0.4, 0, 1, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_SNAPPY },
  },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const tabFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15, ease: EASE_SNAPPY } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
}

export const cardHoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "style: update motion variants — snappy easing, tab fade, card spring"
```

---

### Task 4: Ranking Cards

**Files:**
- Modify: `components/dashboard/daily-brand-rank-card.tsx`

**Interfaces:**
- Consumes: `--shadow-card`, `--shadow-card-hover` from Task 1. `cardHoverSpring` from Task 3.

- [ ] **Step 1: Update DailyBrandRankCard**

Replace the entire content of `components/dashboard/daily-brand-rank-card.tsx`:

```tsx
"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cardHoverSpring } from "@/lib/motion"

interface DailyBrandRankCardProps {
  rank: number
  brandName: string
  mentionsNbr: number
  maxMentions: number
}

const RANK_ACCENT: Record<number, string> = {
  1: "bg-primary text-primary-foreground ring-primary/30",
  2: "bg-primary/70 text-primary-foreground ring-primary/20",
  3: "bg-primary/45 text-primary-foreground ring-primary/15",
}

const RANK_GLOW: Record<number, string> = {
  1: "dark:shadow-[0_0_12px_oklch(0.68_0.19_162_/_0.35)]",
}

export const DailyBrandRankCard = ({
  rank,
  brandName,
  mentionsNbr,
  maxMentions,
}: DailyBrandRankCardProps) => {
  const t = useTranslations("dashboard")
  const share = maxMentions > 0 ? (mentionsNbr / maxMentions) * 100 : 0
  const accent =
    RANK_ACCENT[rank] ?? "bg-muted text-muted-foreground ring-border"
  const glow = RANK_GLOW[rank] ?? ""

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={cardHoverSpring}
    >
      <Card
        className="group relative flex w-full flex-row items-center gap-4 overflow-hidden p-4 transition-shadow duration-300"
        style={{
          boxShadow: "var(--shadow-card)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card)"
        }}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md font-heading text-sm font-semibold tabular-nums ring-1",
            accent,
            glow
          )}
        >
          {rank}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="truncate font-heading text-sm font-medium">
            {brandName}
          </span>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-primary/60 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${share}%` }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: rank * 0.05 }}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="font-mono text-xl font-semibold tabular-nums">
            {mentionsNbr}
          </span>
          <span className="text-xs text-muted-foreground">{t("mentionsLabel")}</span>
        </div>
      </Card>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/daily-brand-rank-card.tsx
git commit -m "style: elevate ranking cards — shadow, spring hover, animated progress bar, rank glow"
```

---

### Task 5: Dashboard Tabs — Underline Style + AnimatePresence

**Files:**
- Modify: `components/dashboard/ranking-tabs.tsx`

**Interfaces:**
- Consumes: `tabFade` from Task 3.

- [ ] **Step 1: Update RankingTabs with controlled state and AnimatePresence**

Replace the entire content of `components/dashboard/ranking-tabs.tsx`:

```tsx
"use client"

import { useState, Suspense } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyRankingList } from "./daily-ranking-list"
import { ModelRankingList } from "./model-ranking-list"
import { DailyRankingListSkeleton } from "./daily-ranking-list-skeleton"
import { useGetAvailableModelsSuspenseQuery } from "@/hooks/queries/useGetAvailableModels"
import { useTranslations } from "next-intl"
import { tabFade } from "@/lib/motion"

export const RankingTabs = () => {
  const { data: models } = useGetAvailableModelsSuspenseQuery()
  const t = useTranslations("dashboard")
  const [tab, setTab] = useState("global")

  return (
    <Tabs value={tab} onValueChange={setTab} className="mx-10">
      <TabsList className="mb-6 h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="global"
          className="rounded-none border-b-2 border-transparent pb-3 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
        >
          {t("global")}
        </TabsTrigger>
        {models.map((model) => (
          <TabsTrigger
            key={model}
            value={model}
            className="rounded-none border-b-2 border-transparent pb-3 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            {model}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        <motion.div key={tab} {...tabFade}>
          {tab === "global" ? (
            <Suspense fallback={<DailyRankingListSkeleton />}>
              <DailyRankingList />
            </Suspense>
          ) : (
            <Suspense fallback={<DailyRankingListSkeleton />}>
              <ModelRankingList model={tab} />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/ranking-tabs.tsx
git commit -m "style: tabs — underline editorial style, AnimatePresence cross-fade on tab change"
```

---

### Task 6: Sidebar — Logo Glow, Active Style, Icon Motion

**Files:**
- Modify: `components/layout/app-menu.tsx`

**Interfaces:**
- Consumes: `--sidebar-accent` (updated in Task 1 to be `primary/12` in dark).

- [ ] **Step 1: Update AppMenu**

Replace the entire content of `components/layout/app-menu.tsx`:

```tsx
"use client"

import { Hexagon, LogOut } from "lucide-react"
import { motion } from "motion/react"
import { usePathname, Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { useNavItems, useSignOut } from "@/hooks/use-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { LocaleSwitcher } from "@/components/layout/locale-switcher"

export const AppMenu = () => {
  const pathname = usePathname()
  const tAuth = useTranslations("auth")
  const navItems = useNavItems()
  const handleSignOut = useSignOut()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Hexagon
            className="text-primary drop-shadow-[0_0_6px_oklch(0.50_0.19_162_/_0.4)] dark:drop-shadow-[0_0_6px_oklch(0.68_0.19_162_/_0.5)]"
            size={20}
          />
          <span className="font-heading font-semibold tracking-tight">GEO Compass</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <SidebarMenuItem key={href}>
                    <div className="relative">
                      {isActive && (
                        <div className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary" />
                      )}
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={href} className="pl-3">
                          <motion.span
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="flex items-center"
                          >
                            <Icon size={18} />
                          </motion.span>
                          <span>{label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1">
              <SidebarMenuButton onClick={handleSignOut} className="flex-1">
                <LogOut size={18} />
                <span>{tAuth("signOut")}</span>
              </SidebarMenuButton>
              <LocaleSwitcher />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors. If `SidebarSeparator` is not exported from `@/components/ui/sidebar`, replace with `<div className="h-px bg-border mx-2 my-1" />`.

- [ ] **Step 3: Commit**

```bash
git add components/layout/app-menu.tsx
git commit -m "style: sidebar — logo glow, active border-left indicator, icon spring on hover"
```

---

### Task 7: Prompt Cards

**Files:**
- Modify: `components/prompts/prompt-card.tsx`

**Interfaces:**
- Consumes: `--shadow-card`, `--shadow-card-hover` from Task 1. `cardHoverSpring` from Task 3.

- [ ] **Step 1: Update PromptCard**

Replace the entire content of `components/prompts/prompt-card.tsx`:

```tsx
"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useUpdatePromptMutation } from "@/hooks/mutation/useUpdatePromptMutation"
import { useDeletePromptMutation } from "@/hooks/mutation/useDeletePromptMutation"
import { PromptDialog } from "./prompt-dialog"
import { useTranslations } from "next-intl"
import type { Prompt } from "@/types/prompt"
import { cardHoverSpring } from "@/lib/motion"

interface PromptCardProps {
  prompt: Prompt
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const updateMutation = useUpdatePromptMutation()
  const deleteMutation = useDeletePromptMutation()
  const t = useTranslations("prompts")
  const { id, isActive, text } = prompt

  const dotClassName = cn(
    "size-2 shrink-0 rounded-full",
    isActive ? "bg-primary" : "bg-muted-foreground"
  )
  const badgeVariant = isActive ? "default" : "secondary"

  const handleToggle = () => {
    updateMutation.mutate({ id, data: { isActive: !isActive } })
  }

  const handleEdit = (values: { text: string }) => {
    updateMutation.mutate({ id, data: { text: values.text } })
  }

  const handleDelete = () => {
    deleteMutation.mutate(id)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        transition={cardHoverSpring}
        className={cn(!isActive && "opacity-60")}
      >
        <Card
          className="flex flex-col gap-3 px-4 py-3"
          style={{ boxShadow: "var(--shadow-card)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-card)"
          }}
        >
          <div className="flex items-center gap-2">
            <span className={dotClassName} />
            <Badge variant={badgeVariant}>
              {isActive ? t("active") : t("inactive")}
            </Badge>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">{t("actions")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    {t("edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleToggle}>
                    {isActive ? t("setInactive") : t("setActive")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                    {t("delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm leading-relaxed">{text}</p>
        </Card>
      </motion.div>

      <PromptDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title={t("editTitle")}
        defaultValues={{ text }}
        submitLabel={t("save")}
        onSubmit={handleEdit}
      />
    </>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/prompts/prompt-card.tsx
git commit -m "style: prompt cards — shadow, spring hover, active dot uses primary color"
```

---

### Task 8: Auth Forms

**Files:**
- Modify: `components/auth/auth-form/auth-form.tsx`
- Modify: `components/auth/register-form/register-form.tsx`

**Interfaces:**
- Consumes: `--shadow-card` from Task 1.

- [ ] **Step 1: Update AuthForm**

In `components/auth/auth-form/auth-form.tsx`, replace the `<form>` opening tag className:

```tsx
<form
  className="flex w-full flex-col gap-4 rounded-xl border bg-card p-6"
  style={{ boxShadow: "var(--shadow-card)" }}
  onSubmit={handleSubmit(handleLoginFormSubmit)}
>
```

Also add `className="hover:brightness-110"` to the submit Button:

```tsx
<Button type="submit" className="w-full hover:brightness-110">
  {t("form.login")}
</Button>
```

- [ ] **Step 2: Update RegisterForm**

In `components/auth/register-form/register-form.tsx`, apply the same changes to the `<form>` opening tag:

```tsx
<form
  className="flex w-full flex-col gap-4 rounded-xl border bg-card p-6"
  style={{ boxShadow: "var(--shadow-card)" }}
  onSubmit={handleSubmit(handleRegisterFormSubmit)}
>
```

And the submit Button:

```tsx
<Button type="submit" className="w-full hover:brightness-110">
  {t("form.createAccount")}
</Button>
```

- [ ] **Step 3: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/auth/auth-form/auth-form.tsx components/auth/register-form/register-form.tsx
git commit -m "style: auth forms — card shadow, rounded-xl, button hover brightness"
```

---

### Task 9: Visual Verification

**Files:** none

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check light mode**

Open http://localhost:3000. Verify:
- Background is near-white, cards have a slight green tint
- Plus Jakarta Sans visible on headings (bold, distinctive)
- Ranking cards have shadow + lift on hover
- Progress bars animate from 0 on load
- Tabs show underline style (no pill background)
- Sidebar active item has left border indicator

- [ ] **Step 3: Check dark mode**

Toggle dark mode. Verify:
- Background is near-black with cool undertone (not gray)
- Primary green is brighter/more vibrant
- Logo has a green glow
- Card shadows absent (replaced by border contrast)
- No regression on rankings, charts, or forms

- [ ] **Step 4: Check auth pages**

Navigate to /login and /register. Verify:
- Form card has shadow in light mode
- Inputs have correct border/ring on focus

- [ ] **Step 5: Stop dev server and run typecheck**

```bash
npm run typecheck
```

Expected: no errors.
