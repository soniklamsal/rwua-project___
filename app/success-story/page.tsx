'use client';

import { useState, useEffect } from 'react';
import { successStories, storyCategories, SuccessStory } from '@/lib/data';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import ModernStoryCard from '@/components/ui/ModernStoryCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function SuccessStoryPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Simulate data loading
  useEffect(() => {
    const loadStories = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStories(successStories);
      setFilteredStories(successStories);
      setIsLoading(false);
    };

    loadStories();
  }, []);

  // Filter stories based on search and category
  useEffect(() => {
    let filtered = stories;

    // Apply search filter - only search in title
    if (searchQuery.trim()) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(story => story.category === activeCategory);
    }

    setFilteredStories(filtered);
  }, [stories, searchQuery, activeCategory]);

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
          <h1 className="text-5xl md:text-6xl font-black text-deep-purple mb-6 tracking-tight">
            Stories of <span className="text-vibrant-gold font-serif-impact italic">Change</span>
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
        {isLoading ? (
          <LoadingSkeleton type="card" count={6} />
        ) : filteredStories.length > 0 ? (
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