import { useLazyGetCustomerPortalTicketsByIdQuery } from '@/services/airCustomerPortal/Tickets';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export const useSingleTicket = () => {
  const [status, setStatus] = useState(false);
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
  const singleTicketData = data?.data?.[0];
  const onSubmit = async () => {
    enqueueSnackbar('The ticket has been closed', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setStatus(true);
  };

  return {
    status,
    openPopup,
    setOpenPopup,
    onSubmit,
    ticketId,
    singleTicketData,
  };
};
