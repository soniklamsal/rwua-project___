'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SuccessStory } from '@/lib/data';
import { GET_SUCCESS_STORY_BY_SLUG } from '@/lib/successStoryQueries';
import { transformToSuccessStory, WordPressSuccessStoryPost } from '@/lib/successStoryUtils';
import WordPressImage from '@/components/WordPressImage';
import RelatedStories from '@/components/ui/RelatedStories';

export default function StoryDetailPage() {
  const params = useParams();
  const rawSlug = Array.isArray(params?.id) ? params.id[0] : params?.id;
  // Decode the URL-encoded slug (important for Nepali/Unicode characters)
  const slug = rawSlug ? decodeURIComponent(rawSlug) : undefined;
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [imageError, setImageError] = useState(false);

  const { loading, error, data } = useQuery(GET_SUCCESS_STORY_BY_SLUG, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: 'network-only', // Always fetch fresh data
    errorPolicy: 'all',
  });

  useEffect(() => {
    console.log('🔍 Detail page - slug:', slug);
    console.log('🔍 Detail page - loading:', loading);
    console.log('🔍 Detail page - data:', data);
    console.log('🔍 Detail page - error:', error);
    
    if (data?.postBy) {
      console.log('✅ Post found, transforming...');
      console.log('📄 Raw post data:', data.postBy);
      const transformedStory = transformToSuccessStory(data.postBy as WordPressSuccessStoryPost);
      console.log('✅ Transformed story:', transformedStory);
      
      // Use functional update to avoid dependency on setStory
      setStory(() => transformedStory);
    } else if (data && !data.postBy) {
      console.log('⚠️ Query returned but no post found for slug:', slug);
    }
  }, [data, error, slug, loading]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
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

  if (!story && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📖</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Story Not Found</h1>
            <p className="text-gray-600 mb-4">
              {error ? `Error: ${error.message}` : "The success story you're looking for doesn't exist or has been moved."}
            </p>
            {slug && (
              <div className="text-sm text-gray-500 mb-8 space-y-2">
                <p>Looking for slug: <code className="bg-gray-200 px-2 py-1 rounded">{slug}</code></p>
                {rawSlug !== slug && (
                  <p className="text-xs">URL encoded: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{rawSlug}</code></p>
                )}
              </div>
            )}
            <Link
              href="/success-story"
              className="inline-flex items-center px-6 py-3 bg-core-blue text-white rounded-lg hover:bg-impact-red transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Success Stories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!story) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/success-story"
          className="inline-flex items-center text-core-blue hover:text-impact-red transition-colors mb-6 text-sm font-medium"
        >
          <span className="mr-2">←</span>
          Back to Stories
        </Link>

        {/* Main Content */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Content Section */}
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="relative h-64 lg:h-80 bg-gradient-to-r from-core-blue to-impact-red rounded-lg overflow-hidden">
                {story.image && !imageError ? (
                  <WordPressImage
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-core-blue to-impact-red flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl">❤️</span>
                      </div>
                      <p className="text-lg font-medium">{story.category}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {story.title}
              </h1>

              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <span>{formatDate(story.date)}</span>
                <span>|</span>
                <span>{story.category}</span>
              </div>

              <div className="text-gray-700 leading-relaxed mb-6">
                <div 
                  className="text-lg prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: story.description.split('\n\n')[0] || story.description.substring(0, 300) }}
                />
              </div>
            </div>
          </div>

          {/* Full Story Content */}
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none">
              {story.description ? (
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: story.description }}
                />
              ) : (
                <p className="text-gray-500 italic">No content available for this story.</p>
              )}
            </div>
          </div>
        </article>

        {/* Related Stories Section */}
        <RelatedStories 
          currentStoryId={story.id}
          currentStoryCategory={story.category}
          limit={4}
        />
      </div>
    </div>
  );
}