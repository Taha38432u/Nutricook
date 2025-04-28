import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "./apiAuth.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../features/GlobalContext.jsx";

export default function useLogIn() {
  const { setReactivate } = useGlobalContext();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("User is successfully logged in");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Incorrect Email or Password");
      if (error.message.startsWith("Your account is deactivated")) {
        setReactivate(true);
      }
    },
  });

  return { login, isLoading };
}
