import { useGetTicketsTimeEntriesByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';

export const useViewTimeEntries = () => {
  const router = useRouter();

  const { ticketId } = router?.query;

  const apiDataParameter = {
    queryParams: {
      ticketId,
    },
  };

  const {
    data: timeEntryData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetTicketsTimeEntriesByIdQuery(apiDataParameter, {
    refetchOnMountOrArgChange: true,
    skip: !!!ticketId,
  });

  return {
    isLoading,
    isError,
    timeEntryData,
    isFetching,
    refetch,
  };
};
