import { useQuery } from "@tanstack/react-query";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { queryClient } from "../../App";

export function useExpenseForRoomPieChart(projectId: number, roomId: number) {
  const { data = [] } = useQuery({
    queryKey: [`expenses-pie-chart-${roomId}-${projectId}`],
    queryFn: () =>
      ExpenseHttpService.fetchExpensesForRoomPieChart(projectId, roomId),
    staleTime: Infinity,
  });

  return { data };
}

export function useExpenseForProjectPieChart(projectId: number) {
  const { data = [] } = useQuery({
    queryKey: [`expenses-pie-chart-${projectId}`],
    queryFn: () =>
      ExpenseHttpService.fetchExpensesForProjectPieChart(projectId),
    staleTime: Infinity,
  });

  return { data };
}

export function setDataForPieChartForRoom(
  projectId: number,
  roomId: number,
  cost: number
) {
  queryClient.setQueryData(
    [`expenses-pie-chart-${roomId}-${projectId}`],
    (oldData: [number, number][]): [number, number][] => {
      const hadPieChartAlready = oldData.find(([roomId]) => roomId === roomId);
      if (hadPieChartAlready) {
        return (
          oldData.map(([roomId, currentCost]) => {
            if (roomId === roomId) {
              return [roomId, currentCost + cost];
            } else {
              return [roomId, currentCost];
            }
          }) as [number, number][]
        ).filter(([_, cost]) => cost > 0);
      } else {
        return [...oldData, [roomId, cost]];
      }
    }
  );
}
