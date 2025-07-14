"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import FeaturedVehicles from "@/components/featured-vehicles"
import { cn } from "@/lib/utils"
import CompanyLandscape from "../public/kefiano_autos_landscape.jpg"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  useEffect(() => {
    setIsLoaded(true)

    // Handle video loading
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setVideoLoaded(true)
      })
    }

    // Attempt to play the video (needed for some browsers)
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play()
        } catch (error) {
          console.error("Video autoplay failed:", error)
        }
      }
    }

    playVideo()

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", () => {
          setVideoLoaded(true)
        })
      }
    }
  }, [])

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  if (windowSize.width === 0) return null;

  return (
    <div
      className={cn(
        "min-h-screen bg-black text-white transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Luxury background with premium car video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-20"></div>

          {/* Video Background */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              videoLoaded ? "opacity-60" : "opacity-0",
            )}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            >
              <source
                src="https://res.cloudinary.com/dsaaffacl/video/upload/v1746878940/AQPFaenb85JYviRwuMxDXspN4fl0YtW8DGZ1qHyEwDfbtjiAJ_WDg6vrftCGDf-Nm9iqVq9eibTxVApqEVvkomf1_vsdhmx.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Fallback image while video loads */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              videoLoaded ? "opacity-0" : "opacity-60",
            )}
          >
            <Image
              src="https://cdn.pixabay.com/photo/2024/07/13/07/40/car-8891627_1280.jpg?height=1080&width=1920"
              alt="Luxury vehicle"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Premium animated elements */}
        <div className="absolute inset-0 z-10">
          {/* Elegant particle system */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
                initial={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [null, Math.random() * 0.3 + 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Premium gold accent lines */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          </div>

          {/* Cinematic light rays */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: 1,
                opacity: [0, 0.6, 0],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                  ease: "easeInOut",
                },
              }}
            />
            <motion.div
              className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: 1,
                opacity: [0, 0.6, 0],
                transition: {
                  duration: 2,
                  delay: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                  ease: "easeInOut",
                },
              }}
            />
          </div>

          {/* Luxury brand emblem effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-amber-500/10 opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [0.8, 1, 0.8],
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="container mx-auto px-4 relative z-30 text-center"
        >
          {/* Luxury brand emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative w-24 h-24 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/30"></div>
            <div className="absolute inset-2 rounded-full border border-amber-500/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-light tracking-widest text-amber-400">K</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ borderWidth: 1, borderColor: "rgba(217, 119, 6, 0.1)" }}
              animate={{
                borderWidth: [1, 2, 1],
                borderColor: ["rgba(217, 119, 6, 0.1)", "rgba(217, 119, 6, 0.3)", "rgba(217, 119, 6, 0.1)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Elegant heading with premium animation */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter relative z-10"
            >
              <motion.span
                className="block mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                EXOTIC
              </motion.span>
              <motion.div
                className="h-px w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                PERFECTION
              </motion.span>
            </motion.h1>

            {/* Luxury accent elements */}
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light tracking-wide"
            >
            Experience the extraordinary with Ultimate and Continental Automobile's curated collection of the world's finest exotic vehicles.
            </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium px-8 h-14 rounded-none"
              asChild
            >
              <Link href="/inventory">Explore Collection</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500/10 h-14 rounded-none"
              asChild
            >
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </motion.div>

        </motion.div>
      </section>

      {/* Featured Vehicles */}
      <section ref={featuredRef} className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-fixed opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-16"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Masterpieces</h2>
              <div className="w-20 h-1 bg-amber-500"></div>
            </div>
            <Button variant="ghost" className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10" asChild>
              <Link href="/inventory" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <FeaturedVehicles />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('')] bg-fixed opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ultimate and Continental Experience</h2>
              <div className="w-20 h-1 bg-amber-500 mb-8"></div>
                <p className="text-gray-300 mb-6 text-lg">
                At Ultimate and Continental Automobile, based in Jos, we redefine luxury car acquisition. Our curated collection represents the pinnacle of automotive engineering and design, carefully selected for the most discerning clients in Jos and beyond.
                </p>
              <p className="text-gray-300 mb-8 text-lg">
                Each vehicle in our collection undergoes rigorous authentication and inspection, ensuring you receive
                nothing short of perfection. Our concierge service handles every aspect of your acquisition, from
                personalized viewings to seamless delivery.
              </p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 h-12 rounded-none" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent z-10"></div>
                <Image
                  src={CompanyLandscape || "/placeholder.svg"}
                  alt="Luxury car showroom"
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
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Exceptional Services</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Beyond acquisition, we offer a comprehensive suite of services designed to enhance your ownership
              experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Bespoke Acquisition",
                description: "We source the exact vehicle you desire, regardless of global location or rarity.",
                icon: (
                  <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Concierge Maintenance",
                description: "Our team handles all service needs with door-to-door collection and delivery.",
                icon: (
                  <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Private Showings",
                description: "Experience vehicles in complete privacy at our exclusive showroom or your location.",
                icon: (
                  <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ),
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900 p-8 group hover:bg-zinc-800 transition-all duration-300"
              >
                <div className="bg-zinc-800 group-hover:bg-black w-16 h-16 rounded-sm flex items-center justify-center mb-6 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-900 relative">
        <div className="absolute inset-0 bg-[url('/images/luxury-interior.png')] bg-fixed opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
              quote:
                "Ultimate and Continental Automobile transformed my car buying experience. Their attention to detail and personalized service is unmatched in Jos.",
              author: "Ahmed K.",
              title: "CEO, Nexus Technologies",
              },
              {
              quote:
                "The team at Ultimate and Continental sourced a rare Ferrari that I had been searching for globally. Their network and expertise are truly exceptional.",
              author: "Sarah O.",
              title: "Executive Director",
              },
              {
              quote:
                "From selection to delivery, the process was flawless. Ultimate and Continental Automobile represents the pinnacle of luxury automotive service.",
              author: "Michael T.",
              title: "Property Developer",
              },
            ].map((testimonial, i) => (
              <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-black p-8 border border-zinc-800"
              >
              <div className="flex items-center text-amber-500 mb-6">
                {[...Array(5)].map((_, j) => (
                <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.title}</p>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-black"></div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute -right-40 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500 blur-3xl"
        ></motion.div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to Experience <span className="text-amber-500">Automotive Excellence?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-10"
            >
              Schedule a private consultation with our team to discover the perfect addition to your collection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 h-14 rounded-none"
                asChild
              >
                <Link href="/contact">Book Appointment</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500/10 h-14 rounded-none"
                asChild
              >
                <Link href="/inventory">Explore Collection</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
