import { NextRouter, useRouter } from 'next/router';
import { singleTicketDetailTabsDynamic } from './SingleTicketDetails.data';
import { useRef } from 'react';
import { useGetServicesSingleTicketDetailByIdQuery } from '@/services/airServices/tickets';

export const useSingleTicketDetails = () => {
  const startTimerId = useRef(null);
  const intervalRef = useRef<number | null>(null);

  const router: NextRouter = useRouter();
  const { ticketId } = router?.query;

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesSingleTicketDetailByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const childComponentProps = {
    data,
    startTimerId,
    intervalRef,
    refetch,
  };

  const singleTicketDetailTabs =
    singleTicketDetailTabsDynamic?.(childComponentProps);

  return {
    isLoading,
    isFetching,
    isError,
    singleTicketDetailTabs,
    refetch,
    data,
    childComponentProps,
    router,
  };
};
