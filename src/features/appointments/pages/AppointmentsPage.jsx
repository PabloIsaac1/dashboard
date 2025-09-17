"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import SearchBar from "../../../shared/components/UI/SearchBar"
import Pagination from "../../../shared/components/UI/Pagination"
import AppointmentTable from "../components/AppointmentTable"
import AppointmentModal from "../components/AppointmentModal"
import { useToast } from "../../../shared/hooks/useToast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AppointmentsPage = () => {
  // Mock data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "Juan Pérez",
      clientPhone: "+57 300 123 4567",
      clientEmail: "juan.perez@email.com",
      propertyId: "1",
      date: "2024-12-20T00:00:00.000Z",
      time: "10:00",
      notes: "Cliente interesado en apartamento para inversión",
      status: "programada",
      createdAt: "2024-12-15T00:00:00.000Z",
    },
    {
      id: 2,
      clientName: "María González",
      clientPhone: "+57 301 987 6543",
      clientEmail: "maria.gonzalez@email.com",
      propertyId: "2",
      date: "2024-12-21T00:00:00.000Z",
      time: "14:30",
      notes: "Busca casa familiar en zona segura",
      status: "confirmada",
      createdAt: "2024-12-16T00:00:00.000Z",
    },
    {
      id: 3,
      clientName: "Carlos Rodríguez",
      clientPhone: "+57 302 456 7890",
      clientEmail: "carlos.rodriguez@email.com",
      propertyId: "3",
      date: "2024-12-18T00:00:00.000Z",
      time: "16:00",
      notes: "Primera vivienda, necesita asesoría financiera",
      status: "completada",
      createdAt: "2024-12-14T00:00:00.000Z",
    },
  ])

  const properties = [
    {
      id: 1,
      title: "Hermoso Apartamento en El Poblado",
      address: "Carrera 43A #5-15, El Poblado, Medellín",
    },
    {
      id: 2,
      title: "Casa Familiar en Laureles",
      address: "Calle 39 #75-20, Laureles, Medellín",
    },
    {
      id: 3,
      title: "Apartaestudio en Zona Rosa",
      address: "Carrera 14 #85-32, Zona Rosa, Bogotá",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const { success, error } = useToast()

  const itemsPerPage = 10

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.clientPhone.includes(searchTerm)

      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [appointments, searchTerm, statusFilter])

  // Paginate filtered appointments
  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAppointments, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  const handleCreateAppointment = (appointmentData) => {
    setAppointments((prev) => [...prev, appointmentData])
    success("Cita creada exitosamente")
  }

  const handleEditAppointment = (appointmentData) => {
    setAppointments((prev) => prev.map((a) => (a.id === appointmentData.id ? appointmentData : a)))
    success("Cita actualizada exitosamente")
  }

  const handleDeleteAppointment = (appointment) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la cita con ${appointment.clientName}?`)) {
      setAppointments((prev) => prev.filter((a) => a.id !== appointment.id))
      success("Cita eliminada exitosamente")
    }
  }

  const handleViewAppointment = (appointment) => {
    // For now, just show an alert with appointment details
    alert(
      `Detalles de la cita:\n\nCliente: ${appointment.clientName}\nFecha: ${new Date(appointment.date).toLocaleDateString("es-ES")}\nHora: ${appointment.time}\nEstado: ${appointment.status}`,
    )
  }

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment)
    setIsEditModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Citas</h1>
          <p className="text-muted-foreground">Programa y administra las visitas a propiedades</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nueva Cita</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Buscar por nombre, email o teléfono..."
            showFilter={false}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="programada">Programada</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Citas", value: appointments.length, color: "text-blue-600" },
          {
            label: "Programadas",
            value: appointments.filter((a) => a.status === "programada").length,
            color: "text-orange-600",
          },
          {
            label: "Confirmadas",
            value: appointments.filter((a) => a.status === "confirmada").length,
            color: "text-green-600",
          },
          {
            label: "Completadas",
            value: appointments.filter((a) => a.status === "completada").length,
            color: "text-gray-600",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-card p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Appointments Table */}
      <AppointmentTable
        appointments={paginatedAppointments}
        properties={properties}
        onView={handleViewAppointment}
        onEdit={handleEditClick}
        onDelete={handleDeleteAppointment}
      />

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all"
              ? "No se encontraron citas que coincidan con los filtros"
              : "No hay citas programadas"}
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Crear Primera Cita
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
          totalItems={filteredAppointments.length}
        />
      )}

      {/* Modals */}
      <AppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateAppointment}
        mode="create"
        properties={properties}
        appointments={appointments}
      />

      <AppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedAppointment(null)
        }}
        appointment={selectedAppointment}
        onSave={handleEditAppointment}
        mode="edit"
        properties={properties}
        appointments={appointments}
      />
    </div>
  )
}

export default AppointmentsPage
