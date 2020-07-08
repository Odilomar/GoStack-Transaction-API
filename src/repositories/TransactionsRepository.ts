import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initReducedBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const reducedBalance = this.transactions.reduce((prev, cur) => {
      const key = cur.type;

      if (!prev[key]) {
        prev[key] = 0;
      }

      prev[key] += cur.value;

      return prev;
    }, initReducedBalance);

    const { income, outcome } = reducedBalance;
    const total = income - outcome;
    const resultBalance: Balance = { income, outcome, total };

    return resultBalance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction: Transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
