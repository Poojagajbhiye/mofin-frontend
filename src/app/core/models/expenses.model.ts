export interface Expenses {
  userId: string;
  year: number;
  months: {
    [month: string]: {
      income: number;
      balance: number;
      savings: { type: string; amount: number }[];
      investments: { type: string; amount: number }[];
      expenses: {
        [category: string]: {
          budget: number;
          actual: number;
        };
      };
    };
  };
}