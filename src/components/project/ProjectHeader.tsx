import { Project } from "../../models/project.ts";
import { Badge } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface Props {
  project: Project;
  isOwned: boolean;
}

export function ProjectHeader({ project, isOwned }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center">
        <Badge className="mr-2" size="md" color="indigo">
          {project.isPersonal
            ? t("project.typography.private")
            : t("project.typography.public")}
        </Badge>
        {isOwned && (
          <Badge className="mr-2" size="md" color="failure">
            {t("project.typography.owned")}
          </Badge>
        )}
      </div>
      <h2 className="text-3xl">{project.name}</h2>
    </div>
  );
}
