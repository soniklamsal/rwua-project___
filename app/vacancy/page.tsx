'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Vacancy,
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

  const { loading, error, data } = useQuery(GET_VACANCIES, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  /* ---------------------- Debug: raw WP data ---------------------- */
  useEffect(() => {
    if (data?.vacancies?.nodes) {
      console.log('✅ Raw WP vacancies:', data.vacancies.nodes);
    }
    if (error) {
      console.error('❌ GraphQL error:', error);
    }
  }, [data, error]);

  /* ---------------------- Transform WP → Vacancy ---------------------- */
  const allVacancies = useMemo(() => {
    const nodes = data?.vacancies?.nodes as WordPressVacancy[] | undefined;

    if (!nodes || nodes.length === 0) {
      console.warn('⚠️ No vacancies received from WordPress');
      return [];
    }

    const transformed = nodes.map(transformToVacancy);

    console.log('🔍 Processed vacancies:', transformed.map(v => ({
      position: v.position,
      employmentType: v.employmentType,
      jobCategory: v.jobCategory,
      status: v.status,
      deadline: v.deadline,
    })));

    return sortVacanciesByDeadline(transformed);
  }, [data]);

  /* ---------------------- Categories ---------------------- */
  const vacancyCategories = useMemo(() => {
    if (!data?.vacancies?.nodes) {
      return ['All', 'Open Positions', 'Closed Positions'];
    }

    return extractJobCategoriesFromVacancies(data.vacancies.nodes);
  }, [data]);

  /* ---------------------- Search & Filter ---------------------- */
  useEffect(() => {
    let filtered = [...allVacancies];

    if (searchQuery.trim()) {
      filtered = filtered.filter(v =>
        v.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== 'All') {
      if (activeCategory === 'Open Positions') {
        filtered = filterVacanciesByStatus(filtered, 'open');
      } else if (activeCategory === 'Closed Positions') {
        filtered = filterVacanciesByStatus(filtered, 'closed');
      } else {
        filtered = filterVacanciesByJobCategory(filtered, activeCategory);
      }
    }

    setFilteredVacancies(filtered);
  }, [allVacancies, searchQuery, activeCategory]);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleFilter = (category: string) => setActiveCategory(category);
  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  /* ---------------------- Loading ---------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton type="card" count={6} />
        </div>
      </div>
    );
  }

  /* ---------------------- Error ---------------------- */
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Error loading vacancies
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  /* ---------------------- UI ---------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-core-blue mb-4">
            Career Opportunities
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Explore current openings and become part of RWUA Nepal.
          </p>
        </div>

        {/* Search */}
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

        {/* Cards */}
        {filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVacancies.map(vacancy => (
              <ModernVacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        ) : (
          <EmptyState
            type="search"
            title="No vacancies found"
            description="Try adjusting your search or filters."
            searchQuery={searchQuery}
            onReset={handleReset}
            actionLabel="Show All Vacancies"
          />
        )}
      </div>
    </div>
  );
}
