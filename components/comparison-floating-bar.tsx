"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useComparisonStore } from "@/lib/stores/comparison-store"
import { Button } from "@/components/ui/button"
import { X, Scale, ChevronUp, ChevronDown } from "lucide-react"

export default function ComparisonFloatingBar() {
  const [mounted, setMounted] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Get store after hydration
  const { comparisonList, removeVehicle, clearComparison } = useComparisonStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Initialize the store
    if (typeof window !== "undefined") {
      useComparisonStore.persist.rehydrate()
    }
  }, [])

  useEffect(() => {
    // Only show the bar if there are vehicles to compare and we're mounted
    setIsVisible(mounted && comparisonList.length > 0)
  }, [mounted, comparisonList])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 shadow-2xl"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {isCollapsed ? "Show" : "Hide"}
            </Button>

            <div className="flex items-center">
              <Scale className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-white font-medium">Compare Vehicles ({comparisonList.length}/3)</span>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-400" onClick={clearComparison}>
              Clear All
            </Button>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-4 py-4">
                  {[...Array(3)].map((_, index) => {
                    const vehicle = comparisonList[index]

                    return (
                      <div key={index} className="bg-black border border-zinc-800 rounded-sm p-3 relative">
                        {vehicle ? (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-white"
                              onClick={() => removeVehicle(vehicle.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center space-x-3">
                              <div className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                  src={vehicle.images[0] || "/placeholder.svg"}
                                  alt={vehicle.model}
                                  fill
                                  className="object-cover rounded-sm"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-sm truncate">
                                  {vehicle.year} {vehicle.make}
                                </h4>
                                <p className="text-gray-400 text-xs truncate">{vehicle.model}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="h-16 flex items-center justify-center text-gray-500 text-sm">
                            Select a vehicle to compare
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-center pb-4">
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                    disabled={comparisonList.length < 2}
                    asChild
                  >
                    <Link href="/comparison">
                      <Scale className="h-4 w-4 mr-2" />
                      Compare Now
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
