"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-30 backdrop-blur-md text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <div className="flex items-center space-x-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 text-lg font-bold">
                  Hanime
                </span>
                <img src="/logo.png" alt="Logo" className="h-8" />
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink href="/browse">Browse</NavLink>
              <NavLink href="/trending">Trending</NavLink>
              <NavLink href="/community">Community</NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/browse">Browse</NavLink>
            <NavLink href="/trending">Trending</NavLink>
            <NavLink href="/community">Community</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-white opacity-70 hover:opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
  >
    {children}
  </Link>
);

export default Navbar;