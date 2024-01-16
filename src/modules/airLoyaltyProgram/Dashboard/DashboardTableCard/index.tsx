import React from 'react';
import { CardsWrapper } from '../CardsWrapper';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';

export const DashboardTableCard = ({
  tableColumns,
  tableData,
  href,
  title,
  contentHeight = 310,
  contentSX,
}: any) => {
  return (
    <>
      <CardsWrapper href={href} title={title}>
        <Box height={contentHeight} sx={{ overflowY: 'auto', ...contentSX }}>
          <TanstackTable
            columns={tableColumns}
            data={tableData}
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
