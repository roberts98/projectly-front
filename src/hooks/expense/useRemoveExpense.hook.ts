import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense } from "../../models/expense";
import { refetchPieCharts } from "./useExpensePieChart.hook";

interface Data {
  expenseId: number;
  projectId: number;
}

export function useRemoveExpense() {
  const { mutate } = useMutation({
    mutationFn: ({ expenseId, projectId }: Data) =>
      ExpenseHttpService.removeExpense(projectId, expenseId),
    onSuccess: (_, { expenseId, projectId }) => {
      queryClient.setQueryData(
        [`expenses-${projectId}`],
        (oldData: Expense[]) =>
          oldData.filter((expense) => expense.id !== expenseId)
      );
      refetchPieCharts();
    },
  });

  return { removeExpense: mutate };
}
