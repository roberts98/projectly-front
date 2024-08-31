import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense, UpdateExpense } from "../../models/expense";
import { setDataForPieChartForRoom } from "./useExpensePieChart.hook";

interface Data {
  projectId: number;
  expenseId: number;
  roomId: number;
  updateExpense: UpdateExpense;
  oldCost: number;
}

export function useUpdateExpense() {
  const { mutate } = useMutation({
    mutationFn: ({ projectId, expenseId, updateExpense }: Data) =>
      ExpenseHttpService.updateExpense(projectId, expenseId, updateExpense),
    onSuccess: (
      _,
      { projectId, roomId, expenseId, updateExpense, oldCost }
    ) => {
      setExpensesData(projectId, expenseId, updateExpense);
      setDataForPieChartForRoom(
        projectId,
        roomId,
        updateExpense.cost - oldCost
      );
    },
  });

  return { updateExpense: mutate };
}

function setExpensesData(
  projectId: number,
  expenseId: number,
  updateExpense: UpdateExpense
) {
  queryClient.setQueryData([`expenses-${projectId}`], (oldData: Expense[]) => {
    const newExpenses = oldData.map((expense) => {
      if (expense.id === expenseId) {
        return {
          ...expense,
          ...updateExpense,
        };
      } else return expense;
    });
    return newExpenses;
  });
}
