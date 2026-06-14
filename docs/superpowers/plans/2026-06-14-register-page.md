# Register Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/register` page with email+password form, accessible from `/login`, that creates an account and redirects to `/`.

**Architecture:** Mirror the existing login pattern exactly — schema → form hook → form component → page. The backend (`POST /auth/register`) and mutation hook (`useRegisterMutation`) already exist. Only the UI layer is missing.

**Tech Stack:** Next.js 15 App Router, React Hook Form 7, Zod 4, TanStack Query 5, Sonner (toasts), Tailwind CSS, shadcn/ui

---

### Task 1: Register form schema

**Files:**
- Create: `components/auth/register-form/register-form-schema.ts`

- [ ] **Step 1: Create the schema file**

```ts
import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
```

- [ ] **Step 2: Commit**

```bash
git add components/auth/register-form/register-form-schema.ts
git commit -m "feat: add register form schema"
```

---

### Task 2: Register form hook

**Files:**
- Create: `components/auth/register-form/useRegisterForm.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormData } from "./register-form-schema"

export const useRegisterForm = () => {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add components/auth/register-form/useRegisterForm.ts
git commit -m "feat: add useRegisterForm hook"
```

---

### Task 3: Register form component

**Files:**
- Create: `components/auth/register-form/register-form.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/auth/register-form/register-form.tsx
git commit -m "feat: add RegisterForm component"
```

---

### Task 4: Register page

**Files:**
- Create: `app/(auth)/register/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import Image from "next/image"
import { RegisterForm } from "@/components/auth/register-form/register-form"

export default function RegisterPage() {
  return (
    <div className="grid h-screen w-full lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-8 px-8 py-12">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            GEO Compass
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign up to access your AI brand rankings dashboard.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
      <div className="relative hidden h-full overflow-hidden opacity-50 lg:block">
        <Image
          src="/login.jpg"
          alt="GEO Compass"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/(auth)/register/page.tsx
git commit -m "feat: add register page"
```

---

### Task 5: Add link from login page

**Files:**
- Modify: `app/(auth)/login/page.tsx`

- [ ] **Step 1: Add Link import and "Create account" link**

Replace the content of `app/(auth)/login/page.tsx` with:

```tsx
import Image from "next/image"
import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form/auth-form"

export default function LoginPage() {
  return (
    <div className="grid h-screen w-full lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-8 px-8 py-12">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            GEO Compass
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Welcome
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your AI brand rankings dashboard.
          </p>
        </div>
        <div className="w-full max-w-sm flex flex-col gap-3">
          <AuthForm />
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary underline underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden h-full overflow-hidden opacity-50 lg:block">
        <Image
          src="/login.jpg"
          alt="GEO Compass"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/(auth)/login/page.tsx
git commit -m "feat: add link to register page from login"
```

---

### Task 6: Manual verification

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Verify login → register link**

Open `http://localhost:3000/login`. Confirm "Don't have an account? Create one" link is visible and navigates to `/register`.

- [ ] **Step 3: Verify register form**

On `/register`: fill in email + password (min 8 chars), submit. Expect redirect to `/`.

- [ ] **Step 4: Verify register → login link**

On `/register`: confirm "Already have an account? Sign in" navigates to `/login`.

- [ ] **Step 5: Verify validation**

Submit register form with short password (< 8 chars). Expect inline error "Password must be at least 8 characters long". Submit with mismatched passwords. Expect inline error "Passwords do not match" under confirm password field.

- [ ] **Step 6: Verify mobile layout**

Resize browser to < 1024px. Confirm image is hidden, form is centered and doesn't overflow.
