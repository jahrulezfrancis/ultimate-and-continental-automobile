"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, Car } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-12 w-12 text-amber-500" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-amber-500"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-500">Page Not Found</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-8 mb-10"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Looking for something specific?</h3>
            <p className="text-gray-300 mb-6">
              Explore our collection of exotic vehicles or contact our team for personalized assistance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black p-4 border border-zinc-800 flex items-center">
                <Car className="h-8 w-8 text-amber-500 mr-4" />
                <div>
                  <h4 className="font-medium text-white">Exotic Collection</h4>
                  <p className="text-gray-400 text-sm">Discover our curated selection of luxury vehicles</p>
                </div>
              </div>
              <div className="bg-black p-4 border border-zinc-800 flex items-center">
                <svg className="h-8 w-8 text-amber-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-white">Concierge Service</h4>
                  <p className="text-gray-400 text-sm">Personalized assistance for your automotive needs</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 h-14 rounded-none"
              asChild
            >
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500/10 h-14 rounded-none"
              asChild
            >
              <Link href="/inventory">
                <Car className="h-5 w-5 mr-2" />
                Browse Inventory
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
