import _ from "lodash";
import { Expense } from "../../models/expense";
import { Pie } from "react-chartjs-2";

interface Props {
  expenses: Expense[];
}

export function ExpenseForProjectPieChart({ expenses }: Props) {
  const groupedExpenses = _.groupBy(expenses, (expense) => expense.categoryId);

  const data = {
    labels: Object.keys(groupedExpenses).map(
      (key) => groupedExpenses[key][0].category,
    ),
    datasets: [
      {
        data: Object.keys(groupedExpenses).map((key) => {
          return groupedExpenses[key].reduce(
            (acc, current) => acc + current.cost,
            0,
          );
        }),
      },
    ],
  };

  return (
    <Pie height={250} data={data} options={{ maintainAspectRatio: false }} />
  );
}
