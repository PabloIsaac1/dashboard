"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import SearchBar from "../../../shared/components/UI/SearchBar"
import Pagination from "../../../shared/components/UI/Pagination"
import PropertyCard from "../components/PropertyCard"
import PropertyModal from "../components/PropertyModal"
import PropertyViewModal from "../components/PropertyViewModal"
import { useEnhancedToast } from "../../../shared/hooks/useEnhancedToast"
import { ConfirmDialog } from "../../../shared/components/UI/ConfirmDialog"

const PropertiesPage = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Hermoso Apartamento en El Poblado",
      type: "apartamento",
      price: 450000000,
      status: "venta",
      bedrooms: 3,
      bathrooms: 2,
      garage: true,
      stratum: 5,
      address: "Carrera 43A #5-15, El Poblado, Medellín",
      area: 120,
      description: "Moderno apartamento con excelente ubicación y acabados de lujo.",
      image: "/modern-apartment-building.png",
    },
    {
      id: 2,
      title: "Casa Familiar en Laureles",
      type: "casa",
      price: 650000000,
      status: "venta",
      bedrooms: 4,
      bathrooms: 3,
      garage: true,
      stratum: 4,
      address: "Calle 39 #75-20, Laureles, Medellín",
      area: 180,
      description: "Amplia casa familiar con jardín y zona social.",
      image: "/family-house-garden.png",
    },
    {
      id: 3,
      title: "Apartaestudio en Zona Rosa",
      type: "apartaestudio",
      price: 1800000,
      status: "arriendo",
      bedrooms: 1,
      bathrooms: 1,
      garage: false,
      stratum: 4,
      address: "Carrera 14 #85-32, Zona Rosa, Bogotá",
      area: 45,
      description: "Cómodo apartaestudio completamente amoblado.",
      image: "/studio-apartment-modern.jpg",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, property: null })
  const { success, error } = useEnhancedToast()

  const itemsPerPage = 6

  // Filter properties based on search term
  const filteredProperties = useMemo(() => {
    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [properties, searchTerm])

  // Paginate filtered properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProperties, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

  const handleCreateProperty = (propertyData) => {
    setProperties((prev) => [...prev, propertyData])
    success("Propiedad creada exitosamente")
  }

  const handleEditProperty = (propertyData) => {
    setProperties((prev) => prev.map((p) => (p.id === propertyData.id ? propertyData : p)))
    success("Propiedad actualizada exitosamente")
  }

  const handleDeleteProperty = (property) => {
    setConfirmDialog({
      isOpen: true,
      property,
    })
  }

  const confirmDeleteProperty = () => {
    if (confirmDialog.property) {
      setProperties((prev) => prev.filter((p) => p.id !== confirmDialog.property.id))
      success(`Propiedad "${confirmDialog.property.title}" eliminada exitosamente`)
      setConfirmDialog({ isOpen: false, property: null })
    }
  }

  const handleViewProperty = (property) => {
    setSelectedProperty(property)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (property) => {
    setSelectedProperty(property)
    setIsEditModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            🏠 Gestión de Inmuebles
          </h1>
          <p className="text-gray-600">Administra tu portafolio de propiedades</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)} 
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>🏡 Nueva Propiedad</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar propiedades por título, dirección o tipo..."
      />

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={handleViewProperty}
            onEdit={handleEditClick}
            onDelete={handleDeleteProperty}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm
              ? "No se encontraron propiedades que coincidan con tu búsqueda"
              : "No hay propiedades registradas"}
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Crear Primera Propiedad
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
          totalItems={filteredProperties.length}
        />
      )}

      {/* Modals */}
      <PropertyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProperty}
        mode="create"
      />

      <PropertyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedProperty(null)
        }}
        property={selectedProperty}
        onSave={handleEditProperty}
        mode="edit"
      />

      <PropertyViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedProperty(null)
        }}
        property={selectedProperty}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, property: null })}
        onConfirm={confirmDeleteProperty}
        title="🗑️ ¿Eliminar Propiedad?"
        message={`¿Estás seguro de que deseas eliminar "${confirmDialog.property?.title}"? Esta acción no se puede deshacer.`}
        type="delete"
        confirmText="Sí, Eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
}

export default PropertiesPage
