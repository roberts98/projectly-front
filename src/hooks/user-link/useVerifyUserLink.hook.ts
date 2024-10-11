import { useMutation } from "@tanstack/react-query";
import { UserLinkHttpService } from "../../http/user-link.http.service";

export function useVerifyUserLink() {
  const { mutate, isError } = useMutation({
    mutationFn: (hash: string) => UserLinkHttpService.verifyUserLink(hash),
  });

  return { verifyUserLink: mutate, isVerifyingError: isError };
}
