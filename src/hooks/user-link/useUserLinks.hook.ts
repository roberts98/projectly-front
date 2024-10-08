import { useQuery } from "@tanstack/react-query";
import { UserLinkHttpService } from "../../http/user-link.http.service";

export function useUserLink() {
  const { data: userLink } = useQuery({
    queryKey: ["userLink"],
    queryFn: UserLinkHttpService.fetchUserLinks,
    staleTime: Infinity,
  });

  return { userLink };
}
