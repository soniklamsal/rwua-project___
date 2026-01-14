'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  categories: string[];
  activeCategory: string;
  placeholder?: string;
  resultsCount?: number;
  pageType?: 'stories' | 'vacancies';
}

export default function SearchAndFilter({
  onSearch,
  onFilter,
  categories,
  activeCategory,
  placeholder = "Search...",
  resultsCount,
  pageType = 'stories'
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Show only first 4 categories initially
  const maxVisibleCategories = 4;
  const visibleCategories = showAllCategories ? categories : categories.slice(0, maxVisibleCategories);
  const hasMoreCategories = categories.length > maxVisibleCategories;

  // Debounced search function
  const debounceSearch = useCallback(
    (query: string) => {
      const timeoutId = setTimeout(() => {
        onSearch(query);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [onSearch]
  );

  useEffect(() => {
    const cleanup = debounceSearch(searchQuery);
    return cleanup;
  }, [searchQuery, debounceSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCategoryClick = (category: string) => {
    onFilter(category);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls - Back to Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
        {/* Left Side: Filter Buttons */}
        <div className="order-2 md:order-1">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {visibleCategories.map((category, index) => (
              <button
                key={`${category}-${index}`}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ease-out cursor-pointer ${
                  activeCategory === category
                    ? 'bg-impact-red text-white shadow-lg'
                    : 'text-black hover:bg-impact-red/20 hover:text-impact-red'
                }`}
              >
                {category}
              </button>
            ))}
            
            {/* See All / Show Less Button */}
            {hasMoreCategories && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ease-out cursor-pointer text-gray-600 hover:bg-gray-100 border border-gray-300 flex items-center gap-1"
              >
                {showAllCategories ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>See All</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Search Input - Smaller and More Rounded */}
        <div className="relative w-full order-1 md:order-2">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border shadow-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 font-medium ${isFocused
                  ? 'border-indigo-400 focus:border-indigo-400 focus:ring-indigo-200'
                  : 'border-stone-300 focus:border-indigo-400 focus:ring-indigo-200'
                }`}
            />
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ease-out ${isFocused ? 'text-deep-purple' : 'text-stone-400'
              }`} />
          </div>
        </div>
      </div>

      {/* Results Counter */}
      {resultsCount !== undefined && (
        <div className="text-stone-600">
          <p className="font-medium">
            Showing <span className="font-bold text-deep-purple">{resultsCount}</span> results
          </p>
        </div>
      )}
    </div>
  );
}