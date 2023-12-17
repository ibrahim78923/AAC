import { Box } from '@mui/material';
import { TransactionsHeader } from './TransactionsHeader';
import { useTransitions } from './useTransactions';
import TanstackTable from '@/components/Table/TanstackTable';
import { transactionsListData } from './Transactions.data';

export const Transactions = () => {
  const { transactionsListColumn } = useTransitions();
  return (
    <Box>
      <TransactionsHeader />
      <Box mt={'2rem'}>
        <TanstackTable
          data={transactionsListData}
          columns={transactionsListColumn}
          isPagination={true}
        />
      </Box>
    </Box>
  );
};
