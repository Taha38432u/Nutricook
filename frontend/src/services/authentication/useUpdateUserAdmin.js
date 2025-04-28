import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAdmin as updateUserAdminApi } from "./apiAuth.js";
import toast from "react-hot-toast";

export default function useUpdateUserAdmin() {
  const queryClient = useQueryClient();
  const { mutate: updateUserAdmin, isPending } = useMutation({
    mutationFn: ({ id, active }) => updateUserAdminApi({ id, active }),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUserAdmin, isPending };
}
