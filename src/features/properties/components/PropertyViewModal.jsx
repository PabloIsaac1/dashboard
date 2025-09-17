"use client"

import Modal from "../../../shared/components/UI/Modal"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Car, Maximize, Home, Building2 } from "lucide-react"

const PropertyViewModal = ({ isOpen, onClose, property }) => {
  if (!property) return null

  const getPropertyTypeIcon = (type) => {
    const icons = {
      casa: Home,
      apartamento: Building2,
      apartaestudio: Building2,
      finca: Home,
      terreno: Maximize,
      local: Building2,
    }
    return icons[type] || Home
  }

  const getStatusColor = (status) => {
    const colors = {
      venta: "bg-green-100 text-green-800",
      arriendo: "bg-blue-100 text-blue-800",
      vendido: "bg-gray-100 text-gray-800",
      arrendado: "bg-purple-100 text-purple-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const TypeIcon = getPropertyTypeIcon(property.type)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles de la Propiedad" size="lg">
      <div className="space-y-6">
        {/* Image */}
        {property.image ? (
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
            <TypeIcon className="h-24 w-24 text-muted-foreground" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-2">{property.title}</h2>
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{property.address}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-2">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(property.price)}
            </div>
            <Badge className={getStatusColor(property.status)}>{property.status.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted p-4 rounded-lg text-center">
            <Bed className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{property.bedrooms || 0}</div>
            <div className="text-sm text-muted-foreground">Habitaciones</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <Bath className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{property.bathrooms || 0}</div>
            <div className="text-sm text-muted-foreground">Baños</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <Maximize className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{property.area}</div>
            <div className="text-sm text-muted-foreground">m²</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <Car className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{property.garage ? "Sí" : "No"}</div>
            <div className="text-sm text-muted-foreground">Garaje</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Información General</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo:</span>
                <span className="font-medium capitalize">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estrato:</span>
                <span className="font-medium">{property.stratum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
              </div>
            </div>
          </div>

          {property.description && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PropertyViewModal
