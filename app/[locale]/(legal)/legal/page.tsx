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
