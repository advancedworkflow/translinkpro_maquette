'use client'

import { useState, useRef, useEffect } from 'react'
import { AlertCircle, CheckCircle, Maximize2, Minimize2 } from 'lucide-react'

interface AnimatedTextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  maxLength?: number
  minLength?: number
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  className?: string
  autoGrow?: boolean
  showCharCount?: boolean
  showExpandButton?: boolean
}

export default function AnimatedTextarea({
  label,
  value,
  onChange,
  placeholder,
  error,
  success,
  disabled = false,
  required = false,
  maxLength,
  minLength,
  rows = 3,
  resize = 'vertical',
  className = '',
  autoGrow = true,
  showCharCount = true,
  showExpandButton = true
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasError = !!error
  const hasSuccess = success && !hasError
  const isActive = isFocused || value.length > 0

  useEffect(() => {
    if (isFocused) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isFocused])

  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      const textarea = textareaRef.current
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value, autoGrow])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (maxLength && newValue.length > maxLength) return
    onChange(newValue)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const getStatusIcon = () => {
    if (hasError) {
      return <AlertCircle className="w-5 h-5 text-red-500" />
    }
    if (hasSuccess) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    return null
  }

  const getResizeClass = () => {
    switch (resize) {
      case 'none':
        return 'resize-none'
      case 'vertical':
        return 'resize-y'
      case 'horizontal':
        return 'resize-x'
      case 'both':
        return 'resize'
      default:
        return 'resize-y'
    }
  }

  const getTextareaHeight = () => {
    if (isExpanded) {
      return 'h-64'
    }
    if (autoGrow) {
      return 'min-h-[80px]'
    }
    return ''
  }

  return (
    <div className={`relative ${className}`}>
      {/* Container principal */}
      <div className="relative">
        {/* Label flottant */}
        <label
          className={`absolute left-3 transition-all duration-300 ease-in-out pointer-events-none ${
            isActive
              ? 'top-1 text-xs text-trust font-medium'
              : 'top-2 text-sm text-gray-500'
          } ${hasError ? 'text-red-500' : hasSuccess ? 'text-green-500' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isActive ? placeholder : ''}
            disabled={disabled}
            rows={isExpanded ? 10 : rows}
            maxLength={maxLength}
            minLength={minLength}
            className={`
              w-full px-3 pt-6 pb-2 border rounded-lg transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust
              ${getResizeClass()}
              ${getTextareaHeight()}
              ${hasError 
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : hasSuccess 
                ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-green-500/20'
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
              ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
              ${isAnimating ? 'scale-[1.01]' : ''}
            `}
          />

          {/* Icône de statut */}
          {getStatusIcon() && (
            <div className="absolute top-3 right-3">
              {getStatusIcon()}
            </div>
          )}

          {/* Bouton d'expansion */}
          {showExpandButton && (
            <button
              type="button"
              onClick={toggleExpand}
              className="absolute bottom-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Barre de progression pour les champs avec maxLength */}
          {maxLength && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  value.length / maxLength > 0.8 ? 'bg-red-500' :
                  value.length / maxLength > 0.6 ? 'bg-yellow-500' : 'bg-trust'
                }`}
                style={{ width: `${Math.min((value.length / maxLength) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Effet de focus animé */}
        {isFocused && (
          <div className="absolute inset-0 rounded-lg border-2 border-trust pointer-events-none animate-pulse" />
        )}
      </div>

      {/* Message d'erreur */}
      {hasError && (
        <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm animate-fadeIn">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Message de succès */}
      {hasSuccess && (
        <div className="mt-2 flex items-center space-x-2 text-green-600 text-sm animate-fadeIn">
          <CheckCircle className="w-4 h-4" />
          <span>Texte valide</span>
        </div>
      )}

      {/* Compteur de caractères et informations */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          {showCharCount && maxLength && (
            <span>
              {value.length}/{maxLength} caractères
            </span>
          )}
          {minLength && (
            <span>
              Minimum {minLength} caractères
            </span>
          )}
        </div>
        
        {isExpanded && (
          <button
            type="button"
            onClick={toggleExpand}
            className="text-trust hover:text-trust-dark transition-colors duration-200"
          >
            Réduire
          </button>
        )}
      </div>
    </div>
  )
}


