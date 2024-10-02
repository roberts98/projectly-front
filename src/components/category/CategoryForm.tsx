import { FieldValues, useForm } from "react-hook-form";
import { useProjects } from "../../hooks/project/useProjects.hook";
import { useCreateCategory } from "../../hooks/category/useCreateCategoryhook";

function CategoryForm() {
  const {
    projects: { personal },
  } = useProjects();
  const { register, handleSubmit, reset } = useForm();
  const { createCategory } = useCreateCategory();

  function onSubmit(formValues: FieldValues) {
    const { name, projectId } = formValues;

    createCategory({ name, projectId });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        type="text"
        placeholder="Nazwa pokoju"
        required
      />
      <select {...register("projectId")} required>
        {personal.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <button type="submit">Swtórz pokój</button>
    </form>
  );
}

export default CategoryForm;
