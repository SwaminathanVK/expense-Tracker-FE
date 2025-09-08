import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Incomes from './Pages/Income.jsx'
import Expenses from './Pages/Expenses.jsx'
import Profile from './Pages/Profile.jsx'
import NotFound from './Pages/NotFound.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Navbar from './Components/Navbar.jsx'
import Sidebar from '../src/Components/Sidebar.jsx'

export default function App() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <div className="p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/incomes" element={<ProtectedRoute><Incomes /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
