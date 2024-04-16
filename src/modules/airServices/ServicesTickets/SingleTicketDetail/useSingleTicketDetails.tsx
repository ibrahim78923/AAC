// import { useGetTicketsDetailsByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';
import { useGetTicketsByIdQuery } from '@/services/airServices/tickets';

export const useSingleTicketDetails = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
