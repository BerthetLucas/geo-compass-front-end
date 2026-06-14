"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegisterMutation } from "@/hooks/mutation/useRegisterMutation"
import { RegisterFormData } from "./register-form-schema"
import { useRegisterForm } from "./useRegisterForm"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useRegisterForm()
  const { mutate: registerUser } = useRegisterMutation()

  const handleRegisterFormSubmit = ({ confirmPassword: _, ...data }: RegisterFormData) => {
    registerUser(data, {
      onSuccess: () => {
        router.push("/")
      },
      onError: () => {
        toast.error("Erreur de création de compte")
      },
    })
  }

  return (
    <form
      className="flex w-full flex-col gap-4 rounded-md border bg-background p-6 shadow"
      onSubmit={handleSubmit(handleRegisterFormSubmit)}
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
      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
        />
        <FieldError errors={[formState.errors.confirmPassword]} />
      </Field>
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  )
}
