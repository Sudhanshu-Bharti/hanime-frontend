import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { API_ENDPOINTS, ERROR_MESSAGES, sortByQuality } from '../lib/constants';
import type { VideoData, Stream } from '../types';

interface UseVideoPlayerOptions {
  videoData: VideoData | null;
  selectedQuality: string;
}

interface UseVideoPlayerReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  error: string | null;
  togglePlay: () => void;
}

/**
 * Hook for managing HLS video playback
 */
export function useVideoPlayer({ 
  videoData, 
  selectedQuality 
}: UseVideoPlayerOptions): UseVideoPlayerReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSelectedStream = (): Stream | undefined => {
    return videoData?.streams.find(
      (stream: Stream) => stream.height === selectedQuality
    );
  };

  useEffect(() => {
    if (!videoData || !videoRef.current) return;

    const videoSrc = getSelectedStream()?.url || '';
    if (!videoSrc) {
      setError(ERROR_MESSAGES.NO_STREAMS);
      return;
    }

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: function (xhr, url) {
          const proxiedUrl = API_ENDPOINTS.PROXY_VIDEO(url);
          xhr.open('GET', proxiedUrl, true);
        },
      });

      hlsRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isPlaying && videoRef.current) {
          videoRef.current.play().catch((e) => {
            console.error('Error playing video:', e);
            setError(ERROR_MESSAGES.VIDEO_LOAD_FAILED);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Fatal network error, trying to recover');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              console.error('Fatal error, cannot recover');
              hls.destroy();
              setError(ERROR_MESSAGES.VIDEO_LOAD_FAILED);
              break;
          }
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      videoRef.current.src = API_ENDPOINTS.PROXY_VIDEO(videoSrc);
    } else {
      setError('Your browser does not support HLS playback.');
    }

    // Cleanup on unmount
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoData, selectedQuality, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => {
          console.error('Error playing video:', e);
          setError(ERROR_MESSAGES.VIDEO_LOAD_FAILED);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return {
    videoRef,
    isPlaying,
    error,
    togglePlay,
  };
}
