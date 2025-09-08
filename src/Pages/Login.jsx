import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axiosInstance from '../utils/axiosInstance.js'
import { API } from '../utils/apiPath.js'
import { useAuth } from '../Context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Please fill all fields')
    setLoading(true)
    try {
      const res = await axiosInstance.post(API.AUTH.LOGIN, { email, password })
      await login(res.data.token)
      toast.success('Logged in!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white/5 border border-white/10 rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full px-3 py-2 rounded-md bg-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full px-3 py-2 rounded-md bg-white/10" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-md py-2">
          {loading ? 'Please wait…' : 'Login'}
        </button>
      </form>
      <div className="text-sm text-slate-400 mt-3">
        No account? <Link to="/register" className="text-indigo-400">Register</Link>
      </div>
    </div>
  )
}
