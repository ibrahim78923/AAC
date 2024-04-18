import React from 'react';
import { CardsWrapper } from '../CardsWrapper';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import useDashboardTransaction from './useDashboardTransaction';

const DashboardTransaction = () => {
  const { transactionsColumns, transactionsData, contentHeight } =
    useDashboardTransaction();
  return (
    <>
      <CardsWrapper href={AIR_LOYALTY_PROGRAM?.VOUCHERS} title="Transactions">
        <Box height={contentHeight} sx={{ overflowY: 'auto' }}>
          <TanstackTable
            columns={transactionsColumns}
            data={transactionsData}
            isFetching={false}
            isLoading={false}
            isError={false}
            isSuccess={true}
          />
        </Box>
      </CardsWrapper>
    </>
  );
};

export default DashboardTransaction;
