import { Subcategory } from "../models/subcategory";
import { baseAxios } from "./base-axios.ts";

export class SubcategoryHttpService {
  public static async fetchSubcategories(
    categoryId: number,
    projectId: number,
  ): Promise<Subcategory[]> {
    return baseAxios
      .get(`/projects/${projectId}/categories/${categoryId}/subcategories`)
      .then((response) => response.data.data);
  }

  public static async createSubcategory(
    categoryId: number,
    name: string,
    projectId: number,
  ): Promise<number> {
    return baseAxios
      .post(`/projects/${projectId}/categories/${categoryId}/subcategories`, {
        name,
      })
      .then((response) => response.data.data);
  }

  public static async deleteSubcategory(
    subcategoryId: number,
    categoryId: number,
    projectId: number,
    force?: boolean,
  ): Promise<null> {
    return baseAxios
      .delete(
        `/projects/${projectId}/categories/${categoryId}/subcategories/${subcategoryId}`,
        {
          params: { force },
        },
      )
      .then((response) => response.data.data);
  }
}
