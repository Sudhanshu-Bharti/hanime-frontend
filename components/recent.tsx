"use client"
import React, { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { BASE_URL } from '@/lib/utils';
// import { useRouter } from 'next/navigation';

interface RecentItem {
  id: number;
  cover_url: string;
  name: string;
  brand: string;
  likes: number;
  downloads: number;
  views: number;
  monthly_rank: number;
  slug: string;
}

interface RecentData {
  results: RecentItem[];
}

const Recent: React.FC = () => {
    const [recentData, setRecentData] = useState<RecentItem[]>([]);
    // const router = useRouter();

    useEffect(() => {
        const fetchRecent = async () => {
            const response = await fetch(`${BASE_URL}/getLanding/recent`);
            const data: RecentData = await response.json();
            setRecentData(data.results);
        };
        fetchRecent();
    }, []);

    const handleCardClick = async (slug: string) => {
        try {
            const response = await fetch(`${BASE_URL}/getInfo/${slug}`);
            if (!response.ok) {
                throw new Error('Failed to fetch info');
            }
            const infoData = await response.json();
            
            localStorage.setItem('currentItemInfo', JSON.stringify(infoData));
            
           
            window.location.href = `/info/${slug}`;           
          }
            
        catch (error) {
            console.error('Error fetching info:', error);
        }
    };




    return (
      <div className="w-full overflow-x-auto">
            <div className="flex flex-row space-x-4 pb-4">
            {recentData.map((item) => (
                <Card key={item.id} onClick={() => handleCardClick(item.slug)} className="flex-none w-64 h-96 relative overflow-hidden group">
                    <img src={item.cover_url}  alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 transition-opacity group-hover:opacity-100 opacity-0">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-lg font-bold truncate mb-1" title={item.name}>
                                {item.name}
                            </h3>
                            <div className="text-sm opacity-75 truncate mb-2">{item.brand}</div>
                            <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                                <div className="flex items-center gap-1">
                                    <HeartIcon className="w-4 h-4" />
                                    <span>{item.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <DownloadIcon className="w-4 h-4" />
                                    <span>{item.downloads}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <EyeIcon className="w-4 h-4" />
                                    <span>{item.views}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FlameIcon className="w-4 h-4" />
                                <span className="font-medium">Rank: {item.monthly_rank}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
          </div>
        </div>
    )
}

export default Recent


function DownloadIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function EyeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function FlameIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}


function HeartIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}