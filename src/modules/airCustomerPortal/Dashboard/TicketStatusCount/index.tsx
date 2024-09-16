import { Box, Skeleton } from '@mui/material';
import { TicketCard } from '../TicketCard';
import { useTicketStatusCount } from './useTicketStatusCount';
import { styles } from '../WelcomeCard/WelcomeCard.style';
import ApiErrorState from '@/components/ApiErrorState';
import { TICKET_TYPE } from '../WelcomeCard/WelcomeCard.data';

export const TicketStatusCount = () => {
  const { ticketCardWrapper } = styles;
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
    <Box sx={ticketCardWrapper}>
      {ticketsCountsData?.map((singleData: any) => (
        <TicketCard
          key={singleData?._id}
          data={singleData}
          totalCount={data?.ticketsCount[TICKET_TYPE?.TOTAL]}
        />
      ))}
    </Box>
  );
};
