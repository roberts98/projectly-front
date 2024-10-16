import { useMutation } from "@tanstack/react-query";
import { UserLinkHttpService } from "../../http/user-link-http.service.ts";

export function useProcessUserLink() {
  const { mutate } = useMutation({
    mutationFn: ({ hash, passphrase }: { hash: string; passphrase: string }) =>
      UserLinkHttpService.processUserLink(hash, passphrase),
    onSuccess: () => window.location.reload(),
  });

  return { processUserLink: mutate };
}
