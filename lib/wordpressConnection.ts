// WordPress connection testing and validation utilities

export interface WordPressConnectionTest {
  isConnected: boolean;
  endpoint: string;
  error?: string;
  suggestions?: string[];
}

/**
 * Test WordPress GraphQL connection
 */
export async function testWordPressConnection(): Promise<WordPressConnectionTest> {
  const endpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;
  
  try {
    console.log('🔍 Testing WordPress connection to:', endpoint);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query TestConnection {
            generalSettings {
              title
              url
              description
            }
          }
        `
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL Error: ${data.errors[0]?.message || 'Unknown GraphQL error'}`);
    }

    console.log('✅ WordPress connection successful:', data.data?.generalSettings?.title);
    
    return {
      isConnected: true,
      endpoint,
    };
    
  } catch (error) {
    console.error('❌ WordPress connection failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const suggestions: string[] = [];
    
    // Provide specific suggestions based on error type
    if (errorMessage.includes('fetch')) {
      suggestions.push('Check if WordPress is running at the specified URL');
      suggestions.push('Verify NEXT_PUBLIC_WORDPRESS_URL in .env.local');
      suggestions.push('Ensure WordPress is accessible from your network');
    }
    
    if (errorMessage.includes('404')) {
      suggestions.push('Install and activate WPGraphQL plugin in WordPress');
      suggestions.push('Check if /graphql endpoint exists');
    }
    
    if (errorMessage.includes('CORS')) {
      suggestions.push('Configure CORS headers in WordPress');
      suggestions.push('Install a CORS plugin for WordPress');
    }
    
    if (errorMessage.includes('500')) {
      suggestions.push('Check WordPress error logs');
      suggestions.push('Verify WPGraphQL plugin is properly configured');
    }
    
    return {
      isConnected: false,
      endpoint,
      error: errorMessage,
      suggestions,
    };
  }
}

/**
 * Test specific GraphQL queries
 */
export async function testGraphQLQuery(query: string, variables?: any): Promise<any> {
  const endpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0]?.message || 'Unknown GraphQL error'}`);
    }

    return data.data;
    
  } catch (error) {
    console.error('GraphQL Query failed:', error);
    throw error;
  }
}

/**
 * Validate WordPress environment
 */
export function validateWordPressEnvironment(): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    issues.push('NEXT_PUBLIC_WORDPRESS_URL is not defined in environment variables');
  }
  
  const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (url && !url.startsWith('http')) {
    issues.push('NEXT_PUBLIC_WORDPRESS_URL must start with http:// or https://');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}
