"use client"

import {
  LayoutDashboard,
  MessageSquare,
  LineChart,
  Hexagon,
  LogOut,
} from "lucide-react"
import { usePathname, useRouter, Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { signOut } from "@/services/auth"
import { LocaleSwitcher } from "@/components/layout/locale-switcher"

export const AppMenu = () => {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("nav")
  const tAuth = useTranslations("auth")

  const NAV = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/historic", label: t("history"), icon: LineChart },
    { href: "/prompts", label: t("prompts"), icon: MessageSquare },
  ]

  const handleSignOut = () => {
    signOut()
    router.push("/login")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Hexagon className="text-primary" size={20} />
          <span className="font-semibold tracking-tight">GEO Compass</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={pathname === href}>
                    <Link href={href}>
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1">
              <SidebarMenuButton onClick={handleSignOut} className="flex-1">
                <LogOut size={18} />
                <span>{tAuth("signOut")}</span>
              </SidebarMenuButton>
              <LocaleSwitcher />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
