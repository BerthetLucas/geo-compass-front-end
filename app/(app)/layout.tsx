import { AppMenu } from "@/components/layout/app-menu"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppMenu />
      <main className="mb-10 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
