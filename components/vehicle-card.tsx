"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Eye, Heart, Share2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import ComparisonButton from "@/components/comparison-button"
import type { Vehicle } from "@/lib/types"

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card
        className="overflow-hidden bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-500 card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={vehicle.images[0] || "/placeholder.svg"}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {vehicle.featured && (
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700 font-medium">
                Featured
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-colors duration-300 ${
                isLiked ? "text-red-500" : "text-white hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-amber-500 transition-colors duration-300"
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Hover content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <div className="glass p-4 rounded-none border border-amber-500/20">
              <h3 className="font-light text-xl text-white mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-amber-500 font-medium text-2xl">{formatCurrency(vehicle.price)}</p>
            </div>
          </motion.div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="font-light text-xl text-white mb-1">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{vehicle.trim}</p>
            <div className="flex items-center justify-between">
              <span className="font-medium text-2xl gradient-text">{formatCurrency(vehicle.price)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-300">{vehicle.mileage.toLocaleString()} miles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-300">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-300">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-300">{vehicle.exteriorColor}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-zinc-700 text-white hover:bg-zinc-800 hover:text-amber-500 transition-all duration-300 rounded-none bg-transparent"
            >
              <Link href={`/inventory/${vehicle.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Details
              </Link>
            </Button>
            <Button asChild className="flex-1 btn-luxury text-black font-medium rounded-none">
              <Link href={`/inventory/${vehicle.id}`}>
                <span className="relative z-10">View</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <ComparisonButton vehicle={vehicle} className="w-full rounded-none" />
        </CardFooter>
      </Card>
    </motion.div>
  )
}
