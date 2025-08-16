'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthenticated(true)
    } else {
      router.push('/login')
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthenticated(false)
    router.push('/login')
  }

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-b-4 mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium">Cargando...</p>
      </div>
    </div>
  )

  if (!authenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <h1 
            className="text-2xl font-bold cursor-pointer hover:text-green-200 transition-colors"
            onClick={() => router.push('/dashboard')}
          >
            S2G-Energy
          </h1>

          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <a 
                  href="/dashboard/stations" 
                  className="hover:text-green-200 transition-colors font-medium"
                >
                  Estaciones
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  )
}