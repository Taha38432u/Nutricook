import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../recipe/apiRecipe.js";

export default function useGetAllUsers() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  return {
    isLoading,
    users,
  };
}
