import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense, NewExpense } from "../../models/expense";
import { setDataForPieChartForRoom } from "./useExpensePieChart.hook";

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
      setDataForPieChartForRoom(projectId, expense.roomId, expense.cost);
    },
  });

  return { createExpense: mutate };
}
