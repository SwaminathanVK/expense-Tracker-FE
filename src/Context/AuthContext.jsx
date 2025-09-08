import { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API } from '../utils/apiPath.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }
    axiosInstance.get(API.AUTH.USER)
      .then(res => setUser(res.data))
      .catch(() => { localStorage.removeItem('token'); setUser(null) })
      .finally(() => setLoading(false))
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    return axiosInstance.get(API.AUTH.USER).then(res => {
      setUser(res.data)
      return res.data
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
