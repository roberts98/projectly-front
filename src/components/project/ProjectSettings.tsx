import { Button, Spinner } from "flowbite-react";
import { Project } from "../../models/project.ts";
import { useUpdateProject } from "../../hooks/project/useUpdateProject.hook.ts";
import { useDeleteProject } from "../../hooks/project/useDeleteProject.hook.ts";
import { CategoryManagement } from "../category/CategoryManagement.tsx";
import { useTranslation } from "react-i18next";

interface Props {
  project: Project;
}

export function ProjectSettings({ project }: Props) {
  const { t } = useTranslation();
  const { updateProject, isUpdatingProject } = useUpdateProject();
  const { deleteProject, isDeletingProject } = useDeleteProject();

  function handlePersonalButtonClick() {
    const updateRequest = { isPersonal: !project?.isPersonal };
    updateProject({ projectId: project.id, updateRequest });
  }

  function handleRemoveClick() {
    deleteProject(project.id);
  }

  return (
    <div>
      <div className="flex mb-10">
        <Button
          onClick={handlePersonalButtonClick}
          color="dark"
          className="mr-5 min-w-45"
        >
          {isUpdatingProject ? (
            <Spinner size="sm" />
          ) : project.isPersonal ? (
            t("project.buttons.setPublic")
          ) : (
            t("project.buttons.setPrivate")
          )}
        </Button>
        <Button
          color="failure"
          onClick={handleRemoveClick}
          disabled={isDeletingProject}
          className="min-w-29.5"
          size="sm"
        >
          {isDeletingProject ? (
            <Spinner size="sm" />
          ) : (
            t("project.buttons.delete")
          )}
        </Button>
      </div>
      <CategoryManagement />
    </div>
  );
}
