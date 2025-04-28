import { useQuery } from "@tanstack/react-query";
import { getInboxMessages } from "./apiAuth";

export default function useInboxMessages() {
  const { isLoading, data: messages } = useQuery({
    queryKey: ["inboxMessages"],
    queryFn: getInboxMessages,
  });

  return {
    isLoading,
    messages,
  };
}
