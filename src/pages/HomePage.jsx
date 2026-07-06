import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from '../store/productsSlice.js'
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice.js'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const status = useSelector(state => state.products.status)
  const wishlistItems = useSelector(state => state.wishlist.items)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

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

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 px-8 py-20 text-slate-900 shadow-xl sm:px-10 border-2 border-indigo-300">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-yellow-200/20 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-pink-200/15 blur-3xl" />
        
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-200 to-blue-200 px-4 py-2 backdrop-blur-sm border-2 border-indigo-400 mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-indigo-700">✨ Best Deals</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-4 text-slate-900">
            Book Luxury <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">Hotels</span> Now
          </h1>
          
          <p className="text-lg text-slate-700 leading-8 max-w-2xl mb-8 font-medium">
            Discover 50+ premium hotels worldwide, compare prices instantly, and save your favorites for later. Travel with confidence!
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:shadow-indigo-600/50 transition hover:scale-105"
            >
              🔍 Search Hotels
            </Link>
            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 rounded-full border-2 border-indigo-600 bg-white px-8 py-4 text-lg font-bold text-indigo-700 transition hover:bg-indigo-50 hover:shadow-lg"
            >
              ❤️ My Wishlist
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-white to-indigo-50 p-6 border-2 border-indigo-300 shadow-md">
            <p className="text-indigo-700 text-sm font-bold uppercase tracking-wider">Hotels Listed</p>
            <p className="mt-2 text-4xl font-black text-slate-900">{products.length}+</p>
            <p className="mt-2 text-sm text-slate-600">Verified & Rated</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-white to-pink-50 p-6 border-2 border-pink-300 shadow-md">
            <p className="text-pink-700 text-sm font-bold uppercase tracking-wider">Wishlist Feature</p>
            <p className="mt-2 text-4xl font-black text-slate-900">Save</p>
            <p className="mt-2 text-sm text-slate-600">Your Favorite Stays</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-white to-orange-50 p-6 border-2 border-orange-300 shadow-md">
            <p className="text-orange-700 text-sm font-bold uppercase tracking-wider">Smart Search</p>
            <p className="mt-2 text-4xl font-black text-slate-900">Find</p>
            <p className="mt-2 text-sm text-slate-600">Perfect Match Instantly</p>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 rounded-[32px] border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-cyan-50 p-8 shadow-lg">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">✨ Featured Hotels</h2>
              <p className="mt-2 text-slate-600 font-medium">Browse our handpicked collection of premium accommodations</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/search" className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:bg-indigo-700 transition">
                View All →
              </Link>
              <Link to="/wishlist" className="inline-flex items-center rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:bg-red-600 transition">
                ❤️ Wishlist ({wishlistItems.length})
              </Link>
            </div>
          </div>
        </div>

        {status === 'loading' && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-indigo-300"></div>
              <p className="mt-4 text-slate-600 font-semibold">Loading premium hotels...</p>
            </div>
          </div>
        )}
        {status === 'failed' && <p className="text-center text-red-600 font-bold">Unable to load hotels. Please refresh.</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map(hotel => (
            <article
              key={hotel.id}
              className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-48">
                <img src={hotel.thumbnail} alt={hotel.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 px-4 py-2 shadow-lg">
                  <span className="font-bold text-white text-lg">{hotel.rating.toFixed(1)}⭐</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>
                <p className="mt-1 text-sm text-indigo-600 font-semibold">📍 {hotel.location}</p>
                <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-6">{hotel.description}</p>
                
                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/details/${hotel.id}`}
                    className="flex-1 rounded-full bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-700 hover:shadow-lg"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(hotel)}
                    className={`rounded-full px-4 py-3 text-2xl transition ${
                      isWishlisted(hotel.id)
                        ? 'bg-red-100 hover:bg-red-200'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                    title={isWishlisted(hotel.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    {isWishlisted(hotel.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-indigo-50 to-cyan-50 p-8 border-2 border-indigo-200">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="rounded-full border-2 border-indigo-400 bg-white px-6 py-3 font-bold text-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-50 hover:shadow-md"
              >
                ← Previous
              </button>

              <div className="flex gap-2 items-center">
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => handlePageClick(1)}
                      className="h-11 w-11 rounded-full border-2 border-slate-300 bg-white font-bold text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="text-slate-400 font-bold">···</span>}
                  </>
                )}

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
                      className={`h-11 w-11 rounded-full font-bold transition ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-400/50'
                          : 'border-2 border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="text-slate-400 font-bold">···</span>}
                    <button
                      onClick={() => handlePageClick(totalPages)}
                      className="h-11 w-11 rounded-full border-2 border-slate-300 bg-white font-bold text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="rounded-full border-2 border-indigo-400 bg-white px-6 py-3 font-bold text-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-50 hover:shadow-md"
              >
                Next →
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">
                Page <span className="text-indigo-600">{currentPage}</span> of <span className="text-indigo-600">{totalPages}</span> • Showing <span className="font-black text-indigo-600">{currentProducts.length}</span> of <span className="font-black text-indigo-600">{products.length}</span> hotels
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
