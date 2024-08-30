import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProjects } from "../hooks/project/useProjects.hook";

function ProjectsPage() {
  const { projects } = useProjects();

  useEffect(() => {
    document.title = "Projekty";
  }, [document]);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
