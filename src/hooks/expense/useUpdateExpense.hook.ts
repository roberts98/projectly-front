import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense, UpdateExpense } from "../../models/expense";
import { refetchPieCharts } from "./useExpensePieChart.hook";

interface Data {
  projectId: number;
  expenseId: number;
  updateExpense: UpdateExpense;
}

export function useUpdateExpense() {
  const { mutate } = useMutation({
    mutationFn: ({ projectId, expenseId, updateExpense }: Data) =>
      ExpenseHttpService.updateExpense(projectId, expenseId, updateExpense),
    onSuccess: (_, { projectId, expenseId, updateExpense }) => {
      setExpensesData(projectId, expenseId, updateExpense);
      refetchPieCharts();
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
