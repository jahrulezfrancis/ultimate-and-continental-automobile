"use client"

// This is a simplified version of the toast component
import { useState, useEffect } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const toastContext: ToastContextType = {
  toast: () => {},
}

export function Toaster() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  useEffect(() => {
    toastContext.toast = (props) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { ...props, id }])

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 5000)
    }
  }, [])

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-lg transform transition-all duration-500 animate-in fade-in slide-in-from-right-full ${
            toast.variant === "destructive" ? "bg-red-600 text-white" : "bg-zinc-900 border border-zinc-800 text-white"
          }`}
        >
          {toast.title && <h3 className="font-medium mb-1">{toast.title}</h3>}
          {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
        </div>
      ))}
    </div>
  )
}

export const toast = (props: ToastProps) => {
  toastContext.toast(props)
}
