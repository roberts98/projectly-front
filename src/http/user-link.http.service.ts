import { UserLink } from "../models/userLink";
import { baseAxios } from "./base-axios.ts";

export class UserLinkHttpService {
  public static async createUserLink(passphrase: string): Promise<UserLink> {
    return baseAxios
      .post("/user-links", { passphrase })
      .then((response) => response.data.data);
  }

  public static async fetchUserLinks(): Promise<UserLink | null> {
    return baseAxios
      .get("/user-links")
      .then((response) => response.data.data || null);
  }

  public static async verifyUserLink(hash: string): Promise<null> {
    return baseAxios
      .post("/user-links/verify", { hash })
      .then((response) => response.data.data);
  }

  public static async processUserLink(
    hash: string,
    passphrase: string,
  ): Promise<null> {
    return baseAxios
      .post("/user-links/process", { hash, passphrase })
      .then((response) => response.data.data);
  }
}
