"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import SearchBar from "../../../shared/components/UI/SearchBar"
import Pagination from "../../../shared/components/UI/Pagination"
import RoleCard from "../components/RoleCard"
import RoleModal from "../components/RoleModal"
import { useEnhancedToast } from "../../../shared/hooks/useEnhancedToast"
import { ConfirmDialog } from "../../../shared/components/UI/ConfirmDialog"

const RolesPage = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Administrador",
      description: "Acceso completo a todas las funcionalidades del sistema",
      permissions: {
        properties: { create: true, edit: true, delete: true },
        appointments: { create: true, edit: true, delete: true },
        clients: { create: true, edit: true, delete: true },
        reports: { create: true, edit: true, delete: true },
        settings: { create: true, edit: true, delete: true },
      },
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Agente de Ventas",
      description: "Puede gestionar propiedades y citas, pero no eliminar registros importantes",
      permissions: {
        properties: { create: true, edit: true, delete: false },
        appointments: { create: true, edit: true, delete: false },
        clients: { create: true, edit: true, delete: false },
        reports: { create: false, edit: false, delete: false },
      },
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Asistente",
      description: "Acceso limitado para tareas de apoyo y consulta",
      permissions: {
        properties: { create: false, edit: true, delete: false },
        appointments: { create: true, edit: true, delete: false },
        clients: { create: true, edit: false, delete: false },
      },
      createdAt: "2024-12-05T00:00:00.000Z",
      updatedAt: "2024-12-05T00:00:00.000Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, role: null })
  const { success, error } = useEnhancedToast()

  const itemsPerPage = 6

  // Filter roles based on search term
  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [roles, searchTerm])

  // Paginate filtered roles
  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredRoles.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredRoles, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)

  const handleCreateRole = (roleData) => {
    setRoles((prev) => [...prev, roleData])
    success("Rol creado exitosamente")
  }

  const handleEditRole = (roleData) => {
    setRoles((prev) => prev.map((r) => (r.id === roleData.id ? roleData : r)))
    success("Rol actualizado exitosamente")
  }

  const handleDeleteRole = (role) => {
    if (role.name === "Administrador") {
      error("No se puede eliminar el rol de Administrador")
      return
    }

    setConfirmDialog({
      isOpen: true,
      role,
    })
  }

  const confirmDeleteRole = () => {
    if (confirmDialog.role) {
      setRoles((prev) => prev.filter((r) => r.id !== confirmDialog.role.id))
      success(`Rol "${confirmDialog.role.name}" eliminado exitosamente`)
      setConfirmDialog({ isOpen: false, role: null })
    }
  }

  const handleEditClick = (role) => {
    if (role.name === "Administrador") {
      error("No se puede editar el rol de Administrador")
      return
    }
    setSelectedRole(role)
    setIsEditModalOpen(true)
  }

  const getPermissionStats = () => {
    const totalRoles = roles.length
    const customRoles = roles.filter((r) => r.name !== "Administrador").length
    const avgPermissions =
      roles.reduce((sum, role) => {
        const permCount = Object.values(role.permissions).reduce((total, sectionPerms) => {
          return total + Object.values(sectionPerms).filter(Boolean).length
        }, 0)
        return sum + permCount
      }, 0) / totalRoles

    return { totalRoles, customRoles, avgPermissions: Math.round(avgPermissions) }
  }

  const stats = getPermissionStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Roles</h1>
          <p className="text-muted-foreground">Administra los roles y permisos del sistema</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nuevo Rol</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalRoles}</div>
              <div className="text-sm text-gray-600">Total de Roles</div>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">⚙️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.customRoles}</div>
              <div className="text-sm text-gray-600">Roles Personalizados</div>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🔐</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.avgPermissions}</div>
              <div className="text-sm text-gray-600">Permisos Promedio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar roles por nombre o descripción..."
        showFilter={false}
      />

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRoles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onEdit={handleEditClick}
            onDelete={handleDeleteRole}
            canEdit={role.name !== "Administrador"}
            canDelete={role.name !== "Administrador"}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredRoles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm ? "No se encontraron roles que coincidan con tu búsqueda" : "No hay roles registrados"}
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Crear Primer Rol
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRoles.length}
        />
      )}

      {/* Modals */}
      <RoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateRole}
        mode="create"
      />

      <RoleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRole(null)
        }}
        role={selectedRole}
        onSave={handleEditRole}
        mode="edit"
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, role: null })}
        onConfirm={confirmDeleteRole}
        title="🗑️ ¿Eliminar Rol?"
        message={`¿Estás seguro de que deseas eliminar el rol "${confirmDialog.role?.name}"? Esta acción no se puede deshacer.`}
        type="delete"
        confirmText="Sí, Eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
}

export default RolesPage
