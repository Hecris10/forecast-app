import { backendClient } from "@/lib/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./use-session";

export function useHistory() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Get history
  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useQuery({
    queryKey: ["history", session?.data?.user?.id],
    queryFn: async () => {
      const res = await backendClient.weather.getHistory.$get();
      return await res.json();
    },
    enabled: !!session?.data?.user?.id,
  });

  // Delete history item
  const { mutate: deleteHistoryItem, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await backendClient.weather.deleteHistory.$post({
        id,
      });
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch history
      queryClient.invalidateQueries({
        queryKey: ["history", session?.data?.user?.id],
      });
    },
  });

  return {
    history: history?.data || [],
    isLoadingHistory,
    historyError,
    deleteHistoryItem,
    isDeleting,
  };
}
