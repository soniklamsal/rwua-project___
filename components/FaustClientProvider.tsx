'use client';

import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ReactNode, useEffect, useState } from 'react';

interface FaustClientProviderProps {
    children: ReactNode;
}

// Create Apollo Client instance with error handling
const createApolloClient = () => {
    // Error handling link
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.warn(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        }
        if (networkError) {
            console.warn(`[Network error]: ${networkError}`);
        }
    });

    // HTTP link
    const httpLink = new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        fetchOptions: {
            timeout: 10000, // 10 second timeout
        },
    });

    return new ApolloClient({
        link: ApolloLink.from([errorLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
                fetchPolicy: 'cache-and-network',
            },
            query: {
                errorPolicy: 'all',
                fetchPolicy: 'network-only',
            },
            mutate: {
                errorPolicy: 'all',
            },
        },
    });
};

export default function FaustClientProvider({ children }: FaustClientProviderProps) {
    const [mounted, setMounted] = useState(false);
    const [apolloClient, setApolloClient] = useState<any>(null);
    const [connectionError, setConnectionError] = useState(false);

    useEffect(() => {
        try {
            const client = createApolloClient();
            setApolloClient(client);
            setMounted(true);
        } catch (error) {
            console.error('Failed to create Apollo client:', error);
            setConnectionError(true);
            setMounted(true);
        }
    }, []);

    // Only render after component mounts to avoid SSR issues
    if (!mounted) {
        return null;
    }

    // Show error state if connection failed
    if (connectionError || !apolloClient) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50" suppressHydrationWarning>
                <div className="text-center max-w-md p-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Issue</h2>
                    <p className="text-gray-600 mb-4">
                        Unable to connect to WordPress. The site will work with limited functionality.
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-6 py-3 bg-core-blue text-white rounded-lg hover:bg-impact-red transition-colors"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    // Use ApolloProvider directly with our custom client
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}
