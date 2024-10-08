import { FieldValues, useForm } from "react-hook-form";
import { useAuthProject } from "../../hooks/project/useAuthProject.hook";
import { TextInput, Button } from "flowbite-react";
import FormGroup from "../form/FormGroup";

interface Props {
  projectId: number;
}

function AuthForm({ projectId }: Props) {
  const { register, handleSubmit } = useForm();
  const { authProject } = useAuthProject();

  function onSubmit(formValues: FieldValues) {
    const { passphrase } = formValues;

    authProject({ projectId, passphrase });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        Autoryzuj
      </Button>
    </form>
  );
}

export default AuthForm;
