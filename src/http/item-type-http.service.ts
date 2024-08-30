import { ItemType } from "../models/item-type";

export class ItemTypeHttpService {
  public static async fetchAllItemTypes(): Promise<ItemType[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/item-types`);
    const json = await response.json();
    return json.data;
  }

  public static async fetchItemTypes(roomId: number): Promise<ItemType[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rooms/${roomId}/item-types`
    );
    const json = await response.json();
    return json.data;
  }

  public static async createItemType(
    roomId: number,
    name: string
  ): Promise<number> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rooms/${roomId}/item-types`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const json = await response.json();
    return json.data;
  }
}
