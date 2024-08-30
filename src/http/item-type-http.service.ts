import { ItemType } from "../models/item-type";

export class ItemTypeHttpService {
  public static async fetchAllItemTypes(): Promise<ItemType[]> {
    const response = await fetch(
      `https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/item-types`
    );
    const json = await response.json();
    return json.data;
  }

  public static async fetchItemTypes(roomId: number): Promise<ItemType[]> {
    const response = await fetch(
      `https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/rooms/${roomId}/item-types`
    );
    const json = await response.json();
    return json.data;
  }

  public static async createItemType(
    roomId: number,
    name: string
  ): Promise<number> {
    const response = await fetch(
      `https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/rooms/${roomId}/item-types`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const json = await response.json();
    return json.data;
  }
}
