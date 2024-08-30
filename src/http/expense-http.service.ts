import { Expense, NewExpense, UpdateExpense } from "../models/expense";

export class ExpenseHttpService {
  public static async fetchExpenses(projectId: number): Promise<Expense[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/expenses`
    );
    const json = await response.json();
    return json.data;
  }

  public static async fetchExpensesForProjectPieChart(
    projectId: number
  ): Promise<[number | null, number][]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/expenses/pie-chart`
    );
    const json = await response.json();
    return json.data;
  }

  public static async fetchExpensesForRoomPieChart(
    projectId: number,
    roomId: number
  ): Promise<[number | null, number][]> {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects/${projectId}/rooms/${roomId}/expenses/pie-chart`
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
      }
    );
    const json = await response.json();
    return json.data;
  }
}
