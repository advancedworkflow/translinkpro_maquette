'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, AlertCircle, Search } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

interface AnimatedSelectProps {
  label: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  searchable?: boolean
  multiple?: boolean
  className?: string
  maxHeight?: number
}

export default function AnimatedSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Sélectionner une option',
  error,
  success,
  disabled = false,
  required = false,
  searchable = false,
  multiple = false,
  className = '',
  maxHeight = 200
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const hasError = !!error
  const hasSuccess = success && !hasError
  const isActive = isOpen || value.length > 0

  // Filtrer les options basées sur la recherche
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Trouver l'option sélectionnée
  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen, searchable])

  const handleToggle = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchQuery('')
      setHighlightedIndex(-1)
    }
  }

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchQuery('')
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex].value)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(-1)
        break
    }
  }

  const getStatusIcon = () => {
    if (hasError) {
      return <AlertCircle className="w-5 h-5 text-red-500" />
    }
    if (hasSuccess) {
      return <Check className="w-5 h-5 text-green-500" />
    }
    return null
  }

  return (
    <div className={`relative ${className}`} ref={selectRef}>
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

      {/* Bouton de sélection */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full px-3 pt-6 pb-2 text-left border rounded-lg transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust
          ${hasError 
            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
            : hasSuccess 
            ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-green-500/20'
            : 'border-gray-300 bg-white hover:border-gray-400'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${isOpen ? 'ring-2 ring-trust/20 border-trust' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            {selectedOption?.icon && (
              <span className="text-gray-400 flex-shrink-0">
                {selectedOption.icon}
              </span>
            )}
            <span className={`truncate ${!selectedOption ? 'text-gray-400' : ''}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fadeIn"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {/* Barre de recherche */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust"
                />
              </div>
            </div>
          )}

          {/* Liste des options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                Aucune option trouvée
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleOptionClick(option.value)}
                  disabled={option.disabled}
                  className={`
                    w-full px-3 py-2 text-left text-sm transition-colors duration-150 flex items-center space-x-2
                    ${option.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : highlightedIndex === index
                      ? 'bg-trust text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${option.value === value ? 'bg-trust/10 text-trust font-medium' : ''}
                  `}
                >
                  {option.icon && (
                    <span className="flex-shrink-0">
                      {option.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{option.label}</span>
                  {option.value === value && (
                    <Check className="w-4 h-4 text-trust flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

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
          <Check className="w-4 h-4" />
          <span>Option valide</span>
        </div>
      )}
    </div>
  )
}


