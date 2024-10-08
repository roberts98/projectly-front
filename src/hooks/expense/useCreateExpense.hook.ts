import { useMutation } from "@tanstack/react-query";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense, NewExpense } from "../../models/expense";
import { queryClient } from "../../query-client";
import { toast } from "react-toastify";

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
          { ...expense, id, projectId },
          ...oldData,
        ]
      );
      toast("Wydatek utworzony", { type: "success" });
    },
  });

  return { createExpense: mutate };
}
