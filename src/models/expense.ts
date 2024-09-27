export interface Expense {
  id: number;
  projectId: number;
  roomId: number;
  room: string;
  itemTypeId: number;
  itemType: string;
  itemName: string;
  cost: number;
  deliveryCost?: number;
}

export interface NewExpense {
  roomId: number;
  room: string;
  itemTypeId: number;
  itemType: string;
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
