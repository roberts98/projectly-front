import { useQuery } from "@tanstack/react-query";
import { ItemTypeHttpService } from "../../http/item-type-http.service";

export function useAllItemTypes() {
  const { data: itemTypes = [] } = useQuery({
    queryKey: [`item-types`],
    queryFn: ItemTypeHttpService.fetchAllItemTypes,
    staleTime: Infinity,
  });

  return { itemTypes };
}
