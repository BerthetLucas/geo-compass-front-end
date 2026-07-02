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
