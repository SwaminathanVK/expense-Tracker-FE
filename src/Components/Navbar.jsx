import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold">{pathname.replace('/', '') || 'dashboard'}</span>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-slate-300">Hi, {user.fullName}</span>}
          {user ? (
            <button onClick={logout} className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md text-sm">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md text-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
