import { NavLink } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext.jsx'
import { FiHome, FiTrendingUp, FiTrendingDown, FiUser } from 'react-icons/fi'

const Item = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 ${isActive ? 'bg-white/10' : ''}`
    }
  >
    <Icon /> <span>{label}</span>
  </NavLink>
)

export default function Sidebar() {
  const { user } = useAuth()
  return (
    <aside className="hidden md:block border-r border-white/10 p-4 space-y-2">
      <div className="px-2 py-3">
        <div className="text-xl font-bold">Expense<span className="text-indigo-500">Tracker</span></div>
        <div className="text-sm text-slate-400">{user?.email || 'guest'}</div>
      </div>
      <nav className="space-y-1">
        <Item to="/dashboard" icon={FiHome} label="Dashboard" />
        <Item to="/incomes" icon={FiTrendingUp} label="Incomes" />
        <Item to="/expenses" icon={FiTrendingDown} label="Expenses" />
        <Item to="/profile" icon={FiUser} label="Profile" />
      </nav>
    </aside>
  )
}
