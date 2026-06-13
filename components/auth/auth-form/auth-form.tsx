"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "@/hooks/mutation/useLoginMutation"
import { LoginFormData } from "./auth-form-schema"
import { useLoginForm } from "./useLoginForm"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function AuthForm() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useLoginForm()
  const { mutate: login } = useLoginMutation()

  const handleLoginFormSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        router.push("/")
      },
      onError: () => {
        toast.error("Erreur de connexion")
      },
    })
  }

  return (
    <form
      className="flex min-w-md flex-col gap-4 rounded-md border bg-background p-6 shadow"
      onSubmit={handleSubmit(handleLoginFormSubmit)}
    >
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register("email")}
        />
        <FieldError errors={[formState.errors.email]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register("password")}
        />
        <FieldError errors={[formState.errors.password]} />
      </Field>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}
