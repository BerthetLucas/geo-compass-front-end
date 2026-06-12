import Image from "next/image"
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
        <div className="w-full max-w-sm">
          <AuthForm />
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
