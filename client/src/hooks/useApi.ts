import { useState, useCallback, useEffect } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for API calls with loading and error states
 * Usage: const { data, loading, error } = useApi(() => vehicleApi.getAllVehicles());
 */
export function useApi<T>(
  apiCall: () => Promise<T>,
  options?: UseApiOptions
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    try {
      setState({ data: null, loading: true, error: null });
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setState({ data: null, loading: false, error });
      options?.onError?.(error);
    }
  }, [apiCall, options]);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}

/**
 * Custom hook for mutations (POST, PUT, DELETE)
 * Usage: const { mutate, loading } = useMutation(vehicleApi.createVehicle);
 */
export function useMutation<T, P>(
  apiCall: (params: P) => Promise<T>,
  options?: UseApiOptions
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (params: P) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall(params);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, options]
  );

  return { mutate, loading, error };
}
