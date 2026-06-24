# GEO Compass — Front-end

GEO Compass (Generative Engine Optimization) is a dashboard that tracks how often your brand is mentioned across multiple AI models. Each day, a set of prompts is automatically submitted to GPT-4o, Claude, and Gemini. Results are ranked and visualized so you can monitor your brand's presence in AI-generated answers over time.

> This is the front-end repository. The back-end is at [github.com/BerthetLucas/geo-compass-back-end](https://github.com/BerthetLucas/geo-compass-back-end).

## Features

- **Daily rankings** — see which brands are cited most across your prompts for each model
- **Historical charts** — track ranking trends over time
- **Prompt management** — create, activate, and deactivate the prompts submitted to each model (up to 5)
- **Settings** — configure email notifications and your OpenRouter API key
- **Internationalization** — English and French, switchable at runtime

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query v5](https://tanstack.com/query)
- [next-intl](https://next-intl-docs.vercel.app)
- [Recharts](https://recharts.org)

## Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io) ≥ 9
- The back-end running locally or deployed — see [geo-compass-back-end](https://github.com/BerthetLucas/geo-compass-back-end)

## Getting started

**1. Clone the repository**

```bash
git clone https://github.com/BerthetLucas/geo-compass-front-end
cd geo-compass-front-end
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure environment variables**

Create a `.env` file at the root of the project:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the GEO Compass back-end API |

**4. Start the development server**

```bash
pnpm dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Other commands

| Command | Description |
|---|---|
| `pnpm build` | Production build |
| `pnpm start` | Start the production server |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier formatting |
