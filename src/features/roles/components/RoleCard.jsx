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
    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in bg-white border border-gray-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-xl border ${isSystemRole ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-300" : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-gray-300"}`}
            >
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-700">{role.name}</CardTitle>
              {isSystemRole && (
                <Badge variant="secondary" className="text-xs mt-1 bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  Rol del Sistema
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
                className="text-muted-foreground hover:text-secondary"
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
                className="text-muted-foreground hover:text-destructive"
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
        {role.description && <p className="text-sm text-muted-foreground line-clamp-2">{role.description}</p>}
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{role.description}</p>
        {/* Permission Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-semibold bg-indigo-50 text-indigo-600 border-indigo-300">
              {getPermissionCount()} total
            </Badge>
            </span>
          </div>

          <div className="space-y-2">
            {getPermissionSummary().map(({ section, count }) => (
              <div key={section} className="flex items-center justify-between text-sm bg-gray-50/70 p-3 rounded-lg border border-gray-200">
                <span className="capitalize text-gray-600 font-medium flex items-center gap-2">
                {section}
                </span>
                <Badge variant="secondary" className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                  {count} permisos
                </Badge>
              </div>
            ))}
            {Object.keys(role.permissions).length > 3 && (
              <div className="text-xs text-gray-400 text-center pt-1 font-medium">
                +{Object.keys(role.permissions).length - 3} secciones más
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Creado: {new Date(role.createdAt).toLocaleDateString("es-ES")}</span>
            {role.updatedAt && role.updatedAt !== role.createdAt && (
              <span>Actualizado: {new Date(role.updatedAt).toLocaleDateString("es-ES")}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RoleCard
