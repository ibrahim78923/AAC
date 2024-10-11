import { useGetSingleServicesTicketsTimeEntriesListQuery } from '@/services/airServices/tickets/single-ticket-details/details';
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
  } = useGetSingleServicesTicketsTimeEntriesListQuery(apiDataParameter, {
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
