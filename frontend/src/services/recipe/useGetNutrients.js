import { useMutation } from "@tanstack/react-query";
import { getNutrients } from "./apiRecipe";

export default function useGetNutrients() {
  const mutation = useMutation({
    mutationFn: getNutrients, // Function that handles the API call
  });

  return {
    trigger: mutation.mutateAsync, // Use this to trigger the mutation (awaitable)
    isLoading: mutation.isPending, // Loading state
    data: mutation.data, // Data returned from the mutation
    error: mutation.error, // Error (if any)
    isSuccess: mutation.isSuccess, // Success state
  };
}
