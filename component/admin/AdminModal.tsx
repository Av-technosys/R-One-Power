"use client"

import React, { useEffect } from "react"
import {
  IconCheck,
  IconTrash,
  IconAlertTriangle,
  IconX,
} from "@tabler/icons-react"

// --- 1. SUCCESS / ALERT POPUP MODAL ---
export interface SuccessModalProps {
  isOpen: boolean
  title?: string
  message: string
  buttonText?: string
  onClose: () => void
}

export function SuccessModal({
  isOpen,
  title = "Success!",
  message,
  buttonText = "OK, Got it",
  onClose,
}: SuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Center Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 text-center z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <IconX size={18} />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-100/60 shadow-xs">
          <IconCheck size={32} strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-poppins text-slate-900 tracking-tight">
          {title}
        </h3>

        {/* Message */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed font-inter">
          {message}
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1565C0] hover:bg-[#0D47A1] shadow-md shadow-blue-500/20 transition-all active:scale-98 cursor-pointer"
          >
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 2. CONFIRMATION POPUP MODAL (FOR DELETE / DANGEROUS ACTIONS) ---
export interface ConfirmModalProps {
  isOpen: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onCancel()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, isLoading, onCancel])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div
        onClick={() => {
          if (!isLoading) onCancel()
        }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Center Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 text-center z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button top right */}
        {!isLoading && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Cancel"
          >
            <IconX size={18} />
          </button>
        )}

        {/* Warning / Trash Icon */}
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-4 shadow-xs ${
            isDestructive
              ? "bg-red-50 text-red-600 border-red-100/60"
              : "bg-amber-50 text-amber-600 border-amber-100/60"
          }`}
        >
          {isDestructive ? (
            <IconTrash size={30} strokeWidth={2.2} />
          ) : (
            <IconAlertTriangle size={30} strokeWidth={2.2} />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-poppins text-slate-900 tracking-tight">
          {title}
        </h3>

        {/* Message */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed font-inter">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-colors active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all active:scale-98 cursor-pointer disabled:opacity-50 shadow-md ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                : "bg-[#1565C0] hover:bg-blue-700 shadow-blue-500/20"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

