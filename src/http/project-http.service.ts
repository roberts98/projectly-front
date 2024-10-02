import { NewProject, ProjectsDto } from "../models/project";
import { ProjectPassphrase } from "../store/project-auth-store";

export class ProjectHttpService {
  public static async fetchProjects(): Promise<ProjectsDto> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      credentials: "include",
    });
    const json = await response.json();
    return json.data;
  }

  public static async createProject(project: NewProject): Promise<number> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      body: JSON.stringify(project),
      credentials: "include",
    });
    const json = await response.json();
    return json.data;
  }

  public static async authProject(data: ProjectPassphrase): Promise<null> {
    const { projectId, passphrase } = data;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/auth`,
      {
        method: "POST",
        body: JSON.stringify({ passphrase }),
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }
    const json = await response.json();
    return json.data;
  }
}
