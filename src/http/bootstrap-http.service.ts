export class BootstrapHttpService {
  public static async bootstrap() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bootstrap`, {
      method: "POST",
      body: null,
    });
    const json = await response.json();
    return json.data;
  }
}
