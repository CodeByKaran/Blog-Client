"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionCheck } from "@/lib/fetch";

export const SESSION_QUERY_KEY = ["session"] as const;

export function useSession() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: sessionCheck,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: "always", // Changed from false to ensure we have fresh data on mount
    refetchOnReconnect: false,
    // Removed initialData and enabled options
  });

  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
  };

  const clearSession = () => {
    queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY });
  };

  return {
    session: data,
    isLoading,
    isError,
    error,
    refreshSession,
    clearSession,
  };
}
