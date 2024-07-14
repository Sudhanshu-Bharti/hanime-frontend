import Browse from '@/components/browse'
import Recent from '@/components/recent'
import NewestAnime from '@/components/newest-anime'
import Trending from '@/components/trending'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
               Hanime Hub
            </span>
          </h1>
          <p className="text-xl text-gray-400">Discover your next favorite hentai</p>
        </header>

        <div className="space-y-24">
          <Section title="Browse" Component={Browse} />
          <Section title="Recent Hits" Component={Recent} />
          <Section title="Newest Anime" Component={NewestAnime} />
          <Section title="Trending Now" Component={Trending} />
        </div>

        
      </div>
    </main>
  )
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
  )
}

