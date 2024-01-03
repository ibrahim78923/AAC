import { useState } from 'react';
import { TransactionsList } from './Transactions.data';
import { useTheme } from '@mui/material';

export const useTransitions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const theme: any = useTheme();

  const transactionsListColumn = TransactionsList();
  return {
    transactionsListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    theme
  };
};
