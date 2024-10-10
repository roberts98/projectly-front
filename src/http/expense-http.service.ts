import { Expense, NewExpense, UpdateExpense } from "../models/expense";
import { baseAxios } from "./base-axios.ts";

export class ExpenseHttpService {
  public static async fetchExpenses(
    projectId: number,
    passphrase?: string,
  ): Promise<Expense[]> {
    return baseAxios
      .post(`/projects/${projectId}/expenses/get`, {
        passphrase,
      })
      .then((response) => response.data.data);
  }

  public static async createExpense(
    expense: NewExpense,
    projectId: number,
  ): Promise<number> {
    return baseAxios
      .post(`/projects/${projectId}/expenses`, expense)
      .then((response) => response.data.data);
  }

  public static async updateExpense(
    projectId: number,
    expenseId: number,
    updateExpense: UpdateExpense,
    passphrase?: string,
  ): Promise<null> {
    return baseAxios
      .put(`/projects/${projectId}/expenses/${expenseId}`, {
        ...updateExpense,
        passphrase,
      })
      .then((response) => response.data.data);
  }

  public static async removeExpense(
    projectId: number,
    expenseId: number,
  ): Promise<null> {
    return baseAxios
      .delete(`/projects/${projectId}/expenses/${expenseId}`)
      .then((response) => response.data.data);
  }
}
