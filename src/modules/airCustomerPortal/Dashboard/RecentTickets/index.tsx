import { CardLayout } from '../CardLayout';
import { useRecentTickets } from './useRecentTickets';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { TicketsCard } from '../../Tickets/TicketCard';
import { Fragment } from 'react';
import { TicketCardDataI } from '../../Tickets/TicketCard/TicketCard.interface';

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
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} canRefresh refresh={() => refetch?.()} />
      ) : (
        <>
          {!!data?.data?.length ? (
            data?.data?.map((ticket: TicketCardDataI) => (
              <Fragment key={ticket?._id}>
                <TicketsCard ticket={ticket} />
              </Fragment>
            ))
          ) : (
            <NoData height={'100%'} message="No recent tickets found" />
          )}
        </>
      )}
    </CardLayout>
  );
};
