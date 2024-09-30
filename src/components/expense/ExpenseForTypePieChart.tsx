import { PieChart } from "@mui/x-charts";
import { useExpenseForCategoryPieChart } from "../../hooks/expense/useExpensePieChart.hook";
import { useSubcategories } from "../../hooks/subcategory/useSubcategories.hook";
import { Category } from "../../models/category";

interface Props {
  projectId: number;
  category: Category;
}

function ExpenseForTypePieChart({ projectId, category }: Props) {
  const { data } = useExpenseForCategoryPieChart(projectId, category.id);
  const { subcategories } = useSubcategories(category.id);

  const chartData = data.map(({ id, cost }, idx) => {
    const subcategoryName = subcategories.find(
      (subcategory) => subcategory.id === id
    )?.name;
    return {
      id: idx,
      value: cost,
      label: subcategoryName || "Ogólne",
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

export default ExpenseForTypePieChart;
