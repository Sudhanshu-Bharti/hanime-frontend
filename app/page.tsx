"use client";
import Browse from '@/components/browse';
import Recent from '@/components/recent';
import NewestAnime from '@/components/newest-anime';
import Trending from '@/components/trending';
import { 
  Search, 
  Play, 
  Clock, 
  Star, 
  Filter,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();

  const quickFilters = [
    { id: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
    { id: 'new', label: 'New Releases', icon: <Calendar className="w-4 h-4" /> },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'popular', label: 'Popular', icon: <Star className="w-4 h-4" /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section - Netflix/Crunchyroll Style */}
      <section className="relative h-[85vh] min-h-[600px]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/rias.png"
            alt="Featured Content"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded">
                  the site of your dreams
                </span>
                <span className="text-sm text-gray-300">2025 • 18+</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Hanime Hub
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                Stream premium anime content in HD quality. No ads, no interruptions, 
                just pure entertainment at your fingertips.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/browse"
                className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                Browse Now
              </Link>
              <Link 
                href="/trending"
                className="flex items-center gap-2 px-8 py-3 bg-gray-800/80 backdrop-blur-sm text-white font-semibold rounded hover:bg-gray-700 transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
                Trending
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <section className=" bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, genres, studios..."
                  className="w-full py-2.5 pl-10 pr-4 bg-gray-900 border border-gray-800 text-white placeholder-gray-400 rounded focus:outline-none focus:border-gray-700 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors"
                  >
                    Go
                  </button>
                )}
              </div>
            </form>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded whitespace-nowrap transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {filter.icon}
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Quick Access
                </h3>
                <nav className="space-y-1">
                  <Link href="/browse" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Browse All</span>
                  </Link>
                  <Link href="/trending" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors">
                    <TrendingUp className="w-5 h-5" />
                    <span>Trending</span>
                  </Link>
                  <Link href="/community" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors">
                    <Star className="w-5 h-5" />
                    <span>Community</span>
                  </Link>
                </nav>
              </div>

              {/* Browse Categories */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <Browse />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Recent Releases */}
            <ContentSection 
              title="Recent Releases"
              subtitle="Latest episodes and new series"
              icon={<Clock className="w-5 h-5" />}
              viewAllLink="/recent"
            >
              <Recent />
            </ContentSection>

            {/* Newest Anime */}
            <ContentSection 
              title="New This Week"
              subtitle="Freshly added to our collection"
              icon={<Calendar className="w-5 h-5" />}
              viewAllLink="/newest"
            >
              <NewestAnime />
            </ContentSection>

            {/* Trending */}
            <ContentSection 
              title="Trending Now"
              subtitle="Most watched by the community"
              icon={<TrendingUp className="w-5 h-5" />}
              viewAllLink="/trending"
            >
              <Trending />
            </ContentSection>

            {/* Popular Picks */}
            <ContentSection 
              title="All-Time Favorites"
              subtitle="Highest rated content"
              icon={<Star className="w-5 h-5" />}
              viewAllLink="/browse?sort=rating"
            >
              <div className="text-center py-12 text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Top rated content coming soon</p>
              </div>
            </ContentSection>
          </div>
        </div>
      </div>

      {/* Mobile Category Menu */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Browse Categories
          </h3>
          <Browse />
        </div>
      </div>
    </main>
  );
}

function ContentSection({ 
  title, 
  subtitle,
  icon,
  viewAllLink,
  children 
}: { 
  title: string; 
  subtitle: string;
  icon: React.ReactNode;
  viewAllLink?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-gray-400">
            {icon}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {title}
            </h2>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </div>
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
          >
            View All →
          </Link>
        )}
      </div>
      <div className="relative">
        {children}
      </div>
    </section>
  );
}