import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from '../store/productsSlice.js'
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice.js'
import { Link } from 'react-router-dom'

export default function SearchPage() {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const status = useSelector(state => state.products.status)
  const wishlistItems = useSelector(state => state.wishlist.items)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const wishlistedIds = useMemo(() => wishlistItems.map(item => item.id), [wishlistItems])

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products
    const lowerQuery = query.toLowerCase()
    return products.filter(hotel =>
      hotel.name.toLowerCase().includes(lowerQuery) ||
      hotel.location.toLowerCase().includes(lowerQuery) ||
      hotel.description.toLowerCase().includes(lowerQuery)
    )
  }, [products, query])

  const toggleWishlist = hotel => {
    if (wishlistedIds.includes(hotel.id)) {
      dispatch(removeFromWishlist(hotel.id))
    } else {
      dispatch(addToWishlist(hotel))
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/60">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">Search hotels</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Find the hotels you want fast.</h2>
            <p className="mt-3 text-slate-600">Type a hotel name, location, or description and save the best options to your wishlist.</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5 shadow-inner shadow-slate-100">
            <label className="block text-sm font-medium text-slate-700">Search</label>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by hotel name, location, or description"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Search results</h3>
            <p className="text-sm text-slate-500">Showing {filteredProducts.length} hotel{filteredProducts.length === 1 ? '' : 's'}.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            Wishlist {wishlistItems.length}
          </div>
        </div>
      </section>

      {status === 'loading' && <p className="text-slate-600">Loading hotels for search…</p>}
      {status === 'failed' && <p className="text-red-600">Unable to load hotel list. Please try again later.</p>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(hotel => (
          <article key={hotel.id} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
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
              <p className="text-sm text-slate-600 line-clamp-3">{hotel.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={`/details/${hotel.id}`}
                  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  View details
                </Link>
                <button
                  type="button"
                  onClick={() => toggleWishlist(hotel)}
                  className={
                    'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                    (wishlistedIds.includes(hotel.id)
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
                  }
                >
                  {wishlistedIds.includes(hotel.id) ? 'Remove' : 'Add'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredProducts.length === 0 && status === 'succeeded' && (
        <div className="rounded-[28px] bg-slate-50 p-8 text-center text-slate-600 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">No matching hotels found.</p>
          <p className="mt-2">Try a different search term or clear the filter to see all hotels.</p>
        </div>
      )}
    </div>
  )
}
