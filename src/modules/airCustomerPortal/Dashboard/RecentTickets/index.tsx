import { CardLayout } from '../CardLayout';
import { useRecentTickets } from './useRecentTickets';
import { TicketsCard } from '../../Tickets/TicketCard';
import { Fragment } from 'react';
import { TicketCardDataI } from '../../Tickets/TicketCard/TicketCard.interface';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const RecentTickets = () => {
  const { data, isLoading, isFetching, isError, router, refetch, companyId } =
    useRecentTickets();

  return (
    <CardLayout
      title={'Recent Tickets'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
          query: { ...(companyId && { companyId }) },
        });
      }}
      btnPosition="left"
      buttonText="View All"
      maxHeight={'40vh'}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        hasNoData={!!!data?.data?.length}
        noDataMessage={'No tickets found'}
        errorHeight="100%"
      >
        {data?.data?.map((ticket: TicketCardDataI) => (
          <Fragment key={ticket?._id}>
            <TicketsCard ticket={ticket} />
          </Fragment>
        ))}
      </ApiRequestFlow>
    </CardLayout>
  );
};
