import { Geist, Geist_Mono, Roboto } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import "../globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers/providers"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })
const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html
      lang={locale}
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
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
