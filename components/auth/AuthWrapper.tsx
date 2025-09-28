'use client'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {children}
    </div>
  )
}
