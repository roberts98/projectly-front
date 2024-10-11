import { CategoryList } from "./CategoryList.tsx";
import { CategoryForm } from "./CategoryForm.tsx";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function CategoryManagement() {
  const { t } = useTranslation();
  const { projectId: projectIdString } = useParams();
  const projectId = Number(projectIdString);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-5">
          {t("category.typography.list")}
        </div>
        <CategoryList projectId={projectId} />
      </div>
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-5">
          {t("category.typography.new")}
        </div>
        <CategoryForm projectId={projectId} />
      </div>
    </div>
  );
}
