'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AdminRoute from '@/components/AdminRoute'

export default function NewStationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    max_capacity_kw: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/stations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        router.push('/dashboard/stations')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AdminRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Crear Nueva Estación
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Nombre</label>
              <input
                name="name"
                placeholder="Nombre de la estación"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Ubicación</label>
              <input
                name="location"
                placeholder="Ubicación"
                value={formData.location}
                onChange={handleChange}
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Capacidad (kW)</label>
              <input
                name="max_capacity_kw"
                type="number"
                placeholder="Capacidad"
                value={formData.max_capacity_kw}
                onChange={handleChange}
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Crear Estación
            </button>
          </form>
        </div>
      </div>
    </AdminRoute>
  )
}