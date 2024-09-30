import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { ExpenseGrouped } from "../../models/expense";

export function useExpenseForCategoryPieChart(
  projectId: number,
  categoryId: number
) {
  const { data = [] } = useQuery({
    queryKey: [`expenses-pie-chart-${categoryId}-${projectId}`],
    queryFn: () =>
      ExpenseHttpService.fetchExpensesForCategoryPieChart(
        projectId,
        categoryId
      ),
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
  categoryId: number,
  cost: number
) {
  queryClient.setQueryData(
    [`expenses-pie-chart-${projectId}`],
    (oldData: ExpenseGrouped[]): ExpenseGrouped[] =>
      updatePieChartData(oldData, categoryId, cost)
  );
}

export function updatePieChartForCategory(
  projectId: number,
  categoryId: number,
  cost: number,
  subcategoryId: number
) {
  queryClient.setQueryData(
    [`expenses-pie-chart-${categoryId}-${projectId}`],
    (oldData: ExpenseGrouped[]): ExpenseGrouped[] =>
      updatePieChartData(oldData, subcategoryId, cost)
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
