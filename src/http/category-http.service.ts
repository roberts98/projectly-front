import { Category } from "../models/category";

export class CategoryHttpService {
  public static async fetchCategories(projectId: number): Promise<Category[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/categories`,
      { credentials: "include" }
    );
    const json = await response.json();
    return json.data;
  }

  public static async createCategory(
    projectId: number,
    name: string
  ): Promise<number> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/categories`,
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
