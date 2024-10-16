import { useMutation } from "@tanstack/react-query";
import { ProjectHttpService } from "../../http/project-http.service";
import { NewProject, ProjectsDto } from "../../models/project";
import { queryClient } from "../../query-client";
import { useUserStore } from "../../store/user.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function useCreateProject() {
  const { t } = useTranslation();
  const userId = useUserStore((state) => state.user!.userId);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
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
        },
      );
      navigate(`/projects/${id}`);
      toast(t("toasts.project.created"), { type: "success" });
    },
  });

  return { createProject: mutate, isCreatingProject: isPending };
}
