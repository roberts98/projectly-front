import { Subcategory } from "../models/subcategory";

export class SubcategoryHttpService {
  public static async fetchAllSubcategories(): Promise<Subcategory[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/subcategories`,
      { credentials: "include" }
    );
    const json = await response.json();
    return json.data;
  }

  public static async fetchSubcategories(
    categoryId: number
  ): Promise<Subcategory[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/categories/${categoryId}/subcategories`,
      { credentials: "include" }
    );
    const json = await response.json();
    return json.data;
  }

  public static async createSubcategory(
    categoryId: number,
    name: string
  ): Promise<number> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/categories/${categoryId}/subcategories`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
        credentials: "include",
      }
    );
    const json = await response.json();
    return json.data;
  }
}
