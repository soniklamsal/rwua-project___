'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter } from 'lucide-react';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    setIsFilterOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls - CSS Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
        {/* Left Side: Filter Controls */}
        <div className="order-2 md:order-1">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-stone-200 text-deep-purple rounded-lg hover:bg-stone-300 transition-colors duration-300 ease-out cursor-pointer font-bold"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>

          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ease-out cursor-pointer font-bold ${activeCategory === category
                    ? 'bg-deep-purple text-white shadow-lg'
                    : 'bg-stone-200 text-deep-purple hover:bg-vibrant-gold hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Search Input */}
        <div className="relative w-full order-1 md:order-2">
          <div className={`relative transition-all duration-300 ease-out ${isFocused ? 'md:w-96' : 'md:w-80'
            } w-full`}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border shadow-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 font-medium ${isFocused
                  ? 'border-indigo-400 focus:border-indigo-400 focus:ring-indigo-200'
                  : 'border-stone-300 focus:border-indigo-400 focus:ring-indigo-200'
                }`}
            />
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ease-out ${isFocused ? 'text-deep-purple' : 'text-stone-400'
              }`} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Dropdown */}
      {isFilterOpen && (
        <div className="md:hidden bg-white border border-stone-200 rounded-lg shadow-lg p-4 transition-all duration-300 ease-out">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors duration-300 ease-out cursor-pointer font-bold ${activeCategory === category
                    ? 'bg-deep-purple text-white'
                    : 'bg-stone-100 text-deep-purple hover:bg-vibrant-gold hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

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