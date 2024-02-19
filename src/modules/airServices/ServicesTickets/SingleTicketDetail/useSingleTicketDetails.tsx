import { useGetTicketsDetailsByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';

export const useSingleTicketDetails = () => {
  const router = useRouter();
  const { ticketId } = router?.query;
  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const { data, isLoading, isFetching, isError } =
    useGetTicketsDetailsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
