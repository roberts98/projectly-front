import { useQuery } from "@tanstack/react-query";
import { ItemTypeHttpService } from "../../http/item-type-http.service";

export function useItemTypes(roomId?: number) {
  const { data: itemTypes = [] } = useQuery({
    queryKey: [`item-types-${roomId}`],
    queryFn: () => ItemTypeHttpService.fetchItemTypes(roomId!),
    enabled: !!roomId,
    staleTime: Infinity,
  });

  return { itemTypes };
}
