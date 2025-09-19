"use client"

import { useState } from "react"
import Sidebar from "../src/shared/components/Layout/Sidebar"
import DashboardPage from "../src/features/dashboard/pages/DashboardPage"
import PropertiesPage from "../src/features/properties/pages/PropertiesPage"
import AppointmentsPage from "../src/features/appointments/pages/AppointmentsPage"
import RolesPage from "../src/features/roles/pages/RolesPage"
import { ToastContainer } from "../src/shared/components/UI/EnhancedToast"
import { useEnhancedToast } from "../src/shared/hooks/useEnhancedToast"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { toasts, removeToast } = useEnhancedToast()

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardPage />
      case "properties":
        return <PropertiesPage />
      case "appointments":
        return <AppointmentsPage />
      case "roles":
        return <RolesPage />
      case "sales":
        return (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Gestión de Ventas</h2>
            <p className="text-gray-500">Módulo en desarrollo - ¡Próximamente disponible!</p>
          </div>
        )
      case "rentals":
        return (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Gestión de Arriendos</h2>
            <p className="text-gray-500">Módulo en desarrollo - ¡Próximamente disponible!</p>
          </div>
        )
      case "reports":
        return (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Reportes Inmobiliarios</h2>
            <p className="text-gray-500">Módulo en desarrollo - ¡Próximamente disponible!</p>
          </div>
        )
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
