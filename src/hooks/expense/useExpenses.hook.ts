import { useQuery } from "@tanstack/react-query";
import { ExpenseHttpService } from "../../http/expense-http.service";

export function useExpenses(projectId: number) {
  const { data: expenses = [] } = useQuery({
    queryKey: [`expenses-${projectId}`],
    queryFn: () => ExpenseHttpService.fetchExpenses(projectId),
  });

  return { expenses };
}
