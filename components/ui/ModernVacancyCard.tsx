'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Building, ExternalLink, Clock } from 'lucide-react';
import { Vacancy } from '@/lib/data';
import ApplicationForm from './ApplicationForm';

interface ModernVacancyCardProps {
  vacancy: Vacancy;
}

export default function ModernVacancyCard({ vacancy }: ModernVacancyCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'management': 'bg-blue-100 text-blue-700',
      'finance': 'bg-green-100 text-green-700',
      'administration': 'bg-purple-100 text-purple-700',
      'field work': 'bg-orange-100 text-orange-700',
      'monitoring': 'bg-indigo-100 text-indigo-700',
      'communications': 'bg-pink-100 text-pink-700',
      'community': 'bg-teal-100 text-teal-700',
      'development': 'bg-cyan-100 text-cyan-700',
      'leadership': 'bg-red-100 text-red-700',
      'budgeting': 'bg-yellow-100 text-yellow-700',
      'compliance': 'bg-gray-100 text-gray-700',
      'women': 'bg-rose-100 text-rose-700',
      'empowerment': 'bg-violet-100 text-violet-700',
      'training': 'bg-lime-100 text-lime-700',
      'evaluation': 'bg-emerald-100 text-emerald-700',
      'reporting': 'bg-amber-100 text-amber-700',
      'quality': 'bg-slate-100 text-slate-700',
      'media': 'bg-fuchsia-100 text-fuchsia-700',
      'content': 'bg-sky-100 text-sky-700',
      'advocacy': 'bg-stone-100 text-stone-700',
      'education': 'bg-green-100 text-green-700',
      'coordination': 'bg-blue-100 text-blue-700',
      'literacy': 'bg-purple-100 text-purple-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(vacancy.deadline);
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0 && vacancy.status === 'open';
  const isExpired = vacancy.status === 'closed';

  const getDepartmentGradient = (department: string) => {
    const gradients: { [key: string]: string } = {
      'Programs': 'from-blue-500 to-purple-500',
      'Finance': 'from-green-400 to-blue-500',
      'Field Operations': 'from-orange-400 to-pink-500',
      'M&E': 'from-purple-500 to-pink-500',
      'Communications': 'from-red-400 to-pink-500'
    };
    return gradients[department] || 'from-gray-400 to-gray-600';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
        {/* Image Section - Smaller */}
        <div className="relative h-32 overflow-hidden">
          {vacancy.image && !imageError ? (
            <Image
              src={vacancy.image}
              alt={vacancy.position}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${getDepartmentGradient(vacancy.department)} flex items-center justify-center`}>
              <div className="text-white text-center">
                <div className="w-10 h-10 mx-auto mb-1 bg-white/20 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">{vacancy.department}</p>
              </div>
            </div>
          )}
          
          {/* Department Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
              {vacancy.department}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-2 right-2">
            {!isExpired && (
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isUrgent 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                <Clock className="w-3 h-3 mr-1" />
                {isUrgent ? 'Urgent' : `${daysRemaining}d left`}
              </div>
            )}
            
            {isExpired && (
              <div className="flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                <Clock className="w-3 h-3 mr-1" />
                Closed
              </div>
            )}
          </div>
        </div>

        {/* Content Section - More compact */}
        <div className="p-3">
          {/* Position Title */}
          <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
            {vacancy.position}
          </h3>

          {/* Description - Shorter */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {vacancy.description.length > 80 ? vacancy.description.substring(0, 80) + '...' : vacancy.description}
          </p>

          {/* Details - Compact */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center text-xs text-gray-600">
              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
              <span>{vacancy.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
              <span>Deadline: {formatDate(vacancy.deadline)}</span>
            </div>
          </div>

          {/* Tags - Only 2 tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {vacancy.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            {/* Status */}
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isExpired ? 'bg-gray-400' : isUrgent ? 'bg-red-400' : 'bg-green-400'
              }`}></div>
              <span className="text-xs text-gray-600">
                {isExpired ? 'Closed' : 'Open'}
              </span>
            </div>

            {/* Apply Button */}
            <button 
              onClick={() => setShowApplicationForm(true)}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isExpired 
                  ? 'bg-stone-200 text-stone-500 cursor-not-allowed' 
                  : 'bg-deep-purple text-white hover:bg-black hover:shadow-md cursor-pointer'
              }`}
              disabled={isExpired}
            >
              <span>{isExpired ? 'Closed' : 'Apply'}</span>
              {!isExpired && (
                <ExternalLink className="w-3 h-3 ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <ApplicationForm
        vacancy={{
          id: vacancy.id,
          position: vacancy.position,
          department: vacancy.department
        }}
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
      />
    </>
  );
}