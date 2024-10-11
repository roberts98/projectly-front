import dayjs from "dayjs";
import { Expense } from "../../models/expense";
import { Bar } from "react-chartjs-2";
import { colors } from "../../chart-config.ts";

interface Props {
  expenses: Expense[];
}

export function ExpenseForBuyDateBarChart({ expenses }: Props) {
  const dataByMonthAndCategory = expenses.reduce(
    (acc: Record<string, Record<string, number>>, expense) => {
      const month = dayjs(expense.buyDate).format("YYYY-MM");
      const { category, cost, deliveryCost } = expense;
      const totalCost = cost + (deliveryCost || 0);

      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][category]) {
        acc[month][category] = 0;
      }

      acc[month][category] += totalCost;

      return acc;
    },
    {},
  );

  const chartData = Object.entries(dataByMonthAndCategory).flatMap(
    ([month, categories]) =>
      Object.entries(categories).map(([category, totalCost]) => ({
        month,
        category,
        totalCost,
      })),
  );

  const categories = Array.from(
    new Set(chartData.map((data) => data.category)),
  );

  const months = Array.from(new Set(chartData.map((data) => data.month))).sort(
    (a, b) => dayjs(a).diff(dayjs(b)),
  );

  const datasets = categories.map((category, index) => ({
    label: category,
    data: months.map((month) => {
      const entry = chartData.find(
        (data) => data.month === month && data.category === category,
      );
      return entry ? entry.totalCost : 0;
    }),
    backgroundColor: colors[index],
  }));

  const data = {
    labels: months,
    datasets,
  };

  return <Bar height="100%" data={data} />;
}
