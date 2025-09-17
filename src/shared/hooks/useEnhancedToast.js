"use client"

import { useState, useCallback } from "react"

export const useEnhancedToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      duration: 5000,
      ...toast,
    }

    setToasts((prev) => [...prev, newToast])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message, type = "info", options = {}) => {
      return addToast({
        message,
        type,
        ...options,
      })
    },
    [addToast],
  )

  const success = useCallback(
    (message, options = {}) => {
      return toast(message, "success", {
        title: "¡Éxito! 🎉",
        ...options,
      })
    },
    [toast],
  )

  const error = useCallback(
    (message, options = {}) => {
      return toast(message, "error", {
        title: "Error 😞",
        ...options,
      })
    },
    [toast],
  )

  const warning = useCallback(
    (message, options = {}) => {
      return toast(message, "warning", {
        title: "Advertencia ⚠️",
        ...options,
      })
    },
    [toast],
  )

  const info = useCallback(
    (message, options = {}) => {
      return toast(message, "info", {
        title: "Información 💡",
        ...options,
      })
    },
    [toast],
  )

  const confirmDelete = useCallback(
    (message, onConfirm, options = {}) => {
      return toast(message, "delete", {
        title: "¿Confirmar eliminación? 🗑️",
        duration: 10000, // Más tiempo para confirmación
        action: {
          label: "Eliminar",
          onClick: () => {
            onConfirm()
            removeToast()
          },
        },
        ...options,
      })
    },
    [toast, removeToast],
  )

  return {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    confirmDelete,
    removeToast,
  }
}