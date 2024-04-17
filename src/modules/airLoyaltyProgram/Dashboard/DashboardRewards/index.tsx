import React from 'react';
import { CardsWrapper } from '../CardsWrapper';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import useDashboardRewards from './useDashboardRewards';

const DashboardRewards = () => {
  const { rewardsColumns, rewardsData, contentHeight } = useDashboardRewards();
  return (
    <>
      <CardsWrapper href={AIR_LOYALTY_PROGRAM?.REWARDS} title="Rewards">
        <Box height={contentHeight} sx={{ overflowY: 'auto' }}>
          <TanstackTable
            columns={rewardsColumns}
            data={rewardsData}
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

export default DashboardRewards;
