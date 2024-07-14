"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/lib/utils';

interface AnimeItem {
  canonical_url: string;
  channel_name: string;
  discord_user_id: number;
  extension: string;
  filesize: number;
  height: number;
  id: number;
  proxy_url: string;
  url: string;
  user_avatar_url: string;
  username: string;
  width: number;
}

const AnimeGallery: React.FC = () => {
  const [animeData, setAnimeData] = useState<AnimeItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/community_upload`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setAnimeData(data);
        } else if (typeof data === 'object' && data !== null) {
          const dataArray = Object.values(data);
          if (Array.isArray(dataArray[0])) {
            setAnimeData(dataArray[0]);
          } else {
            setAnimeData([data as AnimeItem]);
          }
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 ">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400 mt-12">Anime Gallery</h1>
        <div className='flex items-center m-4 justify-center' >
        <Badge variant="default" className='bg-slate-700 text-md' >
        ⚠️Sorry , The Anime Gallery is not responding because the Hanime server is having trouble connecting with community
      </Badge>
        </div>
      {animeData.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {animeData.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src={item.url}
                  alt={`Anime image by ${item.username}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Image
                    src={item.user_avatar_url}
                    alt={`${item.username}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.username}</h2>
                    <p className="text-sm text-gray-400">{item.channel_name}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <p>Size: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
                  <p>Dimensions: {item.width} x {item.height}</p>
                </div>
                <Link
                  href={item.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <Button className='bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 mt-2' >

                  View Original
                    </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeGallery;