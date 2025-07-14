// Changes applied:
// - Updated company name to "Ultimate and Continental Automobile"
// - Updated address to Jos (example address used)
// - Updated email to info@ultimatecontinental.com

"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, MapPin, Phone } from "lucide-react"
import { vehicles } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const vehicleId = searchParams.get("vehicle")
  const action = searchParams.get("action")
  const formRef = useRef<HTMLFormElement>(null)

  const vehicle = vehicleId ? vehicles.find((v) => v.id === vehicleId) : null

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState(
    vehicle ? `I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}.` : "",
  )
  const [contactMethod, setContactMethod] = useState("email")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log({
      name,
      email,
      phone,
      message,
      contactMethod,
      date,
      vehicleId,
    })

    // Show success message
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white pt-24">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900 border border-zinc-800 rounded-sm p-12 text-center"
          >
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Your message has been sent successfully. One of our representatives will contact you shortly.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-amber-500 hover:bg-amber-600 text-black rounded-none px-8 h-12"
            >
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="relative w-full h-[30vh] bg-gradient-to-r from-zinc-900 to-black flex items-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-fixed opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {action === "test-drive" ? "Schedule a Test Drive" : "Contact Us"}
            </h1>
            <div className="w-20 h-1 bg-amber-500 mb-6"></div>
            <p className="text-xl text-gray-300">
              {action === "test-drive"
                ? "Experience the extraordinary performance of your selected vehicle."
                : "Our team of luxury automotive specialists at Ultimate and Continental Automobile is ready to assist you."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <div className="bg-zinc-900 border border-zinc-800 p-8">
                {vehicle && (
                  <div className="mb-8 p-4 bg-black/50 border border-zinc-800">
                    <h3 className="font-medium mb-2 text-amber-500">Selected Vehicle:</h3>
                    <p className="text-white text-lg">
                      {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                    </p>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="grid gap-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(123) 456-7890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>

                    {action === "test-drive" && (
                      <div className="space-y-2">
                        <Label className="text-gray-300">Preferred Test Drive Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700",
                                !date && "text-gray-400",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))
                              }
                              className="bg-zinc-900 text-white"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Preferred Contact Method</Label>
                      <RadioGroup
                        defaultValue="email"
                        value={contactMethod}
                        onValueChange={setContactMethod}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="contact-email" className="border-zinc-700 text-amber-500" />
                          <Label htmlFor="contact-email" className="text-gray-300">
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="contact-phone" className="border-zinc-700 text-amber-500" />
                          <Label htmlFor="contact-phone" className="text-gray-300">
                            Phone
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id="contact-text" className="border-zinc-700 text-amber-500" />
                          <Label htmlFor="contact-text" className="text-gray-300">
                            Text Message
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-black rounded-none px-8 h-12"
                  >
                    {action === "test-drive" ? "Schedule Test Drive" : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-zinc-900 border border-zinc-800 p-8 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 text-white">Contact Information</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium mb-3 text-amber-500">Showroom Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <address className="not-italic text-gray-300">
                        Opposite PRTV, Rayfield,
                        <br />
                        Jos, Plateau State
                      </address>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-amber-500">Contact Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="text-gray-300">+2347014052251</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-300">info@ultimatecontinental.com</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-amber-500">Business Hours</h3>
                    <table className="w-full text-sm text-gray-300">
                      <tbody>
                        <tr>
                          <td className="py-1">Monday - Friday:</td>
                          <td className="py-1 text-right">9:00 AM - 7:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-1">Saturday:</td>
                          <td className="py-1 text-right">10:00 AM - 5:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-1">Sunday:</td>
                          <td className="py-1 text-right">By Appointment Only</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
