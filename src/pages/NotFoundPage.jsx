import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
      <h2 className="text-3xl font-semibold text-slate-900">Page not found</h2>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
        Go back home
      </Link>
    </div>
  )
}
