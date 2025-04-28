import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "./apiAuth.js";
import toast from "react-hot-toast";

export default function useResetPassword() {
  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: ({ password, passwordConfirm, token }) =>
      resetPasswordApi({ password, passwordConfirm, token }),
    onSuccess: () => {
      toast.success("Password is successfully reset");
    },
    onError: () =>
      toast.error(
        "The reset link is either expired or already used. Please request a new one.",
      ),
  });

  return { resetPassword, isLoading };
}
