"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, Phone, Mail } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const AppointmentTable = ({ appointments, properties, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      programada: "bg-blue-100 text-blue-800",
      confirmada: "bg-green-100 text-green-800",
      completada: "bg-gray-100 text-gray-800",
      cancelada: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPropertyTitle = (propertyId) => {
    const property = properties.find((p) => p.id.toString() === propertyId.toString())
    return property ? property.title : "Propiedad no encontrada"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-lg">
        <div className="text-6xl mb-4">📅</div>
        <div className="text-gray-500 text-lg mb-2">No hay citas programadas</div>
        <div className="text-gray-400">¡Programa tu primera cita!</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <TableHead className="font-bold text-gray-700">👤 Cliente</TableHead>
              <TableHead className="font-bold text-gray-700">📞 Contacto</TableHead>
              <TableHead className="font-bold text-gray-700">📅 Fecha</TableHead>
              <TableHead className="font-bold text-gray-700">⏰ Hora</TableHead>
              <TableHead className="font-bold text-gray-700">🏠 Propiedad</TableHead>
              <TableHead className="font-bold text-gray-700">📊 Estado</TableHead>
              <TableHead className="font-bold text-gray-700 text-center">⚙️ Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100">
                <TableCell>
                  <div className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    {appointment.clientName}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📱</span>
                      <span className="font-medium">{appointment.clientPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📧</span>
                      <span className="truncate max-w-[150px] font-medium">{appointment.clientEmail}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span className="text-sm font-semibold text-gray-700">{formatDate(appointment.date)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏰</span>
                    <span className="text-sm font-semibold text-gray-700">{appointment.time}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="max-w-[200px] flex items-center gap-2">
                    <span className="text-lg">🏠</span>
                    <span className="text-sm truncate block font-medium text-gray-700">{getPropertyTitle(appointment.propertyId)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={`${getStatusColor(appointment.status)} font-semibold px-3 py-1 rounded-full`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(appointment)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg p-2"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(appointment)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(appointment)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AppointmentTable
