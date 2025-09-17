"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Shield } from "lucide-react"

const RoleCard = ({ role, onEdit, onDelete, canEdit = true, canDelete = true }) => {
  const getPermissionCount = () => {
    return Object.values(role.permissions).reduce((total, sectionPerms) => {
      return total + Object.values(sectionPerms).filter(Boolean).length
    }, 0)
  }

  const getPermissionSummary = () => {
    const sections = []
    Object.entries(role.permissions).forEach(([sectionId, perms]) => {
      const grantedPerms = Object.entries(perms).filter(([_, granted]) => granted)
      if (grantedPerms.length > 0) {
        sections.push({
          section: sectionId,
          count: grantedPerms.length,
        })
      }
    })
    return sections.slice(0, 3) // Show only first 3 sections
  }

  const isSystemRole = role.name === "Administrador"

  return (
    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in bg-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-xl ${isSystemRole ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600"}`}
            >
              <span className="text-2xl">{isSystemRole ? "🛡️" : "👤"}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-800">{role.name}</CardTitle>
              {isSystemRole && (
                <Badge variant="secondary" className="text-xs mt-1 bg-blue-100 text-blue-800 font-semibold">
                  🔒 Rol del Sistema
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(role)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg p-2"
                disabled={isSystemRole}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(role)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-2"
                disabled={isSystemRole}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {role.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{role.description}</p>
        )}

        {/* Permission Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              🔐 Permisos
            </span>
            <Badge variant="outline" className="text-xs font-semibold bg-indigo-50 text-indigo-700 border-indigo-300">
              📊 {getPermissionCount()} total
            </Badge>
          </div>

          <div className="space-y-2">
            {getPermissionSummary().map(({ section, count }) => (
              <div key={section} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                <span className="capitalize text-gray-700 font-medium flex items-center gap-2">
                  {section === 'properties' && '🏠'}
                  {section === 'appointments' && '📅'}
                  {section === 'clients' && '👥'}
                  {section === 'reports' && '📊'}
                  {section === 'settings' && '⚙️'}
                  {section}
                </span>
                <Badge variant="secondary" className="text-xs font-semibold bg-blue-100 text-blue-700">
                  ✅ {count} permisos
                </Badge>
              </div>
            ))}
            {Object.keys(role.permissions).length > 3 && (
              <div className="text-xs text-gray-500 text-center pt-1 font-medium">
                ➕ {Object.keys(role.permissions).length - 3} secciones más
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">📅 {new Date(role.createdAt).toLocaleDateString("es-ES")}</span>
            {role.updatedAt && role.updatedAt !== role.createdAt && (
              <span className="flex items-center gap-1">🔄 {new Date(role.updatedAt).toLocaleDateString("es-ES")}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RoleCard
