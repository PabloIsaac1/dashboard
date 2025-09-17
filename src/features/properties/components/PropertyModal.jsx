"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/UI/Modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X } from "lucide-react"

const PropertyModal = ({ isOpen, onClose, property, onSave, mode = "create" }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    status: "venta",
    bedrooms: "",
    bathrooms: "",
    garage: false,
    stratum: "",
    address: "",
    area: "",
    description: "",
    image: null,
  })

  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (property && mode === "edit") {
      setFormData(property)
      setImagePreview(property.image)
    } else {
      setFormData({
        title: "",
        type: "",
        price: "",
        status: "venta",
        bedrooms: "",
        bathrooms: "",
        garage: false,
        stratum: "",
        address: "",
        area: "",
        description: "",
        image: null,
      })
      setImagePreview(null)
    }
    setErrors({})
  }, [property, mode, isOpen])

  const propertyTypes = [
    { value: "casa", label: "Casa" },
    { value: "apartamento", label: "Apartamento" },
    { value: "apartaestudio", label: "Apartaestudio" },
    { value: "finca", label: "Finca" },
    { value: "terreno", label: "Terreno" },
    { value: "local", label: "Local Comercial" },
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "El título es requerido"
    if (!formData.type) newErrors.type = "El tipo de propiedad es requerido"
    if (!formData.price || formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0"
    if (!formData.address.trim()) newErrors.address = "La dirección es requerida"
    if (!formData.area || formData.area <= 0) newErrors.area = "El área debe ser mayor a 0"
    if (!formData.stratum || formData.stratum < 1 || formData.stratum > 6) {
      newErrors.stratum = "El estrato debe estar entre 1 y 6"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...formData,
        id: property?.id || Date.now(),
        price: Number.parseFloat(formData.price),
        area: Number.parseFloat(formData.area),
        bedrooms: Number.parseInt(formData.bedrooms) || 0,
        bathrooms: Number.parseInt(formData.bathrooms) || 0,
        stratum: Number.parseInt(formData.stratum),
      })
      onClose()
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData((prev) => ({ ...prev, image: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, image: null }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Crear Nueva Propiedad" : "Editar Propiedad"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <Label htmlFor="title">Título de la Propiedad *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type">Tipo de Propiedad *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-destructive mt-1">{errors.type}</p>}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venta">En Venta</SelectItem>
                <SelectItem value="arriendo">En Arriendo</SelectItem>
                <SelectItem value="vendido">Vendido</SelectItem>
                <SelectItem value="arrendado">Arrendado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Precio *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              className={errors.price ? "border-destructive" : ""}
            />
            {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
          </div>

          {/* Area */}
          <div>
            <Label htmlFor="area">Área (m²) *</Label>
            <Input
              id="area"
              type="number"
              value={formData.area}
              onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
              className={errors.area ? "border-destructive" : ""}
            />
            {errors.area && <p className="text-sm text-destructive mt-1">{errors.area}</p>}
          </div>

          {/* Bedrooms */}
          <div>
            <Label htmlFor="bedrooms">Habitaciones</Label>
            <Input
              id="bedrooms"
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
            />
          </div>

          {/* Bathrooms */}
          <div>
            <Label htmlFor="bathrooms">Baños</Label>
            <Input
              id="bathrooms"
              type="number"
              min="0"
              value={formData.bathrooms}
              onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
            />
          </div>

          {/* Stratum */}
          <div>
            <Label htmlFor="stratum">Estrato *</Label>
            <Select
              value={formData.stratum.toString()}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, stratum: value }))}
            >
              <SelectTrigger className={errors.stratum ? "border-destructive" : ""}>
                <SelectValue placeholder="Seleccionar estrato" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((stratum) => (
                  <SelectItem key={stratum} value={stratum.toString()}>
                    Estrato {stratum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stratum && <p className="text-sm text-destructive mt-1">{errors.stratum}</p>}
          </div>

          {/* Garage */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="garage"
              checked={formData.garage}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, garage: checked }))}
            />
            <Label htmlFor="garage">Tiene Garaje</Label>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <Label htmlFor="address">Dirección *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción detallada de la propiedad..."
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <Label>Imagen de la Propiedad</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-2">
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">Haz clic para subir una imagen</span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{mode === "create" ? "Crear Propiedad" : "Guardar Cambios"}</Button>
        </div>
      </form>
    </Modal>
  )
}

export default PropertyModal
