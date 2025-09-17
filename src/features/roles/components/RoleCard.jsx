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
    <Card className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${isSystemRole ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{role.name}</CardTitle>
              {isSystemRole && (
                <Badge variant="secondary" className="text-xs mt-1">
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

        {/* Permission Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Permisos</span>
            <Badge variant="outline" className="text-xs">
              {getPermissionCount()} total
            </Badge>
          </div>

          <div className="space-y-2">
            {getPermissionSummary().map(({ section, count }) => (
              <div key={section} className="flex items-center justify-between text-sm">
                <span className="capitalize text-muted-foreground">{section}</span>
                <Badge variant="secondary" className="text-xs">
                  {count} permisos
                </Badge>
              </div>
            ))}
            {Object.keys(role.permissions).length > 3 && (
              <div className="text-xs text-muted-foreground text-center pt-1">
                +{Object.keys(role.permissions).length - 3} secciones más
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
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
