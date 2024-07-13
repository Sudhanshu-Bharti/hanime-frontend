import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white bg-opacity-50 sticky backdrop-filter backdrop-blur-3xl shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <p className="text-2xl font-bold text-gray-800">AnimeSite</p>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/anime">
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-gray-600">Anime</p>
              </Link>
              <Link href="/manga">
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-gray-600">Manga</p>
              </Link>
              <Link href="/community">
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-gray-600">Community</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
