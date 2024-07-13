import Browse from '@/components/browse'
import Recent from '@/components/recent'
import NewestAnime from '@/components/newest-anime'
import Trending from '@/components/trending'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">

      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-left text-2xl tracking-tight text-transparent md:text-4xl font-bold">
		    Recent Hits </h1>
      <Recent/>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-left text-2xl tracking-tight text-transparent md:text-4xl font-bold">
        NewestAnime </h1>
      <NewestAnime/>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-left text-2xl tracking-tight text-transparent md:text-4xl font-bold">
        Trending </h1>
      <Trending/>
      
      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
			{/* <Browse/> */}
      </div>
      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
      
      </div>
    </main>
  )
}
