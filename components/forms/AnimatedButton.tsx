'use client'

import { useState, useRef, useEffect } from 'react'
import { Loader2, Check, X, ArrowRight, Download, Upload } from 'lucide-react'

interface AnimatedButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  success?: boolean
  error?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  animation?: 'none' | 'bounce' | 'pulse' | 'shake' | 'glow'
  ripple?: boolean
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  error = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  animation = 'none',
  ripple = true
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleIdRef = useRef(0)

  const getVariantClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 ease-in-out font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-trust text-white hover:bg-trust-dark focus:ring-trust/50 shadow-lg hover:shadow-xl`
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500/50`
      case 'outline':
        return `${baseClasses} border-2 border-trust text-trust hover:bg-trust hover:text-white focus:ring-trust/50`
      case 'ghost':
        return `${baseClasses} text-trust hover:bg-trust/10 focus:ring-trust/50`
      case 'danger':
        return `${baseClasses} bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50 shadow-lg hover:shadow-xl`
      case 'success':
        return `${baseClasses} bg-green-500 text-white hover:bg-green-600 focus:ring-green-500/50 shadow-lg hover:shadow-xl`
      default:
        return baseClasses
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm'
      case 'md':
        return 'px-4 py-2 text-sm'
      case 'lg':
        return 'px-6 py-3 text-base'
      case 'xl':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-4 py-2 text-sm'
    }
  }

  const getAnimationClasses = () => {
    switch (animation) {
      case 'bounce':
        return 'hover:animate-bounce'
      case 'pulse':
        return 'hover:animate-pulse'
      case 'shake':
        return 'hover:animate-shake'
      case 'glow':
        return 'hover:shadow-trust/50 hover:shadow-2xl'
      default:
        return ''
    }
  }

  const getStatusIcon = () => {
    if (loading) {
      return <Loader2 className="w-4 h-4 animate-spin" />
    }
    if (success) {
      return <Check className="w-4 h-4" />
    }
    if (error) {
      return <X className="w-4 h-4" />
    }
    return icon
  }

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    // Supprimer le ripple après l'animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    createRipple(e)
    onClick?.()
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getAnimationClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${className}
      `}
    >
      {/* Ripples */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Contenu du bouton */}
      <div className="relative flex items-center justify-center space-x-2">
        {/* Icône de gauche */}
        {getStatusIcon() && iconPosition === 'left' && (
          <span className="flex-shrink-0">
            {getStatusIcon()}
          </span>
        )}

        {/* Texte */}
        <span className={loading ? 'opacity-70' : ''}>
          {children}
        </span>

        {/* Icône de droite */}
        {getStatusIcon() && iconPosition === 'right' && (
          <span className="flex-shrink-0">
            {getStatusIcon()}
          </span>
        )}
      </div>

      {/* Effet de chargement */}
      {loading && (
        <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}

      {/* Effet de succès */}
      {success && (
        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
          <Check className="w-5 h-5 text-green-600" />
        </div>
      )}

      {/* Effet d'erreur */}
      {error && (
        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
          <X className="w-5 h-5 text-red-600" />
        </div>
      )}
    </button>
  )
}


