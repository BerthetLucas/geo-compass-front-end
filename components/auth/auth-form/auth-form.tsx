"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "@/hooks/mutation/useLoginMutation"
import { LoginFormData } from "./auth-form-schema"
import { useLoginForm } from "./useLoginForm"
import { useRouter } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function AuthForm() {
  const router = useRouter()
  const t = useTranslations("auth")
  const { register, handleSubmit, formState } = useLoginForm()
  const { mutate: login } = useLoginMutation()

  const handleLoginFormSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        router.push("/")
      },
      onError: () => {
        toast.error(t("login.error"))
      },
    })
  }

  return (
    <form
      className="flex w-full flex-col gap-4 rounded-xl border bg-card p-6"
      style={{ boxShadow: "var(--shadow-card)" }}
      onSubmit={handleSubmit(handleLoginFormSubmit)}
    >
      <Field>
        <FieldLabel htmlFor="email">{t("form.email")}</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register("email")}
        />
        <FieldError errors={[formState.errors.email]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">{t("form.password")}</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register("password")}
        />
        <FieldError errors={[formState.errors.password]} />
      </Field>
      <Button type="submit" className="w-full hover:brightness-110">
        {t("form.login")}
      </Button>
    </form>
  )
}
