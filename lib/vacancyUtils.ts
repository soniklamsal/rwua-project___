// Utility functions for WordPress vacancy posts with ACF fields

export interface WordPressVacancy {
  id: string;
  title: string;
  slug: string;
  vacancyFields: {
    jobTitle: string;
    shortDescription: string;
    employmentType: string;
    jobCategory: string;
    jobLocation: string;
    applicationDeadline: string;
    vacancyStatus: string[] | string;
    cardImage?: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

export interface Vacancy {
  id: string;
  position: string;
  description: string;
  employmentType: string;
  jobCategory: string;
  deadline: string;
  location: string;
  image?: string;
  status: 'open' | 'closed'; // Automatically calculated based on deadline, with manual override support
  applyUrl?: string;
}

// Check if a vacancy is expired based on application deadline
function isVacancyExpired(deadline: string): boolean {
  if (!deadline) return false;
  
  // Create date objects in UTC to avoid timezone issues
  const now = new Date();
  const deadlineDate = new Date(deadline);
  
  // Set time to end of day for deadline (23:59:59) to be more lenient
  deadlineDate.setHours(23, 59, 59, 999);
  
  return now > deadlineDate;
}

// Export the utility function for use in other components
export { isVacancyExpired };

// Transform WordPress vacancy post to Vacancy format with proper WordPress image handling
export function transformToVacancy(post: WordPressVacancy): Vacancy {
  console.log(`🔄 Transforming vacancy: "${post.title}"`);
  
  const fields = post.vacancyFields;
  
  // Get the image URL from ACF cardImage field
  let imageUrl = '';
  
  if (fields?.cardImage?.node?.sourceUrl) {
    const rawUrl = fields.cardImage.node.sourceUrl;
    console.log(`🖼️ Processing card image for vacancy "${post.title}": ${rawUrl}`);
    
    try {
      // Use the WordPress image directly
      if (rawUrl.startsWith('/')) {
        // Relative URL - convert to absolute
        const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost/practice_wordpress';
        imageUrl = `${baseUrl}${rawUrl}`;
      } else {
        // Already absolute URL
        imageUrl = rawUrl;
      }
      console.log(`✅ Card image URL: ${imageUrl}`);
    } catch (error) {
      console.error(`❌ Error processing card image URL for "${post.title}":`, error);
      imageUrl = '';
    }
  } else {
    console.log(`⚠️ No card image found for vacancy: ${post.title}`);
    imageUrl = '';
  }
  
  // Calculate status based on deadline and manual override
  const deadline = fields?.applicationDeadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // Handle vacancyStatus as manual override - WPGraphQL exposes it as [String]
  const rawStatus = fields?.vacancyStatus;
  const manualStatusValue = Array.isArray(rawStatus)
    ? rawStatus[0]?.toLowerCase()
    : rawStatus?.toLowerCase();
  
  // Determine final status:
  // 1. If manually set to 'closed', always closed
  // 2. If deadline has passed, automatically closed
  // 3. Otherwise, open
  let status: 'open' | 'closed' = 'open';
  
  if (manualStatusValue === 'closed') {
    status = 'closed';
    console.log(`📊 Vacancy "${post.title}" manually set to closed`);
  } else if (isVacancyExpired(deadline)) {
    status = 'closed';
    console.log(`📊 Vacancy "${post.title}" automatically closed due to expired deadline: ${deadline}`);
  } else {
    status = 'open';
    console.log(`📊 Vacancy "${post.title}" is open (deadline: ${deadline})`);
  }
  
  const transformed: Vacancy = {
    id: post.slug,
    position: fields?.jobTitle || post.title,
    description: fields?.shortDescription || '',
    employmentType: fields?.employmentType || 'General',
    jobCategory: fields?.jobCategory || 'General',
    deadline: deadline,
    location: fields?.jobLocation || 'Nepal',
    image: imageUrl,
    status: status,
  };
  
  console.log(`✅ Vacancy transformed:`, {
    title: transformed.position,
    employmentType: transformed.employmentType,
    jobCategory: transformed.jobCategory,
    status: transformed.status,
    hasImage: !!transformed.image,
    imageUrl: transformed.image,
    deadline: transformed.deadline,
    isExpired: isVacancyExpired(deadline)
  });
  
  return transformed;
}

// Extract dynamic job categories from WordPress vacancy posts
export function extractJobCategoriesFromVacancies(posts: WordPressVacancy[]): string[] {
  const categories = new Set<string>();
  categories.add('All');
  categories.add('Open Positions');
  categories.add('Closed Positions');
  
  posts.forEach(post => {
    if (post.vacancyFields?.jobCategory) {
      const jobCategory = post.vacancyFields.jobCategory;
      // Handle both array and string types
      if (Array.isArray(jobCategory)) {
        jobCategory.forEach(cat => {
          if (cat && typeof cat === 'string') {
            categories.add(cat);
          }
        });
      } else if (typeof jobCategory === 'string') {
        categories.add(jobCategory);
      }
    }
  });
  
  return Array.from(categories);
}

// Filter vacancies by status
export function filterVacanciesByStatus(vacancies: Vacancy[], status: 'open' | 'closed'): Vacancy[] {
  return vacancies.filter(vacancy => vacancy.status === status);
}

// Filter vacancies by job category
export function filterVacanciesByJobCategory(vacancies: Vacancy[], category: string): Vacancy[] {
  return vacancies.filter(vacancy => {
    const jobCategory = vacancy.jobCategory;
    // Handle both array and string types
    if (Array.isArray(jobCategory)) {
      return jobCategory.includes(category);
    }
    return jobCategory === category;
  });
}

// Sort vacancies by deadline (urgent first)
export function sortVacanciesByDeadline(vacancies: Vacancy[]): Vacancy[] {
  return [...vacancies].sort((a, b) => {
    // Open positions first
    if (a.status !== b.status) {
      return a.status === 'open' ? -1 : 1;
    }
    
    // Then by deadline (earliest first)
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
}