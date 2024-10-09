import { useLazyGetServicesTicketsConversationListQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';

export const useGetTicketConversationList = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const [
    lazyGetServicesTicketsConversationListTrigger,
    lazyGetServicesTicketsConversationListStatus,
  ] = useLazyGetServicesTicketsConversationListQuery();

  const getTicketConversationListData = async () => {
    const apiDataParameter = {
      queryParams: {
        recordId: ticketId,
      },
    };

    try {
      await lazyGetServicesTicketsConversationListTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  return {
    getTicketConversationListData,
    lazyGetServicesTicketsConversationListStatus,
  };
};
