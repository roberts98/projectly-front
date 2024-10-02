import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../App";
import { ProjectHttpService } from "../../http/project-http.service";
import { NewProject, Project } from "../../models/project";

export function useCreateProject() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (project: NewProject) =>
      ProjectHttpService.createProject(project),
    onSuccess: (id, { name, passphrase }) => {
      queryClient.setQueryData(
        ["projects"],
        (oldData: Project[]): Project[] => [
          ...oldData,
          { id, name, isEncrypted: !!passphrase, isPersonal: true },
        ]
      );
      navigate("/#");
    },
  });

  return { createProject: mutate };
}
