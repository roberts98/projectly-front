import { useCategories } from "../../hooks/category/useCategories.hook";
import { Expense } from "../../models/expense";
import { ExpenseForTypePieChart } from "../expense/ExpenseForTypePieChart";

interface Props {
  projectId: number;
  expenses: Expense[];
}

export function CategoryChartTiles({ projectId, expenses }: Props) {
  const { categories } = useCategories(projectId);
  return categories.map((category) => {
    const categoryExpenses = expenses.filter(
      (expense) => expense.categoryId === category.id,
    );

    if (categoryExpenses.length === 0) return null;

    return (
      <div
        key={category.id}
        className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"
      >
        <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {category.name}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <ExpenseForTypePieChart expenses={categoryExpenses} />
        </div>
      </div>
    );
  });
}
