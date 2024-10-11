import dayjs from "dayjs";
import { Expense } from "../../models/expense";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";

interface Props {
  expenses: Expense[];
}

export function ExpenseForBuyDateBarChart({ expenses }: Props) {
  const { t } = useTranslation();
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
  const months = Array.from(new Set(chartData.map((data) => data.month)));

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <BarChart
        xAxis={[{ label: t("general.month"), data: months, scaleType: "band" }]}
        yAxis={[{ label: t("general.total") }]}
        series={categories.map((category) => ({
          label: category,
          data: months.map((month) => {
            const entry = chartData.find(
              (data) => data.month === month && data.category === category,
            );
            return entry ? entry.totalCost : 0;
          }),
        }))}
      />
    </Box>
  );
}
