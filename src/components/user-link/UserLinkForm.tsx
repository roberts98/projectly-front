import { FieldValues, useForm } from "react-hook-form";
import { useCreateUserLink } from "../../hooks/user-link/useCreateUserLink.hook";
import { useNavigate } from "react-router-dom";

function UserLinkForm() {
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
      <input
        {...register("passphrase")}
        type="password"
        placeholder="Hasło dostępu"
        required
      />
      <button type="submit">Stwórz link dostępu</button>
    </form>
  );
}

export default UserLinkForm;
