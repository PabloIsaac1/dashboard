"use client"

import { useState } from "react"
import {
  Home,
  Building2,
  Calendar,
  TrendingUp,
  Key,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "properties", label: "Inmuebles", icon: Building2 },
    { id: "appointments", label: "Citas", icon: Calendar },
    { id: "sales", label: "Ventas", icon: TrendingUp },
    { id: "rentals", label: "Arriendos", icon: Key },
    { id: "reports", label: "Reportes Inmobiliarios", icon: BarChart3 },
    { id: "roles", label: "Roles", icon: Settings },
  ]

  return (
    <div
      className={`bg-sidebar text-sidebar-foreground h-screen transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-sidebar-primary" />
              <div>
                <h1 className="text-lg font-bold">MATRIZ</h1>
                <p className="text-xs text-sidebar-foreground/70">INMOBILIARIA</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              } ${isCollapsed ? "px-2" : "px-4"}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <Settings className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>Configuración</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-destructive hover:bg-destructive/10 ${isCollapsed ? "px-2" : "px-4"}`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
