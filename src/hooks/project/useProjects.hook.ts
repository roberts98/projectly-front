import { useQuery } from "@tanstack/react-query";
import { ProjectHttpService } from "../../http/project-http.service";

export function useProjects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: ProjectHttpService.fetchProjects,
    staleTime: Infinity,
  });

  return { projects, isLoading };
}
