import { useMutation } from "@tanstack/react-query";
import { UserLinkHttpService } from "../../http/user-link-http.service.ts";
import { queryClient } from "../../query-client";

export function useCreateUserLink() {
  const { mutate } = useMutation({
    mutationFn: (passphrase: string) =>
      UserLinkHttpService.createUserLink(passphrase),
    onSuccess: (newUserLink) =>
      queryClient.setQueryData(["userLink"], newUserLink),
  });

  return { createUserLink: mutate };
}
