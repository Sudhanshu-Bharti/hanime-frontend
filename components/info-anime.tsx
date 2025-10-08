import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EyeIcon, DownloadIcon, PlayCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const InfoComponent = ({ data }: any) => {
    const openVideo = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div className="w-full text-white">
            <div className="relative h-[60vh] min-h-[400px] w-full mb-8 mt-16">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent">
                    {data.poster && (
                        <img 
                            src={data.poster} 
                            alt="" 
                            className="w-full h-full object-cover opacity-20"
                        />
                    )}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end p-6 md:p-8 lg:p-12">
                    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-end">
                        {/* Poster */}
                        <div className="w-48 md:w-64 flex-shrink-0 relative z-10">
                            {data.poster && (
                                <img 
                                    src={data.poster} 
                                    alt={data.title || 'Poster'} 
                                    className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl"
                                />
                            )}
                        </div>

                        {/* Title and Basic Info */}
                        <div className="flex-grow">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                {data.title || 'Untitled'}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                                {data.info?.brand && (
                                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                                        {data.info.brand}
                                    </Badge>
                                )}
                                {data.info?.released_date && (
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        {data.info.released_date}
                                    </div>
                                )}
                                {data.views && (
                                    <div className="flex items-center gap-1">
                                        <EyeIcon className="w-4 h-4" />
                                        {data.views} views
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <Button 
                        variant="default" 
                        onClick={openVideo} 
                        className="bg-red-600 hover:bg-red-700 text-white border-0 font-semibold px-6"
                        style={{ backgroundColor: '#dc2626' }}
                    >
                        <PlayCircleIcon className="mr-2 h-5 w-5" /> Watch Now
                    </Button>
                    {data.downloadURL && (
                        <Button 
                            variant="outline" 
                            onClick={() => window.open(data.downloadURL, '_blank')}
                            className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                        >
                            <DownloadIcon className="mr-2 h-5 w-5" /> Download
                        </Button>
                    )}
                    {data.video && (
                        <Button 
                            variant="outline" 
                            onClick={() => window.open(data.video, '_blank')}
                            className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                        >
                            <PlayCircleIcon className="mr-2 h-5 w-5" /> Watch on Site
                        </Button>
                    )}
                </div>

                <div className="grid md:grid-cols-[1fr,300px] gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Description */}
                        {data.description && (
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-xl font-semibold mb-4">Description</h2>
                                <div className="text-gray-300 leading-relaxed" 
                                    dangerouslySetInnerHTML={{ __html: data.description }} 
                                />
                            </div>
                        )}

                        {/* Tags */}
                        {data.tags && data.tags.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag: string, index: number) => (
                                        <Link 
                                            key={index} 
                                            href={`/browse?tag=${encodeURIComponent(tag)}`}
                                            className="no-underline"
                                        >
                                            <Badge variant="secondary" 
                                                className="bg-white/5 hover:bg-white/10 text-white border-0 cursor-pointer transition-colors">
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="bg-white/5 rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-4">Details</h2>
                        <dl className="space-y-4 text-sm">
                            {data.info?.brand && (
                                <div>
                                    <dt className="text-gray-400 mb-1">Brand</dt>
                                    <dd className="text-white">{data.info.brand}</dd>
                                </div>
                            )}
                            {data.info?.released_date && (
                                <div>
                                    <dt className="text-gray-400 mb-1">Released</dt>
                                    <dd className="text-white">{data.info.released_date}</dd>
                                </div>
                            )}
                            {data.info?.uploaded_date && (
                                <div>
                                    <dt className="text-gray-400 mb-1">Uploaded</dt>
                                    <dd className="text-white">{data.info.uploaded_date}</dd>
                                </div>
                            )}
                            {data.views && (
                                <div>
                                    <dt className="text-gray-400 mb-1">Views</dt>
                                    <dd className="text-white">{data.views}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoComponent;