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
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="w-full">
        <InfoComponent data={animeData} />
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 mb-16">
          <div id="video" className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <Video params={[params.slug]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Page);