import { Pie } from "react-chartjs-2";
import { Expense } from "../../models/expense";
import _ from "lodash";

interface Props {
  expenses: Expense[];
}

export function ExpenseForTypePieChart({ expenses }: Props) {
  const groupedExpenses = _.groupBy(
    expenses,
    (expense) => expense.subcategoryId,
  );

  const data = {
    labels: Object.keys(groupedExpenses).map(
      (key) => groupedExpenses[key][0].subcategory,
    ),
    datasets: [
      {
        data: Object.keys(groupedExpenses).map((key) =>
          _.sumBy(groupedExpenses[key], "cost"),
        ),
      },
    ],
  };

  return (
    <div className="w-full">
      <Pie height={250} options={{ maintainAspectRatio: false }} data={data} />
    </div>
  );
}
