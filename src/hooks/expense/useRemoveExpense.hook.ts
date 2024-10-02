import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense } from "../../models/expense";

interface Data {
  expense: Expense;
}

export function useRemoveExpense() {
  const { mutate } = useMutation({
    mutationFn: ({ expense }: Data) =>
      ExpenseHttpService.removeExpense(expense.projectId, expense.id),
    onSuccess: (_, { expense: { id, projectId } }) => {
      queryClient.setQueryData(
        [`expenses-${projectId}`],
        (oldData: Expense[]) => oldData.filter((expense) => expense.id !== id)
      );
    },
  });

  return { removeExpense: mutate };
}
