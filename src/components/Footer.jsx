import { FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t-2 border-indigo-600">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
                <span className="text-xl">🏨</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Hotel Finder</p>
                <p className="text-sm font-bold text-white">Travel Made Easy</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">Discover and book the best hotels for your travel adventures with our smart wishlist.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-indigo-400">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Home
              </Link>
              <Link to="/search" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Search Hotels
              </Link>
              <Link to="/wishlist" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Wishlist
              </Link>
              <Link to="/contact" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Contact Us
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-indigo-400">Support</h3>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Help Center
              </a>
              <a href="#" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → About Us
              </a>
              <a href="#" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-300 transition hover:text-indigo-400 hover:translate-x-1">
                → Terms of Service
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-indigo-400">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://telegram.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 transition hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/50"
                title="Telegram"
              >
                <FaTelegramPlane className="text-lg" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400 transition hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/50"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 transition hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/50"
                title="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/50"
                title="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} <span className="font-semibold text-indigo-400">Hotel Finder</span>. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Made with <span className="text-red-500">❤️</span> for travelers worldwide
          </p>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-2">
            MADE BY 💖 MUSKAN SAXENA
          </p>
        </div>
      </div>
    </footer>
  )
}
