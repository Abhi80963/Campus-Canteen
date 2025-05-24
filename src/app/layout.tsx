// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Canteen",
  description: "College Cafeteria Food Ordering App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <Navbar />
        <div>
          {children}
        </div>
        <CartDrawer />
        <Toaster richColors position="top-center" />
        <Footer/>
      </body>
    </html>
  );
}

