import { TransactionsList } from './Transactions.data';

export const useTransitions = () => {
  const transactionsListColumn = TransactionsList();
  return {
    transactionsListColumn,
  };
};
