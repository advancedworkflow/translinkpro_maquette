import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from './constants'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearAuthToken()
          // Redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/app-saas/auth/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    }
    return null
  }

  private clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    }
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    }
  }

  // Generic HTTP methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }

  // File upload
  public async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }

    const response: AxiosResponse<T> = await this.client.post(url, formData, config)
    return response.data
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

// Auth API methods
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    company: string
  }) => apiClient.post('/auth/register', userData),
  
  logout: () => apiClient.post('/auth/logout'),
  
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),
  
  refreshToken: () => apiClient.post('/auth/refresh'),
}

// Vehicles API methods
export const vehiclesApi = {
  getVehicles: (params?: any) => apiClient.get('/vehicles', { params }),
  
  getVehicle: (id: string) => apiClient.get(`/vehicles/${id}`),
  
  createVehicle: (vehicleData: any) => apiClient.post('/vehicles', vehicleData),
  
  updateVehicle: (id: string, vehicleData: any) =>
    apiClient.put(`/vehicles/${id}`, vehicleData),
  
  deleteVehicle: (id: string) => apiClient.delete(`/vehicles/${id}`),
  
  getVehicleTracking: (id: string) => apiClient.get(`/vehicles/${id}/tracking`),
}

// Routes API methods
export const routesApi = {
  getRoutes: (params?: any) => apiClient.get('/routes', { params }),
  
  getRoute: (id: string) => apiClient.get(`/routes/${id}`),
  
  createRoute: (routeData: any) => apiClient.post('/routes', routeData),
  
  updateRoute: (id: string, routeData: any) =>
    apiClient.put(`/routes/${id}`, routeData),
  
  deleteRoute: (id: string) => apiClient.delete(`/routes/${id}`),
}

// Analytics API methods
export const analyticsApi = {
  getDashboardData: () => apiClient.get('/analytics/dashboard'),
  
  getPerformanceData: (params?: any) =>
    apiClient.get('/analytics/performance', { params }),
  
  getReports: (params?: any) => apiClient.get('/analytics/reports', { params }),
}

// Users API methods
export const usersApi = {
  getUsers: (params?: any) => apiClient.get('/users', { params }),
  
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  
  createUser: (userData: any) => apiClient.post('/users', userData),
  
  updateUser: (id: string, userData: any) =>
    apiClient.put(`/users/${id}`, userData),
  
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
}

export default apiClient



