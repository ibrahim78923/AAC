import { useGetTicketsDetailsByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';

export const useHeader = () => {
  const router = useRouter();
  const { ticketId } = router.query;

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const { data } = useGetTicketsDetailsByIdQuery(getSingleTicketParameter);

  return {
    data,
  };
};
