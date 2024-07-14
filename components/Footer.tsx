import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink href="/browse">Browse</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink href="https://www.reddit.com/user/LowTwo1305/">Reddit</NavLink>
              <NavLink href="https://discord.gg/sudhanshu_bharti">Discord</NavLink>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink href="/terms">Terms of Service</NavLink>
              <NavLink href="/privacy">Privacy Policy</NavLink>
              <NavLink href="/copyright">Copyright</NavLink>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2024 Hanime Hub. All rights reserved.</p>
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