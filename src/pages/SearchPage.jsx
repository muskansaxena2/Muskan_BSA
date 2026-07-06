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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when search query changes
  }, [query])

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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  const toggleWishlist = hotel => {
    if (wishlistedIds.includes(hotel.id)) {
      dispatch(removeFromWishlist(hotel.id))
    } else {
      dispatch(addToWishlist(hotel))
    }
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <section className="rounded-[32px] border-2 border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900">🔍 Search Hotels</h1>
            <p className="mt-3 text-slate-600 font-medium max-w-2xl">
              Find your perfect stay by searching by name, location, or description. Filter through {products.length}+ premium hotels!
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-white font-bold text-lg shadow-lg">
            ❤️ {wishlistItems.length} Saved
          </div>
        </div>
      </section>

      {/* Search Input Section */}
      <section className="rounded-[32px] bg-white p-8 shadow-lg border-2 border-slate-200">
        <label className="block text-sm font-bold uppercase tracking-wider text-indigo-700 mb-3">🔎 Find Your Hotel</label>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by hotel name, location, or description..."
          className="w-full rounded-3xl border-2 border-indigo-300 bg-indigo-50 px-6 py-4 text-lg text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:bg-white transition"
        />
        <p className="mt-4 text-sm text-slate-600 font-medium">
          Found <span className="font-bold text-indigo-600">{filteredProducts.length}</span> hotel{filteredProducts.length === 1 ? '' : 's'} matching your search
        </p>
      </section>

      {status === 'loading' && <p className="text-slate-600">Loading hotels for search…</p>}
      {status === 'failed' && <p className="text-red-600">Unable to load hotel list. Please try again later.</p>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map(hotel => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
            >
              ← Previous
            </button>

            <div className="flex gap-2 items-center">
              {/* Show first page if not in range */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => handlePageClick(1)}
                    className="h-10 w-10 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    1
                  </button>
                  {currentPage > 4 && <span className="text-slate-400">...</span>}
                </>
              )}

              {/* Show pages around current page */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage - 2 + i
                if (pageNum < 1) pageNum = 1 + i
                if (pageNum > totalPages) pageNum = totalPages - 4 + i
                return pageNum
              })
                .filter((page, index, array) => array.indexOf(page) === index && page > 0 && page <= totalPages)
                .map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`h-10 w-10 rounded-full font-semibold transition ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

              {/* Show last page if not in range */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && <span className="text-slate-400">...</span>}
                  <button
                    onClick={() => handlePageClick(totalPages)}
                    className="h-10 w-10 rounded-full border border-slate-300 bg-white font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
            >
              Next →
            </button>
          </div>
          <p className="text-sm text-slate-600">
            Page {currentPage} of {totalPages} • Showing {currentProducts.length} of {filteredProducts.length} hotels
          </p>
        </div>
      )}

      {filteredProducts.length === 0 && status === 'succeeded' && (
        <div className="rounded-[28px] bg-slate-50 p-8 text-center text-slate-600 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">No matching hotels found.</p>
          <p className="mt-2">Try a different search term or clear the filter to see all hotels.</p>
        </div>
      )}
    </div>
  )
}
