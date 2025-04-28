import { useQuery } from "@tanstack/react-query";
import { getLikedRecipes } from "../recipe/apiRecipe.js";

export default function useGetLikedRecipes(filters) {
  const { isLoading, data: likedRecipes } = useQuery({
    queryKey: ["likedRecipes", filters],
    queryFn: () => getLikedRecipes(filters),
  });

  return {
    isLoading,
    likedRecipes,
  };
}
