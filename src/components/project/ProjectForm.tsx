import { Button, TextInput } from "flowbite-react";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateProject } from "../../hooks/project/useCreateProject.hook";
import FormGroup from "../form/FormGroup";

function ProjectForm() {
  const { register, handleSubmit } = useForm();
  const { createProject } = useCreateProject();

  function onSubmit(formValues: FieldValues) {
    const { name, passphrase } = formValues;

    createProject({ name, passphrase: passphrase || undefined });
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
        />
      </FormGroup>
      <Button type="submit" size="xl" className="mt-10 mx-auto">
        Stwórz projekt
      </Button>
    </form>
  );
}

export default ProjectForm;
