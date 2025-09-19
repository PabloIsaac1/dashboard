"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Car, Maximize, Eye, Edit, Trash2, DollarSign, Home, Building2 } from "lucide-react"

const PropertyCard = ({ property, onView, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false)

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
    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in overflow-hidden bg-white border border-gray-200 shadow-lg">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageError && property.image ? (
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <TypeIcon className="h-16 w-16 text-muted-foreground" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getStatusColor(property.status)}>{property.status.toUpperCase()}</Badge>
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-black/70 to-gray-800/70 text-white px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(property.price)}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-700 mb-2 line-clamp-1 flex items-center gap-2">
          <TypeIcon className="h-5 w-5" />
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">{property.address}</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {property.bedrooms && (
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.garage && (
              <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-lg border border-purple-200">
                <Car className="h-4 w-4" />
                <span>{property.garage ? "Sí" : "No"}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-lg border border-orange-200">
            <Maximize className="h-4 w-4" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-1">
            <Badge variant="outline" className="text-xs font-semibold bg-gray-50 text-gray-600 border-gray-300">
              {property.type}
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold bg-indigo-50 text-indigo-600 border-indigo-300">
              Estrato {property.stratum}
            </Badge>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(property)}
              className="text-muted-foreground hover:text-accent"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(property)}
              className="text-muted-foreground hover:text-secondary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(property)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
