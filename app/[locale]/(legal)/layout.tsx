import { LegalBackButton } from "@/components/layout/legal-back-button"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16">
        <LegalBackButton />
        {children}
      </div>
    </div>
  )
}
