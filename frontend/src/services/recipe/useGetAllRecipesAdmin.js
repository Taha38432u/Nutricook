import { useQuery } from "@tanstack/react-query";
import { getAllRecipesAdmin } from "./apiRecipe.js";

export default function useGetAllRecipesAdmin(filters) {
  const { isLoading, data: allRecipes } = useQuery({
    queryKey: ["allRecipesAdmin", filters],
    queryFn: () => getAllRecipesAdmin(filters),
  });

  return {
    isLoading,
    allRecipes,
  };
}
