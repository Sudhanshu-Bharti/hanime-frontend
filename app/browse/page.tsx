"use client"
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { BASE_URL } from '@/lib/utils';

interface Tag {
  count: number;
  description: string;
  id: number;
  tall_image_url: string;
  text: string;
  wide_image_url: string;
}

interface PageProps {
  tags: Tag[];
}

const BrowseSection: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch(`${BASE_URL}/browse`);
        const data: PageProps = await response.json();
        setTags(data.tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
    fetchTags();
  }, []);

  return (
    <div >
        <div className=" bg-gray-900 min-h-screen text-white p-8">
      <h1 className="mt-8 text-4xl font-bold mb-8 text-center text-purple-400">Browse Anime</h1>

      {tags.length === 0 ? (
        <p className="text-center text-lg">Loading tags...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <div key={tag.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <Image
                  src={tag.wide_image_url}
                  alt={tag.text}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <h2 className="absolute bottom-4 left-4 text-2xl font-bold">{tag.text}</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-300 mb-2">{tag.description}</p>
                <p className="text-sm text-purple-400">{tag.count} anime</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default BrowseSection;