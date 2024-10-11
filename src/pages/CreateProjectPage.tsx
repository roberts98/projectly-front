import { ProjectForm } from "../components/project/ProjectForm";
import { useTranslation } from "react-i18next";

export function CreateProjectPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        {t("project.typography.new")}
      </h1>
      <ProjectForm />
    </div>
  );
}
