export const queryKeys = {
  prompts: {
    all: ["prompts"] as const,
  },
  ranking: {
    daily: ["daily-ranking"] as const,
    historic: (startDate: string, endDate: string) =>
      ["historic-ranking", startDate, endDate] as const,
  },
}
