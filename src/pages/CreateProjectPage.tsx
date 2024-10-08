import ProjectForm from "../components/project/ProjectForm";

function CreateProjectPage() {
  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">Stwórz nowy projekt</h1>
      <ProjectForm />
    </div>
  );
}

export default CreateProjectPage;
