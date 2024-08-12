import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from '../components/providers/light-dark-provider'
import { ModalProvider } from "@/components/providers/modal-provider";
import { ConvexClientProvider } from '../components/providers/convex-provider'
import { Toaster } from 'sonner'
import { EdgeStoreProvider } from '../lib/edgestore';

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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
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
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}