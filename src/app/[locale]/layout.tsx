import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import CustomToaster from "@/components/CustomToaster";
import LanguageSwitcher from "@/components/LocaleSwitch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maintenance App",
  description: "Design for General Maintenance.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={[
            "light",
            "dark",
            "red",
            "red-dark",
            "green",
            "green-dark",
            "netflix",
            "netflix-dark",
            "nord",
            "nord-dark",
            "natura",
            "natura-dark",
            "dracula",
            "dracula-dark",
            "laracon-dark",
            "gold",
            "gold-dark",
            "azarath",
            "azarath-dark",
            "poimandres",
            "poimandres-dark",
            "discord",
            "discord-dark",
          ]}
        >
          <CustomToaster />
          <NextIntlClientProvider messages={messages}>
            <main className="flex overflow-x-hidden overflow-y-auto text-foreground bg-background h-screen w-screen ">
              <LanguageSwitcher locale={params.locale} />
              {children}
            </main>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
