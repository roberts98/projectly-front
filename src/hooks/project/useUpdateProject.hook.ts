import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectHttpService } from "../../http/project-http.service";
import { ProjectsDto, ProjectUpdate } from "../../models/project";
import { queryClient } from "../../query-client";
import { useTranslation } from "react-i18next";

interface Data {
  projectId: number;
  updateRequest: ProjectUpdate;
}

export function useUpdateProject() {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ projectId, updateRequest }: Data) =>
      ProjectHttpService.updateProject(projectId, updateRequest),
    onSuccess: (_, { projectId, updateRequest: { isPersonal } }) => {
      queryClient.setQueryData(
        ["projects"],
        (oldData: ProjectsDto): ProjectsDto => {
          return {
            shared: oldData.shared,
            personal: oldData.personal.map((project) => {
              if (project.id === projectId) {
                return {
                  ...project,
                  isPersonal: isPersonal ?? project.isPersonal,
                };
              } else {
                return project;
              }
            }),
          };
        },
      );
      toast(t("toasts.project.modified"), { type: "success" });
    },
  });

  return { updateProject: mutate, isUpdatingProject: isPending };
}
