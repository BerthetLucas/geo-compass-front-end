import { Geist, Geist_Mono, Roboto } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers/providers"
import { AppMenu } from "@/components/AppMenu"
import { SidebarTrigger } from "@/components/ui/sidebar"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        roboto.variable,
        geistHeading.variable
      )}
    >
      <body>
        <Providers>
          <AppMenu />
          <main className="w-full">
            <SidebarTrigger />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
