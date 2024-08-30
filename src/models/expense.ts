export interface Expense {
  id: number;
  projectId: number;
  roomId: number;
  itemTypeId?: number;
  itemName: string;
  cost: number;
  deliveryCost?: number;
}

export interface NewExpense {
  roomId: number;
  itemTypeId: number;
  itemName: string;
  cost: number;
  deliveryCost?: number;
}

export interface UpdateExpense {
  itemName: string;
  cost: number;
  deliveryCost?: number;
}
