import { useMutation } from "@tanstack/react-query";
import { UserHttpService } from "../../http/user-http.service.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Data {
  email?: string;
}

export function useUpdateUser() {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }: Data) => UserHttpService.updateUser(email),
    onSuccess: () => toast(t("toasts.user.emailChanged"), { type: "success" }),
  });

  return { updateUser: mutate, isUpdatingUser: isPending };
}
