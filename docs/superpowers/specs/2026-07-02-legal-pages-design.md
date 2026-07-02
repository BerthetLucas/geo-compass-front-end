# Legal pages (mentions légales & CGU) — Design

## Why
The site is hosted on Vercel and needs a legal notice page and terms of service page, as is required for a publicly deployed site in France. No legal entity exists yet, so content will use explicit placeholders for company-specific facts.

## Routes
- `/legal` — mentions légales / legal notice
- `/terms` — CGU / terms of service

Both live under a new route group `app/[locale]/(legal)/` (public, no auth guard, no sidebar), available in both `en` and `fr` locales via next-intl.

## Layout
`app/[locale]/(legal)/layout.tsx`: minimal wrapper, centered content column with a max width (e.g. `max-w-2xl mx-auto px-6 py-12`), consistent with the app's dark theme. No sidebar, no auth check.

## Pages
- `app/[locale]/(legal)/legal/page.tsx` — mentions légales
- `app/[locale]/(legal)/terms/page.tsx` — CGU

Content sourced from `messages/en.json` / `messages/fr.json` under new `legal` and `terms` namespaces, rendered via `useTranslations`/`getTranslations`.

### Legal notice content sections
- Éditeur du site: `[RAISON SOCIALE / NOM]`, `[ADRESSE]`, `[SIRET]` (placeholders, clearly marked to fill in before real launch)
- Directeur de publication: `[NOM]`
- Contact: `[EMAIL]`
- Hébergeur: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (vercel.com) — real, public info, not a placeholder
- Propriété intellectuelle (standard boilerplate)

### Terms of service content sections
- Objet du service (GEO Compass: suivi de classement de marque dans les réponses IA)
- Accès au service / compte utilisateur
- Responsabilités et limitations
- Propriété intellectuelle
- Modification des CGU
- Droit applicable

## Links
Small, discrete text links to `/legal` and `/terms`:
- Under the form on `/login` and `/register` pages
- In `AppMenu.tsx`'s `SidebarFooter`, below the sign-out button

## Testing
Visual check in dev server: pages render in both locales, links navigate correctly, no auth required to view.
