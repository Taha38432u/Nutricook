import { useMutation } from "@tanstack/react-query";
import { reactivateRequest as reactivateRequestApi } from "./apiAuth.js";
import toast from "react-hot-toast";

export default function useReactivateRequest() {
  const { mutate: reactivateRequest, isPending: isLoading } = useMutation({
    mutationFn: ({ message, email }) =>
      reactivateRequestApi({ message, email }),
    onSuccess: () => {
      toast.success("Activation request sent to admin");
    },
    onError: () => toast.error("Something went wrong"),
  });

  return { reactivateRequest, isLoading };
}
