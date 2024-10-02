import { Expense, NewExpense, UpdateExpense } from "../models/expense";

export class ExpenseHttpService {
  public static async fetchExpenses(
    projectId: number,
    passphrase?: string
  ): Promise<Expense[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/expenses/get`,
      {
        method: "POST",
        body: JSON.stringify({ passphrase }),
        credentials: "include",
      }
    );
    const json = await response.json();
    return json.data;
  }

  public static async createExpense(
    expense: NewExpense,
    projectId: number
  ): Promise<number> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/expenses`,
      {
        method: "POST",
        body: JSON.stringify(expense),
        credentials: "include",
      }
    );
    const json = await response.json();
    return json.data;
  }

  public static async updateExpense(
    projectId: number,
    expenseId: number,
    updateExpense: UpdateExpense
  ): Promise<null> {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects/${projectId}/expenses/${expenseId}`,
      {
        method: "PUT",
        body: JSON.stringify(updateExpense),
        credentials: "include",
      }
    );
    const json = await response.json();
    return json.data;
  }

  public static async removeExpense(
    projectId: number,
    expenseId: number
  ): Promise<null> {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects/${projectId}/expenses/${expenseId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const json = await response.json();
    return json.data;
  }
}
