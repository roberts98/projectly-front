import { FieldValues, useForm } from "react-hook-form";
import { FormGroup } from "../form/FormGroup.tsx";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useUpdateUser } from "../../hooks/user/useUpdateUser.ts";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user/useUser.hook.ts";
import { useEffect } from "react";

export function UserEmailForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm();
  const { updateUser, isUpdatingUser } = useUpdateUser();
  const { user } = useUser();

  function onSubmit(formValues: FieldValues) {
    const { email } = formValues;
    updateUser({ email });
  }

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup id="passphrase" label={t("forms.fields.email")}>
        <TextInput sizing="lg" id="email" {...register("email")} required />
      </FormGroup>
      <div className="ml-auto flex justify-end">
        <Button className="min-w-45" type="submit" size="xl">
          {isUpdatingUser ? (
            <Spinner size="sm"></Spinner>
          ) : (
            t("forms.buttons.submit")
          )}
        </Button>
      </div>
    </form>
  );
}
