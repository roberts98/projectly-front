import { FieldValues, useForm } from "react-hook-form";
import { useCreateCategory } from "../../hooks/category/useCreateCategory.hook.ts";
import { FormGroup } from "../form/FormGroup.tsx";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface Props {
  projectId: number;
}

export function CategoryForm({ projectId }: Props) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const { createCategory, isCreatingCategory } = useCreateCategory();

  function onSubmit(formValues: FieldValues) {
    const { name } = formValues;

    createCategory({ name, projectId });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup id="passphrase" label={t("category.fields.name")}>
        <TextInput sizing="lg" id="name" {...register("name")} required />
      </FormGroup>
      <Button className="ml-auto min-w-35" type="submit">
        {isCreatingCategory ? (
          <Spinner size="sm" />
        ) : (
          t("category.buttons.create")
        )}
      </Button>
    </form>
  );
}
