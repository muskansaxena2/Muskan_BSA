import { useState } from 'react'
import { FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000) // Hide message after 3 seconds
  }

  return (
    <div className="space-y-8">
      {/* Contact Header */}
      <section className="rounded-[32px] border-2 border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900">📧 GET IN TOUCH</h1>
            <p className="mt-3 text-slate-600 font-medium max-w-2xl">Have questions about our hotel finder? We'd love to hear from you! Reach out and we'll respond within 24 hours.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-white font-bold text-lg shadow-lg">
            ⚡ Quick Support
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 p-8 text-white shadow-xl shadow-indigo-300/30">
          <h3 className="text-2xl font-bold">💡 Why contact us?</h3>
          <p className="mt-4 leading-7 text-slate-50">
            Whether you need help finding your perfect hotel, understanding our wishlist features, or have questions about bookings - we're here to help!
          </p>
          <div className="mt-8 space-y-4 rounded-[28px] bg-white/15 p-6 border border-white/20">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-100">✓ 24/7 Support Available</p>
            <p className="text-sm text-slate-100">Hotel comparisons • Wishlist tips • Booking assistance • Quick responses</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200/40 border-2 border-indigo-100">
          <div className="space-y-5">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
              👤 Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border-2 border-indigo-200 bg-indigo-50 px-4 py-4 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:bg-white font-medium"
                placeholder="Your full name"
              />
            </label>
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
              📧 Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border-2 border-indigo-200 bg-indigo-50 px-4 py-4 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:bg-white font-medium"
                placeholder="your.email@example.com"
              />
            </label>
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
              💬 Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="mt-3 w-full rounded-3xl border-2 border-indigo-200 bg-indigo-50 px-4 py-4 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:bg-white font-medium"
                placeholder="Tell us how we can help..."
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl transition hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105"
          >
            ✉️ Send Message →
          </button>
          {submitted && (
            <div className="mt-4 rounded-full bg-emerald-50 p-4">
              <p className="text-center text-sm font-semibold text-emerald-700">✓ Message sent successfully! We'll get back to you soon.</p>
            </div>
          )}
        </form>
      </section>

      {/* Social Media Section */}
      <section className="rounded-[32px] bg-gradient-to-b from-slate-50 to-white p-8 shadow-xl shadow-slate-200/40 border-2 border-slate-100">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900">🌐 Connect With Us</h2>
          <p className="mt-3 text-lg text-slate-600 font-medium">Follow us on social media or reach out via your preferred platform</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Telegram */}
          <a
            href="https://telegram.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 rounded-[28px] border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 transition hover:shadow-2xl hover:shadow-cyan-300/40 hover:-translate-y-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 text-white shadow-lg group-hover:scale-110 transition">
              <FaTelegramPlane className="text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Telegram</h4>
            <p className="text-center text-sm text-slate-600 font-medium">Chat with us instantly on Telegram</p>
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-600 group-hover:text-cyan-700">💬 Message us →</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 rounded-[28px] border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-8 transition hover:shadow-2xl hover:shadow-green-300/40 hover:-translate-y-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg group-hover:scale-110 transition">
              <FaWhatsapp className="text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">WhatsApp</h4>
            <p className="text-center text-sm text-slate-600 font-medium">Quick support via WhatsApp</p>
            <span className="text-sm font-bold uppercase tracking-wider text-green-600 group-hover:text-green-700">📱 Send message →</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 rounded-[28px] border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 p-8 transition hover:shadow-2xl hover:shadow-pink-300/40 hover:-translate-y-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-lg group-hover:scale-110 transition">
              <FaInstagram className="text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Instagram</h4>
            <p className="text-center text-sm text-slate-600 font-medium">Follow our travel tips & deals</p>
            <span className="text-sm font-bold uppercase tracking-wider text-pink-600 group-hover:text-pink-700">📸 Follow us →</span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 rounded-[28px] border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 transition hover:shadow-2xl hover:shadow-blue-300/40 hover:-translate-y-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition">
              <FaFacebook className="text-3xl" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Facebook</h4>
            <p className="text-center text-sm text-slate-600 font-medium">Join our community</p>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700">👍 Like us →</span>
          </a>
        </div>
      </section>
    </div>
  )
}
