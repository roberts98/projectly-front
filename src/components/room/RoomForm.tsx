import { FieldValues, useForm } from "react-hook-form";
import { useProjects } from "../../hooks/project/useProjects.hook";
import { useCreateRoom } from "../../hooks/room/useCreateRoom.hook";

function RoomForm() {
  const { projects } = useProjects();
  const { register, handleSubmit, reset } = useForm();
  const { createRoom } = useCreateRoom();

  function onSubmit(formValues: FieldValues) {
    const { name, projectId } = formValues;

    createRoom({ name, projectId });
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
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <button type="submit">Swtórz pokój</button>
    </form>
  );
}

export default RoomForm;
