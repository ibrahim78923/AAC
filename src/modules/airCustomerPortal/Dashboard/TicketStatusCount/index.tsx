import { TicketCard } from '../TicketCard';
import { useTicketStatusCount } from './useTicketStatusCount';
import { TICKET_TYPE } from '../WelcomeCard/WelcomeCard.data';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const TicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, ticketsCountsData, refetch } =
    useTicketStatusCount();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
      errorHeight="100%"
      errorTextColor="common.white"
      length={3}
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      cardSkeletonType={
        SKELETON_TYPES?.MEDIUM_HORIZONTAL_TWO_LAYER_ROUNDED_CARD
      }
    >
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
    </ApiRequestFlow>
  );
};
