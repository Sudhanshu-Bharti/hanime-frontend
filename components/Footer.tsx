import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--surface-2))] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Explore</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink href="/browse">Browse</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Connect</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink href="https://www.reddit.com/user/LowTwo1305/">Reddit</NavLink>
              <NavLink href="https://discord.gg/sudhanshu_bharti">Discord</NavLink>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink href="/terms">Terms of Service</NavLink>
              <NavLink href="/privacy">Privacy Policy</NavLink>
              <NavLink href="/copyright">Copyright</NavLink>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">&copy; 2026 Hanime Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

function NavLink({ href, children } : { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-400 hover:text-white transition-colors duration-300">
      {children}
    </Link>
  )
}
