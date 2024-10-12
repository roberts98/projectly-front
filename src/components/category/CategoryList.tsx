import { useCategories } from "../../hooks/category/useCategories.hook.ts";
import { Button } from "flowbite-react";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory.hook.ts";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../shared/ConfirmModal.tsx";
import { useTranslation } from "react-i18next";
import { SubcategoryList } from "../subcategory/SubcategoryList.tsx";

interface Props {
  projectId: number;
}

export function CategoryList({ projectId }: Props) {
  const { t } = useTranslation();
  const { categories } = useCategories(projectId);
  const { deleteCategory, isDeleteError } = useDeleteCategory();
  const [isDeleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  function handleDeleteClick(categoryId: number) {
    deleteCategory({ projectId, categoryId });
  }

  function handleModalConfirm(categoryId: number) {
    deleteCategory({ projectId, categoryId, force: true });
  }

  useEffect(() => {
    setDeleteConfirmModalOpen(isDeleteError);
  }, [isDeleteError]);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <div className="flex justify-between items-center mb-3">
            <p>{category.name}</p>
            <Button
              color="failure"
              onClick={() => handleDeleteClick(category.id)}
            >
              {t("general.delete")}
            </Button>
            <ConfirmModal
              content={t("category.modals.deleteConflict")}
              show={isDeleteConfirmModalOpen}
              onConfirm={() => handleModalConfirm(category.id)}
              onClose={() => setDeleteConfirmModalOpen(false)}
            />
          </div>
          <div className="ml-5">
            <SubcategoryList projectId={projectId} categoryId={category.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
