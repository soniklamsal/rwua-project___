
'use client';

import React, { useState } from 'react';

const DOWNLOAD_RESOURCES = [
  { id: '1', title: 'Annual Progress Report 2023-24', category: 'Annual Reports', size: '4.2 MB', type: 'PDF', date: 'Feb 2025' },
  { id: '2', title: 'Strategic Plan (2025-2030)', category: 'Policy', size: '2.8 MB', type: 'PDF', date: 'Jan 2025' },
  { id: '3', title: 'Women Empowerment Handbook', category: 'Educational', size: '12.5 MB', type: 'PDF', date: 'Dec 2024' },
  { id: '4', title: 'RWUA Organization Profile', category: 'Brochures', size: '1.5 MB', type: 'PDF', date: 'Oct 2024' },
  { id: '5', title: 'Quarterly Newsletter - Q4', category: 'Newsletters', size: '3.1 MB', type: 'PDF', date: 'Jan 2025' },
  { id: '6', title: 'Safe Migration Guide (Sarlahi Edition)', category: 'Policy', size: '5.4 MB', type: 'PDF', date: 'Nov 2024' },
];

export default function DownloadsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Annual Reports', 'Policy', 'Educational', 'Brochures', 'Newsletters'];

  const filtered = DOWNLOAD_RESOURCES.filter(r =>
    (filter === 'All' || r.category === filter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-32 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="container mx-auto px-8 px-16 lg:px-24 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-700">
            <span className="w-8 h-[2px] bg-terracotta"></span>
            <span className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Resource Library</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif-impact text-deep-purple leading-tight tracking-tighter mb-10 animate-in slide-in-from-bottom duration-700 delay-100">
            Public Archives.
          </h1>
          <p className="text-stone-500 text-lg lg:text-xl leading-relaxed font-black max-w-2xl opacity-70 animate-in fade-in duration-1000 delay-300">
            Access our latest reports and strategy guidelines.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="container mx-auto px-4 md:px-16 lg:px-24 mb-16">
        <div className="bg-white p-3 md:p-4 rounded-[40px] md:rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 border border-stone-100/50">

          {/* Filter Labels Section */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-4 md:border-r border-stone-100 min-w-max">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-7 py-3 rounded-2xl md:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${filter === c
                    ? 'bg-deep-purple text-white shadow-xl translate-y-[-1px]'
                    : 'text-stone-400 hover:text-deep-purple hover:bg-stone-50'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search Input Section */}
          <div className="relative flex-grow group px-4">
            <input
              type="text"
              placeholder="SEARCH DOCUMENTS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-50/80 border-none rounded-2xl md:rounded-full pl-14 pr-8 py-5 text-[11px] font-black uppercase tracking-[0.25em] text-deep-purple placeholder:text-stone-300 focus:bg-white focus:ring-4 focus:ring-indigo-200/30 outline-none transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none text-stone-300 group-focus-within:text-deep-purple transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Resource List View */}
      <section className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col gap-6">
          {filtered.length > 0 ? (
            filtered.map((res, index) => (
              <div
                key={res.id}
                className="group bg-white rounded-[40px] p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-12 transition-all duration-500 border border-transparent hover:border-stone-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-700"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Visual ID Box */}
                <div className="hidden lg:flex w-24 h-24 rounded-[28px] bg-stone-50 items-center justify-center shrink-0 border border-stone-100 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-deep-purple group-hover:border-deep-purple group-hover:shadow-[0_20px_45px_-15px_rgba(76,29,149,0.35)]">
                  <span className="text-stone-400 font-black text-4xl tracking-tighter transition-all duration-500 group-hover:text-vibrant-gold group-hover:scale-115">
                    0{index + 1}
                  </span>
                </div>

                {/* Main Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-terracotta">{res.category}</span>
                    <span className="text-stone-200">•</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-300">{res.type}</span>
                  </div>
                  <h3 className="text-xl lg:text-3xl font-black text-deep-purple group-hover:text-black transition-colors tracking-tight">
                    {res.title}
                  </h3>
                </div>

                {/* Metadata Column */}
                <div className="flex items-center gap-8 lg:gap-16 shrink-0 border-t md:border-t-0 md:border-l border-stone-50 pt-6 md:pt-0 md:pl-12">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-stone-300 tracking-widest mb-1.5">Release</span>
                    <span className="text-[12px] font-black text-stone-700 group-hover:text-deep-purple transition-colors">{res.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-stone-300 tracking-widest mb-1.5">Filesize</span>
                    <span className="text-[12px] font-black text-stone-700 group-hover:text-deep-purple transition-colors">{res.size}</span>
                  </div>
                </div>

                {/* Minimalist Action Button */}
                <button className="shrink-0 w-full md:w-auto bg-stone-50 hover:bg-deep-purple group-hover:text-white text-deep-purple px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 border border-transparent shadow-sm">
                  <span>Download</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-stone-100">
              <div className="text-5xl mb-6 opacity-30">📂</div>
              <h3 className="text-xl font-black text-stone-300 tracking-tight">No matching archives found.</h3>
              <button onClick={() => { setSearch(''); setFilter('All'); }} className="mt-8 text-terracotta font-black uppercase tracking-widest text-[9px] border-b border-terracotta pb-1 transition-all hover:text-black hover:border-black">Reset Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="container mx-auto px-8 md:px-16 lg:px-24 mt-40">
        <div className="bg-deep-purple p-16 lg:p-28 rounded-[80px] text-white relative overflow-hidden flex flex-col xl:flex-row items-center gap-16 group">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-terracotta opacity-[0.03] skew-x-12 translate-x-1/2"></div>

          <div className="relative z-10 xl:w-1/2">
            <h2 className="text-4xl lg:text-7xl font-serif-impact mb-10 leading-[0.9] tracking-tighter">
              Stay connected <br /><span className="italic text-vibrant-gold">to our progress.</span>
            </h2>
            <p className="text-stone-300 text-lg lg:text-xl mb-12 leading-relaxed opacity-90 font-black">
              Join our mailing list to receive monthly policy updates and community resilience stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="flex-grow px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-black tracking-widest text-[11px] focus:bg-white/20 outline-none transition-all duration-500"
              />
              <button className="bg-vibrant-gold text-stone-950 font-black px-12 py-5 rounded-2xl uppercase tracking-[0.25em] text-[10px] hover:bg-white transition-colors duration-500 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>

          <div className="relative z-10 xl:w-1/2 flex justify-center xl:justify-end">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-[60px] bg-white/5 backdrop-blur-3xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                  <svg className="w-14 h-14 lg:w-20 lg:h-20 text-vibrant-gold animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
