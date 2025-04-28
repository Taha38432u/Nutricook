import { useQuery } from "@tanstack/react-query";
import { getUser } from "./apiAuth.js";

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.status === "success",
  };
}
