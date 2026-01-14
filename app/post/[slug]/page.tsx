'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the post content component to avoid SSR issues
const DynamicPostContent = dynamic(() => import('./PostContent'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-stone-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-stone-200 rounded w-1/2 mb-8"></div>
                        <div className="h-64 bg-stone-200 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-stone-200 rounded"></div>
                            <div className="h-4 bg-stone-200 rounded w-5/6"></div>
                            <div className="h-4 bg-stone-200 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default function PostPage() {
    const params = useParams();
    const slug = params?.slug as string;

    if (!slug) {
        return notFound();
    }

    return <DynamicPostContent slug={slug} />;
}