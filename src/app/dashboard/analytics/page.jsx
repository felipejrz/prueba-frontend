'use client'
import EnergyChart from '@/components/EnergyChart'
import AdminRoute from '@/components/AdminRoute'

export default function AnalyticsPage() {
  return (
    <AdminRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-green-700">Analíticas de Consumo</h1>
        <EnergyChart />
      </div>
    </AdminRoute>
  )
}