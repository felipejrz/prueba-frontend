'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  const roleMessages = {
    admin: "Bienvenido Admin al sistema de gestión de estaciones de carga S2G-Energy",
    user: "Bienvenido Usuario al sistema de gestión de estaciones de carga S2G-Energy",
  };

  return (
    <div>
      <h1 className="text-2xl text-black font-bold mb-4">Panel de Control</h1>
      
      <p className="text-gray-600 mb-6">
        {roleMessages[role] || "Bienvenido al sistema de gestión de estaciones de carga S2G-Energy"}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          href="/dashboard/stations" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl text-black font-semibold mb-2">Estaciones de Carga</h2>
          <p className="text-gray-600">Ver y gestionar todas las estaciones</p>
        </Link>
        
        {role === "admin" && (
          <Link 
            href="/dashboard/analytics" 
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl text-black font-semibold mb-2">Analíticas de Consumo</h2>
            <p className="text-gray-600">Ver gráficos interactivos de consumo</p>
          </Link>
        )}
      </div>
    </div>
  )
}