import { useQuery } from "@tanstack/react-query";
import { getSingleRecipe } from "./apiRecipe.js";

export default function useGetSingleRecipe(id) {
  const { isLoading, data: singleRecipe } = useQuery({
    queryKey: ["singleRecipe"],
    queryFn: () => getSingleRecipe(id),
  });

  return {
    isLoading,
    singleRecipe,
  };
}
