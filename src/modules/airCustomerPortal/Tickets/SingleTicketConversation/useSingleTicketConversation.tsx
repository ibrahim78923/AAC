import { useGetConversationForCustomerSingleTicketQuery } from '@/services/airCustomerPortal/Tickets';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSingleTicketConversation = () => {
  const [isReplyOpen, setIsReplyOpen] = useState({});
  const router = useRouter();
  const { id } = router?.query;

  const queryParams = {
    recordId: id,
  };

  const { data, isFetching, isLoading, refetch, isError } =
    useGetConversationForCustomerSingleTicketQuery(queryParams, {
      refetchOnMountOrArgChange: true,
      skip: !!!id,
    });

  return {
    data,
    isFetching,
    isLoading,
    refetch,
    isError,
    isReplyOpen,
    setIsReplyOpen,
  };
};
