export class BootstrapHttpService {
  public static async bootstrap(): Promise<BootstrapResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bootstrap`, {
      method: "POST",
      body: null,
      credentials: "include",
    });
    const json = await response.json();
    return json.data;
  }
}

interface BootstrapResponse {
  userId: number;
}
