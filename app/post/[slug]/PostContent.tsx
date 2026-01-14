'use client';

import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Simple, direct GraphQL query - no restrictions
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      excerpt
      date
      slug
      status
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
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// Alternative query method
const GET_POST_BY_SLUG_ALT = gql`
  query GetPostBySlugAlt($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      slug
      status
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
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// Query for related posts - get recent posts and filter by category in component
const GET_RELATED_POSTS = gql`
  query GetRelatedPosts {
    posts(first: 10) {
      nodes {
        id
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
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
  }
`;

interface PostContentProps {
    slug: string;
}

export default function PostContent({ slug }: PostContentProps) {
    // Decode the slug in case it contains encoded characters (like Nepali text)
    const decodedSlug = decodeURIComponent(slug);

    // Try primary method first
    const { loading: loading1, error: error1, data: data1 } = useQuery(GET_POST_BY_SLUG, {
        variables: { slug: decodedSlug },
        errorPolicy: 'all',
    });

    // Try alternative method as backup
    const { loading: loading2, error: error2, data: data2 } = useQuery(GET_POST_BY_SLUG_ALT, {
        variables: { slug: decodedSlug },
        errorPolicy: 'all',
        skip: !error1, // Only run if first query fails
    });

    // Determine which method worked
    const loading = loading1 || loading2;
    const post = data1?.postBy || data2?.post;
    const error = error1 && error2 ? error1 : null;

    // Get related posts from same category
    const { data: relatedData } = useQuery(GET_RELATED_POSTS, {
        errorPolicy: 'all'
    });

    // Filter related posts by same category and exclude current post
    const relatedPosts = relatedData?.posts?.nodes?.filter((relatedPost: any) => {
        // Exclude current post
        if (relatedPost.id === post?.id) return false;

        // Check if post has same category
        const currentCategory = post?.categories?.nodes?.[0]?.slug;
        const relatedCategory = relatedPost.categories?.nodes?.[0]?.slug;

        return currentCategory && relatedCategory && currentCategory === relatedCategory;
    }).slice(0, 3) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading post: {decodedSlug}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !post) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h2>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                            <p className="text-red-700 text-sm mb-2"><strong>Error:</strong> {error.message}</p>
                            <p className="text-red-600 text-xs mb-1"><strong>Original Slug:</strong> {slug}</p>
                            <p className="text-red-600 text-xs mb-1"><strong>Decoded Slug:</strong> {decodedSlug}</p>
                            <p className="text-red-600 text-xs mb-1"><strong>WordPress URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}</p>
                            <p className="text-red-600 text-xs"><strong>GraphQL Endpoint:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Link href="/wp-debug" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Debug WordPress
                            </Link>
                            <Link href="/news" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                                Back to News
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-yellow-600 mb-4">Post Not Found</h1>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                            <p className="text-yellow-700 text-sm mb-2"><strong>Original Slug:</strong> {slug}</p>
                            <p className="text-yellow-700 text-sm mb-2"><strong>Decoded Slug:</strong> {decodedSlug}</p>
                            <p className="text-yellow-700 text-sm mb-2">The post might not exist or may be in draft status.</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Link href="/debug-posts" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                View All Posts
                            </Link>
                            <Link href="/wp-debug" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Debug WordPress
                            </Link>
                            <Link href="/news" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                                Back to News
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{post.title} | RWUA</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                {post.featuredImage && (
                    <meta property="og:image" content={post.featuredImage.node.sourceUrl} />
                )}
                <meta property="og:type" content="article" />
            </Head>

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
                                    {post.featuredImage ? (
                                        <img
                                            src={post.featuredImage.node.sourceUrl}
                                            alt={post.featuredImage.node.altText || post.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                                    <span className="text-4xl">❤️</span>
                                                </div>
                                                <p className="text-lg font-medium">{post.tags?.nodes?.[0]?.name ? `#${post.tags.nodes[0].name}` : 'News'}</p>
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
                                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                    <span>|</span>
                                    <span>{post.categories?.nodes?.[0]?.name || 'News'}</span>
                                </div>

                                <div className="text-gray-700 leading-relaxed mb-6">
                                    <p className="text-lg line-clamp-2">
                                        {post.excerpt?.replace(/<[^>]*>/g, '') || 'Read the full article below...'}
                                    </p>
                                </div>

                                {/* Tags with # symbol */}
                                {post.tags?.nodes && post.tags.nodes.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.nodes.map((tag: any) => (
                                            <span
                                                key={tag.slug}
                                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                                            >
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Full Story Content - Second Row */}
                        <div className="px-8 pb-8">
                            <div className="prose prose-lg max-w-none">
                                <div className="text-gray-700 leading-relaxed space-y-6">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Related Stories Section */}
                        {relatedPosts && relatedPosts.length > 0 && (
                            <div className="px-8 pb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Stories</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {relatedPosts.map((relatedPost: any) => (
                                        <div key={relatedPost.id} className="group">
                                            <Link href={`/post/${encodeURIComponent(relatedPost.slug)}`} className="block">
                                                <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg overflow-hidden mb-3">
                                                    {relatedPost.featuredImage ? (
                                                        <img
                                                            src={relatedPost.featuredImage.node.sourceUrl}
                                                            alt={relatedPost.featuredImage.node.altText || relatedPost.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                                            <div className="text-white text-center">
                                                                <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                                                                    <span className="text-2xl">❤️</span>
                                                                </div>
                                                                <p className="text-sm font-medium">{relatedPost.categories?.nodes?.[0]?.name || 'News'}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {relatedPost.excerpt?.replace(/<[^>]*>/g, '') || ''}
                                                </p>
                                                <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                                                    Read More
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </>
    );
}