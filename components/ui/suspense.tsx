"use client"

import { Suspense } from "react"

interface StoriesSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function StoriesSuspense({ children, fallback }: StoriesSuspenseProps) {
  const defaultFallback = (
    <div className="w-full my-20 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <p className="mt-4 text-gray-600">Loading stories...</p>
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

interface StoryCardSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function StoryCardSuspense({ children, fallback }: StoryCardSuspenseProps) {
  const defaultFallback = (
    <div className="w-full h-80 bg-gray-200 rounded-2xl animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-2xl"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

interface StoryDetailSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function StoryDetailSuspense({ children, fallback }: StoryDetailSuspenseProps) {
  const defaultFallback = (
    <div className="w-full">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-300 rounded mb-4"></div>
        <div className="h-16 bg-gray-300 rounded mb-8"></div>
        <div className="h-64 bg-gray-300 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}
