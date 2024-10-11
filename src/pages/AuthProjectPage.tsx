import { ProjectAuthorizeForm } from "../components/project/ProjectAuthorizeForm.tsx";
import { useTranslation } from "react-i18next";

interface Props {
  projectId: number;
}

export function AuthProjectPage({ projectId }: Props) {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        {t("project.typography.authorize")}
      </h1>
      <ProjectAuthorizeForm projectId={projectId} />
    </div>
  );
}
