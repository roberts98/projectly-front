import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectHttpService } from "../../http/project-http.service";
import { ProjectsDto } from "../../models/project";
import { queryClient } from "../../query-client";
import { useTranslation } from "react-i18next";

export function useDeleteProject() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (projectId: number) =>
      ProjectHttpService.deleteProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.setQueryData(
        ["projects"],
        (oldData: ProjectsDto): ProjectsDto => {
          return {
            shared: oldData.shared.filter(
              (project) => project.id !== projectId,
            ),
            personal: oldData.personal.filter(
              (project) => project.id !== projectId,
            ),
          };
        },
      );
      navigate(`/`);
      toast(t("toasts.project.removed"), { type: "success" });
    },
  });

  return { deleteProject: mutate, isDeletingProject: isPending };
}
