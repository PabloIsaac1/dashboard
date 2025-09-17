"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const Calendar = ({ selectedDate, onDateSelect, appointments = [], blockedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const isBlocked = (date) => {
    return blockedDates.some((blockedDate) => date.toDateString() === new Date(blockedDate).toDateString())
  }

  const isPast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const hasAppointment = (date) => {
    return appointments.some((appointment) => new Date(appointment.date).toDateString() === date.toDateString())
  }

  const getAppointmentsForDate = (date) => {
    return appointments.filter((appointment) => new Date(appointment.date).toDateString() === date.toDateString())
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const canSelectDate = (date) => {
    return !isPast(date) && !isWeekend(date) && !isBlocked(date)
  }

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth])

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2" />
          }

          const isSelectableDate = canSelectDate(date)
          const isSelectedDate = isSelected(date)
          const hasAppt = hasAppointment(date)
          const dayAppointments = getAppointmentsForDate(date)

          return (
            <div
              key={date.toISOString()}
              className={`
                relative p-2 text-center text-sm cursor-pointer rounded-lg transition-all duration-200
                ${
                  isSelectedDate
                    ? "bg-primary text-primary-foreground shadow-md"
                    : isSelectableDate
                      ? "hover:bg-accent hover:text-accent-foreground"
                      : "text-muted-foreground cursor-not-allowed"
                }
                ${isPast(date) ? "opacity-50" : ""}
                ${isWeekend(date) ? "bg-muted/50" : ""}
                ${isBlocked(date) ? "bg-destructive/10 text-destructive" : ""}
              `}
              onClick={() => isSelectableDate && onDateSelect(date)}
            >
              <div className="font-medium">{date.getDate()}</div>

              {/* Appointment indicators */}
              {hasAppt && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    {dayAppointments.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelectedDate ? "bg-primary-foreground" : "bg-primary"
                        }`}
                      />
                    ))}
                    {dayAppointments.length > 3 && <div className="text-xs">+</div>}
                  </div>
                </div>
              )}

              {/* Weekend indicator */}
              {isWeekend(date) && (
                <div className="absolute top-1 right-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                </div>
              )}

              {/* Blocked indicator */}
              {isBlocked(date) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-6 bg-destructive rotate-45" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded" />
            <span>Fin de semana</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive/20 rounded relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0.5 h-3 bg-destructive rotate-45" />
              </div>
            </div>
            <span>Bloqueado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
            <span>Con citas</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
