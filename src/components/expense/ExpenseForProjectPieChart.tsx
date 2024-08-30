import { PieChart } from "@mui/x-charts";
import { useRooms } from "../../hooks/room/useRooms.hook";
import { useExpenseForProjectPieChart } from "../../hooks/expense/useExpensePieChart.hook";

interface Props {
  projectId: number;
}

function ExpenseForProjectPieChart({ projectId }: Props) {
  const { data } = useExpenseForProjectPieChart(projectId);
  const { rooms } = useRooms(projectId);

  const chartData = data.map((row, idx) => {
    const [roomId, roomCost] = row;
    const roomName = rooms.find((room) => room.id === Number(roomId))?.name;
    return { id: idx, value: roomCost, label: roomName || "Ogólne" };
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
