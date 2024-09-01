import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { ExpenseGrouped } from "../../models/expense";

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

export function updatePieChartForProject(
  projectId: number,
  roomId: number,
  cost: number
) {
  queryClient.setQueryData(
    [`expenses-pie-chart-${projectId}`],
    (oldData: ExpenseGrouped[]): ExpenseGrouped[] =>
      updatePieChartData(oldData, roomId, cost)
  );
}

export function updatePieChartForRoom(
  projectId: number,
  roomId: number,
  cost: number,
  itemTypeId: number
) {
  queryClient.setQueryData(
    [`expenses-pie-chart-${roomId}-${projectId}`],
    (oldData: ExpenseGrouped[]): ExpenseGrouped[] =>
      updatePieChartData(oldData, itemTypeId, cost)
  );
}

function updatePieChartData(
  oldData: ExpenseGrouped[],
  groupedId: number,
  cost: number
) {
  const hadPieChartAlready = oldData.find(({ id }) => id === groupedId);
  if (hadPieChartAlready) {
    return oldData
      .map((old) => {
        if (old.id === groupedId) {
          return {
            id: groupedId,
            cost: old.cost + cost,
          };
        } else {
          return old;
        }
      })
      .filter(({ cost }) => cost > 0);
  } else {
    return [...oldData, { id: groupedId, cost }];
  }
}
