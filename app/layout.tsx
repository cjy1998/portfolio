import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopMenus } from "@/components/TopMenus";
import { ThemeProvider } from "@/components/ThemeProvider";
import AiAssistant from "@/components/ai";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "@/i18n/locale";

const HTML_LANG: Record<string, string> = {
  cn: "zh-CN",
  en: "en",
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cjy Portfolio",
  description: "blog、Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={HTML_LANG[locale] ?? "en"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopMenus></TopMenus>
            {children}
            <AiAssistant />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
