import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "./apiAuth.js";
import toast from "react-hot-toast";

export default function useForgotPassword() {
  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: ({ resetEmail }) => forgotPasswordApi({ resetEmail }),
    onSuccess: () => {
      toast.success("Reset link successfully sent");
    },
    onError: () => toast.error("Something went wrong"),
  });

  return { forgotPassword, isLoading };
}
