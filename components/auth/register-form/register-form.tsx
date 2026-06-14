"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegisterMutation } from "@/hooks/mutation/useRegisterMutation"
import { RegisterFormData } from "./register-form-schema"
import { useRegisterForm } from "./useRegisterForm"
import { useRouter } from "@/lib/navigation"
import { Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function RegisterForm() {
  const router = useRouter()
  const t = useTranslations("auth")
  const { register, handleSubmit, formState } = useRegisterForm()
  const { mutate: registerUser } = useRegisterMutation()

  const handleRegisterFormSubmit = ({ confirmPassword: _, ...data }: RegisterFormData) => {
    registerUser(data, {
      onSuccess: () => {
        router.push("/")
      },
      onError: () => {
        toast.error(t("register.error"))
      },
    })
  }

  return (
    <form
      className="flex w-full flex-col gap-4 rounded-md border bg-background p-6 shadow"
      onSubmit={handleSubmit(handleRegisterFormSubmit)}
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
      <Field>
        <FieldLabel htmlFor="confirmPassword">{t("form.confirmPassword")}</FieldLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
        />
        <FieldError errors={[formState.errors.confirmPassword]} />
      </Field>
      <Button type="submit" className="w-full">
        {t("form.createAccount")}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {t("register.hasAccount")}{" "}
        <Link href="/login" className="text-primary underline underline-offset-4">
          {t("register.signIn")}
        </Link>
      </p>
    </form>
  )
}
