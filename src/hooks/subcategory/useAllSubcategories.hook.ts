import { useQuery } from "@tanstack/react-query";
import { SubcategoryHttpService } from "../../http/subcategory-http.service";

export function useAllSubcategories() {
  const { data: subcategories = [], isLoading } = useQuery({
    queryKey: [`item-types`],
    queryFn: SubcategoryHttpService.fetchAllSubcategories,
    staleTime: Infinity,
  });

  return { subcategories, isLoading };
}
