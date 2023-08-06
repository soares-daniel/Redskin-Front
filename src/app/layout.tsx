import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dev_PRD-dash",
  description: "by Dev_PRD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <body className={inter.className}>{children}</body>
      </body>
    </html>
  );
}
