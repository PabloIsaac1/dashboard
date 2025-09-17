"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/UI/Modal"
import Calendar from "./Calendar"
import TimeSlotPicker from "./TimeSlotPicker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, User, Building2 } from "lucide-react"

const AppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onSave,
  mode = "create",
  properties = [],
  appointments = [],
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    propertyId: "",
    date: null,
    time: "",
    notes: "",
    status: "programada",
  })
  const [errors, setErrors] = useState({})

  // Mock blocked dates (weekends and holidays)
  const blockedDates = [
    "2024-12-25", // Christmas
    "2024-01-01", // New Year
  ]

  useEffect(() => {
    if (appointment && mode === "edit") {
      setFormData({
        ...appointment,
        date: new Date(appointment.date),
      })
      setCurrentStep(3) // Skip calendar selection for editing
    } else {
      setFormData({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        propertyId: "",
        date: null,
        time: "",
        notes: "",
        status: "programada",
      })
      setCurrentStep(1)
    }
    setErrors({})
  }, [appointment, mode, isOpen])

  const getBookedTimesForDate = (date) => {
    if (!date) return []
    return appointments
      .filter(
        (apt) => new Date(apt.date).toDateString() === date.toDateString() && apt.id !== appointment?.id, // Exclude current appointment when editing
      )
      .map((apt) => apt.time)
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.clientName.trim()) newErrors.clientName = "El nombre es requerido"
      if (!formData.clientPhone.trim()) newErrors.clientPhone = "El teléfono es requerido"
      if (!formData.clientEmail.trim()) {
        newErrors.clientEmail = "El email es requerido"
      } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
        newErrors.clientEmail = "Email inválido"
      }
    }

    if (step === 2) {
      if (!formData.date) newErrors.date = "La fecha es requerida"
      if (!formData.time) newErrors.time = "La hora es requerida"
    }

    if (step === 3) {
      if (!formData.propertyId) newErrors.propertyId = "La propiedad es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep(3)) {
      onSave({
        ...formData,
        id: appointment?.id || Date.now(),
        date: formData.date.toISOString(),
        createdAt: appointment?.createdAt || new Date().toISOString(),
      })
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Información del Cliente</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Nombre Completo *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                  className={errors.clientName ? "border-destructive" : ""}
                />
                {errors.clientName && <p className="text-sm text-destructive mt-1">{errors.clientName}</p>}
              </div>

              <div>
                <Label htmlFor="clientPhone">Teléfono *</Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientPhone: e.target.value }))}
                  className={errors.clientPhone ? "border-destructive" : ""}
                />
                {errors.clientPhone && <p className="text-sm text-destructive mt-1">{errors.clientPhone}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="clientEmail">Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientEmail: e.target.value }))}
                  className={errors.clientEmail ? "border-destructive" : ""}
                />
                {errors.clientEmail && <p className="text-sm text-destructive mt-1">{errors.clientEmail}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Fecha y Hora</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Calendar
                  selectedDate={formData.date}
                  onDateSelect={(date) => {
                    setFormData((prev) => ({ ...prev, date, time: "" }))
                    setErrors((prev) => ({ ...prev, date: null }))
                  }}
                  appointments={appointments}
                  blockedDates={blockedDates}
                />
                {errors.date && <p className="text-sm text-destructive mt-2">{errors.date}</p>}
              </div>

              <div>
                {formData.date && (
                  <TimeSlotPicker
                    selectedTime={formData.time}
                    onTimeSelect={(time) => {
                      setFormData((prev) => ({ ...prev, time }))
                      setErrors((prev) => ({ ...prev, time: null }))
                    }}
                    bookedTimes={getBookedTimesForDate(formData.date)}
                  />
                )}
                {errors.time && <p className="text-sm text-destructive mt-2">{errors.time}</p>}
              </div>
            </div>

            {formData.date && formData.time && (
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  Cita programada para:{" "}
                  {formData.date.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  a las {formData.time}
                </p>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Detalles de la Cita</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyId">Propiedad a Visitar *</Label>
                <Select
                  value={formData.propertyId.toString()}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyId: value }))}
                >
                  <SelectTrigger className={errors.propertyId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Seleccionar propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id.toString()}>
                        {property.title} - {property.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.propertyId && <p className="text-sm text-destructive mt-1">{errors.propertyId}</p>}
              </div>

              <div>
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Información adicional sobre la cita..."
                />
              </div>

              {mode === "edit" && (
                <div>
                  <Label htmlFor="status">Estado de la Cita</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programada">Programada</SelectItem>
                      <SelectItem value="confirmada">Confirmada</SelectItem>
                      <SelectItem value="completada">Completada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Resumen de la Cita</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Cliente:</span> {formData.clientName}
                </p>
                <p>
                  <span className="font-medium">Teléfono:</span> {formData.clientPhone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {formData.clientEmail}
                </p>
                {formData.date && (
                  <p>
                    <span className="font-medium">Fecha:</span> {formData.date.toLocaleDateString("es-ES")}
                  </p>
                )}
                <p>
                  <span className="font-medium">Hora:</span> {formData.time}
                </p>
                {formData.propertyId && (
                  <p>
                    <span className="font-medium">Propiedad:</span>{" "}
                    {properties.find((p) => p.id.toString() === formData.propertyId.toString())?.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getStepTitle = () => {
    const titles = {
      1: "Información del Cliente",
      2: "Fecha y Hora",
      3: "Detalles de la Cita",
    }
    return titles[currentStep]
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === "create" ? "Nueva Cita" : "Editar Cita"} size="xl">
      <div className="space-y-6">
        {/* Progress Steps */}
        {mode === "create" && (
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    step === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                  }
                `}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 3 && <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? "bg-green-500" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        {renderStepContent()}

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-border">
          <div>
            {currentStep > 1 && mode === "create" && (
              <Button variant="outline" onClick={handleBack}>
                Anterior
              </Button>
            )}
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            {currentStep < 3 && mode === "create" ? (
              <Button onClick={handleNext}>Siguiente</Button>
            ) : (
              <Button onClick={handleSubmit}>{mode === "create" ? "Crear Cita" : "Guardar Cambios"}</Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AppointmentModal
