import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist } from '../store/wishlistSlice.js'
import { Link } from 'react-router-dom'

export default function WishlistPage() {
  const dispatch = useDispatch()
  const wishlist = useSelector(state => state.wishlist.items)

  return (
    <div className="space-y-8">
      {/* Wishlist Header */}
      <section className="rounded-[32px] border-2 border-red-300 bg-gradient-to-r from-red-50 to-pink-50 px-8 py-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900">❤️ MY WISHLIST - MY CHOICE</h1>
            <p className="mt-3 text-slate-600 font-medium max-w-2xl">
              Your saved hotels are here. Compare, review, and book the perfect stay for your next adventure!
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-white font-bold text-lg shadow-lg">
            {wishlist.length} {wishlist.length === 1 ? 'Hotel' : 'Hotels'}
          </div>
        </div>
      </section>

      {wishlist.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
          <p className="text-2xl font-semibold text-slate-900">Your wishlist is empty.</p>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-7">
            Add hotels from the search page so you can compare them later and keep the best options ready for booking.
          </p>
          <Link
            to="/search"
            className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Search hotels now
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map(hotel => (
            <article key={hotel.id} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <img src={hotel.thumbnail} alt={hotel.name} className="h-44 w-full rounded-[24px] object-cover" />
              <div className="mt-4 space-y-3 text-left">
                <div className="flex items-start justify-between gap-3">
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
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromWishlist(hotel.id))}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                  >
                    Remove
                  </button>
                  <Link
                    to={`/details/${hotel.id}`}
                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
