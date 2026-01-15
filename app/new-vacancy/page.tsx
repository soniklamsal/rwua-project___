
'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { transformToVacancy, WordPressVacancy, filterVacanciesByStatus } from '@/lib/vacancyUtils';
import { GET_VACANCIES } from '@/lib/vacancyQueries';
import ModernVacancyCard from '@/components/ui/ModernVacancyCard';

export default function VacancyPage() {
  const { loading, data } = useQuery(GET_VACANCIES, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first',
  });

  // Transform and filter only open vacancies
  const openVacancies = React.useMemo(() => {
    const nodes = data?.vacancies?.nodes as WordPressVacancy[] | undefined;
    if (!nodes || nodes.length === 0) return [];
    
    const transformed = nodes.map(transformToVacancy);
    return filterVacanciesByStatus(transformed, 'open');
  }, [data]);

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mb-16">
          <span className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Careers</span>
          <h1 className="text-6xl lg:text-8xl font-serif-impact text-deep-purple leading-tight mt-4">Join our <br /><span className="italic">Mission</span>.</h1>
          <p className="text-stone-500 text-xl mt-8 leading-relaxed">We are always looking for passionate individuals dedicated to rural empowerment.</p>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="w-16 h-16 border-4 border-impact-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-10">
              {openVacancies.map(v => <ModernVacancyCard key={v.id} vacancy={v} />)}
            </div>

            {openVacancies.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[60px] border border-dashed border-stone-200">
                <p className="text-stone-400 font-bold uppercase tracking-widest">No active vacancies at this time.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
