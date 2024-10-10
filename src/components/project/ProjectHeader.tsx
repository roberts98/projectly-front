import { Project } from "../../models/project.ts";
import { Badge } from "flowbite-react";

interface Props {
  project: Project;
  isOwned: boolean;
}

export function ProjectHeader({ project, isOwned }: Props) {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center">
        <Badge className="mr-2" size="md" color="indigo">
          {project.isPersonal ? "Prywatny" : "Publiczny"}
        </Badge>
        {isOwned && (
          <Badge className="mr-2" size="md" color="failure">
            Twój
          </Badge>
        )}
      </div>
      <h2 className="text-3xl">{project.name}</h2>
    </div>
  );
}
