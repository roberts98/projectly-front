import { useMutation } from "@tanstack/react-query";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense, UpdateExpense } from "../../models/expense";
import { queryClient } from "../../query-client";

interface Data {
  projectId: number;
  expenseId: number;
  categoryId: number;
  subcategoryId: number;
  updateExpense: UpdateExpense;
  oldCost: number;
  passphrase?: string;
}

export function useUpdateExpense() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ projectId, expenseId, updateExpense, passphrase }: Data) =>
      ExpenseHttpService.updateExpense(
        projectId,
        expenseId,
        updateExpense,
        passphrase
      ),
    onSuccess: (_, { projectId, expenseId, updateExpense }) => {
      setExpensesData(projectId, expenseId, updateExpense);
    },
  });

  return { updateExpense: mutate, isUpdatingExpense: isPending };
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
