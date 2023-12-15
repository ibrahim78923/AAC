import { useState } from 'react';
import { TransactionsList } from './Transactions.data';

export const useTransitions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  const transactionsListColumn = TransactionsList();
  return {
    transactionsListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
  };
};
