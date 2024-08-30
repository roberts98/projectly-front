import { useMutation } from "@tanstack/react-query";
import { Expense, NewExpense } from "../../models/expense";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { queryClient } from "../../App";
import { refetchPieCharts } from "./useExpensePieChart.hook";

interface Data {
  expense: NewExpense;
  projectId: number;
}

export function useCreateExpense() {
  const { mutate } = useMutation({
    mutationFn: ({ expense, projectId }: Data) =>
      ExpenseHttpService.createExpense(expense, projectId),
    onSuccess: (id, { expense, projectId }) => {
      queryClient.setQueryData(
        [`expenses-${projectId}`],
        (oldData: Expense[]): Expense[] => [
          ...oldData,
          { ...expense, id, projectId },
        ]
      );
      refetchPieCharts();
    },
  });

  return { createExpense: mutate };
}
