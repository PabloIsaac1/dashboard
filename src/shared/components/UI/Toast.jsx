"use client"

import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Toast = ({ toast, onRemove }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  const Icon = icons[toast.type] || Info

  return (
    <div className={`flex items-center p-4 rounded-lg border shadow-lg animate-fade-in ${colors[toast.type]}`}>
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(toast.id)}
        className="ml-2 h-6 w-6 p-0 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

export { Toast, ToastContainer }
