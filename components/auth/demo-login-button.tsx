"use client"

import { Button } from "@/components/ui/button"
import { useLoginMutation } from "@/hooks/mutation/useLoginMutation"
import { useRouter } from "@/lib/navigation"
import { DEMO_EMAIL } from "@/lib/demo"
import { Loader2 } from "lucide-react"

export function DemoLoginButton() {
  const router = useRouter()
  const { mutate: login, isPending } = useLoginMutation()

  const handleDemo = () => {
    login(
      { email: DEMO_EMAIL, password: "12345678" },
      { onSuccess: () => router.push("/") }
    )
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleDemo}
      disabled={isPending}
    >
      {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
      Voir la démo
    </Button>
  )
}
