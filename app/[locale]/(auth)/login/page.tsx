import Image from "next/image"
import { Link } from "@/lib/navigation"
import { AuthForm } from "@/components/auth/auth-form/auth-form"
import { getTranslations } from "next-intl/server"

export default async function LoginPage() {
  const t = await getTranslations("auth.login")

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
        <div className="flex w-full max-w-sm flex-col gap-3">
          <AuthForm />
          <p className="text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link
              href="/register"
              className="text-primary underline underline-offset-4"
            >
              {t("createOne")}
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden h-full overflow-hidden opacity-50 lg:block">
        <Image src="/login.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>
    </div>
  )
}
