import { FieldValues, useForm } from "react-hook-form";
import { useAuthProject } from "../../hooks/project/useAuthProject.hook";

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
      <input
        {...register("passphrase")}
        type="password"
        placeholder="Hasło dostępu"
      />
      <button type="submit">Autoryzuj</button>
    </form>
  );
}

export default AuthForm;
