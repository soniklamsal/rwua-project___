'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';

interface FaustClientProviderProps {
    children: ReactNode;
}

// Create Apollo Client instance
const createApolloClient = () => {
    return new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
            },
            query: {
                errorPolicy: 'all',
            },
        },
    });
};

export default function FaustClientProvider({ children }: FaustClientProviderProps) {
    const [mounted, setMounted] = useState(false);
    const [apolloClient, setApolloClient] = useState<any>(null);

    useEffect(() => {
        setApolloClient(createApolloClient());
        setMounted(true);
    }, []);

    // Only render after component mounts to avoid SSR issues
    if (!mounted || !apolloClient) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
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