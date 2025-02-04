import { usePublicTicketStatusCount } from './usePublicTicketStatusCount';
import { TicketStatusCountImage } from '@/assets/images';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { AvatarItemCountCard } from '@/components/Cards/AvatarItemCountCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ListGrid } from '@/components/Grids/ListGrid';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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

  if (!data && !error) return <SkeletonCard hasThirdSkeleton={false} />;

  return (
    <ApiRequestFlow
      showSkeleton={apiCallInProgress}
      hasError={skip || isError}
      refreshApi={refetch}
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      cardSkeletonType={SKELETON_TYPES?.TWO_LAYER_CARD}
    >
      <ListGrid
        list={ticketDashboardCards}
        md={4}
        lg={3}
        render={(item: any) => (
          <AvatarItemCountCard
            avatarBgColor={item?.color}
            name={item?.label}
            count={item?.count}
            avatarUrl={TicketStatusCountImage}
            isDynamic={false}
          />
        )}
      />
    </ApiRequestFlow>
  );
};
