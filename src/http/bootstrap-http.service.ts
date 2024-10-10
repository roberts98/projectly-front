import { baseAxios } from "./base-axios.ts";

export class BootstrapHttpService {
  public static async bootstrap(): Promise<BootstrapResponse> {
    return baseAxios.post("/bootstrap").then((response) => response.data.data);
  }
}

interface BootstrapResponse {
  userId: number;
}
