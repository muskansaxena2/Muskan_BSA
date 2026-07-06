import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Footer from './Footer.jsx'

export default function AppShell({ children }) {
  const wishlistCount = useSelector(state => state.wishlist.items.length)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const navClass = ({ isActive }) =>
    isActive
      ? 'inline-flex items-center text-white bg-white/15 px-4 py-2 rounded-full shadow-lg shadow-white/20 ring-1 ring-white/20'
      : 'inline-flex items-center text-slate-100 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition'

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-900 antialiased flex flex-col">
      <div className="pointer-events-none absolute inset-0 z-0 watermark-bg" />
      <div className="relative z-10 flex-1">
        <header className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 px-4 py-8 text-white shadow-2xl shadow-slate-900/50 sm:px-6">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
            <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-blue-400/5 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_30%)]" />
          </div>
          <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/50 ring-2 ring-white/10">
                <span className="text-2xl">🏨</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Hotel Finder Pro</p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Travel Wishlist Made Easy</h1>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              <NavLink to="/" className={navClass} end>
                🏠 Home
              </NavLink>
              <NavLink to="/search" className={navClass}>
                🔍 Search
              </NavLink>
              <NavLink to="/wishlist" className={navClass}>
                ❤️ Wishlist ({wishlistCount})
              </NavLink>
              <NavLink to="/contact" className={navClass}>
                📧 Contact
              </NavLink>
            </nav>
          </div>

          {/* Check-in & Check-out Section */}
          {location.pathname !== '/contact' && location.pathname !== '/wishlist' && (
            <div className="relative mt-8 rounded-3xl border-2 border-indigo-400/30 bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 px-6 py-6 backdrop-blur-xl shadow-lg shadow-indigo-500/20">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-indigo-200">📅 Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="mt-3 w-full rounded-2xl border-2 border-indigo-300/40 bg-white/10 px-4 py-3 text-white font-medium placeholder-slate-300/50 outline-none transition focus:border-indigo-300/80 focus:bg-white/20 [color-scheme:dark]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-indigo-200">📅 Check-out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="mt-3 w-full rounded-2xl border-2 border-indigo-300/40 bg-white/10 px-4 py-3 text-white font-medium placeholder-slate-300/50 outline-none transition focus:border-indigo-300/80 focus:bg-white/20 [color-scheme:dark]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (checkInDate && checkOutDate) {
                      navigate(`/search?checkIn=${checkInDate}&checkOut=${checkOutDate}`)
                    } else {
                      alert('Please select both check-in and check-out dates')
                    }
                  }}
                  className="rounded-2xl bg-gradient-to-r from-white to-slate-100 px-8 py-3 font-bold text-indigo-700 transition hover:shadow-lg hover:shadow-white/50 hover:scale-105"
                >
                  🔍 Search
                </button>
              </div>
            </div>
          )}

          {/* Description Section */}
          <div className="relative mt-8 rounded-3xl border-2 border-indigo-300/40 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 px-6 py-5 backdrop-blur-lg shadow-lg shadow-indigo-500/10">
            <p className="text-sm leading-7 font-medium text-slate-100">
              ✨ Explore premium hotels, collect your favourites, and choose the best stay with our smart wishlist experience. Save time, make better decisions.
            </p>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
