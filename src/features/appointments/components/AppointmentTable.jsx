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
      <div className="text-center py-12 bg-card rounded-lg border border-border">
        <div className="text-muted-foreground mb-4">No hay citas programadas</div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Cliente</TableHead>
              <TableHead className="font-semibold">Contacto</TableHead>
              <TableHead className="font-semibold">Fecha</TableHead>
              <TableHead className="font-semibold">Hora</TableHead>
              <TableHead className="font-semibold">Propiedad</TableHead>
              <TableHead className="font-semibold">Estado</TableHead>
              <TableHead className="font-semibold text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="font-medium text-card-foreground">{appointment.clientName}</div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{appointment.clientPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">{appointment.clientEmail}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm font-medium">{formatDate(appointment.date)}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm font-medium">{appointment.time}</span>
                </TableCell>

                <TableCell>
                  <div className="max-w-[200px]">
                    <span className="text-sm truncate block">{getPropertyTitle(appointment.propertyId)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(appointment)}
                      className="text-muted-foreground hover:text-accent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(appointment)}
                      className="text-muted-foreground hover:text-secondary"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(appointment)}
                      className="text-muted-foreground hover:text-destructive"
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
