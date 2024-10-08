import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../../hooks/project/useCreateProject.hook";
import FormGroup from "../form/FormGroup";
import { Button, TextInput } from "flowbite-react";

function ProjectForm() {
  const { register, handleSubmit } = useForm();
  const { createProject } = useCreateProject();
  const navigate = useNavigate();

  function onSubmit(formValues: FieldValues) {
    const { name, passphrase } = formValues;

    createProject({ name, passphrase: passphrase || undefined });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup id="name" label="Nazwa projektu">
        <TextInput sizing="lg" id="name" {...register("name")} required />
      </FormGroup>
      <FormGroup id="passphrase" label="Hasło dostępu">
        <TextInput
          sizing="lg"
          id="passphrase"
          {...register("passphrase")}
          type="password"
          required
        />
      </FormGroup>
      <Button type="submit" size="xl" className="mt-10 mx-auto">
        Stwórz projekt
      </Button>
    </form>
  );
}

export default ProjectForm;
