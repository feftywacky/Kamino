import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from '../components/providers/light-dark-provider'
import { ModalProvider } from "@/components/providers/modal-provider";
import { ConvexClientProvider } from '../components/providers/convex-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kamino",
  description: "Productivity tools for students and professionals",
  // icons: [
  //   {
  //     media: "(prefers-color-scheme: light)",
  //     rel: "icon",
  //     href: "/logo.svg",
  //   },
  //   {
  //     media: "(prefers-color-scheme: dark)",
  //     rel: "icon",
  //     href: "/logo-dark.svg",
  //   },
  // ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="kamino-theme"
        >
          <Toaster position="top-center"/>
          <ModalProvider />
          {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
