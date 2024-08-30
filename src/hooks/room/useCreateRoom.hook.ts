import { useMutation } from "@tanstack/react-query";
import { RoomHttpService } from "../../http/room-http.service";
import { queryClient } from "../../App";
import { Room } from "../../models/room";

interface Data {
  projectId: number;
  name: string;
}

export function useCreateRoom() {
  const { mutate } = useMutation({
    mutationFn: ({ projectId, name }: Data) =>
      RoomHttpService.createRoom(projectId, name),
    onSuccess: (id, { name, projectId }) =>
      queryClient.setQueryData(["rooms"], (oldData: Room[]): Room[] => [
        ...oldData,
        { id, name, projectId },
      ]),
  });

  return { createRoom: mutate };
}
