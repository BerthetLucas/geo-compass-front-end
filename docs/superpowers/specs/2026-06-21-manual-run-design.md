# Manual Data Generation Button

**Date:** 2026-06-21

## Goal

When a user has active prompts but no ranking data for today, show a button on the dashboard to manually trigger data generation (LLM queries + ranking compute).

## Conditions

Button visible when **both**:
- `prompts.some(p => p.isActive)` — user has at least one active prompt
- `rankings.length === 0` — no data for today

## Flow

1. User clicks "Generate"
2. Button enters loading state
3. `POST /llm` called with `AVAILABLE_MODELS`
4. `POST /ranking/compute` called
5. Invalidate `daily-ranking` + `models` query keys
6. Dashboard re-fetches → button disappears, list populates

## Files

### New
- `services/llm.ts` — `triggerLlmRun(models: string[])` and `triggerRankingCompute()`
- `hooks/mutation/useRunManualGeneration.ts` — mutation chaining both calls, invalidates queries on success

### Modified
- `config/config.ts` — add `AVAILABLE_MODELS` constant (mirrors backend `AVAILABLE_MODELS`)
- `components/dashboard/next-result-countdown.tsx` — add 3rd state: active prompts + empty rankings → show generate button
- `messages/en.json` + `messages/fr.json` — add i18n keys under `dashboard`

## i18n Keys

```
dashboard.generateData       "Generate today's data"        / "Générer les données du jour"
dashboard.generating         "Generating..."                / "Génération en cours..."
dashboard.generateDescription "No data yet for today."      / "Aucune donnée pour aujourd'hui."
```

## Notes

- Models hardcoded on frontend for now, to sync manually if backend `AVAILABLE_MODELS` changes
- `NextResultCountdown` already fetches prompts — add `useGetDailyRankingSuspenseQuery` there for the new condition
- Both API calls are sequential (ranking compute depends on LLM responses being stored first)
