import { PieChart } from "@mui/x-charts";
import { useCategories } from "../../hooks/category/useCategories.hook";
import { useExpenseForProjectPieChart } from "../../hooks/expense/useExpensePieChart.hook";

interface Props {
  projectId: number;
}

function ExpenseForProjectPieChart({ projectId }: Props) {
  const { data } = useExpenseForProjectPieChart(projectId);
  const { categories } = useCategories(projectId);

  const chartData = data.map(({ id, cost }, idx) => {
    const categoryName = categories.find(
      (category) => category.id === Number(id)
    )?.name;
    return {
      id: idx,
      value: cost,
      label: categoryName || "Ogólne",
    };
  });

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default ExpenseForProjectPieChart;
