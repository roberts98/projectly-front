import { FieldValues, useForm } from "react-hook-form";
import { useCreateProject } from "../../hooks/project/useCreateProject.hook";

function ProjectForm() {
  const { register, handleSubmit } = useForm();
  const { createProject } = useCreateProject();

  function onSubmit(formValues: FieldValues) {
    const { name, passphrase } = formValues;

    createProject({ name, passphrase: passphrase || undefined });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        type="text"
        placeholder="Nazwa projektu"
        required
      />
      <input
        {...register("passphrase")}
        type="password"
        placeholder="Hasło dostępu"
      />
      <button type="submit">Stwórz projekt</button>
    </form>
  );
}

export default ProjectForm;
