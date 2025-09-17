"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Modal = ({ isOpen, onClose, title, children, size = "md", showCloseButton = true }) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fade-in ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            {title && (
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white">{children}</div>
      </div>
    </div>
  )
}

export default Modal
