import { ThemeProvider } from "@/components/providers/theme-provider"
import { QueryProvider } from "./query-provider"
import { SidebarProvider } from "../ui/sidebar"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
