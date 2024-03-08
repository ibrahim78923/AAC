import { Grid, Box } from '@mui/material';
import TicketInfoBoardHeader from './TicketInfoBoardHeader';
import { TicketInfoCard } from './TicketInfoCard';
import { Fragment } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { AssociationsImage } from '@/assets/images';
import { useTicketsBoardView } from './useTicketsBoardView';

export const TableBoardView = ({
  setTicketAction,
  setSelectedTicketList,
  search,
  filterTicketLists,
}: any) => {
  const {
    HEAD_STATUS,
    data,
    isLoading,
    isError,
    isFetching,
    ticketViewBoardArray,
  } = useTicketsBoardView({ search, filterTicketLists });

  if (isError) return <ApiErrorState />;
  if (isLoading || isFetching) return <SkeletonTable />;
  if (!!!data?.data?.tickets?.length)
    return <NoData message="No data is available" image={AssociationsImage} />;

  return (
    <Grid
      container
      spacing={2}
      flexWrap={'nowrap'}
      sx={{ overflowX: 'auto', overflowY: 'hidden' }}
    >
      {HEAD_STATUS?.map((head: any) => {
        const totalCount =
          ticketViewBoardArray?.filter((item: any) => head?.be === item?.status)
            ?.length || 0;
        return (
          <Grid item xs={3} sx={{ minWidth: '400px' }} key={head?.heading}>
            <TicketInfoBoardHeader title={head?.heading} total={totalCount} />
            <Box height={'100%'} overflow={'auto'} bgcolor={'grey.400'} p={2}>
              {ticketViewBoardArray?.map(
                (item: any) =>
                  head?.be === item?.status && (
                    <Fragment key={item?._id}>
                      <TicketInfoCard
                        details={item}
                        setTicketAction={setTicketAction}
                        setSelectedTicketList={setSelectedTicketList}
                      />
                    </Fragment>
                  ),
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
