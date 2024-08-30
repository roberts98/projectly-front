import { Room } from "../models/room";

export class RoomHttpService {
  public static async fetchRooms(projectId: number): Promise<Room[]> {
    const response = await fetch(
      `https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/projects/${projectId}/rooms`
    );
    const json = await response.json();
    return json.data;
  }

  public static async createRoom(
    projectId: number,
    name: string
  ): Promise<number> {
    const response = await fetch(
      `https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/projects/${projectId}/rooms`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const json = await response.json();
    return json.data;
  }
}
