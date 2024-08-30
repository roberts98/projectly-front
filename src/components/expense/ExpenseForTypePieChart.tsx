import { PieChart } from "@mui/x-charts";
import { Room } from "../../models/room";
import { useExpenseForRoomPieChart } from "../../hooks/expense/useExpensePieChart.hook";
import { useItemTypes } from "../../hooks/itemType/useItemTypes.hook";

interface Props {
  projectId: number;
  room: Room;
}

function ExpenseForTypePieChart({ projectId, room }: Props) {
  const { data } = useExpenseForRoomPieChart(projectId, room.id);
  const { itemTypes } = useItemTypes(room.id);

  const chartData = data.map((row, idx) => {
    const [itemTypeId, totalCost] = row;
    const itemTypeName = itemTypes.find(
      (itemType) => itemType.id === itemTypeId
    )?.name;
    return {
      id: idx,
      value: totalCost,
      label: itemTypeName || "Ogólne",
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
