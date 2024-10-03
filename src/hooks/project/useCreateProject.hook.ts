import { useMutation } from "@tanstack/react-query";
import { ProjectHttpService } from "../../http/project-http.service";
import { NewProject, ProjectsDto } from "../../models/project";
import { queryClient } from "../../query-client";
import { useUserStore } from "../../store/user.store";

export function useCreateProject() {
  const userId = useUserStore((state) => state.user!.userId);
  const { mutate } = useMutation({
    mutationFn: (project: NewProject) =>
      ProjectHttpService.createProject(project),
    onSuccess: (id, { name, passphrase }) => {
      queryClient.setQueryData(
        ["projects"],
        (oldData: ProjectsDto): ProjectsDto => {
          const newProject = {
            id,
            name,
            userId,
            isEncrypted: !!passphrase,
            isPersonal: true,
          };
          return {
            shared: oldData.shared,
            personal: [...oldData.personal, newProject],
          };
        }
      );
    },
  });

  return { createProject: mutate };
}
