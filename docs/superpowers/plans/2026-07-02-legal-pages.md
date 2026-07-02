# Legal Pages (Mentions légales & CGU) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two public, bilingual (fr/en) content pages — `/legal` (mentions légales) and `/terms` (CGU) — reachable without authentication, with discreet links from the login, register, and app sidebar.

**Architecture:** New route group `app/[locale]/(legal)/` with a minimal shared layout (no sidebar, no auth guard), two server-component pages that render translated static content via next-intl. Content lives in `messages/en.json` / `messages/fr.json` under new `legal` and `terms` namespaces. Links are added to three existing components.

**Tech Stack:** Next.js 16 App Router, next-intl (`getTranslations` in server components), Tailwind CSS v4.

## Global Constraints

- Routes: `/legal` and `/terms`, available for both locales (`en`, `fr`) — no custom per-locale pathnames exist in this project (`i18n/routing.ts` has no `pathnames` map), so the same slug is used in both locales.
- No auth guard on these pages — they must render for logged-out visitors.
- Publisher identity (from user, verbatim, do not alter): Lucas Berthet, individual/non-professional site editor, contact `lu.berthet@gmail.com`, site `lucasberthet.io`. No SIRET. No postal address is published — per LCEN art. 6-III, a non-professional editor may withhold their address from the public as long as it has been provided to the host (satisfied via Vercel).
- Host: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (vercel.com).
- Dark theme only — reuse existing Tailwind tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `text-primary`, `border`), consistent with `app/[locale]/(auth)/login/page.tsx`.
- No test framework exists in this repo (no jest/vitest/playwright configured) — verification for these static content tasks is `pnpm typecheck`, `pnpm lint`, `pnpm build`, and manual visual check via `pnpm dev`.

---

### Task 1: Add `legal` and `terms` translation namespaces

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/fr.json`

**Interfaces:**
- Produces: `legal.*` and `terms.*` translation keys, consumed by `getTranslations("legal")` / `getTranslations("terms")` in Task 3 and Task 4.

- [ ] **Step 1: Add the `legal` and `terms` keys to `messages/en.json`**

Insert these two top-level keys (after the `"prompts"` key, i.e. as the last two keys in the object, keeping valid JSON — add a comma after the closing `}` of `"prompts"`):

```json
  "legal": {
    "title": "Legal Notice",
    "lastUpdated": "Last updated: July 2026",
    "publisher": {
      "heading": "Site publisher",
      "body": "This website is published by Lucas Berthet, acting as a private individual (non-professional publisher).",
      "contact": "Contact: lu.berthet@gmail.com",
      "website": "Website: lucasberthet.io",
      "addressNotice": "In accordance with Article 6-III of the French LCEN (Loi pour la Confiance dans l'Économie Numérique), a non-professional publisher is not required to make their postal address public. This address has been provided to the hosting provider and can be disclosed to the competent judicial authorities upon request."
    },
    "hosting": {
      "heading": "Hosting provider",
      "body": "This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
      "website": "Website: vercel.com"
    },
    "ip": {
      "heading": "Intellectual property",
      "body": "The GEO Compass name, logo, and all content on this site (texts, graphics, code) are the property of their respective author unless otherwise stated. Any reproduction, representation, or use without prior authorization is prohibited."
    },
    "liability": {
      "heading": "Liability",
      "body": "The publisher strives to provide accurate information but cannot guarantee it is exhaustive, complete, or up to date. Use of this site is at the user's own risk."
    }
  },
  "terms": {
    "title": "Terms of Service",
    "lastUpdated": "Last updated: July 2026",
    "intro": {
      "heading": "Purpose",
      "body": "These Terms of Service govern access to and use of GEO Compass, a service that tracks a brand's ranking in AI-generated answers (ChatGPT, Claude, Gemini, and other models). By creating an account or using the service, you agree to these terms."
    },
    "account": {
      "heading": "Account and access",
      "body": "Access to GEO Compass requires creating an account. You are responsible for the confidentiality of your credentials and for all activity under your account."
    },
    "usage": {
      "heading": "Use of the service",
      "body": "GEO Compass is provided on a best-effort basis. The service may evolve, be temporarily unavailable, or be discontinued without prior notice. Rankings are generated from third-party AI model outputs and are provided for informational purposes only."
    },
    "liability": {
      "heading": "Liability",
      "body": "GEO Compass cannot be held liable for decisions made based on the rankings or data provided by the service, nor for the availability or accuracy of third-party AI models it queries."
    },
    "ip": {
      "heading": "Intellectual property",
      "body": "All elements of the GEO Compass service (brand, interface, code) remain the property of their author. Users retain ownership of the prompts and data they submit."
    },
    "changes": {
      "heading": "Changes to these terms",
      "body": "These Terms of Service may be updated at any time. Continued use of the service after a change constitutes acceptance of the updated terms."
    },
    "law": {
      "heading": "Governing law",
      "body": "These Terms of Service are governed by French law. Any dispute shall be submitted to the competent French courts."
    }
  }
```

**Full edit for context** — in `messages/en.json`, the `"prompts"` object's closing looks like this today:

```json
    "form": {
      "label": "Prompt",
      "placeholder": "What are the best running shoes for marathon training?"
    }
  }
}
```

Change the final `}` (closing the top-level object) to `},` and append the `legal`/`terms` blocks above, then close the top-level object with `}`.

- [ ] **Step 2: Add the `legal` and `terms` keys to `messages/fr.json`**

Insert these two top-level keys (same position, after `"prompts"`):

```json
  "legal": {
    "title": "Mentions légales",
    "lastUpdated": "Dernière mise à jour : juillet 2026",
    "publisher": {
      "heading": "Éditeur du site",
      "body": "Ce site est édité par Lucas Berthet, à titre individuel (éditeur non professionnel).",
      "contact": "Contact : lu.berthet@gmail.com",
      "website": "Site web : lucasberthet.io",
      "addressNotice": "Conformément à l'article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), un éditeur non professionnel n'est pas tenu de rendre son adresse postale publique. Cette adresse a été communiquée à l'hébergeur et peut être transmise aux autorités judiciaires compétentes sur demande."
    },
    "hosting": {
      "heading": "Hébergement",
      "body": "Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
      "website": "Site web : vercel.com"
    },
    "ip": {
      "heading": "Propriété intellectuelle",
      "body": "Le nom GEO Compass, son logo et l'ensemble des contenus présents sur ce site (textes, graphismes, code) sont la propriété de leur auteur respectif, sauf mention contraire. Toute reproduction, représentation ou utilisation sans autorisation préalable est interdite."
    },
    "liability": {
      "heading": "Responsabilité",
      "body": "L'éditeur s'efforce de fournir des informations exactes mais ne peut garantir leur exhaustivité, leur exactitude ou leur mise à jour permanente. L'utilisation de ce site se fait sous la responsabilité de l'utilisateur."
    }
  },
  "terms": {
    "title": "Conditions générales d'utilisation",
    "lastUpdated": "Dernière mise à jour : juillet 2026",
    "intro": {
      "heading": "Objet",
      "body": "Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation de GEO Compass, un service de suivi du classement d'une marque dans les réponses générées par des IA (ChatGPT, Claude, Gemini et autres modèles). En créant un compte ou en utilisant le service, vous acceptez les présentes conditions."
    },
    "account": {
      "heading": "Compte et accès",
      "body": "L'accès à GEO Compass nécessite la création d'un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toute activité effectuée depuis votre compte."
    },
    "usage": {
      "heading": "Utilisation du service",
      "body": "GEO Compass est fourni en best-effort. Le service peut évoluer, être temporairement indisponible ou être interrompu sans préavis. Les classements sont générés à partir de réponses de modèles d'IA tiers et sont fournis à titre indicatif."
    },
    "liability": {
      "heading": "Responsabilité",
      "body": "GEO Compass ne saurait être tenu responsable des décisions prises sur la base des classements ou données fournies par le service, ni de la disponibilité ou de l'exactitude des modèles d'IA tiers qu'il interroge."
    },
    "ip": {
      "heading": "Propriété intellectuelle",
      "body": "L'ensemble des éléments du service GEO Compass (marque, interface, code) demeure la propriété de son auteur. Les utilisateurs conservent la propriété des prompts et données qu'ils soumettent."
    },
    "changes": {
      "heading": "Modification des CGU",
      "body": "Les présentes conditions générales d'utilisation peuvent être mises à jour à tout moment. La poursuite de l'utilisation du service après modification vaut acceptation des nouvelles conditions."
    },
    "law": {
      "heading": "Droit applicable",
      "body": "Les présentes conditions générales d'utilisation sont soumises au droit français. Tout litige relève de la compétence des tribunaux français."
    }
  }
```

Apply the same "append before final closing brace" edit as Step 1, to `messages/fr.json`.

- [ ] **Step 3: Verify JSON validity**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/en.json')); JSON.parse(require('fs').readFileSync('messages/fr.json')); console.log('OK')"`
Expected output: `OK`

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/fr.json
git commit -m "Add legal and terms translation content"
```

---

### Task 2: Create the `(legal)` route group layout

**Files:**
- Create: `app/[locale]/(legal)/layout.tsx`

**Interfaces:**
- Produces: a layout component wrapping any page under `app/[locale]/(legal)/*` in a centered, max-width container. No auth guard, no sidebar.

- [ ] **Step 1: Create the layout file**

```tsx
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">{children}</div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/[locale]/(legal)/layout.tsx"
git commit -m "Add layout for public legal pages route group"
```

---

### Task 3: Create the `/legal` page

**Files:**
- Create: `app/[locale]/(legal)/legal/page.tsx`

**Interfaces:**
- Consumes: `legal.*` translation keys from Task 1 (`title`, `lastUpdated`, `publisher.heading/body/contact/website/addressNotice`, `hosting.heading/body/website`, `ip.heading/body`, `liability.heading/body`).

- [ ] **Step 1: Create the page**

```tsx
import { getTranslations } from "next-intl/server"

export default async function LegalNoticePage() {
  const t = await getTranslations("legal")

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("lastUpdated")}</p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold">
          {t("publisher.heading")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("publisher.body")}</p>
        <p className="text-sm text-muted-foreground">{t("publisher.contact")}</p>
        <p className="text-sm text-muted-foreground">{t("publisher.website")}</p>
        <p className="text-sm text-muted-foreground">
          {t("publisher.addressNotice")}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold">
          {t("hosting.heading")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("hosting.body")}</p>
        <p className="text-sm text-muted-foreground">{t("hosting.website")}</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold">{t("ip.heading")}</h2>
        <p className="text-sm text-muted-foreground">{t("ip.body")}</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold">
          {t("liability.heading")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("liability.body")}</p>
      </section>
    </article>
  )
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm typecheck`
Expected: no errors related to the new file.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/(legal)/legal/page.tsx"
git commit -m "Add legal notice page"
```

---

### Task 4: Create the `/terms` page

**Files:**
- Create: `app/[locale]/(legal)/terms/page.tsx`

**Interfaces:**
- Consumes: `terms.*` translation keys from Task 1 (`title`, `lastUpdated`, `intro.heading/body`, `account.heading/body`, `usage.heading/body`, `liability.heading/body`, `ip.heading/body`, `changes.heading/body`, `law.heading/body`).

- [ ] **Step 1: Create the page**

```tsx
import { getTranslations } from "next-intl/server"

export default async function TermsOfServicePage() {
  const t = await getTranslations("terms")

  const sections = [
    "intro",
    "account",
    "usage",
    "liability",
    "ip",
    "changes",
    "law",
  ] as const

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("lastUpdated")}</p>
      </header>

      {sections.map((key) => (
        <section key={key} className="flex flex-col gap-2">
          <h2 className="font-heading text-lg font-semibold">
            {t(`${key}.heading`)}
          </h2>
          <p className="text-sm text-muted-foreground">{t(`${key}.body`)}</p>
        </section>
      ))}
    </article>
  )
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm typecheck`
Expected: no errors related to the new file.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/(legal)/terms/page.tsx"
git commit -m "Add terms of service page"
```

---

### Task 5: Add legal/terms links to login and register pages

**Files:**
- Modify: `app/[locale]/(auth)/login/page.tsx`
- Modify: `app/[locale]/(auth)/register/page.tsx`

**Interfaces:**
- Consumes: `legal.title` and `terms.title` translation keys from Task 1, `Link` from `@/lib/navigation`, routes `/legal` and `/terms` from Task 3/4.

- [ ] **Step 1: Add the footer link to the login page**

`app/[locale]/(auth)/login/page.tsx` already imports `Link` from `@/lib/navigation` (next-intl's locale-aware navigation helper):

```tsx
import { Link } from "@/lib/navigation"
```

`i18n/routing.ts` defines no `pathnames` map, so `/legal` and `/terms` pass through unchanged in both locales — reuse this existing `Link` import, no new import needed.

Add this block right after the closing `</p>` of the `noAccount`/`createOne` paragraph, still inside the `flex w-full max-w-sm flex-col gap-3` div:

```tsx
          <p className="text-center text-xs text-muted-foreground">
            <Link href="/legal" className="underline underline-offset-4">
              Mentions légales
            </Link>
            {" · "}
            <Link href="/terms" className="underline underline-offset-4">
              CGU
            </Link>
          </p>
```

- [ ] **Step 2: Add the same footer link to the register page**

In `app/[locale]/(auth)/register/page.tsx`, add the `Link` import (not currently imported in this file):

```tsx
import { Link } from "@/lib/navigation"
```

Add the same block after the `<RegisterForm />` div, inside `flex flex-col items-center justify-center gap-8 px-8 py-12`:

```tsx
        <p className="text-center text-xs text-muted-foreground">
          <Link href="/legal" className="underline underline-offset-4">
            Mentions légales
          </Link>
          {" · "}
          <Link href="/terms" className="underline underline-offset-4">
            CGU
          </Link>
        </p>
```

- [ ] **Step 3: Verify types and lint**

Run: `pnpm typecheck && pnpm lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/(auth)/login/page.tsx" "app/[locale]/(auth)/register/page.tsx"
git commit -m "Add legal notice and terms links to login and register pages"
```

---

### Task 6: Add legal/terms links to the app sidebar footer

**Files:**
- Modify: `components/layout/app-menu.tsx`

**Interfaces:**
- Consumes: routes `/legal` and `/terms` from Task 3/4, and the existing `Link` import from `@/lib/navigation` already used in this file for nav items.

- [ ] **Step 1: Add the footer links below the sign-out row**

`components/layout/app-menu.tsx` already imports `Link` from `@/lib/navigation` — no new import needed. In the `SidebarFooter` block, after the closing `</SidebarMenuItem>` of the sign-out row (still inside `<SidebarMenu>`), add:

```tsx
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 pb-1 text-xs text-muted-foreground">
              <Link href="/legal" className="hover:text-foreground">
                Mentions légales
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-foreground">
                CGU
              </Link>
            </div>
          </SidebarMenuItem>
```

- [ ] **Step 2: Verify types and lint**

Run: `pnpm typecheck && pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/app-menu.tsx
git commit -m "Add legal notice and terms links to app sidebar"
```

---

### Task 7: Full build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Run the production build**

Run: `pnpm build`
Expected: build succeeds, no type or lint errors, `/legal` and `/terms` listed among the generated routes for both locales.

- [ ] **Step 2: Manual check in dev server**

Run: `pnpm dev`, then in a browser (logged out):
- Visit `http://localhost:3000/en/legal` and `http://localhost:3000/fr/legal` — confirm the correct language content renders, no sidebar, no redirect to `/login`.
- Visit `http://localhost:3000/en/terms` and `http://localhost:3000/fr/terms` — same checks.
- Visit `http://localhost:3000/en/login` and `/fr/login` — confirm the "Mentions légales · CGU" links appear and navigate correctly.
- Visit `http://localhost:3000/en/register` and `/fr/register` — same check.
- Log in, confirm the sidebar footer shows the same two links below "Sign out", and that they navigate to `/legal` / `/terms` without breaking the authenticated session.

- [ ] **Step 3: Stop the dev server**

No commit for this task — verification only.
