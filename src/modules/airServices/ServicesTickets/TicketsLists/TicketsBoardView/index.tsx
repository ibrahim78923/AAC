import { Grid, Box } from '@mui/material';
import TicketInfoBoardHeader from './TicketInfoBoardHeader';
import { TicketInfoCard } from './TicketInfoCard';
import { Fragment } from 'react';
import { useGetTicketsQuery } from '@/services/airServices/tickets';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const TableBoardView = ({
  setTicketAction,
  setSelectedTicketList,
}: any) => {
  const HEAD_STATUS = [
    { heading: 'Open', be: 'OPEN' },
    { heading: 'Resolved', be: 'RESOLVED' },
    { heading: 'Pending', be: 'PENDING' },
    { heading: 'Closed', be: 'CLOSED' },
  ];

  const { data, isLoading, isError } = useGetTicketsQuery();

  const ticketViewBoardArray = data?.data?.tickets;

  if (isError) return <ApiErrorState />;
  if (isLoading) return <SkeletonTable />;

  return (
    <Grid container spacing={2} overflow={'auto'} flexWrap={'nowrap'}>
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
