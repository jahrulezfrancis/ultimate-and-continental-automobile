import Link from "next/link"
import { X } from "lucide-react"
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";




export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-zinc-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">
              Utimate and Continental <span className="text-amber-500">Automobile</span>
            </h3>
            <p className="mb-6 text-gray-400">
              Redefining luxury automotive acquisition in Jos with a curated collection of the world's most
              exceptional vehicles.
            </p>
            <div className="flex space-x-4">
              {[
              { icon: <SlSocialFacebook className="h-5 w-5" />, label: "Facebook", link: "https://web.facebook.com/#" },
              { icon: <X className="h-5 w-5" />, label: "Twitter", link: "https://x.com/#" },
              { icon: <FaInstagram className="h-5 w-5" />, label: "Instagram", link: "https://www.instagram.com/#/" },
              { icon: <FiYoutube className="h-5 w-5" />, label: "YouTube", link: "https://www.youtube.com/#" },
              ].map((social, i) => (
              <Link
                key={i}
                href={social.link}
                target="_blank"
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-colors duration-300"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
              ))}
            </div>
            </div>

            <div>
            <h3 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              {[
              { name: "Home", href: "/" },
              { name: "Inventory", href: "/inventory" },
              { name: "Services", href: "/services" },
              { name: "About Us", href: "/about" },
              { name: "Contact", href: "/contact" },
              ].map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                {link.name}
                </Link>
              </li>
              ))}
            </ul>
            </div>

            <div>
            <h3 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Services</h3>
            <ul className="space-y-4">
              {[
              { name: "Exotic Vehicles", href: "#" },
              { name: "Bespoke Acquisition", href: "#" },
              { name: "Concierge Maintenance", href: "#" },
              { name: "Private Showings", href: "#" },
              { name: "Vehicle Customization", href: "#" },
              ].map((service, i) => (
              <li key={i}>
                <Link
                href={service.href}
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
                >
                {service.name}
                </Link>
              </li>
              ))}
            </ul>
            </div>

            <div>
            <h3 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Contact</h3>
            <address className="not-italic space-y-4 text-gray-400">
              <p>Ultimate and Continental Automobile, Jos, Nigeria</p>
              <p className="mt-4">Phone: +2347014052251</p>
              <p>Email: info@ultimatecontinental.com</p>
            </address>
            <p className="mt-6">
              <strong className="text-white">Hours:</strong>
              <br />
              Mon-Fri: 9AM - 7PM
              <br />
              Sat: 10AM - 5PM
              <br />
              Sun: By Appointment Only
            </p>
            </div>
          </div>

          <div className="border-t border-zinc-900 mt-16 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Ultimate and Continental Automobile. All rights reserved.</p>
            <p className="mt-2 text-gray-500">
            <Link href="#" className="hover:text-amber-500 transition-colors duration-200">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="#" className="hover:text-amber-500 transition-colors duration-200 ml-2">
              Terms of Service
            </Link>
            </p>
          </div>
          </div>
        </footer>
        )
      }
