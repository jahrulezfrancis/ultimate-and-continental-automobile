"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Car, Shield, PenToolIcon as Tool, Wrench } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-r from-zinc-900 to-black flex items-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-fixed opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Services</h1>
            <div className="w-20 h-1 bg-amber-500 mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Experience unparalleled automotive services tailored to the discerning luxury vehicle owner.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Exclusive Services</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            At Ultimate and Continental Automobile, we offer a comprehensive suite of premium services designed to enhance your ownership
            experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Bespoke Acquisition",
              description: "We source the exact vehicle you desire, regardless of global location or rarity.",
              icon: <Car className="h-10 w-10 text-amber-500" />,
              comingSoon: false,
            },
            {
              title: "Concierge Maintenance",
              description: "Our team handles all service needs with door-to-door collection and delivery.",
              icon: <Tool className="h-10 w-10 text-amber-500" />,
              comingSoon: true,
            },
            {
              title: "Private Showings",
              description: "Experience vehicles in complete privacy at our exclusive showroom or your location.",
              icon: <Calendar className="h-10 w-10 text-amber-500" />,
              comingSoon: false,
            },
            {
              title: "Vehicle Customization",
              description: "Transform your vehicle with bespoke modifications and personalization options.",
              icon: <Wrench className="h-10 w-10 text-amber-500" />,
              comingSoon: true,
            },
            {
              title: "Extended Warranty",
              description: "Comprehensive coverage options to protect your investment for years to come.",
              icon: <Shield className="h-10 w-10 text-amber-500" />,
              comingSoon: true,
            },
            {
              title: "Global Transport",
              description: "Secure, insured transportation of your vehicle to any destination worldwide.",
              icon: (
                <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              ),
              comingSoon: true,
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="bg-zinc-800 w-20 h-20 rounded-sm flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>

                    {service.comingSoon ? (
                      <div className="bg-zinc-800/50 border border-zinc-700 p-3 inline-block">
                        <p className="text-amber-500 text-sm font-medium">Coming Soon</p>
                      </div>
                    ) : (
                      <Button variant="link" className="text-amber-500 p-0 h-auto" asChild>
                        <Link href="/contact">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-zinc-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-black border border-zinc-800 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Need Personalized Assistance?</h3>
                <p className="text-gray-300 mb-6">
                  Our team of luxury automotive specialists is ready to assist with your specific requirements.
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black" asChild>
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
              </div>
              <div className="md:w-1/3 relative h-40 md:h-auto">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Luxury car service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
