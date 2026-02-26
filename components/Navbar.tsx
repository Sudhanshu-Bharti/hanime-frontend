"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-lg font-semibold tracking-tight font-display">
              <span className="text-white">Hanime</span>
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink href="/browse">Browse</NavLink>
              <NavLink href="/trending">Trending</NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-lg">
          <div className="px-2 py-3 space-y-1 sm:px-3">
            <NavLink href="/browse" onClick={closeMenu}>Browse</NavLink>
            <NavLink href="/trending" onClick={closeMenu}>Trending</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
  >
    {children}
  </Link>
);

export default Navbar;
