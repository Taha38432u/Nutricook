import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike as toggleLikeApi } from "./apiRecipe.js";
import toast from "react-hot-toast";

function useToggleLike() {
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isLoading: isAdding } = useMutation({
    mutationFn: toggleLikeApi,
    onSuccess: () => {
      // Invalidate the query to fetch fresh data
      queryClient.invalidateQueries(["allRecipes"]);
    },
    onError: (error) => {
      // Display an error toast
      toast.error(error.message);
    },
  });

  return {
    toggleLike,
    isAdding,
  };
}

export default useToggleLike;
