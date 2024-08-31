import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense } from "../../models/expense";
import { setDataForPieChartForRoom } from "./useExpensePieChart.hook";

interface Data {
  expenseId: number;
  projectId: number;
  roomId: number;
  cost: number;
}

export function useRemoveExpense() {
  const { mutate } = useMutation({
    mutationFn: ({ expenseId, projectId }: Data) =>
      ExpenseHttpService.removeExpense(projectId, expenseId),
    onSuccess: (_, { expenseId, projectId, roomId, cost }) => {
      queryClient.setQueryData(
        [`expenses-${projectId}`],
        (oldData: Expense[]) =>
          oldData.filter((expense) => expense.id !== expenseId)
      );
      setDataForPieChartForRoom(projectId, roomId, -cost);
    },
  });

  return { removeExpense: mutate };
}
