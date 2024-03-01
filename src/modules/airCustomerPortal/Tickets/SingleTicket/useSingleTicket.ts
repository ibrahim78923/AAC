import { useLazyGetCustomerPortalTicketsByIdQuery } from '@/services/airCustomerPortal/Tickets';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSingleTicket = () => {
  const [status] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();
  const ticketId = router?.query?.id;
  const [lazyGetTicketsTriggerById, { data }] =
    useLazyGetCustomerPortalTicketsByIdQuery();
  useEffect(() => {
    const handleGetTicket = async () => {
      await lazyGetTicketsTriggerById(ticketId);
    };
    handleGetTicket();
  }, [ticketId]);
  const singleTicketData = data?.data?.find((item: any) => item);

  return {
    status,
    openPopup,
    setOpenPopup,
    ticketId,
    singleTicketData,
  };
};
