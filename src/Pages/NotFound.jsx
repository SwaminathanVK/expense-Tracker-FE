import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="text-center mt-24">
      <div className="text-3xl font-semibold">404</div>
      <div className="text-slate-400 mt-2">Page not found</div>
      <Link to="/dashboard" className="inline-block mt-6 px-4 py-2 rounded-md bg-white/10">Go Home</Link>
    </div>
  )
}
