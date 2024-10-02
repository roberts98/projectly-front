import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProjects } from "../hooks/project/useProjects.hook";
import PageLoader from "../components/shared/PageLoader";

function ProjectsPage() {
  const {
    projects: { personal, shared },
    isLoading,
  } = useProjects();

  useEffect(() => {
    document.title = "Projekty";
  }, [document]);

  return (
    <PageLoader active={isLoading}>
      <h2>Twoje projekty</h2>
      {personal.map((project) => (
        <div key={project.id}>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </div>
      ))}
      <h2>Publiczne projekty</h2>
      {shared.map((project) => (
        <div key={project.id}>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </div>
      ))}
    </PageLoader>
  );
}

export default ProjectsPage;
