"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Clock, Users } from "lucide-react"

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Ultimate and Continental Automobile</h1>
            <div className="w-20 h-1 bg-amber-500 mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Redefining luxury automotive acquisition in Jos with a curated collection of the world's most
              exceptional vehicles.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-amber-500 mb-8"></div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded in 2009, Ultimate and Continental Automobile was born from a passion for automotive excellence and a vision to bring the
              world's most exceptional vehicles to discerning clients in Nigeria.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              What began as a boutique dealership has evolved into Jos's premier destination for luxury and exotic
              vehicles, with a reputation built on uncompromising quality, integrity, and personalized service.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Today, we continue to push boundaries in the luxury automotive space, offering not just extraordinary
              vehicles, but comprehensive ownership experiences tailored to the unique preferences of each client.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent z-10"></div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Ultimate and Continental Automobile showroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-black p-4 flex flex-col justify-center">
              <p className="text-5xl font-bold text-amber-500">15+</p>
              <p className="text-gray-300">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-zinc-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These principles guide every aspect of our business, from vehicle selection to client relationships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We are committed to excellence in every aspect of our business, from the vehicles we select to the service we provide.",
                icon: <Award className="h-10 w-10 text-amber-500" />,
              },
              {
                title: "Integrity",
                description:
                  "We operate with complete transparency and honesty, building lasting relationships based on trust and mutual respect.",
                icon: (
                  <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                title: "Client-Focused",
                description:
                  "We place our clients at the center of everything we do, tailoring our approach to meet their unique needs and preferences.",
                icon: <Users className="h-10 w-10 text-amber-500" />,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black p-8 border border-zinc-800"
              >
                <div className="bg-zinc-900 w-20 h-20 flex items-center justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section - Coming Soon */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-8 text-center">
          <Clock className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
          <p className="text-gray-300 mb-8">
            We're currently updating this section with profiles of our exceptional team members who make Ultimate and Continental Automobile
            the premier luxury automotive destination in Jos.
          </p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black" asChild>
            <Link href="/contact">
              Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-zinc-900 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Ultimate and Continental Difference</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit our showroom to discover our curated collection of the world's most exceptional vehicles.
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black px-8 h-14" asChild>
              <Link href="/inventory">Explore Our Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
