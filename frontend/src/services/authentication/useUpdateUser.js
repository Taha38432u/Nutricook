import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUser as updateUserApi } from "./apiAuth.js";

function UseUpdateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data, variables) => {
      // `variables` is the input passed to updateUser
      if (variables?.active === false) {
        toast.success("Account disabled. Redirecting...");
        localStorage.removeItem("jwt");
        navigate("/login");
        return;
      }

      toast.success("Details Updated Successfully");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUser };
}

export default UseUpdateUser;
