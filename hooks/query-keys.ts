export const queryKeys = {
  user: {
    settings: ["user-settings"] as const,
  },
  prompts: {
    all: ["prompts"] as const,
  },
  ranking: {
    daily: ["daily-ranking"] as const,
    historic: (startDate: string, endDate: string) =>
      ["historic-ranking", startDate, endDate] as const,
    models: ["available-models"] as const,
    model: (model: string) => ["model-ranking", model] as const,
  },
}
