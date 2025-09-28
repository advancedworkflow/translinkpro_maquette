// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
export const API_TIMEOUT = 10000

// App Configuration
export const APP_NAME = 'TransLinkPro'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Plateforme complète de gestion de flotte de transport'

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/app-saas/auth/login',
  REGISTER: '/app-saas/auth/register',
  DASHBOARD: '/app-saas',
  FLEET: '/app-saas/flotte',
  TRACKING: '/app-saas/tracking',
  ROUTES: '/app-saas/courses',
  PAYMENTS: '/app-saas/paiements',
  MARKETPLACE: '/app-saas/marketplace',
  ANALYTICS: '/app-saas/analytics',
  ADMIN: '/app-saas/admin',
  PRESENTATION: '/presentation',
  SOLUTION: '/solution',
  MARKET_MODEL: '/marche-modele',
  SERVICES: '/services',
  COMPANY: '/entreprise'
} as const

// Vehicle Types
export const VEHICLE_TYPES = {
  TRUCK: 'Camion',
  VAN: 'Van',
  CAR: 'Voiture',
  MOTORCYCLE: 'Moto',
  BICYCLE: 'Vélo'
} as const

// Vehicle Status
export const VEHICLE_STATUS = {
  ACTIVE: 'En service',
  MAINTENANCE: 'En maintenance',
  OUT_OF_SERVICE: 'Hors service',
  RESERVED: 'Réservé'
} as const

// Route Status
export const ROUTE_STATUS = {
  PLANNED: 'Planifiée',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
  DELAYED: 'Retardée'
} as const

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'En attente',
  PAID: 'Payé',
  FAILED: 'Échoué',
  REFUNDED: 'Remboursé'
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DRIVER: 'driver',
  CLIENT: 'client'
} as const

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: {
    50: '#f0f9f0',
    100: '#dcf2dc',
    200: '#bce5bc',
    300: '#8dd18d',
    400: '#56b856',
    500: '#2d7a2d',
    600: '#226122',
    700: '#1d4d1d',
    800: '#1a3f1a',
    900: '#163416',
    950: '#0a1a0a'
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  }
} as const

// Status Colors
export const STATUS_COLORS = {
  SUCCESS: 'bg-green-100 text-green-800',
  WARNING: 'bg-yellow-100 text-yellow-800',
  ERROR: 'bg-red-100 text-red-800',
  INFO: 'bg-blue-100 text-blue-800',
  NEUTRAL: 'bg-gray-100 text-gray-800'
} as const

// Chart Colors
export const CHART_COLORS = [
  '#2d7a2d', // Primary green
  '#56b856', // Light green
  '#1d4d1d', // Dark green
  '#64748b', // Secondary gray
  '#94a3b8', // Light gray
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#06b6d4'  // Cyan
] as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'translinkpro_auth_token',
  USER_DATA: 'translinkpro_user_data',
  THEME: 'translinkpro_theme',
  LANGUAGE: 'translinkpro_language'
} as const

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+33|0)[1-9](\d{8})$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  VEHICLE_PLATE: /^[A-Z]{2}\d{3}[A-Z]{2}$/
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
} as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  LONG: 'DD MMMM YYYY',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm'
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
} as const

// Notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id'
  },
  VEHICLES: {
    LIST: '/vehicles',
    CREATE: '/vehicles',
    GET: '/vehicles/:id',
    UPDATE: '/vehicles/:id',
    DELETE: '/vehicles/:id',
    TRACKING: '/vehicles/:id/tracking'
  },
  ROUTES: {
    LIST: '/routes',
    CREATE: '/routes',
    GET: '/routes/:id',
    UPDATE: '/routes/:id',
    DELETE: '/routes/:id'
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    PERFORMANCE: '/analytics/performance',
    REPORTS: '/analytics/reports'
  }
} as const



