import Image from "next/image"
import { Link } from "@/lib/navigation"
import { RegisterForm } from "@/components/auth/register-form/register-form"
import { getTranslations } from "next-intl/server"

export default async function RegisterPage() {
  const t = await getTranslations("auth.register")
  const tLegal = await getTranslations("legal")
  const tTerms = await getTranslations("terms")

  return (
    <div className="grid h-screen w-full lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-8 px-8 py-12">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            GEO Compass
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          <Link href="/legal" className="underline underline-offset-4">
            {tLegal("linkLabel")}
          </Link>
          {" · "}
          <Link href="/terms" className="underline underline-offset-4">
            {tTerms("linkLabel")}
          </Link>
        </p>
      </div>
      <div className="relative hidden h-full overflow-hidden opacity-50 lg:block">
        <Image src="/login.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>
    </div>
  )
}
