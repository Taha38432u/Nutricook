import { updatePassword as updatePasswordApi } from "./apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UseUpdatePassword() {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("Details Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: [`user`],
      });
      queryClient.invalidateQueries({
        queryKey: [`allUsers`],
      });
    },
    onError: (error) => {
      // Check if the error message is about an existing email
      toast.error(error.message);
    },
  });

  return { isUpdating, updatePassword };
}

export default UseUpdatePassword;
