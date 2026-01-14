'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import { SuccessStory } from '@/lib/data';
import WordPressImage from '../WordPressImage';

interface ModernStoryCardProps {
  story: SuccessStory;
}

export default function ModernStoryCard({ story }: ModernStoryCardProps) {

  // Helper function to clean HTML content
  const cleanDescription = (htmlContent: string) => {
    return htmlContent
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .trim();
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'community': 'bg-blue-100 text-blue-700',
      'education': 'bg-green-100 text-green-700',
      'empowerment': 'bg-purple-100 text-purple-700',
      'women': 'bg-pink-100 text-pink-700',
      'health': 'bg-red-100 text-red-700',
      'economic': 'bg-yellow-100 text-yellow-700',
      'development': 'bg-indigo-100 text-indigo-700',
      'dalit': 'bg-orange-100 text-orange-700',
      'entrepreneurship': 'bg-teal-100 text-teal-700',
      'skills': 'bg-cyan-100 text-cyan-700',
      'children': 'bg-lime-100 text-lime-700',
      'literacy': 'bg-emerald-100 text-emerald-700',
      'maternal': 'bg-rose-100 text-rose-700',
      'rural': 'bg-amber-100 text-amber-700',
      'healthcare': 'bg-violet-100 text-violet-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
      {/* Image Section - Smaller */}
      <div className="relative h-32 overflow-hidden">
        {story.image ? (
          <div className="relative w-full h-full">
            <WordPressImage
              src={story.image}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => console.log(`Failed to load image for story: ${story.title}`)}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <div className="text-white text-center">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-xs opacity-70">{story.category}</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
            {story.category}
          </span>
        </div>
      </div>

      {/* Content Section - More compact */}
      <div className="p-3">
        {/* Header */}
        <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
          {story.title}
        </h3>

        {/* Description - Much shorter */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {cleanDescription(story.description).length > 80 ? cleanDescription(story.description).substring(0, 80) + '...' : cleanDescription(story.description)}
        </p>

        {/* Tags - Only 2 tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {story.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>

        {/* Footer - Inline Read More */}
        <div className="flex justify-between items-center">
          {/* Date */}
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(story.date).split(',')[0]}</span>
          </div>

          {/* Read More Button - Better design */}
          <Link
            href={`/success-story/${story.id}`}
            className="inline-flex items-center text-core-blue hover:text-white text-sm font-medium transition-all duration-300 hover:bg-core-blue px-3 py-1.5 rounded-full border border-core-blue/20 hover:border-core-blue group hover:shadow-md cursor-pointer"
          >
            <span>Read More</span>
            <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}