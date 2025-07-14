"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useComparisonStore } from "@/lib/stores/comparison-store"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Check, X, AlertTriangle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Vehicle } from "@/lib/types"

export default function ComparisonPage() {
  const router = useRouter()
  const { comparisonList, removeVehicle } = useComparisonStore()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if no vehicles to compare
  useEffect(() => {
    if (mounted && comparisonList.length < 2) {
      router.push("/inventory")
    }
  }, [mounted, comparisonList, router])

  if (!mounted || comparisonList.length < 2) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Select vehicles to compare</h1>
          <p className="text-gray-400 mb-6">Please select at least 2 vehicles to compare.</p>
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
            <Link href="/inventory">Browse Inventory</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get all unique specification keys from all vehicles
  const getSpecsKeys = () => {
    const keys = new Set<string>()
    comparisonList.forEach((vehicle) => {
      keys.add("make")
      keys.add("model")
      keys.add("year")
      keys.add("trim")
      keys.add("price")
      keys.add("mileage")
      keys.add("exteriorColor")
      keys.add("interiorColor")
      keys.add("fuelType")
      keys.add("transmission")
      keys.add("engine")
      keys.add("vin")
      keys.add("stockNumber")
    })
    return Array.from(keys)
  }

  // Get all unique feature keys from all vehicles
  const getFeaturesKeys = () => {
    const allFeatures = new Set<string>()
    comparisonList.forEach((vehicle) => {
      vehicle.features.forEach((feature) => {
        allFeatures.add(feature)
      })
    })
    return Array.from(allFeatures).sort()
  }

  // Format specification value based on key
  const formatSpecValue = (vehicle: Vehicle, key: string) => {
    switch (key) {
      case "price":
        return formatCurrency(vehicle.price)
      case "mileage":
        return `${vehicle.mileage.toLocaleString()} miles`
      default:
        return vehicle[key as keyof Vehicle]?.toString() || "—"
    }
  }

  // Check if a vehicle has a specific feature
  const hasFeature = (vehicle: Vehicle, feature: string) => {
    return vehicle.features.includes(feature)
  }

  // Format specification label
  const formatSpecLabel = (key: string) => {
    switch (key) {
      case "exteriorColor":
        return "Exterior Color"
      case "interiorColor":
        return "Interior Color"
      case "fuelType":
        return "Fuel Type"
      case "stockNumber":
        return "Stock Number"
      default:
        return key.charAt(0).toUpperCase() + key.slice(1)
    }
  }

  const specsKeys = getSpecsKeys()
  const featuresKeys = getFeaturesKeys()

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/inventory" className="flex items-center text-amber-500 hover:text-amber-400">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Inventory
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Vehicle Comparison</h1>
          <div className="w-20 h-1 bg-amber-500 mb-8"></div>

          <div className="bg-zinc-900 border border-zinc-800 mb-8">
            <div className="grid grid-cols-4">
              {/* Header column */}
              <div className="p-6 border-r border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-4">Comparing {comparisonList.length} Vehicles</h2>
                <p className="text-gray-400 text-sm">
                  Compare specifications and features side by side to find your perfect exotic vehicle.
                </p>
              </div>

              {/* Vehicle columns */}
              {comparisonList.map((vehicle, index) => (
                <div key={vehicle.id} className="p-6 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => removeVehicle(vehicle.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="relative aspect-[16/9] mb-4">
                    <Image
                      src={vehicle.images[0] || "/placeholder.svg"}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>

                  <h3 className="font-bold text-lg text-white mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{vehicle.trim}</p>
                  <p className="text-2xl font-bold text-amber-500 mb-4">{formatCurrency(vehicle.price)}</p>

                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black" asChild>
                    <Link href={`/inventory/${vehicle.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 rounded-none mb-6">
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-none"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-none"
              >
                Features
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-0">
              <div className="bg-zinc-900 border border-zinc-800">
                {specsKeys.map((key, i) => (
                  <div key={key} className={`grid grid-cols-4 ${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800/30"}`}>
                    <div className="p-4 font-medium text-white border-r border-zinc-800">{formatSpecLabel(key)}</div>

                    {comparisonList.map((vehicle) => {
                      const value = formatSpecValue(vehicle, key)
                      const isHighlight =
                        (key === "price" && vehicle.price === Math.min(...comparisonList.map((v) => v.price))) ||
                        (key === "mileage" && vehicle.mileage === Math.min(...comparisonList.map((v) => v.mileage))) ||
                        (key === "year" && vehicle.year === Math.max(...comparisonList.map((v) => v.year)))

                      return (
                        <div
                          key={`${vehicle.id}-${key}`}
                          className={`p-4 ${isHighlight ? "text-amber-500 font-medium" : "text-gray-300"}`}
                        >
                          {value}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              <div className="bg-zinc-900 border border-zinc-800">
                {featuresKeys.map((feature, i) => (
                  <div key={feature} className={`grid grid-cols-4 ${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800/30"}`}>
                    <div className="p-4 font-medium text-white border-r border-zinc-800">{feature}</div>

                    {comparisonList.map((vehicle) => (
                      <div key={`${vehicle.id}-${feature}`} className="p-4 text-center">
                        {hasFeature(vehicle, feature) ? (
                          <Check className="h-5 w-5 text-amber-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500 mx-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
