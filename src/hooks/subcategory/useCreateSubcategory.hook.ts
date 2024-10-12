import { useMutation } from "@tanstack/react-query";
import { SubcategoryHttpService } from "../../http/subcategory-http.service";
import { Subcategory } from "../../models/subcategory";
import { queryClient } from "../../query-client";

interface Data {
  categoryId: number;
  name: string;
  projectId: number;
}

export function useCreateSubcategory() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ categoryId, name, projectId }: Data) =>
      SubcategoryHttpService.createSubcategory(categoryId, name, projectId),
    onSuccess: (id, { categoryId, name }) => {
      queryClient.setQueryData(
        [`subcategories-${categoryId}`],
        (oldData: Subcategory[]): Subcategory[] => [
          ...oldData,
          { id, categoryId, name },
        ],
      );
    },
  });

  return { createSubcategory: mutate, isCreatingSubcategory: isPending };
}
