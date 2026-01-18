'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { SuccessStory } from '@/lib/data';
import { 
  filterSuccessStoryPosts, 
  transformToSuccessStory, 
  extractSuccessStoryCategories, 
  WordPressSuccessStoryPost 
} from '@/lib/successStoryUtils';
import { GET_SUCCESS_STORY_POSTS } from '@/lib/successStoryQueries';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import ModernStoryCard from '@/components/ui/ModernStoryCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';

// Remove the old GraphQL query since we're now using the dedicated file

export default function SuccessStoryPage() {
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch posts from WordPress using Apollo Client with aggressive cache-busting
  const { loading, error, data } = useQuery(GET_SUCCESS_STORY_POSTS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache', // Always fetch fresh data
    nextFetchPolicy: 'no-cache',
  });

  // Handle query completion and errors with useEffect
  useEffect(() => {
    if (data) {
      console.log('🔍 Success Stories GraphQL Query completed successfully');
      console.log('📊 Raw posts data:', data);
      if (data?.posts?.nodes) {
        console.log('✅ Found posts:', data.posts.nodes.length);
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('❌ Success Stories GraphQL Query failed:', error);
      console.error('📋 Error details:', {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError
      });
    }
  }, [error]);

  // Transform and filter WordPress posts to success stories
  const successStories = useMemo(() => {
    if (!data?.posts?.nodes || !Array.isArray(data.posts.nodes)) {
      console.log('⚠️ No valid posts data available for success stories');
      return [];
    }

    try {
      console.log('🔄 Processing success story posts...');
      
      // Filter posts by "success stories" category using new utility
      const successStoryPosts = filterSuccessStoryPosts(data.posts.nodes as WordPressSuccessStoryPost[]);
      
      console.log(`📊 Success Story Posts Found: ${successStoryPosts.length} out of ${data.posts.nodes.length} total posts`);
      
      // Transform to SuccessStory format with improved image handling
      const transformed = successStoryPosts.map((post) => {
        console.log(`🔄 Transforming success story: "${post.title}"`);
        return transformToSuccessStory(post);
      });
      
      // Debug: Log the transformed stories to check images
      console.log('🔍 Success Stories Final Result:', {
        totalPosts: data.posts.nodes.length,
        successStoryPosts: successStoryPosts.length,
        transformedStories: transformed.length,
        storiesWithImages: transformed.filter(s => s.image && !s.image.includes('fallback')).length
      });
      
      transformed.forEach((story, index) => {
        console.log(`📸 Story ${index + 1} Image: "${story.title}" -> ${story.image.substring(0, 100)}...`);
      });
      
      return transformed;
    } catch (error) {
      console.error('❌ Error transforming success stories:', error);
      return [];
    }
  }, [data]);

  // Extract dynamic categories from WordPress posts
  const storyCategories = useMemo(() => {
    if (!data?.posts?.nodes || !Array.isArray(data.posts.nodes)) {
      return ['All'];
    }
    
    try {
      const successStoryPosts = filterSuccessStoryPosts(data.posts.nodes as WordPressSuccessStoryPost[]);
      return extractSuccessStoryCategories(successStoryPosts);
    } catch (error) {
      console.error('❌ Error extracting success story categories:', error);
      return ['All'];
    }
  }, [data]);

  // Filter stories based on search and category
  useEffect(() => {
    try {
      let filtered = successStories;

      // Apply search filter - only search in title
      if (searchQuery.trim()) {
        filtered = filtered.filter(story =>
          story.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (activeCategory !== 'All') {
        filtered = filtered.filter(story => {
          // Check if the story's category matches the selected filter
          return story.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
                 story.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()));
        });
      }

      setFilteredStories(filtered);
    } catch (error) {
      console.error('❌ Error filtering stories:', error);
    }
  }, [successStories, searchQuery, activeCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
  };

  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton type="card" count={6} />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Success Stories</h2>
            <p className="text-gray-600 mb-8">There was an error loading success stories from WordPress.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-core-blue text-white px-6 py-3 rounded-lg hover:bg-core-blue-light transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-[2px] bg-terracotta"></span>
            <span className="text-terracotta font-black uppercase tracking-[0.6em] text-[10px]">Impact Stories</span>
            <span className="w-16 h-[2px] bg-terracotta"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-core-blue mb-6 tracking-tight">
            Stories of <span className="text-impact-red font-serif-impact italic">Change</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-medium">
            Discover inspiring stories of transformation and empowerment from the communities we serve across rural Nepal.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={storyCategories}
            activeCategory={activeCategory}
            placeholder="Search success stories..."
            resultsCount={filteredStories.length}
            pageType="stories"
          />
        </div>

        {/* Content Section */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div key={story.id} className="fade-in">
                <ModernStoryCard story={story} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            type={searchQuery.trim() || activeCategory !== 'All' ? 'search' : 'no-data'}
            title={searchQuery.trim() || activeCategory !== 'All' ? 'No stories found' : 'No success stories available'}
            description={
              searchQuery.trim() || activeCategory !== 'All'
                ? 'No stories found matching your search criteria. Try adjusting your search or filter.'
                : 'Success stories are being updated. Please check back later for inspiring content.'
            }
            searchQuery={searchQuery}
            onReset={handleReset}
            actionLabel="Show All Stories"
          />
        )}


      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
