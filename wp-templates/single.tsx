import { gql } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface SinglePostProps {
    post: {
        id: string;
        title: string;
        content: string;
        excerpt: string;
        date: string;
        slug: string;
        featuredImage?: {
            node: {
                sourceUrl: string;
                altText: string;
            };
        };
        author: {
            node: {
                name: string;
            };
        };
        categories: {
            nodes: Array<{
                name: string;
                slug: string;
            }>;
        };
    };
}

export default function SinglePost({ post }: SinglePostProps) {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (router.isFallback) {
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

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">📖</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h1>
                        <p className="text-gray-600 mb-8">
                            The post you're looking for doesn't exist or has been moved.
                        </p>
                        <Link
                            href="/news"
                            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <span className="mr-2">←</span>
                            Back to News
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/news"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 text-sm font-medium"
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
                                {post.featuredImage && !imageError ? (
                                    <img
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.featuredImage.node.altText || post.title}
                                        className="w-full h-full object-cover"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-4xl">❤️</span>
                                            </div>
                                            <p className="text-lg font-medium">{post.categories.nodes[0]?.name || 'News'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                                <span>{formatDate(post.date)}</span>
                                <span>|</span>
                                <span>{post.categories.nodes[0]?.name || 'News'}</span>
                            </div>

                            <div className="text-gray-700 leading-relaxed mb-6">
                                <p className="text-lg">
                                    {post.excerpt?.replace(/<[^>]*>/g, '') || 'Read the full article below...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Full Story Content */}
                    <div className="px-8 pb-8">
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed space-y-6">
                                <div
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

// GraphQL query for fetching single post data
export const query = gql`
  query GetPost($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      excerpt
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// Variables function for the GraphQL query
export function variables(context: GetStaticPropsContext) {
    return {
        id: context.params?.slug,
        idType: 'SLUG',
    };
}