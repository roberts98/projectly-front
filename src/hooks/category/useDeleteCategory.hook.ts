import { useMutation } from "@tanstack/react-query";
import { CategoryHttpService } from "../../http/category-http.service";
import { Category } from "../../models/category";
import { queryClient } from "../../query-client";
import { Expense } from "../../models/expense.ts";

interface Data {
  projectId: number;
  categoryId: number;
  force?: boolean;
}

export function useDeleteCategory() {
  const { mutate, isError } = useMutation({
    mutationFn: ({ projectId, categoryId, force }: Data) =>
      CategoryHttpService.deleteCategory(projectId, categoryId, force),
    onSuccess: (_, { projectId, categoryId }) => {
      queryClient.setQueryData(
        [`categories-${projectId}`],
        (oldData: Category[]): Category[] =>
          oldData.filter((category) => category.id !== categoryId),
      );
      queryClient.setQueryData(
        [`expenses-${projectId}`],
        (oldData: Expense[]) =>
          oldData.filter((expense) => expense.categoryId !== categoryId),
      );
    },
  });

  return { deleteCategory: mutate, isDeleteError: isError };
}
