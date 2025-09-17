"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/UI/Modal"
import PermissionSelector from "./PermissionSelector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const RoleModal = ({ isOpen, onClose, role, onSave, mode = "create" }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: {},
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (role && mode === "edit") {
      setFormData(role)
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: {},
      })
    }
    setErrors({})
  }, [role, mode, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del rol es requerido"
    }

    if (Object.keys(formData.permissions).length === 0) {
      newErrors.permissions = "Debe asignar al menos un permiso"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...formData,
        id: role?.id || Date.now(),
        createdAt: role?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      onClose()
    }
  }

  const handlePermissionsChange = (permissions) => {
    setFormData((prev) => ({ ...prev, permissions }))
    setErrors((prev) => ({ ...prev, permissions: null }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === "create" ? "Crear Nuevo Rol" : "Editar Rol"} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Rol *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className={errors.name ? "border-destructive" : ""}
              placeholder="Ej: Agente de Ventas, Supervisor, etc."
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del rol y sus responsabilidades..."
            />
          </div>
        </div>

        {/* Permissions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold">Permisos del Rol *</Label>
            {errors.permissions && <p className="text-sm text-destructive">{errors.permissions}</p>}
          </div>

          <div className="border border-border rounded-lg p-4">
            <PermissionSelector permissions={formData.permissions} onPermissionsChange={handlePermissionsChange} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{mode === "create" ? "Crear Rol" : "Guardar Cambios"}</Button>
        </div>
      </form>
    </Modal>
  )
}

export default RoleModal
