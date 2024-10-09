import dayjs from "dayjs";
import { Button, Datepicker, Select, Spinner, TextInput } from "flowbite-react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useCategories } from "../../hooks/category/useCategories.hook";
import { useCreateExpense } from "../../hooks/expense/useCreateExpense.hook";
import { useSubcategories } from "../../hooks/subcategory/useSubcategories.hook";
import { NewExpense } from "../../models/expense";
import FormGroup from "../form/FormGroup";

interface Props {
  projectId: number;
  passphrase?: string;
}

function ExpenseForm({ projectId, passphrase }: Props) {
  const { categories } = useCategories(projectId);
  const { control, register, handleSubmit, reset, watch } = useForm();
  const { createExpense, isCreatingExpense } = useCreateExpense();
  const selectedCategoryId: number | undefined = watch("categoryId");
  const { subcategories } = useSubcategories(projectId, selectedCategoryId);

  function onSubmit(formValues: FieldValues) {
    const { categoryId, subcategoryId, itemName, cost, deliveryCost, buyDate } =
      formValues;
    const expense: NewExpense = {
      categoryId: categoryId,
      category: categories.find((category) => category.id == categoryId)!.name,
      itemName,
      subcategoryId: subcategoryId,
      subcategory: subcategories.find(
        (subcategory) => subcategory.id === subcategoryId
      )!.name,
      cost: Number(cost),
      deliveryCost: Number(deliveryCost) || undefined,
      buyDate: dayjs(buyDate).format("YYYY-MM-DD"),
      passphrase,
    };
    createExpense({ expense, projectId });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup id="buyDate" label="Data kupna">
        <Controller
          control={control}
          name="buyDate"
          render={({ field }) => <Datepicker onChange={field.onChange} />}
        />
      </FormGroup>
      <FormGroup id="itemName" label="Nazwa przedmiotu">
        <TextInput id="itemName" {...register("itemName")} required />
      </FormGroup>
      <FormGroup id="category" label="Kategoria">
        <Select
          id="category"
          {...register("categoryId", { setValueAs: Number })}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup id="subcategory" label="Podkategoria">
        <Select
          id="subcategory"
          {...register("subcategoryId", { setValueAs: Number })}
          disabled={!selectedCategoryId}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Wybierz podkategorię
          </option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup id="cost" label="Kwota w PLN">
        <TextInput type="number" id="cost" {...register("cost")} required />
      </FormGroup>
      <FormGroup id="deliveryCost" label="Kwota dostawy w PLN">
        <TextInput
          type="number"
          id="deliveryCost"
          {...register("deliveryCost")}
        />
      </FormGroup>
      <div className="ml-auto flex justify-end">
        {isCreatingExpense ? <Spinner /> : <Button type="submit">Dodaj</Button>}
      </div>
    </form>
  );
}

export default ExpenseForm;
