"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import VehicleCard from "@/components/vehicle-card"
import { vehicles } from "@/lib/data"

export default function FeaturedVehicles() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Get 3 featured vehicles
  const featuredVehicles = vehicles.filter((vehicle) => vehicle.featured).slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid md:grid-cols-3 gap-8"
    >
      {featuredVehicles.map((vehicle, index) => (
        <motion.div key={vehicle.id} variants={itemVariants}>
          <VehicleCard vehicle={vehicle} />
        </motion.div>
      ))}
    </motion.div>
  )
}
