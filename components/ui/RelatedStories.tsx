'use client';

import { useQuery } from '@apollo/client';
import { GET_LATEST_SUCCESS_STORIES } from '@/lib/successStoryQueries';
import { transformToSuccessStory, WordPressSuccessStoryPost } from '@/lib/successStoryUtils';
import { SuccessStory } from '@/lib/data';
import ModernStoryCard from './ModernStoryCard';

interface RelatedStoriesProps {
  currentStoryId: string;
  currentStoryCategory?: string;
  limit?: number;
}

export default function RelatedStories({ 
  currentStoryId, 
  currentStoryCategory,
  limit = 3 
}: RelatedStoriesProps) {
  
  // Simple query: Get all success stories and filter on frontend
  const { loading, error, data } = useQuery(GET_LATEST_SUCCESS_STORIES, {
    variables: { 
      limit: 10 // Fetch more to account for filtering
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    onCompleted: (data) => {
      console.log('🔍 GraphQL Query completed');
      console.log('📋 Current story slug to exclude:', currentStoryId);
      console.log('📋 Received posts:', data?.posts?.nodes?.length || 0);
    },
    onError: (error) => {
      console.error('❌ GraphQL Query error:', error);
    }
  });

  // Transform the data and filter out current story
  const relatedStories: SuccessStory[] = data?.posts?.nodes 
    ? (() => {
        console.log('🔍 Raw posts from GraphQL:', data.posts.nodes.length);
        
        const allPosts = data.posts.nodes as WordPressSuccessStoryPost[];
        
        // Filter out the current story by slug AND only keep success stories
        const filteredPosts = allPosts.filter(post => {
          const isCurrentStory = post.slug === currentStoryId;
          if (isCurrentStory) {
            console.log('🚫 Excluding current story:', post.title, post.slug);
            return false;
          }
          
          // Check if it's a success story
          const isSuccessStory = post.categories?.nodes?.some(category => 
            category.name.toLowerCase().includes('success') || 
            category.slug.toLowerCase().includes('success')
          );
          
          if (!isSuccessStory) {
            console.log('🚫 Excluding non-success story:', post.title);
            return false;
          }
          
          return true;
        });
        
        console.log('📋 Success stories after filtering:', filteredPosts.length);
        
        // Sort by category priority: same category first, then others
        const sortedPosts = filteredPosts.sort((a, b) => {
          const aHasSameCategory = currentStoryCategory && a.categories?.nodes?.some(cat => 
            cat.name === currentStoryCategory
          );
          const bHasSameCategory = currentStoryCategory && b.categories?.nodes?.some(cat => 
            cat.name === currentStoryCategory
          );
          
          // Same category posts come first
          if (aHasSameCategory && !bHasSameCategory) return -1;
          if (!aHasSameCategory && bHasSameCategory) return 1;
          
          // Otherwise sort by date (newest first)
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        const transformed = sortedPosts
          .slice(0, limit) // Limit to 3 posts
          .map((post, index) => {
            const hasSameCategory = currentStoryCategory && post.categories?.nodes?.some(cat => 
              cat.name === currentStoryCategory
            );
            console.log(`🔄 Transforming post ${index + 1}:`, post.title, hasSameCategory ? '(same category)' : '(other category)');
            return transformToSuccessStory(post);
          });
          
        console.log('✅ Final transformed stories:', transformed.length);
        return transformed;
      })()
    : [];

  // Loading state
  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32 mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Don't show if no stories or error
  if (error || relatedStories.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {(() => {
            if (relatedStories.length === 0) return 'Related Success Stories';
            
            // Check if first story has same category as current
            const firstStory = relatedStories[0];
            const hasSameCategoryFirst = currentStoryCategory && 
              firstStory?.category === currentStoryCategory;
            
            if (hasSameCategoryFirst) {
              return `More ${currentStoryCategory} Stories`;
            } else {
              return 'Related Success Stories';
            }
          })()}
        </h2>
        <span className="text-sm text-gray-500">
          {relatedStories.length} {relatedStories.length === 1 ? 'story' : 'stories'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedStories.map((story) => (
          <div key={story.id} className="fade-in">
            <ModernStoryCard story={story} />
          </div>
        ))}
      </div>
    </div>
  );
}