'use client';

import { Search, FileText, Users } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'no-data' | 'error';
  title: string;
  description: string;
  searchQuery?: string;
  onReset?: () => void;
  actionLabel?: string;
}

export default function EmptyState({
  type,
  title,
  description,
  searchQuery,
  onReset,
  actionLabel = 'Show All'
}: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-16 h-16 text-gray-300" />;
      case 'no-data':
        return <FileText className="w-16 h-16 text-gray-300" />;
      case 'error':
        return <Users className="w-16 h-16 text-gray-300" />;
      default:
        return <Search className="w-16 h-16 text-gray-300" />;
    }
  };

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          {getIcon()}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-500 mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 mb-6 leading-relaxed">
          {searchQuery ? (
            <>
              {description.replace('{query}', `"${searchQuery}"`)}
            </>
          ) : (
            description
          )}
        </p>

        {/* Action Button */}
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 bg-deep-purple text-white rounded-lg hover:bg-black transition-colors font-bold focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
          >
            {actionLabel}
          </button>
        )}

        {/* Additional Help Text */}
        {type === 'search' && (
          <div className="mt-6 text-sm text-gray-400">
            <p>Try adjusting your search terms or browse all content</p>
          </div>
        )}
      </div>
    </div>
  );
}