'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StationsPage() {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchStations = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const response = await fetch('http://localhost:8000/stations/', {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (response.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem('token')
          router.push('/login')
          return
        }

        const data = await response.json()
        setStations(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStations()
  }, [router])

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`http://localhost:8000/stations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ current_status: !currentStatus })
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
        return
      }

      const updatedStations = stations.map(station => 
        station.id === id ? { ...station, current_status: !currentStatus } : station
      )
      setStations(updatedStations)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div className="text-center p-8">Cargando estaciones...</div>
  const role = localStorage.getItem('role')


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-green-700 font-bold">Estaciones de Carga</h1>
        {role === "admin" && (
          <Link 
            href="/dashboard/stations/new" 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar Estación
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map(station => (
          <div key={station.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-green-700 text-lg">{station.name}</h3>
            <p className="text-gray-600 my-2">{station.location}</p>
            <div className="flex justify-between items-center mt-4">
              {role === "admin" ? (
                <span 
                  onClick={() => toggleStatus(station.id, station.current_status)}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    station.current_status 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {station.current_status ? 'Activa' : 'Inactiva'}
                </span>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    station.current_status 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {station.current_status ? 'Activa' : 'Inactiva'}
                </span>
              )}
              <span className="font-mono text-gray-700">{station.max_capacity_kw} kW</span>
            </div>
          </div>
        ))}
      </div>



    </div>
  )
}