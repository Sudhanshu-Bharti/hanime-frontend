import React, { ReactComponentElement } from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-30 backdrop-blur-md text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                AnimeSite
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink href="/anime">Anime</NavLink>
              <NavLink href="/manga">Manga</NavLink>
              <NavLink href="/community">Community</NavLink>
            </div>
          </div>
          <div className="md:hidden">
            
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children } : { href : string , children : React.ReactNode } ) => (
  <Link 
    href={href} 
    className="px-3 py-2 rounded-md text-sm font-medium text-white opacity-70 hover:opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
  >
    {children}
  </Link>
);

export default Navbar;