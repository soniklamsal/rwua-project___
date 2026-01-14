// Utility functions for RWUA website clone

// Search filter function for stories
export function filterStories(stories: any[], query: string) {
  if (!query.trim()) return stories;
  
  const lowercaseQuery = query.toLowerCase();
  return stories.filter(story => 
    story.title.toLowerCase().includes(lowercaseQuery) ||
    story.description.toLowerCase().includes(lowercaseQuery)
  );
}