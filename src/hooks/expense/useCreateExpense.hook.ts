import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { ExpenseHttpService } from "../../http/expense-http.service";
import { Expense, NewExpense } from "../../models/expense";
import {
  updatePieChartForProject,
  updatePieChartForCategory,
} from "./useExpensePieChart.hook";

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
      updatePieChartForProject(projectId, expense.categoryId, expense.cost);
      updatePieChartForCategory(
        projectId,
        expense.categoryId,
        expense.cost,
        expense.subcategoryId
      );
    },
  });

  return { createExpense: mutate };
}
