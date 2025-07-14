"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { vehicles } from "@/lib/data"
import VehicleCard from "@/components/vehicle-card"
import { formatCurrency } from "@/lib/utils"
import type { Vehicle } from "@/lib/types"
import { Filter, Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function InventoryPage() {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [yearRange, setYearRange] = useState([2010, 2024])
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Get unique makes
  const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort()

  // Get min and max prices
  const minPrice = Math.min(...vehicles.map((v) => v.price))
  const maxPrice = Math.max(...vehicles.map((v) => v.price))

  // Get min and max years
  const minYear = Math.min(...vehicles.map((v) => v.year))
  const maxYear = Math.max(...vehicles.map((v) => v.year))

  const handleSearch = () => {
    let results = vehicles

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (vehicle) =>
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          vehicle.trim.toLowerCase().includes(query) ||
          vehicle.year.toString().includes(query),
      )
    }

    // Filter by price range
    results = results.filter((vehicle) => vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1])

    // Filter by year range
    results = results.filter((vehicle) => vehicle.year >= yearRange[0] && vehicle.year <= yearRange[1])

    // Filter by makes
    if (selectedMakes.length > 0) {
      results = results.filter((vehicle) => selectedMakes.includes(vehicle.make))
    }

    setFilteredVehicles(results)

    // Scroll to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([minPrice, maxPrice])
    setYearRange([minYear, maxYear])
    setSelectedMakes([])
    setFilteredVehicles(vehicles)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="relative w-full h-[40vh] bg-gradient-to-r from-zinc-900 to-black flex items-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-fixed opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exotic Collection</h1>
            <div className="w-20 h-1 bg-amber-500 mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Explore our curated selection of the world's most exceptional vehicles, each representing the pinnacle of
              automotive engineering and design.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar - Always visible */}
          <div className="w-full">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by make, model, year..."
                  className="pl-10 h-12 bg-zinc-900 border-zinc-800 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-12 bg-amber-500 hover:bg-amber-600 text-black" onClick={handleSearch}>
                Search
              </Button>
              <Button
                variant="outline"
                className="h-12 lg:hidden border-zinc-700 text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Collapsible on mobile */}
          <div className={`w-full lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-amber-500 hover:text-amber-400 hover:bg-transparent"
                  >
                    Reset
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="price" className="border-zinc-800">
                    <AccordionTrigger className="text-white hover:text-amber-500">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[minPrice, maxPrice]}
                          min={minPrice}
                          max={maxPrice}
                          step={1000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="[&>span]:bg-amber-500 my-2"
                        />
                        <div className="flex items-center justify-between text-gray-300">
                          <span>{formatCurrency(priceRange[0])}</span>
                          <span>{formatCurrency(priceRange[1])}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="year" className="border-zinc-800">
                    <AccordionTrigger className="text-white hover:text-amber-500">Year Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[minYear, maxYear]}
                          min={minYear}
                          max={maxYear}
                          step={1}
                          value={yearRange}
                          onValueChange={setYearRange}
                          className="[&>span]:bg-amber-500 my-2"
                        />
                        <div className="flex items-center justify-between text-gray-300">
                          <span>{yearRange[0]}</span>
                          <span>{yearRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="make" className="border-zinc-800">
                    <AccordionTrigger className="text-white hover:text-amber-500">Make</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {makes.map((make) => (
                          <div key={make} className="flex items-center space-x-2">
                            <Checkbox
                              id={`make-${make}`}
                              checked={selectedMakes.includes(make)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedMakes([...selectedMakes, make])
                                } else {
                                  setSelectedMakes(selectedMakes.filter((m) => m !== make))
                                }
                              }}
                              className="border-zinc-700 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label htmlFor={`make-${make}`} className="text-gray-300">
                              {make}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-black" onClick={handleSearch}>
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4" ref={resultsRef}>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">Showing {filteredVehicles.length} vehicles</p>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredVehicles.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 bg-zinc-900 border border-zinc-800"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">No vehicles found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
                <Button onClick={resetFilters} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
