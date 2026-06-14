# Register Page Design

**Date:** 2026-06-14  
**Status:** Approved

## Goal

Allow users without an account to create one via a dedicated `/register` page, accessible from the `/login` page.

## New Files

### `components/auth/register-form/register-form-schema.ts`
Zod schema: `email` (valid email) + `password` (min 8 chars) + `confirmPassword` (must match `password` via `z.refine`). Exports `RegisterFormData` type. Only `email` + `password` are sent to the API — `confirmPassword` is frontend-only validation.

### `components/auth/register-form/useRegisterForm.ts`
`react-hook-form` + `zodResolver(registerSchema)`. Returns `{ register, handleSubmit, formState }`. Mirrors `useLoginForm`.

### `components/auth/register-form/register-form.tsx`
- Fields: email, password, confirm password
- On submit: strips `confirmPassword` before calling `useRegisterMutation`, redirects to `/` on success, shows `toast.error("Erreur de création de compte")` on failure
- Link at bottom: "Already have an account? Sign in" → `/login`

### `app/(auth)/register/page.tsx`
- Same layout as login page: `grid h-screen lg:grid-cols-2`, image panel hidden on mobile
- Header: "GEO Compass" label, "Create an account" h1, subtitle
- Renders `<RegisterForm />`
- No new layout needed (reuses `app/(auth)/layout.tsx`)

## Modified Files

### `app/(auth)/login/page.tsx`
Add link below `<AuthForm />`: "Don't have an account? Create one" → `/register`

## Data Flow

```
RegisterForm
  → useRegisterForm (Zod validation)
  → useRegisterMutation
  → POST /auth/register { email, password }
  → sets cookie "token" (7 days)
  → redirect "/"
```

## Out of Scope

- Email verification
- Password strength indicator
