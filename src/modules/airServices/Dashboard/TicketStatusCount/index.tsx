import { Box } from '@mui/material';
import { useTicketStatusCount } from './useTicketStatusCount';
import { TicketStatusCountImage } from '@/assets/images';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AvatarItemCountCard } from '@/components/Cards/AvatarItemCountCard';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ListGrid } from '@/components/Grids/ListGrid';

export const TicketStatusCount = () => {
  const {
    isError,
    refetch,
    showLoader,
    ticketDashboardCards,
    isFetching,
    fulfilledTimeStamp,
  } = useTicketStatusCount();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={isError}
      refreshApi={refetch}
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      cardSkeletonType={SKELETON_TYPES?.TWO_LAYER_CARD}
    >
      <Box sx={{ textAlign: 'right', mb: 0.5 }}>
        <ApiPollingButton
          showLoader={showLoader}
          onClick={refetch}
          variant="text"
          intervalTime={AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD}
          isFetching={isFetching}
          fulfilledTimeStamp={fulfilledTimeStamp}
        />
      </Box>
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
