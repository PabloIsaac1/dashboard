"use client"

import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

const TimeSlotPicker = ({ selectedTime, onTimeSelect, bookedTimes = [] }) => {
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

  const isTimeBooked = (time) => {
    return bookedTimes.includes(time)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Seleccionar Hora</h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {timeSlots.map((time) => {
          const isBooked = isTimeBooked(time)
          const isSelected = selectedTime === time

          return (
            <Button
              key={time}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              disabled={isBooked}
              onClick={() => onTimeSelect(time)}
              className={`
                ${isBooked ? "opacity-50 cursor-not-allowed" : ""}
                ${isSelected ? "shadow-md" : ""}
              `}
            >
              {time}
            </Button>
          )
        })}
      </div>

      {bookedTimes.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Horarios ocupados:</span> {bookedTimes.join(", ")}
        </div>
      )}
    </div>
  )
}

export default TimeSlotPicker
