import { createRecipe as createRecipeApi } from "./apiRecipe.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UseCreateRecipe() {
  const queryClient = useQueryClient();
  const { mutate: createRecipe, isPending: isAdding } = useMutation({
    mutationFn: ({ recipeData, id = "" }) => createRecipeApi({ recipeData, id }),

    onSuccess: () => {
      toast.success("Details Updated Successfully");
      queryClient.invalidateQueries(["allRecipes"]);
      queryClient.invalidateQueries(["singleRecipe"]);
      queryClient.invalidateQueries(["allRecipesAdmin"]);
    },
    onError: (error) => {
      // Check if the error message is about an existing email
      toast.error(error.message);
    },
  });

  return { isAdding, createRecipe };
}

export default UseCreateRecipe;
