'use client';

import { useState, useEffect } from 'react';
import { vacancies, vacancyDepartments, Vacancy } from '@/lib/data';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import ModernVacancyCard from '@/components/ui/ModernVacancyCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function VacancyPage() {
  const [allVacancies, setAllVacancies] = useState<Vacancy[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Simulate data loading
  useEffect(() => {
    const loadVacancies = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAllVacancies(vacancies);
      setFilteredVacancies(vacancies);
      setIsLoading(false);
    };

    loadVacancies();
  }, []);

  // Filter vacancies based on search and category
  useEffect(() => {
    let filtered = allVacancies;

    // Apply search filter - only search in title
    if (searchQuery.trim()) {
      filtered = filtered.filter(vacancy =>
        vacancy.position.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    // Apply department filter
    if (activeCategory !== 'All') {
      if (activeCategory === 'Open Positions') {
        // Filter for open positions only
        filtered = filtered.filter(vacancy => vacancy.status === 'open');
      } else if (activeCategory === 'Closed Positions') {
        // Filter for closed positions only
        filtered = filtered.filter(vacancy => vacancy.status === 'closed');
      } else {
        filtered = filtered.filter(vacancy => vacancy.department === activeCategory);
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
          <h1 className="text-5xl md:text-6xl font-black text-deep-purple mb-6 tracking-tight">
            Join Our <span className="text-vibrant-gold font-serif-impact italic">Mission</span>
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
            categories={vacancyDepartments}
            activeCategory={activeCategory}
            placeholder="Search job opportunities..."
            resultsCount={filteredVacancies.length}
            pageType="vacancies"
          />
        </div>

        {/* Content Section */}
        {isLoading ? (
          <LoadingSkeleton type="card" count={6} />
        ) : filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVacancies.map((vacancy) => (
              <div key={vacancy.id} className="fade-in">
                <ModernVacancyCard vacancy={vacancy} />
              </div>
            ))}
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