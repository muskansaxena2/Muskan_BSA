import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchProducts, selectProductById } from '../store/productsSlice.js'
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice.js'

export default function DetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const status = useSelector(state => state.products.status)
  const product = useSelector(state => selectProductById(state, id))
  const wishlistItems = useSelector(state => state.wishlist.items)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const isWishlisted = product && wishlistItems.some(item => item.id === product.id)
  const toggleWishlist = () => {
    if (!product) return
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  if (status === 'loading') {
    return <p className="text-slate-600">Loading hotel details…</p>
  }

  if (!product) {
    return (
      <div className="rounded-[28px] bg-white p-8 shadow-xl shadow-slate-200/40">
        <p className="text-slate-700">Hotel not found. Please return to the search page.</p>
        <Link
          to="/search"
          className="mt-4 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/40 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px]">
          <img src={product.thumbnail} alt={product.name} className="h-80 w-full object-cover" />
        </div>
        <div className="space-y-5 text-left">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
              <p className="mt-2 text-sm text-slate-500">{product.location}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              {product.rating.toFixed(1)} ⭐
            </span>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <p className="text-slate-600 leading-7">{product.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Price</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">₹{product.price}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Availability</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  {product.rooms ? `${product.rooms} rooms` : 'Check availability'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={toggleWishlist}
              className={
                'rounded-full px-5 py-3 text-sm font-semibold transition ' +
                (isWishlisted ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-indigo-600 text-white hover:bg-indigo-700')
              }
            >
              {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            </button>
            <Link
              to="/wishlist"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Open wishlist
            </Link>
          </div>
        </div>
      </div>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Why this hotel could suit you</h2>
            <p className="mt-2 text-slate-600">Compare, save, and choose the best stay from the options you trust.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">Easy booking</span>
            <span className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Wishlist ready</span>
            <span className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Fast details</span>
          </div>
        </div>
      </section>
    </div>
  )
}
