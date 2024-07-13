import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EyeIcon, DownloadIcon, PlayCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const InfoComponent = ({ data }: any) => {
        const openVideo = () => {
          window.scrollTo(0, document.body.scrollHeight);
        }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{data.title || 'Untitled'}</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="md:w-1/3">
          {/* {data.poster && (
            <img 
              src={data.poster} 
              alt={data.title || 'Poster'} 
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          )} */}
        </div>

        <div className="md:w-2/3 space-y-6">
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={()=> openVideo()}>
                <PlayCircleIcon className="mr-2 h-4 w-4" /> Watch Below without ads
            </Button>
            {data.downloadURL && (
              <Button variant="outline" onClick={() => window.open(data.downloadURL, '_blank')}>
                <DownloadIcon className="mr-2 h-4 w-4" /> Download
              </Button>
            )}
            {data.video && (
              <Button variant="destructive" onClick={() => window.open(data.video, '_blank')}>
                <PlayCircleIcon className="mr-2 h-4 w-4" /> Watch on Hanime
              </Button>
              
            )}

          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
            <div dangerouslySetInnerHTML={{ __html: data.description || 'No description available' }} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Info:</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{data.info?.brand}</Badge>
                <Badge variant="outline">{data.info?.brand_slug}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">Released: {data.info?.released_date}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">Uploaded: {data.info?.uploaded_date}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <EyeIcon className="h-4 w-4" />
                <span className="text-sm">Views: {data.views}</span>
              </div>
            </div>
          </div>
          {data.tags && data.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Tags:</h2>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default InfoComponent;