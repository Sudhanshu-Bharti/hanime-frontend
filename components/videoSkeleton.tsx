import React from 'react'

const VideoSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto py-12 px-4">
    <div className="grid md:grid-cols-[1fr_2fr] gap-8">
      <div className="bg-muted rounded-lg p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-muted-foreground animate-pulse w-[100px] h-[100px]" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded-md bg-muted-foreground animate-pulse" />
            <div className="h-4 w-24 rounded-md bg-muted-foreground animate-pulse" />
          </div>
        </div>
        
      </div>
      <div className="aspect-video rounded-lg overflow-hidden">
        <div className="w-full h-full bg-muted-foreground animate-pulse" />
      </div>
    </div>
  </div>
  )
}

export default VideoSkeleton
