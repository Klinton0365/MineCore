import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { EnquiryCartProvider } from "@/components/providers/EnquiryCartProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </EnquiryCartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
