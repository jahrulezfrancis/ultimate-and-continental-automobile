"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, X } from "lucide-react"

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/95 backdrop-blur-xl py-4 border-b border-amber-500/20" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 group-hover:border-amber-500/80 transition-colors duration-300"></div>
                    <div className="absolute inset-1 rounded-full border border-amber-500/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-light tracking-wider text-amber-400">UC</span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xl font-light text-white tracking-wide">Ultimate & Continental</span>
                    <div className="text-xs text-amber-500 tracking-widest uppercase">Automobile</div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`text-sm uppercase tracking-wider font-light transition-all duration-300 relative ${
                      isActive(item.href) ? "text-amber-500" : "text-gray-300 hover:text-amber-500"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:flex items-center space-x-6"
            >
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-amber-500" />
                <span className="font-light text-white">+2347014052251</span>
              </div>
              <Button
                className="btn-luxury text-black font-medium px-6 h-10 text-sm rounded-none relative overflow-hidden group"
                asChild
              >
                <Link href="/contact">
                  <span className="relative z-10">Book Appointment</span>
                </Link>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-amber-500 transition-colors">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] bg-black/95 backdrop-blur-xl border-amber-500/20 p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
                      <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-8 h-8">
                            <div className="absolute inset-0 rounded-full border-2 border-amber-500/40"></div>
                            <div className="absolute inset-1 rounded-full border border-amber-500/60"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-light tracking-wider text-amber-400">UC</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-lg font-light text-white tracking-wide">Ultimate & Continental</span>
                            <div className="text-xs text-amber-500 tracking-widest uppercase">Automobile</div>
                          </div>
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-amber-500"
                      >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col p-6 space-y-8 flex-1">
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
                              className={`text-lg uppercase tracking-wider font-light flex items-center transition-all duration-300 ${
                                isActive(item.href) ? "text-amber-500" : "text-gray-300 hover:text-amber-500"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {isActive(item.href) && (
                                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-600 mr-4 rounded-full"></div>
                              )}
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </nav>

                    {/* Mobile Footer */}
                    <div className="p-6 border-t border-amber-500/20">
                      <div className="flex items-center mb-6 text-sm">
                        <Phone className="h-5 w-5 text-amber-500 mr-3" />
                        <span className="font-light text-white">+2347014052251</span>
                      </div>
                      <Button className="w-full btn-luxury text-black font-medium h-12 text-sm rounded-none" asChild>
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
    </>
  )
}
