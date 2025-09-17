"use client"

import { useState, useCallback } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now()
    const newToast = { id, ...toast }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, toast.duration || 3000)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message, type = "info", duration = 3000) => {
      return addToast({ message, type, duration })
    },
    [addToast],
  )

  const success = useCallback(
    (message, duration) => {
      return toast(message, "success", duration)
    },
    [toast],
  )

  const error = useCallback(
    (message, duration) => {
      return toast(message, "error", duration)
    },
    [toast],
  )

  const warning = useCallback(
    (message, duration) => {
      return toast(message, "warning", duration)
    },
    [toast],
  )

  return {
    toasts,
    toast,
    success,
    error,
    warning,
    removeToast,
  }
}
