"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Building2, Calendar, Users, BarChart3, Settings } from "lucide-react"

const PermissionSelector = ({ permissions, onPermissionsChange }) => {
  const [selectedAction, setSelectedAction] = useState(null)

  const actions = [
    { id: "create", label: "Crear", icon: Plus, color: "bg-green-100 text-green-800" },
    { id: "edit", label: "Editar", icon: Edit, color: "bg-blue-100 text-blue-800" },
    { id: "delete", label: "Eliminar", icon: Trash2, color: "bg-red-100 text-red-800" },
  ]

  const sections = [
    { id: "properties", label: "Inmuebles", icon: Building2 },
    { id: "appointments", label: "Citas", icon: Calendar },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "reports", label: "Reportes", icon: BarChart3 },
    { id: "settings", label: "Configuración", icon: Settings },
  ]

  const handleActionSelect = (actionId) => {
    setSelectedAction(selectedAction === actionId ? null : actionId)
  }

  const handleSectionPermissionChange = (sectionId, actionId, checked) => {
    const newPermissions = { ...permissions }

    if (!newPermissions[sectionId]) {
      newPermissions[sectionId] = {}
    }

    newPermissions[sectionId][actionId] = checked
    onPermissionsChange(newPermissions)
  }

  const isPermissionGranted = (sectionId, actionId) => {
    return permissions[sectionId]?.[actionId] || false
  }

  const getActionCount = (actionId) => {
    return sections.reduce((count, section) => {
      return count + (isPermissionGranted(section.id, actionId) ? 1 : 0)
    }, 0)
  }

  return (
    <div className="space-y-6">
      {/* Action Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Seleccionar Acción</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            const isSelected = selectedAction === action.id
            const count = getActionCount(action.id)

            return (
              <Card
                key={action.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => handleActionSelect(action.id)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${action.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-card-foreground mb-2">{action.label}</h4>
                  <Badge variant="outline" className="text-xs">
                    {count} secciones
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Section Permissions */}
      {selectedAction && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Permisos para {actions.find((a) => a.id === selectedAction)?.label}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedAction(null)}>
              Cerrar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => {
              const Icon = section.icon
              const isGranted = isPermissionGranted(section.id, selectedAction)

              return (
                <Card key={section.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${isGranted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{section.label}</h4>
                        <p className="text-sm text-muted-foreground">
                          {actions.find((a) => a.id === selectedAction)?.label} {section.label.toLowerCase()}
                        </p>
                      </div>
                      <Checkbox
                        checked={isGranted}
                        onCheckedChange={(checked) =>
                          handleSectionPermissionChange(section.id, selectedAction, checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Permissions Summary */}
      {Object.keys(permissions).length > 0 && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Resumen de Permisos</h4>
          <div className="space-y-2">
            {sections.map((section) => {
              const sectionPermissions = permissions[section.id]
              if (!sectionPermissions || Object.keys(sectionPermissions).length === 0) return null

              const grantedActions = Object.entries(sectionPermissions)
                .filter(([_, granted]) => granted)
                .map(([actionId, _]) => actions.find((a) => a.id === actionId)?.label)
                .filter(Boolean)

              if (grantedActions.length === 0) return null

              return (
                <div key={section.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{section.label}:</span>
                  <div className="flex space-x-1">
                    {grantedActions.map((action) => (
                      <Badge key={action} variant="secondary" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default PermissionSelector
