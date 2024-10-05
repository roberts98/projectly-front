import { UserLink } from "../models/userLink";

export class UserLinkHttpService {
  public static async createUserLink(passphrase: string): Promise<UserLink> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user-links`, {
      method: "POST",
      body: JSON.stringify({ passphrase }),
      credentials: "include",
    });
    const json = await response.json();
    return json.data;
  }

  public static async fetchUserLinks(): Promise<UserLink | undefined> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user-links`, {
      credentials: "include",
    });
    const json = await response.json();
    return json.data;
  }

  public static async verifyUserLink(hash: string): Promise<null> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user-links/verify`,
      {
        method: "POST",
        body: JSON.stringify({ hash }),
        credentials: "include",
      }
    );
    const json = await response.json();
    return json.data;
  }

  public static async processUserLink(
    hash: string,
    passphrase: string
  ): Promise<null> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user-links/process`,
      {
        method: "POST",
        body: JSON.stringify({ hash, passphrase }),
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Error");
    }
    const json = await response.json();
    return json.data;
  }
}
