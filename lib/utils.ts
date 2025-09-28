import { clsx, type ClassValue } from 'clsx'
import { DATE_FORMATS } from './constants'

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Date formatting utilities
export function formatDate(date: Date | string, format: string = DATE_FORMATS.SHORT): string {
  const d = new Date(date)
  
  if (isNaN(d.getTime())) {
    return 'Date invalide'
  }

  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')

  switch (format) {
    case DATE_FORMATS.SHORT:
      return `${day}/${month}/${year}`
    case DATE_FORMATS.LONG:
      return `${day} ${getMonthName(d.getMonth())} ${year}`
    case DATE_FORMATS.DATETIME:
      return `${day}/${month}/${year} ${hours}:${minutes}`
    case DATE_FORMATS.TIME:
      return `${hours}:${minutes}`
    default:
      return d.toLocaleDateString('fr-FR')
  }
}

function getMonthName(month: number): string {
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ]
  return months[month]
}

// Currency formatting
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Number formatting
export function formatNumber(number: number, decimals: number = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
}

// Distance formatting
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

// Duration formatting
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}min`
  }
  return `${mins}min`
}

// File size formatting
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Password validation
export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Generate random ID
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any
  if (typeof obj === 'object') {
    const clonedObj = {} as any
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Truncate text
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

// Sleep function
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Get random color
export function getRandomColor(): string {
  const colors = [
    '#2d7a2d', '#56b856', '#1d4d1d', '#64748b', '#94a3b8',
    '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#06b6d4'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Calculate distance between two coordinates
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}

// Format status with color
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'En service': 'bg-green-100 text-green-800',
    'En maintenance': 'bg-yellow-100 text-yellow-800',
    'Hors service': 'bg-red-100 text-red-800',
    'Planifiée': 'bg-blue-100 text-blue-800',
    'En cours': 'bg-green-100 text-green-800',
    'Terminée': 'bg-gray-100 text-gray-800',
    'Annulée': 'bg-red-100 text-red-800',
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Payé': 'bg-green-100 text-green-800',
    'Échoué': 'bg-red-100 text-red-800'
  }
  
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

// Local storage helpers
export const storage = {
  get: (key: string) => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error('Error reading from localStorage:', error)
        return null
      }
    }
    return null
  },
  
  set: (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Error writing to localStorage:', error)
      }
    }
  },
  
  remove: (key: string) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
  },
  
  clear: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear()
      } catch (error) {
        console.error('Error clearing localStorage:', error)
      }
    }
  }
}



