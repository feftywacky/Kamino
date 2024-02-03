import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/light-dark-provider";
import { ConvexClientProvider } from "@/components/convex-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kamino",
  description: "Productivity tools for students and professionals",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      rel: "icon",
      href: "/logo.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      rel: "icon",
      href: "/logo-dark.svg",
    },
  ],
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
          {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
