import { Project } from "../models/project";

export class ProjectHttpService {
  public static async fetchProjects(): Promise<Project[]> {
    const response = await fetch(
      "https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/projects"
    );
    const json = await response.json();
    return json.data;
  }

  public static async createProject(name: string): Promise<null> {
    const response = await fetch(
      "https://monthly-stormie-robertive-7c7712bb.koyeb.app/api/projects",
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const json = await response.json();
    return json.data;
  }
}
