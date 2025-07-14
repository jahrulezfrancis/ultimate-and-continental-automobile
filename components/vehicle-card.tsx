"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import ComparisonButton from "@/components/comparison-button"
import type { Vehicle } from "@/lib/types"

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden bg-zinc-900 border-zinc-800 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={vehicle.images[0] || "/placeholder.svg"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {vehicle.featured && (
          <Badge className="absolute top-3 left-3 z-10 bg-amber-500 text-black hover:bg-amber-600">Featured</Badge>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-lg text-white mb-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-amber-500 font-bold text-xl">{formatCurrency(vehicle.price)}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-lg text-white">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <span className="font-bold text-lg text-amber-500">{formatCurrency(vehicle.price)}</span>
        </div>
        <p className="text-sm text-gray-400 mb-4">{vehicle.trim}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
            <span>{vehicle.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
            <span>{vehicle.fuelType}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-zinc-700 text-white hover:bg-zinc-800 hover:text-amber-500"
          >
            <Link href={`/inventory/${vehicle.id}`}>
              <Eye className="h-4 w-4 mr-2" /> Details
            </Link>
          </Button>
          <Button asChild className="flex-1 bg-amber-500 hover:bg-amber-600 text-black">
            <Link href={`/inventory/${vehicle.id}`}>
              <ArrowRight className="h-4 w-4 mr-2" /> View
            </Link>
          </Button>
        </div>

        <ComparisonButton vehicle={vehicle} className="w-full" />
      </CardFooter>
    </Card>
  )
}
