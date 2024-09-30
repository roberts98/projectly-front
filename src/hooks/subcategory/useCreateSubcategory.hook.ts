import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { SubcategoryHttpService } from "../../http/subcategory-http.service";
import { Subcategory } from "../../models/subcategory";

interface Data {
  categoryId: number;
  name: string;
}

export function useCreateSubcategory() {
  const { mutate } = useMutation({
    mutationFn: ({ categoryId, name }: Data) =>
      SubcategoryHttpService.createSubcategory(categoryId, name),
    onSuccess: (id, { categoryId, name }) => {
      queryClient.setQueryData(
        [`item-types${categoryId}`],
        (oldData: Subcategory[]): Subcategory[] => [
          ...oldData,
          { id, categoryId, name },
        ]
      );
    },
  });

  return { createSubcategory: mutate };
}
