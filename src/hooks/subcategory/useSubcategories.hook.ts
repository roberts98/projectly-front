import { useQuery } from "@tanstack/react-query";
import { SubcategoryHttpService } from "../../http/subcategory-http.service";

export function useSubcategories(projectId: number, categoryId?: number) {
  const { data: subcategories = [] } = useQuery({
    queryKey: [`subcategories-${categoryId}`],
    queryFn: () =>
      SubcategoryHttpService.fetchSubcategories(categoryId!, projectId),
    enabled: !!categoryId,
    staleTime: Infinity,
  });

  return { subcategories };
}
