import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    if (!this.transactions) {
      throw Error('No data found!');
    }
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((total: number, values: number) => total + values, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((total: number, values: number) => total + values, 0);

    const total = totalIncome - totalOutcome;

    const balanceObject = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balanceObject;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = { id: uuid(), title, type, value };

    this.transactions.push(transaction);

    if (!transaction) {
      throw Error('Erro ao criar!');
    }
    return transaction;
  }
}

export default TransactionsRepository;
