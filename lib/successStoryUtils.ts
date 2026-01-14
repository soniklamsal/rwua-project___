// Utility functions specifically for WordPress Success Story posts

export interface WordPressCategory {
  name: string;
  slug: string;
  parent?: {
    node: {
      name: string;
      slug: string;
    }
  };
}

export interface WordPressSuccessStoryPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    }
  };
  categories: {
    nodes: WordPressCategory[];
  };
  author: {
    node: {
      name: string;
    }
  };
}

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
}

// Check if a post belongs to success stories category
export function isSuccessStoryPost(post: WordPressSuccessStoryPost): boolean {
  if (!post.categories?.nodes) return false;
  
  return post.categories.nodes.some(category => {
    // Check direct category match
    if (category.name.toLowerCase().includes('success') || 
        category.slug.toLowerCase().includes('success')) {
      return true;
    }
    
    // Check parent category match
    if (category.parent?.node) {
      return category.parent.node.name.toLowerCase().includes('success') ||
             category.parent.node.slug.toLowerCase().includes('success');
    }
    
    return false;
  });
}

// Filter posts to get only success stories
export function filterSuccessStoryPosts(posts: WordPressSuccessStoryPost[]): WordPressSuccessStoryPost[] {
  return posts.filter(post => isSuccessStoryPost(post));
}


// Transform WordPress post to SuccessStory format with proper WordPress image handling
export function transformToSuccessStory(post: WordPressSuccessStoryPost): SuccessStory {
  console.log(`🔄 Transforming success story: "${post.title}"`);
  
  // Get the featured image URL from WordPress
  let imageUrl = '';
  if (post.featuredImage?.node?.sourceUrl) {
    const rawUrl = post.featuredImage.node.sourceUrl;
    console.log(`🖼️ Processing success story image for "${post.title}": ${rawUrl}`);
    
    try {
      // Use the WordPress image directly
      if (rawUrl.startsWith('/')) {
        // Relative URL - convert to absolute
        const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://rwua.com.np';
        imageUrl = `${baseUrl}${rawUrl}`;
      } else {
        // Already absolute URL
        imageUrl = rawUrl;
      }
      console.log(`✅ WordPress image URL: ${imageUrl}`);
    } catch (error) {
      console.error(`❌ Error processing image URL for "${post.title}":`, error);
      imageUrl = ''; // No image if processing fails
    }
  } else {
    console.log(`⚠️ No featured image found for success story: ${post.title}`);
    imageUrl = ''; // No image if none exists in WordPress
  }
  
  // Get the first non-"Success Stories" category
  let categoryName = 'Success Story';
  if (post.categories?.nodes) {
    const validCategory = post.categories.nodes.find(cat => 
      cat.name !== 'Success Stories' && 
      !cat.name.toLowerCase().includes('success stories')
    );
    if (validCategory) {
      categoryName = validCategory.name;
    }
  }
  
  // Filter out "Success Stories" from tags
  const filteredTags = post.categories?.nodes
    ?.filter(cat => cat.name !== 'Success Stories' && !cat.name.toLowerCase().includes('success stories'))
    .map(cat => cat.name) || [];
  
  const transformed = {
    id: post.slug,
    title: post.title,
    description: post.content || post.excerpt?.replace(/<[^>]*>/g, '') || '',
    category: categoryName,
    author: post.author?.node?.name || 'RWUA Team',
    image: imageUrl,
    date: post.date,
    tags: filteredTags
  };
  
  console.log(`✅ Success story transformed:`, {
    title: transformed.title,
    hasImage: !!transformed.image,
    imageUrl: transformed.image
  });
  
  return transformed;
}

// Extract dynamic categories from WordPress success story posts
export function extractSuccessStoryCategories(posts: WordPressSuccessStoryPost[]): string[] {
  const categories = new Set<string>();
  categories.add('All'); // Always include 'All' option
  
  posts.forEach(post => {
    if (post.categories?.nodes) {
      post.categories.nodes.forEach(category => {
        // Add all categories except "Success Stories" parent category
        const categoryName = category.name.trim();
        
        // Skip the main "Success Stories" category and any variation
        if (categoryName && 
            categoryName !== 'Success Stories' && 
            !categoryName.toLowerCase().includes('success stories')) {
          categories.add(categoryName);
        }
      });
    }
  });
  
  return Array.from(categories);
}