import { Grid } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { usePublicTicketStatusCount } from './usePublicTicketStatusCount';
import { TicketStatusCountImage } from '@/assets/images';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { AvatarItemCountCard } from '@/components/Cards/AvatarItemCountCard/AvatarItemCountCard';

export const PublicTicketStatusCount = () => {
  const {
    data,
    isError,
    skip,
    error,
    apiCallInProgress,
    ticketDashboardCards,
    refetch,
  } = usePublicTicketStatusCount();

  if (skip) return <ApiErrorState canRefresh refresh={refetch} />;
  if (!data && !error) return <SkeletonCard hasThirdSkeleton={false} />;
  if (apiCallInProgress) return <SkeletonCard hasThirdSkeleton={false} />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <Grid container spacing={3}>
      {ticketDashboardCards?.map((item: any) => (
        <Grid key={item?.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
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
  );
};
