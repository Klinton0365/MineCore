import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { EnquiryCartProvider } from "@/components/providers/EnquiryCartProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LayoutShell } from "@/components/layout/LayoutShell";

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
    <html lang="en" data-theme="dark">
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <EnquiryCartProvider>
              <LayoutShell>{children}</LayoutShell>
            </EnquiryCartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
