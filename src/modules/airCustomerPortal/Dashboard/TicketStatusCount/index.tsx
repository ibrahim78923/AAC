import { Box, Grid, Skeleton } from '@mui/material';
import { TicketCard } from '../TicketCard';
import { useTicketStatusCount } from './useTicketStatusCount';
import ApiErrorState from '@/components/ApiErrorState';
import { TICKET_TYPE } from '../WelcomeCard/WelcomeCard.data';

export const TicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, ticketsCountsData, refetch } =
    useTicketStatusCount();
  if (isLoading || isFetching)
    return (
      <Skeleton
        variant="rounded"
        width={'100%'}
        height={50}
        sx={{ bgcolor: 'grey.900', borderRadius: 3 }}
      />
    );
  if (isError)
    return (
      <Box width="100%" borderRadius={3}>
        <ApiErrorState
          height=""
          textColor="common.white"
          canRefresh
          refresh={() => refetch?.()}
        />
      </Box>
    );
  return (
    <Grid container spacing={1} sx={{ height: '100%' }}>
      {ticketsCountsData?.map((singleData: any) => (
        <Grid item xs={12} sm={6} md={5} lg={4} key={singleData?._id}>
          <TicketCard
            color={singleData?.color}
            count={singleData?.count}
            label={singleData?.label}
            totalCount={data?.ticketsCount[TICKET_TYPE?.TOTAL]}
          />
        </Grid>
      ))}
    </Grid>
  );
};
