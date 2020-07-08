import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = transactionsRepository.all();
    const balanceTransactions = transactionsRepository.getBalance();

    const resultTransactions = {
      transactions: [...allTransactions],
      balance: balanceTransactions,
    };

    return response.json(resultTransactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transactionCreated = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transactionCreated);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
