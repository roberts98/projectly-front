import { NewProject, ProjectsDto, ProjectUpdate } from "../models/project";
import { ProjectPassphrase } from "../store/project-auth.store";
import { baseAxios } from "./base-axios.ts";

export class ProjectHttpService {
  public static async fetchProjects(): Promise<ProjectsDto> {
    return baseAxios.get("/projects").then((response) => response.data.data);
  }

  public static async createProject(project: NewProject): Promise<number> {
    return baseAxios
      .post("/projects", { ...project, isPersonal: true })
      .then((response) => response.data.data);
  }

  public static async updateProject(
    projectId: number,
    data: ProjectUpdate,
  ): Promise<null> {
    return baseAxios
      .patch(`/projects/${projectId}`, data)
      .then((response) => response.data.data);
  }

  public static async deleteProject(projectId: number): Promise<null> {
    return baseAxios
      .delete(`/projects/${projectId}`)
      .then((response) => response.data.data);
  }

  public static async authProject(data: ProjectPassphrase): Promise<null> {
    const { projectId, passphrase } = data;
    return baseAxios
      .post(`/projects/${projectId}/auth`, { passphrase })
      .then((response) => response.data.data);
  }
}
