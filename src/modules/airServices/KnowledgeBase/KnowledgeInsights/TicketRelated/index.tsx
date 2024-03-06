import React from 'react';
import { Box } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useTicketRelated } from './useTicketRelated';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  FIRST_ELEMENT,
  knowledgeInsightsRelatedTicketColumns,
} from './TicketRelated.data';
import NoData from '@/components/NoData';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const TicketRelated = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    router,
  } = useTicketRelated();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) <ApiErrorState />;

  return (
    <>
      <br />
      {data?.data?.articles?.length ? (
        <Box>
          <PageTitledHeader
            moveBack={() =>
              router?.push({
                pathname: router?.pathname,
              })
            }
            canMovedBack
            title={data?.data?.articles?.[FIRST_ELEMENT]?.title}
          />
          <TanstackTable
            data={data?.data?.articles?.[FIRST_ELEMENT]?.insertedTickets}
            columns={knowledgeInsightsRelatedTicketColumns}
            isLoading={isLoading}
            currentPage={data?.data?.meta?.page}
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            totalRecords={data?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Box>
      ) : (
        <NoData message="No inserted tickets found" />
      )}
    </>
  );
};
