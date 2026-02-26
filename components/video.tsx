"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Badge } from './ui/badge';
import VideoSkeleton from "@/components/videoSkeleton";
import Hls from 'hls.js';
import { BASE_URL } from '@/lib/utils';
import { Settings } from 'lucide-react';

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
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const normalizeStreamUrl = (url: string): string => {
        if (!url) return url;
        if (url.startsWith('//')) return `https:${url}`;
        try {
            return new URL(url).toString();
        } catch {
            // If relative, resolve against backend origin
            try {
                return new URL(url, BASE_URL).toString();
            } catch {
                return url;
            }
        }
    };

    useEffect(() => {
        const getVideo = async () => {
            try {
                const res = await fetch(`${BASE_URL}/getVideo/${params[0]}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();
                if (!result.streams || result.streams.length === 0) {
                    throw new Error('No streams available');
                }
                setVideoData(result);
                const guestStreams = result.streams.filter((stream: Stream) => stream.is_guest_allowed);
                if (guestStreams.length === 0) {
                    throw new Error('No streams available for guests');
                }
                const defaultQuality = guestStreams.sort((a: Stream, b: Stream) => parseInt(b.height) - parseInt(a.height))[0].height;
                setSelectedQuality(defaultQuality);
            } catch (error) {
                console.error("Error fetching video data:", error);
                setError("Failed to load video data. Please try again later.");
            }
        }

        getVideo();
    }, [params]);

    useEffect(() => {
        if (videoData && videoRef.current) {
            const rawSrc = getSelectedStream()?.url || '';
            if (!rawSrc) return;

            const normalizedSrc = normalizeStreamUrl(rawSrc);

            // Enable proxy by default to avoid CDN hotlink/segment blocking.
            // Set NEXT_PUBLIC_USE_PROXY=0 to disable.
            const useProxy = process.env.NEXT_PUBLIC_USE_PROXY !== '0';
            const src = useProxy ? `/api/proxy-video?url=${encodeURIComponent(normalizedSrc)}` : normalizedSrc;

            if (Hls.isSupported()) {
                if (hlsRef.current) {
                    hlsRef.current.destroy();
                }
                const hls = new Hls();
                hlsRef.current = hls;
                hls.loadSource(src);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    if (isPlaying) {
                        videoRef.current?.play().catch(e => {
                            console.error("Error playing video:", e);
                            setError("Failed to play video. Please try again.");
                        });
                    }
                });
                hls.on(Hls.Events.ERROR, function (event, data) {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.error("Fatal network error encountered, trying to recover");
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.error("Fatal media error encountered, trying to recover");
                                hls.recoverMediaError();
                                break;
                            default:
                                console.error("Fatal error, cannot recover");
                                hls.destroy();
                                setError("An error occurred while loading the video. Please try again.");
                                break;
                        }
                    }
                });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari native HLS
                videoRef.current.src = src;
            } else {
                setError("Your browser does not support HLS playback.");
            }
        }
    }, [videoData, selectedQuality]);

    const handleQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuality(event.target.value);
    };

    const getSelectedStream = () => {
        return videoData?.streams.find(stream => stream.height === selectedQuality);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(e => {
                    console.error("Error playing video:", e);
                    setError("Failed to play video. Please try again.");
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="video-player-container text-white">
            {videoData ? (
                <div className="rounded-2xl border border-white/10 bg-[hsl(var(--surface-1))] p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-white">{videoData.title}</h1>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline" className="bg-white/5 text-white border-white/10">
                                    Now Streaming
                                </Badge>
                                <span className="text-xs text-white/50">Adaptive HLS</span>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-xs sm:text-sm text-white/70 bg-white/5 border border-white/10 px-3 py-2 rounded-full">
                            <Settings className="h-4 w-4 text-white/70" />
                            <span>Quality</span>
                            <select
                                id="quality-select"
                                value={selectedQuality}
                                onChange={handleQualityChange}
                                className="bg-transparent text-white outline-none"
                            >
                                {videoData.streams
                                    .filter(stream => stream.is_guest_allowed)
                                    .map(stream => (
                                        <option key={stream.height} value={stream.height} className="bg-black text-white">
                                            {stream.height}p
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl shadow-black/40">
                        <video
                            ref={videoRef}
                            poster={videoData.poster_url}
                            controls
                            muted
                            className="w-full h-auto max-w-full"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            ) : (
                <VideoSkeleton />
            )}
        </div>
    )
}

export default Video
