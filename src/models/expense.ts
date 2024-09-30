export interface Expense {
  id: number;
  projectId: number;
  categoryId: number;
  category: string;
  subcategoryId: number;
  subcategory: string;
  itemName: string;
  cost: number;
  deliveryCost?: number;
}

export interface NewExpense {
  categoryId: number;
  category: string;
  subcategoryId: number;
  subcategory: string;
  itemName: string;
  cost: number;
  deliveryCost?: number;
  buyDate: string;
}

export interface UpdateExpense {
  itemName: string;
  cost: number;
  deliveryCost?: number;
}

export interface ExpenseGrouped {
  id: number;
  cost: number;
}
