import { useGetTicketsTimeEntriesByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useState } from 'react';

export const useDetailViewTimeEntries = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
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
  } = useGetTicketsTimeEntriesByIdQuery(apiDataParameter, {
    refetchOnMountOrArgChange: true,
    skip: !!!ticketId,
  });

  return {
    isLoading,
    isFetching,
    isError,
    timeEntryData,
    isDrawerOpen,
    setIsDrawerOpen,
    isIconVisible,
    setIsIconVisible,
  };
};
