import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ComparisonFloatingBar from "@/components/comparison-floating-bar"
import { Toaster } from "@/components/ui/toaster"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Ultimate and Continental Automobile | Exotic Car Dealership in Abuja",
  description:
    "Experience the extraordinary with Ultimate and Continental Automobile's curated collection of the world's finest exotic vehicles in Abuja.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ScrollToTop />
        <main>{children}</main>
        <Footer />
        <ComparisonFloatingBar />
        <Toaster />
      </body>
    </html>
  )
}
