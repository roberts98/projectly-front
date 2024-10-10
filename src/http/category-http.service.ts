import { Category } from "../models/category";
import { baseAxios } from "./base-axios.ts";

export class CategoryHttpService {
  public static async fetchCategories(projectId: number): Promise<Category[]> {
    return baseAxios
      .get(`/projects/${projectId}/categories`)
      .then((response) => response.data.data);
  }

  public static async createCategory(
    projectId: number,
    name: string,
  ): Promise<number> {
    return baseAxios
      .post(`/projects/${projectId}/categories`, { name })
      .then((response) => response.data.data);
  }

  public static async deleteCategory(
    projectId: number,
    categoryId: number,
    force?: boolean,
  ): Promise<null> {
    let url = `/projects/${projectId}/categories/${categoryId}`;
    if (force) {
      url = url + "?force=true";
    }
    return baseAxios.delete(url).then((response) => response.data.data);
  }
}
