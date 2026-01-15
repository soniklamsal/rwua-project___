
'use client';

import { useState, useEffect } from 'react';
import { executeQuery } from '@/lib/wordpress/client';

// WordPress query
const GET_RESOURCE_DATA = `
  query GetResourceData {
    resources {
      nodes {
        title
        resourceFields {
          category
          releaseDate
          file {
            node {
              mediaItemUrl
              fileSize
              mimeType
            }
          }
        }
      }
    }
  }
`;

// Fallback data
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
  const [resourcesData, setResourcesData] = useState<any[]>(DOWNLOAD_RESOURCES);
  const [loading, setLoading] = useState(true);

  // Fetch WordPress data
  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const wpData = await executeQuery(GET_RESOURCE_DATA);
        
        if (wpData?.resources?.nodes && wpData.resources.nodes.length > 0) {
          const wpResources = wpData.resources.nodes
            .filter((resource: any) => resource?.resourceFields?.file?.node?.mediaItemUrl)
            .map((resource: any, index: number) => {
              const fields = resource.resourceFields;
              const file = fields.file.node;
              
              // Format file size
              const formatFileSize = (bytes: number) => {
                if (!bytes) return 'Unknown';
                const mb = bytes / (1024 * 1024);
                return `${mb.toFixed(1)} MB`;
              };
              
              // Get file type from mime type
              const getFileType = (mimeType: string) => {
                if (mimeType?.includes('pdf')) return 'PDF';
                if (mimeType?.includes('doc')) return 'DOC';
                if (mimeType?.includes('excel') || mimeType?.includes('spreadsheet')) return 'XLS';
                return 'FILE';
              };
              
              // Format date
              const formatDate = (dateString: string) => {
                if (!dateString) return 'Recent';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              };
              
              return {
                id: (index + 1).toString(),
                title: resource.title || `Resource ${index + 1}`,
                category: fields.category || 'General',
                size: formatFileSize(file.fileSize),
                type: getFileType(file.mimeType),
                date: formatDate(fields.releaseDate),
                downloadUrl: file.mediaItemUrl
              };
            });
          
          if (wpResources.length > 0) {
            setResourcesData(wpResources);
          }
        }
      } catch (error) {
        console.error('Error fetching WordPress Resources data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
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
      // WordPress file download
      window.open(resource.downloadUrl, '_blank');
    } else {
      // Fallback for static data
      console.log(`Downloading: ${resource.title}`);
    }
  };

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
            {categories.map((c, index) => (
              <button
                key={`category-${index}-${c}`}
                onClick={() => setFilter(c)}
                className={`px-7 py-3 rounded-2xl md:rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${filter === c
                    ? 'bg-impact-red text-white shadow-xl translate-y-[-1px]'
                    : 'text-stone-400 hover:text-impact-red hover:bg-impact-red/10'
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
            <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none text-stone-300 group-focus-within:text-core-blue transition-colors">
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
                <div className="hidden lg:flex w-24 h-24 rounded-[28px] bg-impact-red items-center justify-center shrink-0 border border-stone-100 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-impact-red group-hover:border-impact-red group-hover:shadow-[0_20px_45px_-15px_rgba(76,29,149,0.35)]">
                  <span className="text-white font-black text-4xl tracking-tighter transition-all duration-500 group-hover:text-white group-hover:scale-115">
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
                <button 
                  onClick={() => handleDownload(res)}
                  className="shrink-0 w-full md:w-auto bg-core-blue hover:bg-core-blue group-hover:text-white text-white px-12 py-5 rounded-2xl font-white text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 border border-transparent shadow-sm"
                >
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
    </div>
  );
}
