'use client'

import React, { Component, ReactNode } from 'react'

interface SafeComponentProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

interface SafeComponentState {
  hasError: boolean
  error?: Error
}

export default class SafeComponent extends Component<SafeComponentProps, SafeComponentState> {
  constructor(props: SafeComponentProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): SafeComponentState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('SafeComponent caught an error:', error, errorInfo)
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-medium">Erreur de rendu</h3>
          <p className="text-red-600 text-sm mt-1">
            Une erreur s'est produite lors du chargement de ce composant.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook pour gérer les erreurs de manière plus sûre
export function useSafeEffect(effect: () => void | (() => void), deps: any[]) {
  React.useEffect(() => {
    try {
      return effect()
    } catch (error) {
      console.error('Error in useSafeEffect:', error)
    }
  }, deps)
}

// Composant wrapper pour les composants potentiellement problématiques
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <SafeComponent fallback={fallback}>
        <Component {...props} />
      </SafeComponent>
    )
  }
}
