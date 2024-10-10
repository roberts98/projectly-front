import { useMutation } from "@tanstack/react-query";
import { CategoryHttpService } from "../../http/category-http.service";
import { Category } from "../../models/category";
import { queryClient } from "../../query-client";

interface Data {
  projectId: number;
  name: string;
}

export function useCreateCategory() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ projectId, name }: Data) =>
      CategoryHttpService.createCategory(projectId, name),
    onSuccess: (id, { name, projectId }) =>
      queryClient.setQueryData(
        [`categories-${projectId}`],
        (oldData: Category[]): Category[] => [
          ...oldData,
          { id, name, projectId },
        ],
      ),
  });

  return { createCategory: mutate, isCreatingCategory: isPending };
}
