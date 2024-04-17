import React from 'react';
import { CardsWrapper } from '../CardsWrapper';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import useDashboardGiftCard from './useDashboardGiftCard';

const DashboardGiftCard = () => {
  const { giftCardsColumns, giftCardsData, contentHeight } =
    useDashboardGiftCard();
  return (
    <>
      <CardsWrapper href={AIR_LOYALTY_PROGRAM?.GIFT_CARDS} title="Giftcard">
        <Box height={contentHeight} sx={{ overflowY: 'auto' }}>
          <TanstackTable
            columns={giftCardsColumns}
            data={giftCardsData}
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

export default DashboardGiftCard;
