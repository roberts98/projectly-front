import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useCategories } from "../../hooks/category/useCategories.hook";
import { useCreateExpense } from "../../hooks/expense/useCreateExpense.hook";
import { useSubcategories } from "../../hooks/subcategory/useSubcategories.hook";
import { NewExpense } from "../../models/expense";

interface Props {
  projectId: number;
  passphrase?: string;
}

function ExpenseForm({ projectId, passphrase }: Props) {
  const { categories } = useCategories(projectId);
  const { control, register, handleSubmit, reset, watch } = useForm();
  const { createExpense } = useCreateExpense();
  const selectedcategoryId: number | undefined = watch("categoryId");
  const { subcategories } = useSubcategories(projectId, selectedcategoryId);

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
      <Controller
        control={control}
        name="buyDate"
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            label="Data kupna"
            value={field.value}
            inputRef={field.ref}
            onChange={field.onChange}
          />
        )}
      />
      <TextField
        variant="outlined"
        label="Nazwa przedmiotu"
        required
        inputProps={register("itemName")}
        sx={{ mr: 1 }}
      />
      <FormControl variant="outlined" sx={{ minWidth: 120, mr: 1 }}>
        <InputLabel id="category-label">Pokój *</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          label="Pokój"
          inputProps={register("categoryId")}
          defaultValue={""}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 200, mr: 1 }}>
        <InputLabel id="item-type-label">Typ przedmiotu *</InputLabel>
        <Select
          labelId="item-type-label"
          id="item type"
          label="Typ przedmiotu"
          inputProps={register("subcategoryId")}
          defaultValue={""}
          required
          disabled={!selectedcategoryId}
        >
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        label="Kwota w PLN"
        required
        inputProps={register("cost")}
        sx={{ mr: 1 }}
      />
      <TextField
        variant="outlined"
        label="Kwota dostawy w PLN"
        inputProps={register("deliveryCost")}
        sx={{ mr: 1 }}
      />
      <Button variant="outlined" type="submit" size="large">
        Dodaj
      </Button>
    </form>
  );
}

export default ExpenseForm;
