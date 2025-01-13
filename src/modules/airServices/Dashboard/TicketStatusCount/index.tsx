import { Box, Grid } from '@mui/material';
import { useTicketStatusCount } from './useTicketStatusCount';
import ApiErrorState from '@/components/ApiErrorState';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { TicketStatusCountImage } from '@/assets/images';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AvatarItemCountCard } from '@/components/Cards/AvatarItemCountCard/AvatarItemCountCard';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';

export const TicketStatusCount = () => {
  const {
    isError,
    refetch,
    apiCallInProgress,
    ticketDashboardCards,
    isFetching,
    fulfilledTimeStamp,
  } = useTicketStatusCount();

  if (apiCallInProgress) return <SkeletonCard hasThirdSkeleton={false} />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <>
      <Box sx={{ textAlign: 'right', mb: 0.5 }}>
        <ApiPollingButton
          showLoader={apiCallInProgress}
          onClick={refetch}
          variant="text"
          intervalTime={AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD}
          isFetching={isFetching}
          fulfilledTimeStamp={fulfilledTimeStamp}
        />
      </Box>
      <Grid container spacing={2}>
        {ticketDashboardCards?.map((item: any) => (
          <Grid key={item?.id} item xs={12} md={4} lg={3}>
            <AvatarItemCountCard
              avatarBgColor={item?.color}
              name={item?.label}
              count={item?.count}
              avatarUrl={TicketStatusCountImage}
              isDynamic={false}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
