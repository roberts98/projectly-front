import { useQuery } from "@tanstack/react-query";
import { ExpenseHttpService } from "../../http/expense-http.service";

export function useExpenses(
  projectId: number,
  secured: boolean,
  ready: boolean,
  passphrase?: string
) {
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: [`expenses-${projectId}`],
    queryFn: () => ExpenseHttpService.fetchExpenses(projectId, passphrase),
    staleTime: Infinity,
    enabled: secured ? ready && !!passphrase : ready,
  });

  return { expenses, isLoading };
}
