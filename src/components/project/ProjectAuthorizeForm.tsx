import { FieldValues, useForm } from "react-hook-form";
import { useAuthProject } from "../../hooks/project/useAuthProject.hook";
import { TextInput, Button, Spinner } from "flowbite-react";
import { FormGroup } from "../form/FormGroup";
import { useTranslation } from "react-i18next";

interface Props {
  projectId: number;
}

export function ProjectAuthorizeForm({ projectId }: Props) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const { authProject, isAuthorizingProject } = useAuthProject();

  function onSubmit(formValues: FieldValues) {
    const { passphrase } = formValues;

    authProject({ projectId, passphrase });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup id="passphrase" label={t("project.fields.passphrase")}>
        <TextInput
          sizing="lg"
          id="passphrase"
          {...register("passphrase")}
          type="password"
          required
        />
      </FormGroup>
      <div className="mt-10 flex justify-center">
        {isAuthorizingProject ? (
          <Spinner />
        ) : (
          <Button type="submit" size="xl">
            {t("project.buttons.authorize")}
          </Button>
        )}
      </div>
    </form>
  );
}
