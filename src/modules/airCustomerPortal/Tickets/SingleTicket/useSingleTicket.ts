import { useGetCustomerPortalTicketsByIdQuery } from '@/services/airCustomerPortal/Tickets';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSingleTicket = () => {
  const [status] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const router = useRouter();
  const ticketId = router?.query?.id;

  const { data, isLoading, isFetching, isError } =
    useGetCustomerPortalTicketsByIdQuery(ticketId, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const singleTicketData = data?.data?.find((item: any) => item);

  return {
    status,
    openShareModal,
    setOpenShareModal,
    ticketId,
    singleTicketData,
    isLoading,
    isFetching,
    isError,
  };
};
