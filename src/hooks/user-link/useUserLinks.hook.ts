import { useQuery } from "@tanstack/react-query";
import { UserLinkHttpService } from "../../http/user-link-http.service.ts";

export function useUserLink() {
  const { data: userLink, isLoading } = useQuery({
    queryKey: ["userLink"],
    queryFn: UserLinkHttpService.fetchUserLinks,
    staleTime: Infinity,
  });

  return { userLink, isLoadingLink: isLoading };
}
