"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/utils";
import InfoComponent from "@/components/info-anime";
import Video from "@/components/video";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [animeData, setAnimeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const [infoResponse, videoResponse] = await Promise.all([
          fetch(`${BASE_URL}/getInfo/${params.slug}`),
          fetch(`${BASE_URL}/getVideo/${params.slug}`)
        ]);

        if (!infoResponse.ok || !videoResponse.ok) {
          throw new Error(`HTTP error! status: ${infoResponse.status} ${videoResponse.status}`);
        }

        const [infoResult, videoResult] = await Promise.all([
          infoResponse.json(),
          videoResponse.json()
        ]);

        setAnimeData({ info: infoResult, video: videoResult });
      } catch (error) {
        console.error("Error fetching anime data:", error);
        setError("Failed to load anime data. Please try again later.");
      }
    };

    fetchAnimeData();
  }, [params.slug]);

  if (error) {
    return <div className="error-message text-white bg-red-600 p-4 rounded-lg">{error}</div>;
  }

  if (!animeData) return <div className="loading text-white text-center p-8">Loading...</div>;

  return (
    <div className="anime-page-container bg-gray-900 min-h-screen text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-400">{animeData.info.title}</h1>
        {/* <Badge variant="outline" className="mb-4 bg-purple-600 text-white">
          {animeData.info.type}
        </Badge> */}
        <InfoComponent data={animeData.info} className="mb-8 bg-gray-800 p-4 rounded-lg" />
        <section id="video" className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Watch Episode</h2>
          <Video
            params={[params.slug]}
          />
        </section>
        
      </div>
    </div>
  );
};

export default Page;