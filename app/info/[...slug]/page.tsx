"use client";

import React from "react";
import { useAnimeInfo } from "@/hooks/useAnimeData";
import InfoComponent from "@/components/info-anime";
import Video from "@/components/video";
import { LoadingSpinner } from "@/components/shared/Loading";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { data: animeData, isLoading, error, refetch } = useAnimeInfo(params.slug);

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <LoadingSpinner className="min-h-screen" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto mt-16">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (!animeData) return null;

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen text-white">
      <div className="w-full">
        <InfoComponent data={animeData} />
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-4 sm:mt-8 mb-16">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Watch</h2>
              <p className="text-xs sm:text-sm text-white/50">High quality streaming</p>
            </div>
            <div className="text-xs sm:text-sm text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Powered by fast edge delivery
            </div>
          </div>
          <div
            id="video"
            className="w-full rounded-2xl border border-white/10 bg-[hsl(var(--surface-1))] overflow-hidden shadow-2xl shadow-black/40"
          >
            <Video params={[params.slug]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Page);
