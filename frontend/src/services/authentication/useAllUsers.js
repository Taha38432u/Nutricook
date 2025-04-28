import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./apiAuth.js";

export default function useUsers() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return {
    isLoading,
    users: users?.data?.users,
  };
}
