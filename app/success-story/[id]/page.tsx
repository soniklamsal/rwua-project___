'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { successStories, SuccessStory } from '@/lib/data';

export default function StoryDetailPage() {
  const params = useParams();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const storyId = params.id as string;
      const foundStory = successStories.find(s => s.id === storyId);

      if (foundStory) {
        setStory(foundStory);
      }

      setIsLoading(false);
    };

    loadStory();
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

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📖</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Story Not Found</h1>
            <p className="text-gray-600 mb-8">
              The success story you're looking for doesn't exist or has been moved.
            </p>
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

  // Get related stories (excluding current story)
  const relatedStories = successStories.filter(s => s.id !== story.id).slice(0, 3);

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
                {!imageError ? (
                  <Image
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
                <p className="text-lg">
                  {story.description.split('\n\n')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Full Story Content */}
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {story.description.split('\n\n').slice(1).map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Related Stories Section */}
          {relatedStories.length > 0 && (
            <div className="px-8 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Stories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedStories.map((relatedStory) => (
                  <div key={relatedStory.id} className="group">
                    <Link href={`/success-story/${relatedStory.id}`}>
                      <div className="relative h-40 bg-gradient-to-r from-core-blue to-impact-red rounded-lg overflow-hidden mb-3">
                        <Image
                          src={relatedStory.image}
                          alt={relatedStory.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={() => {}}
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-core-blue transition-colors line-clamp-2">
                        {relatedStory.title}
                      </h4>
                      <button className="inline-flex items-center px-4 py-2 bg-core-blue text-white text-sm font-medium rounded-lg hover:bg-impact-red transition-colors">
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