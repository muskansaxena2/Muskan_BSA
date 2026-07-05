import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AppShell({ children }) {
  const wishlistCount = useSelector(state => state.wishlist.items.length)

  const navClass = ({ isActive }) =>
    isActive
      ? 'inline-flex items-center text-white bg-white/15 px-4 py-2 rounded-full shadow-lg shadow-white/20 ring-1 ring-white/20'
      : 'inline-flex items-center text-slate-100 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition'

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-900 antialiased">
      <header className="relative overflow-hidden rounded-b-[32px] bg-gradient-to-r from-slate-950 via-indigo-900 to-indigo-600 px-4 py-5 text-white shadow-2xl shadow-slate-400/20 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_28%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 shadow-inner shadow-white/10 ring-1 ring-white/10">
              <span className="text-xl">🏨</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-200/80">Hotel Finder</p>
              <h1 className="text-xl font-semibold text-white sm:text-2xl">Travel wishlist made easy</h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className={navClass} end>
              Home
            </NavLink>
            <NavLink to="/search" className={navClass}>
              Search
            </NavLink>
            <NavLink to="/wishlist" className={navClass}>
              Wishlist ({wishlistCount})
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </nav>
        </div>
        <div className="relative mt-6 rounded-[28px] border border-white/20 bg-white/10 px-5 py-4 text-slate-100 shadow-xl shadow-slate-950/10 sm:px-6">
          <p className="text-sm leading-6 text-slate-100/85">
            Explore hotels, collect your favourites, and choose the best stay with a stylish wishlist experience.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
