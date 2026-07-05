import { useState } from 'react'

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
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Contact us</h2>
            <p className="mt-2 text-sm text-slate-500">Need help with hotel search or wishlist choices? Send us a quick message.</p>
          </div>
          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            Response within 24 hours
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 via-indigo-500 to-slate-900 p-8 text-white shadow-xl shadow-indigo-200/20">
          <h3 className="text-xl font-semibold">Need help choosing a hotel?</h3>
          <p className="mt-4 leading-7 text-slate-100">
            I can help you compare stays, save your favourites, and find the best hotel for your travel plan.
          </p>
          <div className="mt-8 space-y-4 rounded-[28px] bg-white/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Quick support</p>
            <p className="text-sm text-slate-100">Ask about wishlist tips, hotel comparisons, or booking details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200/30">
          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-700">
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Send message
          </button>
          {submitted && <p className="mt-4 text-sm text-emerald-600">Message sent. Thank you!</p>}
        </form>
      </section>
    </div>
  )
}
