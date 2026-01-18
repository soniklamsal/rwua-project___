import { useQuery, DocumentNode, QueryHookOptions, OperationVariables } from '@apollo/client';
import { useState, useEffect } from 'react';

/**
 * Custom hook that wraps Apollo useQuery with better error handling
 * Prevents crashes when WordPress is unavailable
 */
export function useWordPressQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) {
  const [hasError, setHasError] = useState(false);
  
  const result = useQuery<TData, TVariables>(query, {
    ...options,
    errorPolicy: 'all',
    onError: (error) => {
      console.warn('WordPress query failed:', error.message);
      setHasError(true);
      options?.onError?.(error);
    },
  });

  // Reset error state when query succeeds
  useEffect(() => {
    if (result.data && !result.error) {
      // Use functional update to avoid dependency on setHasError
      setHasError(() => false);
    }
  }, [result.data, result.error]);

  return {
    ...result,
    hasConnectionError: hasError || (result.error?.message.includes('Failed to fetch')),
  };
}
