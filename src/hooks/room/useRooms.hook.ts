import { useQuery } from "@tanstack/react-query";
import { RoomHttpService } from "../../http/room-http.service";

export function useRooms(projectId: number) {
  const { data: rooms = [] } = useQuery({
    queryKey: [`rooms-${projectId}`],
    queryFn: () => RoomHttpService.fetchRooms(projectId),
    staleTime: Infinity,
  });

  return { rooms };
}
