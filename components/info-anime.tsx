import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EyeIcon, DownloadIcon, PlayCircleIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleImage } from '@/components/shared/OptimizedImage';

const InfoComponent = ({ data }: any) => {
    const openVideo = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div className="w-full text-white">
            <section className="relative overflow-hidden pt-20">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[hsl(var(--background))]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.28]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.2]"
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(255,255,255,0.4) 0.5px, transparent 0.5px)",
                            backgroundSize: "18px 18px",
                        }}
                    />
                </div>

                {data.poster && (
                    <div className="absolute inset-0 opacity-20">
                        <SimpleImage
                            src={data.poster}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--background)/0.8)] to-[hsl(var(--background))]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 mb-6">
                        <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
                        <span>•</span>
                        <span>Info</span>
                    </div>

                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-2">
                                {data.info?.brand && (
                                    <Badge variant="secondary" className="bg-white/10 text-white border border-white/15">
                                        {data.info.brand}
                                    </Badge>
                                )}
                                {data.info?.released_date && (
                                    <Badge variant="secondary" className="bg-white/5 text-white/80 border border-white/10">
                                        <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                                        {data.info.released_date}
                                    </Badge>
                                )}
                                {data.views && (
                                    <Badge variant="secondary" className="bg-white/5 text-white/80 border border-white/10">
                                        <EyeIcon className="mr-1 h-3.5 w-3.5" />
                                        {data.views} views
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                                {data.title || 'Untitled'}
                            </h1>

                            {data.tags && data.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.slice(0, 5).map((tag: string, index: number) => (
                                        <Link
                                            key={index}
                                            href={`/browse?tag=${encodeURIComponent(tag)}`}
                                            className="no-underline"
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer transition-colors"
                                            >
                                                <Tag className="mr-1 h-3.5 w-3.5" />
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button
                                    variant="default"
                                    onClick={openVideo}
                                    className="bg-white text-black hover:bg-gray-100 border-0 font-semibold px-6"
                                >
                                    <PlayCircleIcon className="mr-2 h-5 w-5" /> Watch Now
                                </Button>
                                {data.downloadURL && (
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(data.downloadURL, '_blank')}
                                        className="bg-white/5 text-white hover:bg-white/10 border-white/15"
                                    >
                                        <DownloadIcon className="mr-2 h-5 w-5" /> Download
                                    </Button>
                                )}
                                {data.video && (
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(data.video, '_blank')}
                                        className="bg-white/5 text-white hover:bg-white/10 border-white/15"
                                    >
                                        <PlayCircleIcon className="mr-2 h-5 w-5" /> Watch on Site
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="lg:justify-self-end w-full max-w-sm">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/40">
                                {data.poster ? (
                                    <SimpleImage
                                        src={data.poster}
                                        alt={data.title || 'Poster'}
                                        className="w-full aspect-[2/3] object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="w-full aspect-[2/3] rounded-xl bg-white/10" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 md:px-8 -mt-8 lg:mt-0 pb-10">
                <div className="grid lg:grid-cols-[1fr,320px] gap-8">
                    <div className="space-y-8">
                        {data.description && (
                            <div className="rounded-2xl border border-white/10 bg-[hsl(var(--surface-1))] p-6 sm:p-8">
                                <h2 className="text-xl font-semibold mb-4">Description</h2>
                                <div
                                    className="text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                />
                            </div>
                        )}

                        {data.tags && data.tags.length > 0 && (
                            <div className="rounded-2xl border border-white/10 bg-[hsl(var(--surface-1))] p-6 sm:p-8">
                                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag: string, index: number) => (
                                        <Link
                                            key={index}
                                            href={`/browse?tag=${encodeURIComponent(tag)}`}
                                            className="no-underline"
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer transition-colors"
                                            >
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-2xl border border-white/10 bg-[hsl(var(--surface-1))] p-6">
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
            </section>
        </div>
    );
};

export default InfoComponent;
