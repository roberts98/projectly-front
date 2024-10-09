import { useMutation } from "@tanstack/react-query";
import { ProjectHttpService } from "../../http/project-http.service";
import {
  ProjectPassphrase,
  usePassphraseStore,
} from "../../store/project-auth.store";

export function useAuthProject() {
  const addPassphrase = usePassphraseStore((state) => state.addPassphrase);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProjectPassphrase) =>
      ProjectHttpService.authProject(data),
    onSuccess: (_, data) => addPassphrase(data),
  });

  return { authProject: mutate, isAuthorizingProject: isPending };
}
