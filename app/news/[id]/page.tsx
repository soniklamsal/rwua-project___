'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { newsArticles, NewsArticle } from '@/lib/data';

export default function NewsDetailPage() {
    const params = useParams();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const loadArticle = async () => {
            setIsLoading(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const articleId = params.id as string;
            const foundArticle = newsArticles.find(a => a.id === articleId);

            if (foundArticle) {
                setArticle(foundArticle);
            }

            setIsLoading(false);
        };

        loadArticle();
    }, [params.id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
                        <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
                        <div className="h-12 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">📰</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
                        <p className="text-gray-600 mb-8">
                            The news article you're looking for doesn't exist or has been moved.
                        </p>
                        <Link
                            href="/news"
                            className="inline-flex items-center px-6 py-3 bg-deep-purple text-white rounded-lg hover:bg-black transition-colors"
                        >
                            <span className="mr-2">←</span>
                            Back to News
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Get related articles (excluding current article)
    const relatedArticles = newsArticles.filter(a => a.id !== article.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/news"
                    className="inline-flex items-center text-deep-purple hover:text-black transition-colors mb-6 text-sm font-medium"
                >
                    <span className="mr-2">←</span>
                    Back to News
                </Link>

                {/* Main Content */}
                <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Content Section */}
                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                        {/* Left Column - Image */}
                        <div className="relative">
                            <div className="relative h-64 lg:h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg overflow-hidden">
                                {!imageError ? (
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        onError={() => setImageError(true)}
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-4xl">📰</span>
                                            </div>
                                            <p className="text-lg font-medium">{article.category}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                                <span>{formatDate(article.date)}</span>
                                <span>|</span>
                                <span>{article.category}</span>
                                <span>|</span>
                                <span>{article.author}</span>
                            </div>

                            <div className="text-gray-700 leading-relaxed mb-6">
                                <p className="text-lg">
                                    {article.excerpt}
                                </p>
                            </div>

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-purple-100 text-deep-purple text-sm rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full Article Content */}
                    <div className="px-8 pb-8">
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed space-y-6">
                                {article.description.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-base leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related Articles Section */}
                    {relatedArticles.length > 0 && (
                        <div className="px-8 pb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related News</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedArticles.map((relatedArticle) => (
                                    <div key={relatedArticle.id} className="group">
                                        <Link href={`/news/${relatedArticle.id}`}>
                                            <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg overflow-hidden mb-3">
                                                <Image
                                                    src={relatedArticle.image}
                                                    alt={relatedArticle.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={() => { }}
                                                />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-deep-purple transition-colors line-clamp-2">
                                                {relatedArticle.title}
                                            </h4>
                                            <button className="inline-flex items-center px-4 py-2 bg-deep-purple text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
}