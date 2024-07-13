"use client"

import React, { useState, useEffect } from 'react'
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Badge } from './ui/badge';
import VideoSkeleton from "@/components/videoSkeleton";
interface Stream {
    height: string;
    url: string;
    is_guest_allowed: boolean;
}

interface VideoData {
    streams: Stream[];
    title: string;
    poster_url: string;
}

interface PageProps {
    params: [slug: string];
}

const Video: React.FC<PageProps> = ({ params }) => {
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [selectedQuality, setSelectedQuality] = useState<string>('');

    useEffect(() => {
        const getVideo = async () => { 
            console.log("Params", params[0]);
            
            try {
                const res = await fetch(`http://127.0.0.1:8080/getVideo/${params[0]}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();
                // console.log(result);
                if (!result.streams || result.streams.length === 0) {
                    throw new Error('No streams available');
                }
                setVideoData(result);
                // Set default quality to the highest available for guests
                const guestStreams = result.streams.filter((stream: Stream) => stream.is_guest_allowed);
                if (guestStreams.length === 0) {
                    throw new Error('No streams available for guests');
                }
                const defaultQuality = guestStreams.sort((a: Stream, b: Stream) => parseInt(b.height) - parseInt(a.height))[0].height;
                setSelectedQuality(defaultQuality);
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        }

        getVideo();
    }, [params]);
    const handleQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuality(event.target.value);
    };
    
    const getSelectedStream = () => {
        return videoData?.streams.find(stream => stream.height === selectedQuality);
    };

    console.log("Video url", getSelectedStream()?.url);

    const getProxiedUrl = (url: string) => {
        return `/api/proxy-video?url=${encodeURIComponent(url)}`;
      };
      const fullProxyUrl = getProxiedUrl(getSelectedStream()?.url || '');
        console.log("Full proxy URL:", fullProxyUrl);
        console.log("Stream URL before encoding:", getSelectedStream()?.url);
    return (
        <div className="video-player-container">
            {videoData ? (
                <>
                    <h1 className="text-4xl font-bold mb-4">{videoData.title}</h1>
                    <Badge variant="destructive" >
                          Watch Now
                        </Badge>
                    <div className="mb-4">
                        
                        <label htmlFor="quality-select" className="mr-2">Select Quality:</label>
                        <select 
                            id="quality-select"
                            value={selectedQuality} 
                            onChange={handleQualityChange}
                            className="p-2 border rounded"
                        >
                            {videoData.streams
                                .filter(stream => stream.is_guest_allowed)
                                .map(stream => (
                                    <option key={stream.height} value={stream.height}>
                                        {stream.height}p
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <MediaPlayer title="Sprite Fight" src={getProxiedUrl(getSelectedStream()?.url || '')}>
                    <MediaProvider />
                    <DefaultVideoLayout thumbnails={videoData.poster_url} icons={defaultLayoutIcons} />
                    </MediaPlayer>
                </>
            ) : (
                <VideoSkeleton/>
            )}
        </div>
    )
}

export default Video