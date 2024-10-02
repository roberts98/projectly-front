import { PieChart } from "@mui/x-charts";
import { Expense } from "../../models/expense";
import _ from "lodash";

interface Props {
  expenses: Expense[];
}

function ExpenseForTypePieChart({ expenses }: Props) {
  const groupedExpenses = _.groupBy(
    expenses,
    (expense) => expense.subcategoryId
  );
  const data = Object.keys(groupedExpenses).map((key) => {
    const grouped = groupedExpenses[key];
    const totalCost = _.sumBy(grouped, "cost");
    return {
      id: parseInt(key),
      value: totalCost,
      label: grouped[0].subcategory,
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

export default ExpenseForTypePieChart;
