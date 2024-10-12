import { FieldValues, useForm } from "react-hook-form";
import { FormGroup } from "../form/FormGroup.tsx";
import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useCreateSubcategory } from "../../hooks/subcategory/useCreateSubcategory.hook.ts";
import { useCategories } from "../../hooks/category/useCategories.hook.ts";

interface Props {
  projectId: number;
}

export function SubcategoryForm({ projectId }: Props) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const { categories } = useCategories(projectId);
  const { createSubcategory, isCreatingSubcategory } = useCreateSubcategory();

  function onSubmit(formValues: FieldValues) {
    const { name, categoryId } = formValues;

    createSubcategory({ categoryId, projectId, name });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup id="passphrase" label={t("subcategory.fields.name")}>
        <TextInput sizing="lg" id="name" {...register("name")} required />
      </FormGroup>
      <FormGroup id="category" label={t("expense.fields.category")}>
        <Select
          sizing="lg"
          id="category"
          {...register("categoryId", { setValueAs: Number })}
          defaultValue=""
          required
        >
          <option value="" disabled>
            {t("expense.placeholders.category")}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <Button className="ml-auto min-w-35" type="submit">
        {isCreatingSubcategory ? (
          <Spinner size="sm" />
        ) : (
          t("subcategory.buttons.create")
        )}
      </Button>
    </form>
  );
}
