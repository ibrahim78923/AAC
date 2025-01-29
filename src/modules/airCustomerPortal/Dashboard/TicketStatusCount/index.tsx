import { Box, Skeleton } from '@mui/material';
import { TicketCard } from '../TicketCard';
import { useTicketStatusCount } from './useTicketStatusCount';
import ApiErrorState from '@/components/ApiErrorState';
import { TICKET_TYPE } from '../WelcomeCard/WelcomeCard.data';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

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
          refresh={refetch}
        />
      </Box>
    );

  return (
    <ContainerGrid spacing={1}>
      {ticketsCountsData?.map((singleData: any) => (
        <CustomGrid sm={6} md={5} lg={4} key={singleData?._id}>
          <TicketCard
            color={singleData?.color}
            count={singleData?.count}
            label={singleData?.label}
            totalCount={data?.ticketsCount[TICKET_TYPE?.TOTAL]}
          />
        </CustomGrid>
      ))}
    </ContainerGrid>
  );
};
