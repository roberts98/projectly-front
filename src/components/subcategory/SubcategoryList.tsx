import { useSubcategories } from "../../hooks/subcategory/useSubcategories.hook.ts";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useDeleteSubcategory } from "../../hooks/subcategory/useDeleteSubcategory.hook.ts";
import { ConfirmModal } from "../shared/ConfirmModal.tsx";
import { useEffect, useState } from "react";

interface Props {
  projectId: number;
  categoryId: number;
}

export function SubcategoryList({ projectId, categoryId }: Props) {
  const { t } = useTranslation();
  const { subcategories } = useSubcategories(projectId, categoryId);
  const { deleteSubcategory, isDeleteError } = useDeleteSubcategory();
  const [isDeleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  function handleDeleteClick(subcategoryId: number) {
    deleteSubcategory({ subcategoryId, projectId, categoryId });
  }

  function handleModalConfirm(subcategoryId: number) {
    deleteSubcategory({ subcategoryId, projectId, categoryId, force: true });
  }

  useEffect(() => {
    setDeleteConfirmModalOpen(isDeleteError);
  }, [isDeleteError]);

  return subcategories.map((subcategory) => (
    <div
      className="mb-3 flex justify-between items-center"
      key={subcategory.id}
    >
      <p>{subcategory.name}</p>
      <Button
        size="xs"
        color="failure"
        onClick={() => handleDeleteClick(subcategory.id)}
      >
        {t("general.delete")}
      </Button>
      <ConfirmModal
        content={t("subcategory.modals.deleteConflict")}
        show={isDeleteConfirmModalOpen}
        onConfirm={() => handleModalConfirm(subcategory.id)}
        onClose={() => setDeleteConfirmModalOpen(false)}
      />
    </div>
  ));
}
