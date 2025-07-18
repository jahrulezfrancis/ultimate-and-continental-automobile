"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Info,
  MapPin,
  Share2,
  Sliders,
  ViewIcon as View360,
  X,
} from "lucide-react"
import { vehicles } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import ComparisonButton from "@/components/comparison-button"

export default function VehicleDetailPage() {
  // Use the useParams hook instead of receiving params as a prop
  const params = useParams()
  const [vehicle, setVehicle] = useState<(typeof vehicles)[0] | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [show3DMessage, setShow3DMessage] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  // Find the vehicle once params are available
  useEffect(() => {
    if (params?.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      const foundVehicle = vehicles.find((v) => v.id === id)
      setVehicle(foundVehicle)
      setLoading(false)
    }
  }, [params])

  // Handle case where vehicle isn't found
  useEffect(() => {
    if (!loading && !vehicle) {
      notFound()
    }
  }, [vehicle, loading])

  // If still loading, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading vehicle details...</p>
        </div>
      </div>
    )
  }

  // If vehicle is not found after loading, this will be caught by the notFound() in the useEffect

  const nextImage = () => {
    if (!vehicle) return
    setActiveImageIndex((prev) => (prev === vehicle.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!vehicle) return
    setActiveImageIndex((prev) => (prev === 0 ? vehicle.images.length - 1 : prev - 1))
  }

  const selectImage = (index: number) => {
    setActiveImageIndex(index)
  }

  const toggle3DMessage = () => {
    setShow3DMessage(!show3DMessage)
    if (!show3DMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Safety check - should never happen due to the notFound() call, but TypeScript needs this
  if (!vehicle) return null

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/inventory" className="flex items-center text-amber-500 hover:text-amber-400">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Inventory
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-4 bg-zinc-900">
              {!show3DMessage ? (
                <>
                  <Image
                    src={vehicle.images[activeImageIndex] || "/placeholder.svg?height=500&width=800"}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    priority={activeImageIndex === 0} // Prioritize loading the first image
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100 bg-black/50 hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100 bg-black/50 hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                    onClick={toggle3DMessage}
                  >
                    <View360 className="h-5 w-5 mr-2" /> View in 3D
                  </Button>
                </>
              ) : (
                <div ref={messageRef} className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center p-8 max-w-md"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        onClick={toggle3DMessage}
                      >
                        <X className="h-5 w-5" />
                      </Button>

                      <div className="mb-6">
                        <View360 className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                        <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">3D Viewing Experience</h3>

                      <p className="text-gray-300 mb-6">
                        We're crafting an immersive 3D experience that will allow you to explore this {vehicle.year}{" "}
                        {vehicle.make} {vehicle.model} in stunning detail.
                      </p>

                      <div className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-sm mb-6">
                        <p className="text-amber-500 font-medium">Coming Soon</p>
                        <p className="text-gray-400 text-sm">
                          Our team is putting the finishing touches on this premium feature.
                        </p>
                      </div>

                      <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={toggle3DMessage}>
                        Return to Gallery
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {!show3DMessage && (
              <div className="flex overflow-x-auto gap-2 pb-2">
                {vehicle.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-24 flex-shrink-0 cursor-pointer rounded-sm overflow-hidden border-2 ${
                      index === activeImageIndex ? "border-amber-500" : "border-transparent"
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="grid grid-cols-3 bg-zinc-900 rounded-none">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-none"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-none"
                >
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Vehicle Description</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{vehicle.description}</p>
              </TabsContent>
              <TabsContent value="features" className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Key Features</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specs" className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Vehicle Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {[
                      { label: "Make", value: vehicle.make },
                      { label: "Model", value: vehicle.model },
                      { label: "Year", value: vehicle.year },
                      { label: "Trim", value: vehicle.trim },
                      { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} miles` },
                    ].map((item, i) => (
                      <div key={i} className="flex border-b border-zinc-800 pb-2">
                        <div className="font-medium text-gray-400 w-1/3">{item.label}:</div>
                        <div className="text-white w-2/3">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Exterior Color", value: vehicle.exteriorColor },
                      { label: "Interior Color", value: vehicle.interiorColor },
                      { label: "Fuel Type", value: vehicle.fuelType },
                      { label: "Transmission", value: vehicle.transmission },
                      { label: "Engine", value: vehicle.engine },
                    ].map((item, i) => (
                      <div key={i} className="flex border-b border-zinc-800 pb-2">
                        <div className="font-medium text-gray-400 w-1/3">{item.label}:</div>
                        <div className="text-white w-2/3">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Details and Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900 border border-zinc-800 p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-2">
                <Badge variant="outline" className="text-sm font-normal border-amber-500 text-amber-500">
                  Stock# {vehicle.stockNumber}
                </Badge>
              </div>

              <p className="text-lg text-gray-400 mb-6">{vehicle.trim}</p>

              <div className="text-3xl font-bold text-amber-500 mb-6">{formatCurrency(vehicle.price)}</div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                  <span className="text-gray-300">{vehicle.mileage.toLocaleString()} miles</span>
                </div>
                <div className="flex items-center">
                  <Fuel className="h-5 w-5 mr-2 text-amber-500" />
                  <span className="text-gray-300">{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center">
                  <Sliders className="h-5 w-5 mr-2 text-amber-500" />
                  <span className="text-gray-300">{vehicle.transmission}</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-amber-500" />
                  <span className="text-gray-300">{vehicle.engine}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black rounded-none h-12"
                  size="lg"
                  asChild
                >
                  <Link href={`/contact?vehicle=${vehicle.id}`}>Contact Dealer</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-amber-500 text-amber-500 hover:bg-amber-500/10 rounded-none h-12"
                  size="lg"
                  asChild
                >
                  <Link href={`/contact?vehicle=${vehicle.id}&action=test-drive`}>
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Test Drive
                  </Link>
                </Button>
                <ComparisonButton vehicle={vehicle} className="w-full rounded-none h-12" size="lg" />
                <Button
                  variant="secondary"
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-none h-12"
                  size="lg"
                >
                  <Info className="h-5 w-5 mr-2" />
                  Request More Info
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
