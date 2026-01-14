import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

// Create Apollo Client for WordPress GraphQL
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});

// Helper function for executing queries with better error handling
export async function executeQuery<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    console.log('Executing GraphQL query to:', `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`);
    
    const result = await apolloClient.query({
      query: gql(query),
      variables,
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
    
    console.log('GraphQL query result:', result);
    
    if (result.errors) {
      console.warn('GraphQL query returned errors:', result.errors);
    }
    
    return result.data;
  } catch (error) {
    console.warn('WordPress GraphQL query failed, using fallback data:', error);
    // Return null to trigger fallback data usage
    return null as T;
  }
}

// Helper function for mutations
export async function executeMutation<T = any>(
  mutation: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(mutation),
      variables,
    });
    
    return result.data;
  } catch (error) {
    console.error('WordPress GraphQL mutation error:', error);
    throw error;
  }
}