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
    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in overflow-hidden bg-white border-0 shadow-lg">
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
          <Badge className={`${getStatusColor(property.status)} font-bold px-3 py-1 rounded-full shadow-lg`}>
            {property.status === 'venta' ? '💰 VENTA' : 
             property.status === 'arriendo' ? '🏠 ARRIENDO' : 
             property.status === 'vendido' ? '✅ VENDIDO' : 
             '🔒 ARRENDADO'}
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-black/80 to-gray-800/80 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-1">
            <span className="text-lg">💰</span>
            <span className="font-bold text-sm">
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
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 flex items-center gap-2">
          <TypeIcon className="h-5 w-5 text-blue-600" />
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <span className="text-lg mr-2">📍</span>
          <span className="text-sm line-clamp-1 font-medium">{property.address}</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            {property.bedrooms && (
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
                <span className="text-base">🛏️</span>
                <span className="font-semibold text-blue-700">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg">
                <span className="text-base">🚿</span>
                <span className="font-semibold text-green-700">{property.bathrooms}</span>
              </div>
            )}
            {property.garage && (
              <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-lg">
                <span className="text-base">🚗</span>
                <span className="font-semibold text-purple-700">Sí</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-lg">
            <span className="text-base">📐</span>
            <span className="font-semibold text-orange-700">{property.area} m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <Badge variant="outline" className="text-xs font-semibold bg-gray-50 text-gray-700 border-gray-300">
              🏷️ {property.type}
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold bg-indigo-50 text-indigo-700 border-indigo-300">
              ⭐ Estrato {property.stratum}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(property)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg p-2"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(property)}
              className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg p-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(property)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-2"
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
