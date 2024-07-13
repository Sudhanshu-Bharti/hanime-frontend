import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-muted py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <p className="text-lg font-semibold">Hanime</p>
        </Link>
        
        <p className="text-xs text-muted-foreground">&copy; 2024 Hanime Inc. All rights reserved.</p>
      </div>
  </div>
  )
}

export default Footer