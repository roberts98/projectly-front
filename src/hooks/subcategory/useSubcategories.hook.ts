import { useQuery } from "@tanstack/react-query";
import { SubcategoryHttpService } from "../../http/subcategory-http.service";

export function useSubcategories(categoryId?: number) {
  const { data: subcategories = [] } = useQuery({
    queryKey: [`item-types-${categoryId}`],
    queryFn: () => SubcategoryHttpService.fetchSubcategories(categoryId!),
    enabled: !!categoryId,
    staleTime: Infinity,
  });

  return { subcategories };
}
