"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import { useBrowseTags } from "@/hooks/useAnimeData";
import { LoadingSpinner } from "./shared/Loading";
import { ErrorMessage } from "./shared/ErrorMessage";

const Browse = () => {
  const { tags, isLoading, error, refetch } = useBrowseTags();

  if (isLoading) {
    return (
      <div className="p-4">
        <LoadingSpinner className="h-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="p-4">
      {tags.length === 0 ? (
        <p className="text-center text-lg">No tags available</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.slice(0, 8).map((tag) => (
            <Link 
              key={tag.id}
              href={`/search?tag=${encodeURIComponent(tag.text)}`}
            >
              <Badge
                variant="default"
                className="bg-gray-800 text-white px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base rounded-md transition-all hover:bg-gray-700 cursor-pointer border border-gray-700 hover:border-gray-600"
              >
                {tag.text}
              </Badge>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Link href="/browse">
          <Button className="text-gray-400 rounded-full transition-all hover:text-white" variant="link">
            Browse more by tags <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Browse);