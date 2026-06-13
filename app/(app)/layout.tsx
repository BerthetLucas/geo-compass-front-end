import { AppMenu } from "@/components/layout/app-menu"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppMenu />
      <main className="my-10 w-full pb-24 md:my-0 md:mb-10 md:pb-0">
        <SidebarTrigger className="hidden md:flex" />
        {children}
      </main>
      <MobileBottomNav />
    </SidebarProvider>
  )
}
