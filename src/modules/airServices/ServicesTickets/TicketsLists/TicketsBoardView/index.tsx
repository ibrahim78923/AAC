import { Grid, Box } from '@mui/material';
import TicketInfoBoardHeader from './TicketInfoBoardHeader';
import { TicketInfoCard } from './TicketInfoCard';
import { Fragment } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { AssociationsImage } from '@/assets/images';
import { useTicketsBoardView } from './useTicketsBoardView';
import CustomPagination from '@/components/CustomPagination';

export const TableBoardView = ({
  setTicketAction,
  setSelectedTicketList,
  search,
  filterTicketLists,
}: any) => {
  const {
    HEAD_STATUS,
    lazyGetTicketsStatus,
    setPage,
    setPageLimit,
    getValueTicketsListData,
    page,
  } = useTicketsBoardView({ search, filterTicketLists });

  if (lazyGetTicketsStatus?.isError) return <ApiErrorState />;
  if (lazyGetTicketsStatus?.isLoading || lazyGetTicketsStatus?.isFetching)
    return <SkeletonTable />;
  if (!!!lazyGetTicketsStatus?.data?.data?.tickets?.length)
    return <NoData message="No data is available" image={AssociationsImage} />;

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
              <TicketInfoBoardHeader title={head?.heading} total={totalCount} />
              <Box height={'100%'} overflow={'auto'} bgcolor={'grey.400'} p={2}>
                {lazyGetTicketsStatus?.data?.data?.tickets?.map(
                  (item: any) =>
                    head?.be === item?.status && (
                      <Fragment key={item?._id}>
                        <TicketInfoCard
                          details={item}
                          setTicketAction={setTicketAction}
                          setSelectedTicketList={setSelectedTicketList}
                          totalRecords={
                            lazyGetTicketsStatus?.data?.data?.tickets?.length
                          }
                          setPage={setPage}
                          page={page}
                          getValueTicketsListData={getValueTicketsListData}
                        />
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
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        totalRecords={lazyGetTicketsStatus?.data?.data?.meta?.total}
      />
    </>
  );
};
