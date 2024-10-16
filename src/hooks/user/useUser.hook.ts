import { useQuery } from "@tanstack/react-query";
import { UserHttpService } from "../../http/user-http.service.ts";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: UserHttpService.getUser,
    staleTime: Infinity,
  });

  return { user: data, isUserLoading: isLoading };
}
