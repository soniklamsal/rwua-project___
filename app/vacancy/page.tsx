'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Vacancy } from '@/lib/data';
import { 
  transformToVacancy, 
  extractJobCategoriesFromVacancies, 
  filterVacanciesByStatus, 
  filterVacanciesByJobCategory,
  sortVacanciesByDeadline,
  WordPressVacancy 
} from '@/lib/vacancyUtils';
import { GET_VACANCIES } from '@/lib/vacancyQueries';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import ModernVacancyCard from '@/components/ui/ModernVacancyCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function VacancyPage() {
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Query vacancies with clean ACF structure
  const { loading, error, data } = useQuery(GET_VACANCIES, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache', // Always fetch fresh data
    nextFetchPolicy: 'no-cache',
  });

  // Handle query completion and errors with useEffect
  useEffect(() => {
    if (data) {
      console.log('🔍 Vacancies Query completed successfully');
      console.log('📊 Raw vacancy data:', data);
      if (data?.vacancies?.nodes) {
        console.log('✅ Found vacancies:', data.vacancies.nodes.length);
        console.log('📋 Vacancy fields:', data.vacancies.nodes.map((v: any) => ({
          title: v.title,
          status: v.vacancyFields?.vacancyStatus,
          employmentType: v.vacancyFields?.employmentType,
          jobCategory: v.vacancyFields?.jobCategory
        })));
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('❌ Vacancies Query failed:', error);
    }
  }, [error]);

  // Transform and process WordPress vacancy posts
  const allVacancies = useMemo(() => {
    const vacancyData = data?.vacancies?.nodes;
    
    if (!vacancyData || vacancyData.length === 0) {
      console.log('⚠️ No vacancy data available');
      return [];
    }

    console.log('🔄 Processing vacancy data:', vacancyData.length, 'posts found');

    // Transform WordPress posts to Vacancy format using vacancyFields
    const transformed = vacancyData.map((post: WordPressVacancy) => transformToVacancy(post));
    
    console.log('🔍 Processed vacancies:', transformed.map((vacancy: Vacancy) => ({
      position: vacancy.position,
      employmentType: vacancy.employmentType,
      jobCategory: vacancy.jobCategory,
      status: vacancy.status,
      deadline: vacancy.deadline,
      hasImage: !!vacancy.image
    })));
    
    // Sort by deadline (urgent first)
    return sortVacanciesByDeadline(transformed);
  }, [data]);

  // Extract dynamic job categories from WordPress posts
  const vacancyCategories = useMemo(() => {
    const vacancyData = data?.vacancies?.nodes;
    
    if (!vacancyData) {
      return ['All', 'Open Positions', 'Closed Positions'];
    }
    
    return extractJobCategoriesFromVacancies(vacancyData);
  }, [data]);

  // Filter vacancies based on search and category
  useEffect(() => {
    let filtered = allVacancies;

    // Apply search filter - search in position title
    if (searchQuery.trim()) {
      filtered = filtered.filter((vacancy: Vacancy) =>
        vacancy.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply job category filter
    if (activeCategory !== 'All') {
      if (activeCategory === 'Open Positions') {
        // Filter for open positions only
        filtered = filterVacanciesByStatus(filtered, 'open');
      } else if (activeCategory === 'Closed Positions') {
        // Filter for closed positions only
        filtered = filterVacanciesByStatus(filtered, 'closed');
      } else {
        // Filter by specific job category
        filtered = filterVacanciesByJobCategory(filtered, activeCategory);
      }
    }

    setFilteredVacancies(filtered);
  }, [allVacancies, searchQuery, activeCategory]);

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

  // Error state - only show error if all queries failed
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Vacancies</h2>
            <p className="text-gray-600 mb-8">There was an error loading job opportunities from WordPress.</p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto text-left">
              <h3 className="font-semibold text-red-800 mb-2">Debug Information:</h3>
              <div className="text-sm text-red-700 space-y-2">
                <p><strong>Error Message:</strong> {error?.message}</p>
                <p><strong>WordPress URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}</p>
                <p><strong>GraphQL Endpoint:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql</p>
                {error?.graphQLErrors?.length > 0 && (
                  <div>
                    <strong>GraphQL Errors:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {error.graphQLErrors.map((err, index) => (
                        <li key={index}>{err.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {error?.networkError && (
                  <p><strong>Network Error:</strong> {error.networkError.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Make sure your WordPress site has:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Custom Post Type "vacancy" created with Custom Post Type UI</li>
                <li>ACF field group attached to the vacancy post type</li>
                <li>WPGraphQL plugin installed and activated</li>
                <li>ACF fields exposed to GraphQL</li>
              </ul>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-core-blue text-white px-6 py-3 rounded-lg hover:bg-core-blue-light transition-colors mt-6"
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
            <span className="text-terracotta font-black uppercase tracking-[0.6em] text-[10px]">Career Opportunities</span>
            <span className="w-16 h-[2px] bg-terracotta"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-core-blue mb-6 tracking-tight">
            Join Our <span className="text-impact-red font-serif-impact italic">Mission</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-medium">
            Be part of the change. Explore career opportunities with RWUA Nepal and help us create lasting impact in rural communities.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={vacancyCategories}
            activeCategory={activeCategory}
            placeholder="Search job opportunities..."
            resultsCount={filteredVacancies.length}
            pageType="vacancies"
          />
        </div>

        {/* Content Section */}
        {filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVacancies.map((vacancy) => (
              <div key={vacancy.id} className="fade-in">
                <ModernVacancyCard vacancy={vacancy} />
              </div>
            ))}
          </div>
        ) : allVacancies.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">No WordPress Data Available</h3>
              <p className="text-blue-700 mb-4">
                It looks like the vacancy custom post type is not set up yet or there are no vacancy posts in WordPress.
              </p>
              <div className="text-sm text-blue-600 text-left space-y-2">
                <p><strong>To set up vacancies in WordPress:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Install and activate "Custom Post Type UI" plugin</li>
                  <li>Create a custom post type called "vacancy"</li>
                  <li>Install and activate "Advanced Custom Fields (ACF)" plugin</li>
                  <li>Create ACF field group with fields: jobTitle, description, location, deadline, tags, image, applyUrl, status, department</li>
                  <li>Attach the field group to the vacancy post type</li>
                  <li>Make sure WPGraphQL plugin is installed and ACF fields are exposed to GraphQL</li>
                  <li>Create some vacancy posts with the ACF fields filled out</li>
                </ol>
              </div>
              <div className="mt-6 space-x-4">
                <a 
                  href="/vacancy-debug" 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Debug GraphQL Queries
                </a>
                <button
                  onClick={() => {
                    // Clear Apollo cache and reload
                    if (typeof window !== 'undefined') {
                      // Clear localStorage cache
                      localStorage.removeItem('apollo-cache-persist');
                      
                      // Clear Apollo Client cache if available
                      const apolloClient = (window as any).__APOLLO_CLIENT__;
                      if (apolloClient) {
                        apolloClient.clearStore().then(() => {
                          console.log('Apollo cache cleared');
                          window.location.reload();
                        });
                      } else {
                        window.location.reload();
                      }
                    }
                  }}
                  className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear Cache & Reload
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            type={searchQuery.trim() || activeCategory !== 'All' ? 'search' : 'no-data'}
            title={searchQuery.trim() || activeCategory !== 'All' ? 'No vacancies found' : 'No job openings available'}
            description={
              searchQuery.trim() || activeCategory !== 'All'
                ? 'No job opportunities found matching your search criteria. Try adjusting your search or filter.'
                : 'No job openings are currently available. Please check back later for new opportunities.'
            }
            searchQuery={searchQuery}
            onReset={handleReset}
            actionLabel="Show All Vacancies"
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