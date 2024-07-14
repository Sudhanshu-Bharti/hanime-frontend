"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Badge } from './ui/badge';
import VideoSkeleton from "@/components/videoSkeleton";
import Hls from 'hls.js';

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

    useEffect(() => {
        const getVideo = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8080/getVideo/${params[0]}`);
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
            const videoSrc = getSelectedStream()?.url || '';
            if (Hls.isSupported()) {
                if (hlsRef.current) {
                    hlsRef.current.destroy();
                }
                const hls = new Hls({
                    xhrSetup: function(xhr, url) {
                        const proxiedUrl = `/api/proxy-video?url=${encodeURIComponent(url)}`;
                        xhr.open('GET', proxiedUrl, true);
                    }
                });
                hlsRef.current = hls;
                hls.loadSource(videoSrc);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    if (isPlaying) {
                        videoRef.current?.play().catch(e => {
                            console.error("Error playing video:", e);
                            setError("Failed to play video. Please try again.");
                        });
                    }
                });
                hls.on(Hls.Events.ERROR, function(event, data) {
                    if (data.fatal) {
                        switch(data.type) {
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
                videoRef.current.src = `/api/proxy-video?url=${encodeURIComponent(videoSrc)}`;
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
        <div className="video-player-container">
            {videoData ? (
                <>
                    <h1 className="text-4xl font-bold mb-4">{videoData.title}</h1>
                    <Badge variant="destructive">
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
                    <div className="video-wrapper">
                        <video
                            ref={videoRef}
                            poster={videoData.poster_url}
                            controls
                            className="w-full"
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="controls">
                            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
                        </div>
                    </div>
                </>
            ) : (
                <VideoSkeleton/>
            )}
        </div>
    )
}

export default Video