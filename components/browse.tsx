"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import { BASE_URL } from "@/lib/utils";

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

const Browse = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/browse`);
        const data: PageProps = await response.json();
        setTags(data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);  

      }
    }
    fetchTags();
  }, []);

  return (
    <div className="p-4">
      {isLoading ? (

        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : tags.length === 0 ? (
        <p className="text-center text-lg">No tags available</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.slice(0, 8).map((tag) => (
            <Badge
              key={tag.id}
              variant="default"
              className="bg-purple-600 text-white px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full transition-all hover:bg-purple-700"
            >
              {tag.text}
            </Badge>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Link href="/browse">
          <Button className="text-purple-300 rounded-full transition-all hover:text-purple-100" variant="link">
            Browse more by tags <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Browse;