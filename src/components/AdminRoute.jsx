'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRoute({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token || role !== 'admin') {
      router.push('/dashboard')
    } else {
      setAuthorized(true)
    }
    setLoading(false)
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-b-4 mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium">Cargando...</p>
      </div>
    </div>
  )
  if (!authorized) return null

  return <>{children}</>
}