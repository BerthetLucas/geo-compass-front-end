"use client"

import { Hexagon, LogOut } from "lucide-react"
import { usePathname, Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { useNavItems, useSignOut } from "@/hooks/use-nav"
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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { LocaleSwitcher } from "@/components/layout/locale-switcher"

export const AppMenu = () => {
  const pathname = usePathname()
  const tAuth = useTranslations("auth")
  const navItems = useNavItems()
  const handleSignOut = useSignOut()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Hexagon
            className="text-primary drop-shadow-[0_0_6px_oklch(0.50_0.19_162_/_0.4)] dark:drop-shadow-[0_0_6px_oklch(0.68_0.19_162_/_0.5)]"
            size={20}
          />
          <span className="font-heading font-semibold tracking-tight">GEO Compass</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <SidebarMenuItem key={href}>
                    <div className="relative">
                      {isActive && (
                        <div className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary" />
                      )}
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={href}>
                          <Icon size={18} />
                          <span>{label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
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
