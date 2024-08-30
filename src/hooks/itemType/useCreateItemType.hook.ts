import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ItemTypeHttpService } from "../../http/item-type-http.service";
import { ItemType } from "../../models/item-type";

interface Data {
  roomId: number;
  name: string;
}

export function useCreateItemType() {
  const { mutate } = useMutation({
    mutationFn: ({ roomId, name }: Data) =>
      ItemTypeHttpService.createItemType(roomId, name),
    onSuccess: (id, { roomId, name }) => {
      queryClient.setQueryData(
        [`item-types${roomId}`],
        (oldData: ItemType[]): ItemType[] => [...oldData, { id, roomId, name }]
      );
    },
  });

  return { createItemType: mutate };
}
