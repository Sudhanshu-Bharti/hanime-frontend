"use client"
import React from 'react'

type PageLayoutProps = {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function PageLayout({ children, className = "", containerClassName = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-[calc(100vh-var(--nav-height))] bg-[hsl(var(--background))] text-white ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${containerClassName}`}>
        {children}
      </div>
    </div>
  )
}
