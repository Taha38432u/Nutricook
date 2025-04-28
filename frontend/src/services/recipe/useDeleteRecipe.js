import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe as deleteRecipeApi } from "./apiRecipe.js";
import toast from "react-hot-toast";

function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteRecipe } = useMutation({
    mutationFn: deleteRecipeApi,
    onSuccess: (_, deletedId) => {
      // Optimistically update the admin list
      queryClient.setQueryData(["allRecipesAdmin"], (oldData) => {
        if (!oldData || !oldData.recipes) return oldData;

        return {
          ...oldData,
          recipes: oldData.recipes.filter((recipe) => recipe.id !== deletedId),
        };
      });

      toast.success("Recipe Deleted Successfully");

      // Background refetch to stay synced
      queryClient.invalidateQueries(["allRecipes"]);
      queryClient.invalidateQueries(["singleRecipe"]);
      queryClient.invalidateQueries(["allRecipesAdmin"]);
    },
    onError: () => {
      toast.error("Failed to delete the recipe");
    },
  });

  return {
    isDeleting,
    deleteRecipe,
  };
}

export default useDeleteRecipe;
