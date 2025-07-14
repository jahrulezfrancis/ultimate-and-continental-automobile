"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, X } from "lucide-react"
import HeaderLogo from "../public/header_logo1.png"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Function to check if a link is active
  const isActive = (href: string) => {
    // Exact match for home page
    if (href === "/") {
      return pathname === "/"
    }
    // For other pages, check if the pathname starts with the href
    // This handles nested routes like /inventory/[id]
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              {/* Ultimate and Continental <span className="text-amber-500">Automobile</span> */}
              <Image src={HeaderLogo.src} width={200} height={70} objectFit="contain" alt="Ultimate and Continental Automobile Logo" className="ml-2 h-8 w-auto" /> 
            </motion.span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`text-gray-300 hover:text-amber-500 transition-colors duration-200 text-sm uppercase tracking-wider font-medium ${isActive(item.href) ? "text-amber-500" : ""
                    }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-4"
          >
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-amber-500 mr-2" />
              <span className="font-medium text-white">+2347014052251</span>
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-none" asChild>
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </motion.div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-black border-zinc-800 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                      <span className="text-xl font-bold text-white">
                        Ultimate and Continental <span className="text-amber-500">Automobile</span>
                      </span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  <nav className="flex flex-col p-6 space-y-6 flex-1">
                    <AnimatePresence>
                      {navigation.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                        >
                          <Link
                            href={item.href}
                            className={`text-gray-300 hover:text-amber-500 transition-colors duration-200 text-lg uppercase tracking-wider font-medium flex items-center ${isActive(item.href) ? "text-amber-500" : ""
                              }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {isActive(item.href) && <div className="w-1 h-6 bg-amber-500 mr-3"></div>}
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </nav>

                  <div className="p-6 border-t border-zinc-800">
                    <div className="flex items-center mb-6">
                      <Phone className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="font-medium text-white">+2347014052251</span>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black rounded-none" asChild>
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
