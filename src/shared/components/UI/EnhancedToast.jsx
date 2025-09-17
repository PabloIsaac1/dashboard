"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Trash2 } from "lucide-react"

const toastTypes = {
  success: {
    icon: CheckCircle,
    emoji: "✅",
    bgColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    textColor: "text-white",
    borderColor: "border-green-400",
  },
  error: {
    icon: AlertCircle,
    emoji: "❌",
    bgColor: "bg-gradient-to-r from-red-500 to-rose-600",
    textColor: "text-white",
    borderColor: "border-red-400",
  },
  warning: {
    icon: AlertTriangle,
    emoji: "⚠️",
    bgColor: "bg-gradient-to-r from-yellow-500 to-orange-600",
    textColor: "text-white",
    borderColor: "border-yellow-400",
  },
  info: {
    icon: Info,
    emoji: "ℹ️",
    bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    textColor: "text-white",
    borderColor: "border-blue-400",
  },
  delete: {
    icon: Trash2,
    emoji: "🗑️",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-600",
    textColor: "text-white",
    borderColor: "border-purple-400",
  },
}

export const EnhancedToast = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100)
  const [isVisible, setIsVisible] = useState(false)

  const type = toastTypes[toast.type] || toastTypes.info
  const Icon = type.icon

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 50)

    // Barra de progreso
    const duration = toast.duration || 5000
    const interval = 50
    const decrement = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          handleClose()
          return 0
        }
        return prev - decrement
      })
    }, interval)

    return () => clearInterval(timer)
  }, [toast.duration])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      className={`
      transform transition-all duration-300 ease-in-out mb-3
      ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
    `}
    >
      <div
        className={`
        relative overflow-hidden rounded-xl shadow-2xl border-2 backdrop-blur-sm
        ${type.bgColor} ${type.borderColor} ${type.textColor}
        min-w-[350px] max-w-[450px]
      `}
      >
        {/* Barra de progreso */}
        <div className="absolute top-0 left-0 h-1 bg-white/20 w-full">
          <div
            className="h-full bg-white/60 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-4 flex items-start gap-3">
          {/* Icono y Emoji */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl">{type.emoji}</span>
            <Icon className="w-5 h-5" />
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            {toast.title && <h4 className="font-bold text-sm mb-1 leading-tight">{toast.title}</h4>}
            <p className="text-sm opacity-95 leading-relaxed">{toast.message}</p>
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {/* Botón cerrar */}
          <button onClick={handleClose} className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end">
      {toasts.map((toast) => (
        <EnhancedToast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}
