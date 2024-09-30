import { useQuery } from "@tanstack/react-query";
import { CategoryHttpService } from "../../http/category-http.service";

export function useCategories(projectId: number) {
  const { data: categories = [] } = useQuery({
    queryKey: [`categories-${projectId}`],
    queryFn: () => CategoryHttpService.fetchCategories(projectId),
    staleTime: Infinity,
  });

  return { categories };
}
