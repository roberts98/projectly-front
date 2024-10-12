import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../query-client";
import { Expense } from "../../models/expense.ts";
import { SubcategoryHttpService } from "../../http/subcategory-http.service.ts";
import { Subcategory } from "../../models/subcategory.ts";

interface Data {
  subcategoryId: number;
  projectId: number;
  categoryId: number;
  force?: boolean;
}

export function useDeleteSubcategory() {
  const { mutate, isError } = useMutation({
    mutationFn: ({ subcategoryId, projectId, categoryId, force }: Data) =>
      SubcategoryHttpService.deleteSubcategory(
        subcategoryId,
        categoryId,
        projectId,
        force,
      ),
    onSuccess: (_, { subcategoryId, projectId, categoryId }) => {
      queryClient.setQueryData(
        [`subcategories-${categoryId}`],
        (oldData: Subcategory[]): Subcategory[] =>
          oldData.filter((subcategory) => subcategory.id !== subcategoryId),
      );
      queryClient.setQueryData(
        [`expenses-${projectId}`],
        (oldData: Expense[]) =>
          oldData.filter((expense) => expense.subcategoryId !== subcategoryId),
      );
    },
  });

  return { deleteSubcategory: mutate, isDeleteError: isError };
}
