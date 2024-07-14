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

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch(`${BASE_URL}/browse`);
        const data: PageProps = await response.json();
        setTags(data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }
    fetchTags();
  }, []);

  return (
    <div>
      {tags.length === 0 ? (
        <p className="text-center text-lg">Loading tags...</p>
      ) : (
        <div className="flex  gap-2">
          {tags.slice(0, 8).map((tag) => (

             
             <div>
              <Badge variant="default" className="bg-purple-600 text-white px-4 py-2 rounded-full" >
                {tag.text}
              </Badge>
             </div>
            
          ))}
         
        </div>
      )}
       <Link href="/browse" className="flex justify-center items-center mt-2" >
          <Button className='text-purple-300 mt-2 rounded-full' variant='link'  >
          Browse more by tags <ArrowRight className="w-9 mt-1" /> </Button>
          </Link>
    </div>
  );
};

export default Browse;
