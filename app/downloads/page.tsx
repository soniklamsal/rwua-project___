'use client';

import { useState, useEffect } from 'react';
import { executeQuery } from '@/lib/wordpress/client';

// --- SKELETON COMPONENT ---
const ResourceSkeleton = () => (
  <div className="flex flex-col gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white rounded-[40px] p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-12 border border-transparent animate-pulse"
      >
        {/* Visual ID Box Skeleton */}
        <div className="hidden lg:flex w-24 h-24 rounded-[28px] bg-stone-100 shrink-0" />

        {/* Main Content Skeleton */}
        <div className="flex-grow space-y-4">
          <div className="flex gap-2">
            <div className="h-2 w-16 bg-stone-100 rounded" />
            <div className="h-2 w-10 bg-stone-50 rounded" />
          </div>
          <div className="h-8 w-3/4 bg-stone-100 rounded" />
        </div>

        {/* Metadata Column Skeleton */}
        <div className="flex items-center gap-8 lg:gap-16 shrink-0 border-t md:border-t-0 md:border-l border-stone-50 pt-6 md:pt-0 md:pl-12">
          <div className="space-y-2">
            <div className="h-2 w-10 bg-stone-50 rounded" />
            <div className="h-3 w-16 bg-stone-100 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-10 bg-stone-50 rounded" />
            <div className="h-3 w-16 bg-stone-100 rounded" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full md:w-40 h-14 bg-stone-100 rounded-2xl" />
      </div>
    ))}
  </div>
);

// WordPress query
const GET_RESOURCE_DATA = `...`; // (Keep your query as defined)

const DOWNLOAD_RESOURCES = [
  { id: '1', title: 'Annual Progress Report 2023-24', category: 'Annual Reports', size: '4.2 MB', type: 'PDF', date: 'Feb 2025' },
  // ... (rest of your fallback data)
];

export default function DownloadsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [resourcesData, setResourcesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const wpData = await executeQuery(GET_RESOURCE_DATA);
        if (wpData?.resources?.nodes?.length > 0) {
          const wpResources = wpData.resources.nodes
            .filter((res: any) => res?.resourceFields?.file?.node?.mediaItemUrl)
            .map((res: any, index: number) => {
              const fields = res.resourceFields;
              const file = fields.file.node;
              
              const formatFileSize = (bytes: number) => {
                if (!bytes) return 'Unknown';
                const mb = bytes / (1024 * 1024);
                return `${mb.toFixed(1)} MB`;
              };
              
              const getFileType = (mime: string) => {
                if (mime?.includes('pdf')) return 'PDF';
                if (mime?.includes('doc')) return 'DOC';
                return 'FILE';
              };

              return {
                id: (index + 1).toString(),
                title: res.title || `Resource ${index + 1}`,
                category: fields.category || 'General',
                size: formatFileSize(file.fileSize),
                type: getFileType(file.mimeType),
                date: fields.releaseDate ? new Date(fields.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
                downloadUrl: file.mediaItemUrl
              };
            });
          setResourcesData(wpResources);
        } else {
          setResourcesData(DOWNLOAD_RESOURCES);
        }
      } catch (error) {
        setResourcesData(DOWNLOAD_RESOURCES);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchResourcesData();
  }, []);

  const categories = ['All', ...Array.from(new Set(resourcesData.map(r => r.category).filter(Boolean)))];

  const filtered = resourcesData.filter(r =>
    (filter === 'All' || r.category === filter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDownload = (resource: any) => {
    if (resource.downloadUrl) {
      window.open(resource.downloadUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-32 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="container mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-terracotta"></span>
            <span className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Resource Library</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif-impact text-core-blue leading-tight tracking-tighter mb-10">
            Public Archives.
          </h1>
          <p className="text-stone-500 text-lg lg:text-xl leading-relaxed font-black max-w-2xl opacity-70">
            Access our latest reports and strategy guidelines.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="container mx-auto px-4 md:px-16 lg:px-24 mb-16">
        <div className="bg-white p-3 md:p-4 rounded-[40px] md:rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 border border-stone-100/50">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-4 md:border-r border-stone-100 min-w-max">
            {loading ? (
               <div className="h-10 w-48 bg-stone-100 rounded-full animate-pulse" />
            ) : (
              categories.map((c, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(c)}
                  className={`px-7 py-3 rounded-2xl md:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${filter === c ? 'bg-impact-red text-white shadow-xl' : 'text-stone-400 hover:text-impact-red'}`}
                >
                  {c}
                </button>
              ))
            )}
          </div>
          <div className="relative flex-grow px-4">
            <input
              type="text"
              placeholder="SEARCH DOCUMENTS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-50/80 border-none rounded-2xl md:rounded-full pl-14 pr-8 py-5 text-[11px] font-black uppercase tracking-[0.25em] text-core-blue outline-none transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 left-10 flex items-center text-stone-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Resource List */}
      <section className="container mx-auto px-8 md:px-16 lg:px-24">
        {loading ? (
          <ResourceSkeleton />
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.length > 0 ? (
              filtered.map((res, index) => (
                <div
                  key={res.id}
                  className="group bg-white rounded-[40px] p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-12 border border-transparent hover:border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="hidden lg:flex w-24 h-24 rounded-[28px] bg-impact-red items-center justify-center shrink-0 text-white font-black text-4xl">
                    0{index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-terracotta">{res.category}</span>
                      <span className="text-stone-200">•</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-300">{res.type}</span>
                    </div>
                    <h3 className="text-xl lg:text-3xl font-black text-core-blue group-hover:text-black tracking-tight">{res.title}</h3>
                  </div>
                  <div className="flex items-center gap-8 lg:gap-16 shrink-0 border-t md:border-t-0 md:border-l border-stone-50 pt-6 md:pt-0 md:pl-12 text-[12px] font-black text-stone-700">
                    <div><span className="block text-[8px] text-stone-300 uppercase mb-1">Release</span>{res.date}</div>
                    <div><span className="block text-[8px] text-stone-300 uppercase mb-1">Filesize</span>{res.size}</div>
                  </div>
                  <button 
                    onClick={() => handleDownload(res)}
                    className="shrink-0 w-full md:w-auto bg-core-blue text-white px-12 py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Download
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-40 border-2 border-dashed border-stone-100 rounded-[40px]">
                <h3 className="text-xl font-black text-stone-300">No matching archives found.</h3>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}