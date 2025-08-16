'use client'
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { getUsageData } from '@/lib/api'

// Registrar todos los componentes de Chart.js
Chart.register(...registerables)

export default function EnergyChart() {
  const [range, setRange] = useState('day')
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setError(null)
      const data = await getUsageData(range)
      setChartData(data)
    } catch (err) {
      setError(err.message)
      setChartData({
        labels: [],
        values: []
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [range])

  const handleRetry = () => {
    fetchData()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">        
        <div className="flex items-center gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="text-black border rounded-md px-3 py-1 text-sm"
          >
            <option value="hour">Por Hora</option>
            <option value="day">Por Día</option>
            <option value="week">Por Semana</option>
            <option value="month">Por Mes</option>
          </select>

          {error && (
            <button
              onClick={handleRetry}
              className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
            >
              Reintentar
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        {chartData?.labels?.length > 0 ? (
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [{
                label: 'Consumo (kW)',
                data: chartData.values,
                backgroundColor: '#10B981',
                borderRadius: 4,
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y} kW`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: 'kW' }
                }
              }
            }}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay datos disponibles para mostrar
          </div>
        )}
      </div>
    </div>
  )
}