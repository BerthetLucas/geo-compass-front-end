import { AuthForm } from "@/components/auth/auth-form/auth-form"

export default function LoginPage() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-10">
      <h1>
        Welcome on your GEO compass, please login to access your dashboard
      </h1>
      <AuthForm />
    </section>
  )
}
