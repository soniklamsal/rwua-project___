
'use client';

import React from 'react';
import { vacancies } from '@/lib/data';
import ModernVacancyCard from '@/components/ui/ModernVacancyCard';

export default function VacancyPage() {
  // Filter only open vacancies
  const openVacancies = vacancies.filter(v => v.status === 'open');

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mb-16">
          <span className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Careers</span>
          <h1 className="text-6xl lg:text-8xl font-serif-impact text-deep-purple leading-tight mt-4">Join our <br /><span className="italic">Mission</span>.</h1>
          <p className="text-stone-500 text-xl mt-8 leading-relaxed">We are always looking for passionate individuals dedicated to rural empowerment.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {openVacancies.map(v => <ModernVacancyCard key={v.id} vacancy={v} />)}
        </div>

        {openVacancies.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[60px] border border-dashed border-stone-200">
            <p className="text-stone-400 font-bold uppercase tracking-widest">No active vacancies at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
