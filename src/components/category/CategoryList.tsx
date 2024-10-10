import { useCategories } from "../../hooks/category/useCategories.hook.ts";
import { Button } from "flowbite-react";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory.hook.ts";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../shared/ConfirmModal.tsx";

interface Props {
  projectId: number;
}

export function CategoryList({ projectId }: Props) {
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
        <div
          className="flex justify-between items-center mb-5"
          key={category.id}
        >
          <p>{category.name}</p>
          <Button
            color="failure"
            onClick={() => handleDeleteClick(category.id)}
          >
            Usuń
          </Button>
          <ConfirmModal
            content="Istnieją wydatki dla wybranej kategorii, czy na pewno chcesz ją usunąc? Jeżeli ją usuniesz, wszystkie wydatki z nią powiązane zostaną również usunięte."
            show={isDeleteConfirmModalOpen}
            onConfirm={() => handleModalConfirm(category.id)}
            onClose={() => setDeleteConfirmModalOpen(false)}
          />
        </div>
      ))}
    </div>
  );
}
