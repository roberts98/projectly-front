import { useMutation } from "@tanstack/react-query";
import { CategoryHttpService } from "../../http/category-http.service";
import { queryClient } from "../../App";
import { Category } from "../../models/category";

interface Data {
  projectId: number;
  name: string;
}

export function useCreateCategory() {
  const { mutate } = useMutation({
    mutationFn: ({ projectId, name }: Data) =>
      CategoryHttpService.createCategory(projectId, name),
    onSuccess: (id, { name, projectId }) =>
      queryClient.setQueryData(
        ["categories"],
        (oldData: Category[]): Category[] => [
          ...oldData,
          { id, name, projectId },
        ]
      ),
  });

  return { createCategory: mutate };
}
