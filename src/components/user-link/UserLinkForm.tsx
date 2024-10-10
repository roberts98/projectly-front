import { FieldValues, useForm } from "react-hook-form";
import { useCreateUserLink } from "../../hooks/user-link/useCreateUserLink.hook";
import { useNavigate } from "react-router-dom";
import { FormGroup } from "../form/FormGroup";
import { Button, TextInput } from "flowbite-react";

export function UserLinkForm() {
  const { register, handleSubmit, reset } = useForm();
  const { createUserLink } = useCreateUserLink();
  const navigate = useNavigate();

  function onSubmit(formValues: FieldValues) {
    createUserLink(formValues.passphrase);
    reset();
    navigate("/user-links/list");
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
        Stwórz link dostępu
      </Button>
    </form>
  );
}
