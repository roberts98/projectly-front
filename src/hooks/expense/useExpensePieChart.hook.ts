import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";

export function useExpenseForRoomPieChart(projectId: number, roomId: number) {
  const { data = [] } = useQuery({
    queryKey: [`expenses-pie-chart-${roomId}-${projectId}`],
    queryFn: () =>
      ExpenseHttpService.fetchExpensesForRoomPieChart(projectId, roomId),
  });

  return { data };
}

export function useExpenseForProjectPieChart(projectId: number) {
  const { data = [] } = useQuery({
    queryKey: [`expenses-pie-chart-${projectId}`],
    queryFn: () =>
      ExpenseHttpService.fetchExpensesForProjectPieChart(projectId),
  });

  return { data };
}

export function refetchPieCharts() {
  queryClient.refetchQueries({
    predicate: (query) => {
      return query.queryKey.some((queryKeyString) =>
        (queryKeyString as string).includes("expenses-pie-chart")
      );
    },
  });
}
