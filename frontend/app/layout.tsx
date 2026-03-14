import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { EnquiryCartProvider } from "@/components/providers/EnquiryCartProvider";
import { LayoutShell } from "@/components/layout/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MineCore Global | Underground & Surface Mining Equipment",
  description: "MineCore Global — Premium mining equipment with real-time inventory, global stock visibility, and seamless enquiry management across India, UAE, and UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <EnquiryCartProvider>
            <LayoutShell>{children}</LayoutShell>
          </EnquiryCartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
