import { PieChart } from "@mui/x-charts";
import _ from "lodash";
import { Expense } from "../../models/expense";

interface Props {
  expenses: Expense[];
}

function ExpenseForProjectPieChart({ expenses }: Props) {
  const groupedExpenses = _.groupBy(expenses, (expense) => expense.categoryId);
  const data = Object.keys(groupedExpenses).map((key) => {
    const grouped = groupedExpenses[key];
    const totalCost = grouped.reduce((acc, current) => acc + current.cost, 0);
    return {
      id: parseInt(key),
      value: totalCost,
      label: grouped[0].category,
    };
  });

  return (
    <PieChart
      series={[
        {
          data,
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default ExpenseForProjectPieChart;
