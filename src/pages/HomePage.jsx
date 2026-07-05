import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from '../store/productsSlice.js'
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice.js'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const status = useSelector(state => state.products.status)
  const wishlistItems = useSelector(state => state.wishlist.items)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const isWishlisted = id => wishlistItems.some(item => item.id === id)
  const toggleWishlist = hotel => {
    if (isWishlisted(hotel.id)) {
      dispatch(removeFromWishlist(hotel.id))
    } else {
      dispatch(addToWishlist(hotel))
    }
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-950 via-indigo-900 to-indigo-600 px-6 py-10 text-white shadow-2xl shadow-slate-400/20">
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute left-8 top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
            Best hotel match
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Book the perfect stay, save the best hotels.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200/90">
            Discover top-rated hotels, compare options, and keep your favourites ready in a clean wishlist experience that helps you travel with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/search"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/10 transition hover:scale-[1.01] hover:bg-slate-100"
            >
              Search hotels
            </Link>
            <Link
              to="/wishlist"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              View wishlist
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Quick picks</p>
            <p className="mt-3 text-3xl font-semibold text-white">6+</p>
            <p className="mt-2 text-sm text-slate-300">Top hotels selected for you.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Easy wishlist</p>
            <p className="mt-3 text-3xl font-semibold text-white">Save & compare</p>
            <p className="mt-2 text-sm text-slate-300">Keep your favourite stays in one place.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Smart choices</p>
            <p className="mt-3 text-3xl font-semibold text-white">Trusted picks</p>
            <p className="mt-2 text-sm text-slate-300">Designed for quick hotel decisions.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Top hotel picks</h2>
            <p className="text-sm text-slate-500">Browse the latest hotel list and save what fits your travel plan.</p>
          </div>
          <Link to="/search" className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Explore all hotels →
          </Link>
        </div>

        {status === 'loading' && <p className="text-slate-600">Loading hotel list…</p>}
        {status === 'failed' && <p className="text-red-600">Unable to load hotels. Please refresh.</p>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map(hotel => (
            <article
              key={hotel.id}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={hotel.thumbnail} alt={hotel.name} className="h-44 w-full rounded-[24px] object-cover" />
              <div className="mt-4 space-y-3 text-left">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
                    <p className="text-sm text-slate-500">{hotel.location}</p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {hotel.rating.toFixed(1)}⭐
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{hotel.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/details/${hotel.id}`}
                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(hotel)}
                    className={
                      'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                      (isWishlisted(hotel.id)
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
                    }
                  >
                    {isWishlisted(hotel.id) ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
