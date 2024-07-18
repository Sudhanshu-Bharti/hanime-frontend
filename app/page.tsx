import Browse from '@/components/browse';
import Recent from '@/components/recent';
import NewestAnime from '@/components/newest-anime';
import Trending from '@/components/trending';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <header className="relative mb-12 lg:mb-16">
          <div className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 break-words text-center lg:text-left">
            <h1 className="mt-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Hanime Hub
            </h1>
          </div>
          <p className="text-lg -mb-8 sm:text-xl lg:text-2xl text-gray-400 text-center lg:text-left">Discover your next favorite hanimes</p>
          <div className="flex  flex-col sm:flex-row items-center justify-between gap-8">
            <div className="w-full sm:w-1/2 lg:w-2/3 order-2 sm:order-1">
              <div className="flex flex-col items-center sm:items-start mb-4">
                <input 
                  type="text" 
                  placeholder="Search for your favorite anime..." 
                  className="w-full max-w-md p-3 sm:p-4 text-black rounded-md mb-4"
                />
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-md text-center sm:text-left">
                  Still in the bedroom thinking about best site to watch hentai ad free? Well, your wish cum true
                </p>
              </div>
              <div className='flex flex-row flex-wrap justify-center sm:justify-start'>
                <Browse />
              </div>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 sm:order-2 flex justify-center sm:justify-end">
              <img 
                src="/rias.png" 
                alt="Main Banner" 
                className="w-full sm:w-full max-w-xs object-cover rounded-lg shadow-lg"
              />
              
            </div>
          </div>
        </header>

        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 break-words">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          {title}
        </span>
      </h2>
      <Component />
    </section>
  );
}