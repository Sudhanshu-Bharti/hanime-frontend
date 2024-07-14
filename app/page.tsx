import Browse from '@/components/browse';
import Recent from '@/components/recent';
import NewestAnime from '@/components/newest-anime';
import Trending from '@/components/trending';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="relative flex items-center justify-between mb-16">
        <div className="max-w-lg">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Hanime Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4">Discover your next favorite hanimes</p>
          <div className="flex flex-col items-start mb-8">
            <input 
              type="text" 
              placeholder="Search for your favorite anime..." 
              className="w-full max-w-md p-4 text-black rounded-md mb-4"
            />
            <p className="text-lg md:text-xl text-gray-300 max-w-md">
              Still in the bedroom thinking about best site to watch hentai ad free? well your wish cum true
            </p>
          </div>
        <div className='flex flex-row ' >
        <Browse />
        </div>
        </div>
        
        <img src="/rias.png" alt="Main Banner" className="w-1/2 h-auto object-cover rounded-lg shadow-lg" />
      </header>

      <div className="mb-16"/>
        <div className="space-y-24">
          <Section title="Recent Hits" Component={Recent} />
          <Section title="Newest Anime" Component={NewestAnime} />
          <Section title="Trending Now" Component={Trending} />
        </div>
      </div>
    </main>
  );
}

function Section({ title, Component } : { title: string, Component: any }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          {title}
        </span>
      </h2>
      <Component />
    </section>
  );
}
