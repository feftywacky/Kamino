import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
