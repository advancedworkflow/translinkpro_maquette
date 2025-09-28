'use client'

import { useState, useRef, useEffect } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

interface AnimatedInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  icon?: React.ReactNode
  className?: string
  autoComplete?: string
  maxLength?: number
  minLength?: number
  pattern?: string
}

export default function AnimatedInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  className = '',
  autoComplete,
  maxLength,
  minLength,
  pattern
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isActive = isFocused || value.length > 0
  const hasError = !!error
  const hasSuccess = success && !hasError

  useEffect(() => {
    if (isFocused) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isFocused])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password'
    }
    return type
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

  return (
    <div className={`relative ${className}`}>
      {/* Container principal */}
      <div className="relative">
        {/* Label flottant */}
        <label
          className={`absolute left-3 transition-all duration-300 ease-in-out pointer-events-none ${
            isActive
              ? 'top-1 text-xs text-trust font-medium'
              : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
          } ${hasError ? 'text-red-500' : hasSuccess ? 'text-green-500' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Input */}
        <div className="relative">
          {/* Icône de gauche */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200">
              {icon}
            </div>
          )}

          <input
            ref={inputRef}
            type={getInputType()}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isActive ? placeholder : ''}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            className={`
              w-full px-3 pt-6 pb-2 border rounded-lg transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust
              ${icon ? 'pl-10' : ''}
              ${getStatusIcon() ? 'pr-10' : ''}
              ${type === 'password' ? 'pr-20' : ''}
              ${hasError 
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : hasSuccess 
                ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-green-500/20'
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
              ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
              ${isAnimating ? 'scale-[1.02]' : ''}
            `}
          />

          {/* Icône de statut */}
          {getStatusIcon() && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStatusIcon()}
            </div>
          )}

          {/* Bouton pour afficher/masquer le mot de passe */}
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
          <span>Champ valide</span>
        </div>
      )}

      {/* Compteur de caractères */}
      {maxLength && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}


