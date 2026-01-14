'use client';

import dynamic from 'next/dynamic';

// Dynamically import the CategoryNewsPage to avoid SSR issues
const DynamicCategoryNewsPage = dynamic(() => import('@/components/CategoryNewsPageSimple'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-white pt-32">
            <div className="max-w-screen-lg mx-auto px-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-stone-200 rounded w-64 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="h-32 bg-stone-200 rounded-t-lg"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-stone-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-stone-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
});

export default function LatestUpdatesPage() {
    return (
        <DynamicCategoryNewsPage
            categorySlug="recent-news"
            categoryName="Recent News"
            pageTitle="ताजा अपडेट"
            pageDescription="नवीनतम समाचार र जानकारीहरू जसले हाम्रो समुदायमा भइरहेका गतिविधिहरूको जानकारी दिन्छ"
            breadcrumbTitle="ताजा अपडेट"
        />
    );
}