"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play, Star, Award, Users, Car } from "lucide-react"
import FeaturedVehicles from "@/components/featured-vehicles"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setVideoLoaded(true)
      })
    }

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
      window.removeEventListener("mousemove", handleMouseMove)
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", () => {
          setVideoLoaded(true)
        })
      }
    }
  }, [])

  const stats = [
    { number: "15+", label: "Years of Excellence", icon: Award },
    { number: "500+", label: "Satisfied Clients", icon: Users },
    { number: "200+", label: "Exotic Vehicles Sold", icon: Car },
    { number: "5", label: "Star Rating", icon: Star },
  ]

  return (
    <div
      className={cn(
        "min-h-screen bg-black text-white transition-opacity duration-1000 noise-overlay",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-amber-500/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
        style={{ opacity, scale }}
      >
        {/* Enhanced background with multiple layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10 z-20"></div>

          {/* Video Background */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-2000",
              videoLoaded ? "opacity-70" : "opacity-0",
            )}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://cdn.pixabay.com/video/2023/04/10/158316-816359649_large.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Fallback image */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-2000",
              videoLoaded ? "opacity-0" : "opacity-70",
            )}
          >
            <Image
              src="https://cdn.pixabay.com/photo/2024/07/13/07/40/car-8891627_1280.jpg"
              alt="Luxury vehicle"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Animated geometric elements */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                scaleY: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="container mx-auto px-4 relative z-40 text-center"
          style={{ y }}
        >
          {/* Brand emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative w-20 h-20 mx-auto mt-16 mb-12"
          >
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border border-amber-500/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className=" font-light tracking-[0.3em] text-amber-400">UC</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              animate={{
                borderColor: ["rgba(217, 119, 6, 0.2)", "rgba(217, 119, 6, 0.6)", "rgba(217, 119, 6, 0.2)"],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Enhanced heading */}
          <div className="relative mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-6 tracking-tighter text-luxury"
            >
              <motion.span
                className="block mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                ULTIMATE
              </motion.span>
              <div className="luxury-divider my-8"></div>
              <motion.span
                className="block gradient-text"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                EXCELLENCE
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Experience the extraordinary with Ultimate and Continental Automobile's curated collection of the world's
            finest exotic vehicles in Jos, Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              className="btn-luxury text-black font-medium px-12 h-16 text-lg rounded-none group relative overflow-hidden"
              asChild
            >
              <Link href="/inventory">
                <span className="relative z-10">Explore Collection</span>
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 h-16 px-12 text-lg rounded-none glass group bg-transparent"
              asChild
            >
              <Link href="/contact">
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Book Consultation
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div className="flex flex-col items-center text-amber-500">
            <span className="text-sm font-light mb-2 tracking-wider">SCROLL</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-900 relative">
        <div className="container mx-auto px-4">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-amber-500" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-amber-500/10 animate-pulse"></div>
                </div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-amber-500 mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-400 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-32 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 via-transparent to-amber-900/5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-luxury">
              Featured <span className="gradient-text">Masterpieces</span>
            </h2>
            <div className="luxury-divider max-w-xs mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Discover our handpicked selection of the world's most extraordinary vehicles
            </p>
          </motion.div>
          <FeaturedVehicles />
        </div>
      </section>

      {/* Experience Section - Enhanced */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-luxury">
                The Ultimate and Continental <span className="gradient-text">Experience</span>
              </h2>
              <div className="luxury-divider max-w-xs mb-8"></div>

              <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
                <p>
                  At Ultimate and Continental Automobile, based in Jos, we redefine luxury car acquisition. Our curated
                  collection represents the pinnacle of automotive engineering and design, carefully selected for the
                  most discerning clients in Jos and beyond.
                </p>
                <p>
                  Each vehicle in our collection undergoes rigorous authentication and inspection, ensuring you receive
                  nothing short of perfection. Our concierge service handles every aspect of your acquisition, from
                  personalized viewings to seamless delivery.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Button className="btn-luxury text-black font-medium px-10 h-14 text-lg rounded-none group" asChild>
                  <Link href="/about">
                    <span className="relative z-10">Our Story</span>
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent z-10"></div>
                <Image
                  src="https://cdn.pixabay.com/photo/2020/12/25/18/17/car-5859946_640.jpg"
                  alt="Luxury car showroom"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-8 -right-8 glass p-8 rounded-none border border-amber-500/20"
                >
                  <div className="text-center">
                    <p className="text-5xl font-bold gradient-text mb-2">15+</p>
                    <p className="text-gray-300 font-light">Years of Excellence</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-zinc-900 to-black relative">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-luxury">
              Exceptional <span className="gradient-text">Services</span>
            </h2>
            <div className="luxury-divider max-w-xs mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
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
                  <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Concierge Maintenance",
                description: "Our team handles all service needs with door-to-door collection and delivery.",
                icon: (
                  <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Private Showings",
                description: "Experience vehicles in complete privacy at our exclusive showroom or your location.",
                icon: (
                  <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ),
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group card-hover glass p-8 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-amber-500/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-light mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 via-transparent to-amber-900/5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-luxury">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <div className="luxury-divider max-w-xs mx-auto"></div>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-500 group"
              >
                <div className="flex items-center text-amber-500 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <motion.svg
                      key={j}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 + j * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-amber-500/20 pt-4">
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="py-32 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-transparent"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-extralight mb-8 text-luxury"
            >
              Ready to Experience <span className="gradient-text">Automotive Excellence?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-12 font-light leading-relaxed"
            >
              Schedule a private consultation with our team to discover the perfect addition to your collection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button
                size="lg"
                className="btn-luxury text-black font-medium px-12 h-16 text-lg rounded-none group"
                asChild
              >
                <Link href="/contact">
                  <span className="relative z-10">Book Appointment</span>
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 h-16 px-12 text-lg rounded-none glass group bg-transparent"
                asChild
              >
                <Link href="/inventory">
                  <Car className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Explore Collection
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
