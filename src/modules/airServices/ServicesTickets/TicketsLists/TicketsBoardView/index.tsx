import { Grid, Box } from '@mui/material';
import { TicketInfoCard } from './TicketInfoCard';
import { Fragment } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { useTicketsBoardView } from './useTicketsBoardView';
import CustomPagination from '@/components/CustomPagination';
import { DataRecordCount } from '@/components/DataRecordCount';
import { RENDER_COLOR } from './TicketsBoardView.data';

export const TableBoardView = () => {
  const {
    HEAD_STATUS,
    lazyGetTicketsStatus,
    page,
    handleSetPageLimit,
    handleSetPage,
    getTicketsListData,
    decrement,
    increment,
  } = useTicketsBoardView();

  if (lazyGetTicketsStatus?.isError)
    return (
      <ApiErrorState canRefresh refresh={() => getTicketsListData?.(page)} />
    );
  if (lazyGetTicketsStatus?.isLoading || lazyGetTicketsStatus?.isFetching)
    return <SkeletonTable />;
  if (!!!lazyGetTicketsStatus?.data?.data?.tickets?.length)
    return <NoData message="No ticket found" />;

  return (
    <>
      <Grid
        container
        spacing={2}
        flexWrap={'nowrap'}
        sx={{ overflowX: 'auto', overflowY: 'hidden' }}
      >
        {HEAD_STATUS?.map((head: any) => {
          const totalCount =
            lazyGetTicketsStatus?.data?.data?.tickets?.filter(
              (item: any) => head?.be === item?.status,
            )?.length || 0;
          return (
            <Grid item xs={3} sx={{ minWidth: '400px' }} key={head?.heading}>
              <DataRecordCount
                totalCount={totalCount}
                recordName={head?.heading}
                color={RENDER_COLOR?.[head?.heading]}
              />
              <Box
                height={'100%'}
                overflow={'auto'}
                bgcolor={'grey.400'}
                p={2}
                borderTop={'3px solid'}
                borderColor={RENDER_COLOR?.[head?.heading]}
              >
                {lazyGetTicketsStatus?.data?.data?.tickets?.map(
                  (item: any) =>
                    head?.be === item?.status && (
                      <Fragment key={item?._id}>
                        <TicketInfoCard details={item} />
                      </Fragment>
                    ),
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <CustomPagination
        count={lazyGetTicketsStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetTicketsStatus?.data?.data?.meta?.limit}
        currentPage={lazyGetTicketsStatus?.data?.data?.meta?.page}
        onPageChange={(page: number) => handleSetPage(page)}
        setPage={handleSetPage}
        setPageLimit={handleSetPageLimit}
        totalRecords={lazyGetTicketsStatus?.data?.data?.meta?.total}
        incrementPageClick={increment}
        decrementPageClick={decrement}
      />
    </>
  );
};
