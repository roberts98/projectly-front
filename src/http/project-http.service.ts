import { Project } from "../models/project";

export class ProjectHttpService {
  public static async fetchProjects(): Promise<Project[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      credentials: "include",
    });
    const json = await response.json();
    return json.data;
  }

  public static async createProject(name: string): Promise<null> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const json = await response.json();
    return json.data;
  }
}
