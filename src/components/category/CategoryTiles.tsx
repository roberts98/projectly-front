import { useCategories } from "../../hooks/category/useCategories.hook";
import { Expense } from "../../models/expense";
import { ExpenseForTypePieChart } from "../expense/ExpenseForTypePieChart";

interface Props {
  projectId: number;
  expenses: Expense[];
}

export function CategoryTiles({ projectId, expenses }: Props) {
  const { categories } = useCategories(projectId);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {categories.map((category) => {
        const categoryExpenses = expenses.filter(
          (expense) => expense.categoryId === category.id,
        );

        if (categoryExpenses.length === 0) return null;

        return (
          <div
            key={category.id}
            className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              {category.name}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <ExpenseForTypePieChart expenses={categoryExpenses} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
