import { Subcategory } from "../models/subcategory";

export class SubcategoryHttpService {
  public static async fetchSubcategories(
    categoryId: number,
    projectId: number
  ): Promise<Subcategory[]> {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects/${projectId}/categories/${categoryId}/subcategories`,
      { credentials: "include" }
    );
    const json = await response.json();
    return json.data;
  }

  public static async createSubcategory(
    categoryId: number,
    name: string,
    projectId: number
  ): Promise<number> {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects/${projectId}/categories/${categoryId}/subcategories`,
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
