import { baseAxios } from "./base-axios.ts";
import { User } from "../models/user.ts";

export class UserHttpService {
  public static async getUser(): Promise<User> {
    return baseAxios.get("/users").then((response) => response.data.data);
  }

  public static async updateUser(email?: string): Promise<null> {
    return baseAxios
      .patch("/users", { email })
      .then((response) => response.data.data);
  }
}
