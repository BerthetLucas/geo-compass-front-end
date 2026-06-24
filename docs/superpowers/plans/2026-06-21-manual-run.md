# Manual Data Generation Button — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a "Generate today's data" button on the dashboard when the user has active prompts but no ranking data for today.

**Architecture:** Add `AVAILABLE_MODELS` constant to config, create `services/llm.ts` for the two POST calls, create a mutation hook that chains them, then extend `NextResultCountdown` with a third UI state.

**Tech Stack:** Next.js 16, React 19, TanStack Query v5, next-intl, Tailwind CSS, shadcn/ui

## Global Constraints

- No test framework — verify with `pnpm typecheck` after each task
- Follow existing mutation hook pattern: `useMutation` + `queryClient.invalidateQueries` on success
- i18n: all user-visible strings go in `messages/en.json` and `messages/fr.json`
- Model IDs mirror backend `AVAILABLE_MODELS` in `src/llm/constants/models.ts`

---

### Task 1: Config + LLM service

**Files:**
- Modify: `config/config.ts`
- Create: `services/llm.ts`

**Interfaces:**
- Produces:
  - `AVAILABLE_MODELS: string[]` from `config/config.ts`
  - `triggerLlmRun(models: string[]): Promise<void>` from `services/llm.ts`
  - `triggerRankingCompute(): Promise<void>` from `services/llm.ts`

- [ ] **Step 1: Add AVAILABLE_MODELS to config**

In `config/config.ts`, append after `MAX_PROMPTS`:

```typescript
export const AVAILABLE_MODELS = [
  'google/gemini-3-flash-preview',
  'anthropic/claude-haiku-4.5',
  'openai/gpt-4o',
]
```

- [ ] **Step 2: Create services/llm.ts**

```typescript
import apiClient from "@/lib/api"

export async function triggerLlmRun(models: string[]): Promise<void> {
  await apiClient.post("/llm", { models })
}

export async function triggerRankingCompute(): Promise<void> {
  await apiClient.post("/ranking/compute")
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add config/config.ts services/llm.ts
git commit -m "feat: add AVAILABLE_MODELS config and LLM service calls"
```

---

### Task 2: Mutation hook

**Files:**
- Create: `hooks/mutation/useRunManualGeneration.ts`

**Interfaces:**
- Consumes:
  - `AVAILABLE_MODELS` from `@/config/config`
  - `triggerLlmRun(models: string[]): Promise<void>` from `@/services/llm`
  - `triggerRankingCompute(): Promise<void>` from `@/services/llm`
  - `queryKeys.ranking.daily` and `queryKeys.ranking.models` from `@/hooks/query-keys`
- Produces:
  - `useRunManualGeneration(): UseMutationResult<void, Error, void>` — call `mutate()` with no args to trigger the full generation flow

- [ ] **Step 1: Create the mutation hook**

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { triggerLlmRun, triggerRankingCompute } from "@/services/llm"
import { queryKeys } from "@/hooks/query-keys"
import { AVAILABLE_MODELS } from "@/config/config"

export function useRunManualGeneration() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await triggerLlmRun(AVAILABLE_MODELS)
      await triggerRankingCompute()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking.daily })
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking.models })
    },
  })
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/mutation/useRunManualGeneration.ts
git commit -m "feat: add useRunManualGeneration mutation hook"
```

---

### Task 3: i18n + UI

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/fr.json`
- Modify: `components/dashboard/next-result-countdown.tsx`

**Interfaces:**
- Consumes:
  - `useRunManualGeneration()` from `@/hooks/mutation/useRunManualGeneration`
  - `useGetDailyRankingSuspenseQuery()` from `@/hooks/queries/useGetDailyRanking`
  - `useGetPromptListSuspenseQuery()` (already imported)

- [ ] **Step 1: Add i18n keys to messages/en.json**

Inside the `"dashboard"` object, add after `"addPrompt"`:

```json
"generateData": "Generate today's data",
"generating": "Generating...",
"generateDescription": "No data yet for today."
```

- [ ] **Step 2: Add i18n keys to messages/fr.json**

Inside the `"dashboard"` object, add after `"addPrompt"`:

```json
"generateData": "Générer les données du jour",
"generating": "Génération en cours...",
"generateDescription": "Aucune donnée pour aujourd'hui."
```

- [ ] **Step 3: Update next-result-countdown.tsx**

Replace the full file content:

```typescript
"use client"

import { Clock, Info, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"
import { useGetDailyRankingSuspenseQuery } from "@/hooks/queries/useGetDailyRanking"
import { useRunManualGeneration } from "@/hooks/mutation/useRunManualGeneration"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NextResultCountdown() {
  const t = useTranslations("dashboard")
  const { data: prompts } = useGetPromptListSuspenseQuery()
  const { data: rankings } = useGetDailyRankingSuspenseQuery()
  const { mutate: runGeneration, isPending } = useRunManualGeneration()

  const hasActivePrompts = prompts.some((p) => p.isActive)

  if (!prompts.length)
    return (
      <Card className="mt-4 flex flex-row gap-2 p-4">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p className="flex items-center font-bold">{t("addPrompt")}</p>
      </Card>
    )

  if (hasActivePrompts && rankings.length === 0)
    return (
      <Card className="mt-4 flex flex-row items-center gap-3 p-4">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p className="text-sm">{t("generateDescription")}</p>
        <Button
          size="sm"
          onClick={() => runGeneration()}
          disabled={isPending}
        >
          <Play className="size-3.5" />
          {isPending ? t("generating") : t("generateData")}
        </Button>
      </Card>
    )

  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="size-3.5" />
      {t("nextResult")}
    </p>
  )
}
```

- [ ] **Step 4: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add messages/en.json messages/fr.json components/dashboard/next-result-countdown.tsx
git commit -m "feat: show generate data button on dashboard when no data for today"
```
