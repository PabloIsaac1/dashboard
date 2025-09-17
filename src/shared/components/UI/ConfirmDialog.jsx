"use client"
import { AlertTriangle, Trash2, X } from "lucide-react"

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  type = "delete",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!isOpen) return null

  const typeConfig = {
    delete: {
      icon: Trash2,
      emoji: "🗑️",
      bgColor: "bg-gradient-to-br from-red-500 to-rose-600",
      confirmBg: "bg-red-600 hover:bg-red-700",
      iconBg: "bg-red-100",
    },
    warning: {
      icon: AlertTriangle,
      emoji: "⚠️",
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-600",
      confirmBg: "bg-yellow-600 hover:bg-yellow-700",
      iconBg: "bg-yellow-100",
    },
  }

  const config = typeConfig[type] || typeConfig.delete
  const Icon = config.icon

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header colorido */}
        <div className={`${config.bgColor} p-6 text-white relative`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${config.iconBg}`}>
              <span className="text-2xl">{config.emoji}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

          {/* Botones */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`px-6 py-2.5 ${config.confirmBg} text-white rounded-xl font-medium transition-colors shadow-lg`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
