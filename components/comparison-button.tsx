"use client"

import { useState, useEffect } from "react"
import { useComparisonStore } from "@/lib/stores/comparison-store"
import { Button } from "@/components/ui/button"
import { Scale } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Vehicle } from "@/lib/types"

interface ComparisonButtonProps {
  vehicle: Vehicle
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function ComparisonButton({
  vehicle,
  variant = "outline",
  size = "default",
  className = "",
}: ComparisonButtonProps) {
  const [mounted, setMounted] = useState(false)

  // Get store after hydration
  const { addVehicle, removeVehicle, comparisonList } = useComparisonStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Initialize the store
    if (typeof window !== "undefined") {
      useComparisonStore.persist.rehydrate()
    }
  }, [])

  const isInComparison = mounted && comparisonList.some((v) => v.id === vehicle.id)

  const handleToggleComparison = () => {
    if (!mounted) return

    if (isInComparison) {
      removeVehicle(vehicle.id)
      toast({
        title: "Vehicle removed from comparison",
        description: `${vehicle.year} ${vehicle.make} ${vehicle.model} has been removed from your comparison list.`,
        variant: "default",
      })
    } else {
      if (comparisonList.length >= 3) {
        toast({
          title: "Comparison list is full",
          description: "You can compare up to 3 vehicles at a time. Please remove a vehicle before adding another.",
          variant: "destructive",
        })
        return
      }

      addVehicle(vehicle)
      toast({
        title: "Vehicle added to comparison",
        description: `${vehicle.year} ${vehicle.make} ${vehicle.model} has been added to your comparison list.`,
        variant: "default",
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleComparison}
      className={`${className} ${isInComparison ? "bg-amber-500 text-black hover:bg-amber-600 border-amber-500" : ""}`}
    >
      <Scale className="h-4 w-4 mr-2" />
      {isInComparison ? "Remove from Comparison" : "Add to Comparison"}
    </Button>
  )
}
