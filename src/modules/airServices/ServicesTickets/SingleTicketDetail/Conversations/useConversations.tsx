import { TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';
import { useGetConversationQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
import { Discuss } from './Discuss';
import {
  addConversationDropdownButtonDynamic,
  upsertConversationTypes,
} from './Conversations.data';
import { useState } from 'react';
import { UpsertConversation } from './UpsertConversation';

export const useConversations = () => {
  const [selectedConversationType, setSelectedConversationType] = useState<any>(
    {},
  );

  const router = useRouter();
  const { ticketId } = router?.query;

  const queryParams = {
    recordId: ticketId,
  };

  const { data, isFetching, isLoading, refetch, isError } =
    useGetConversationQuery(queryParams, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const addConversationDropdownButton = addConversationDropdownButtonDynamic?.(
    setSelectedConversationType,
  );

  const openConversationTypeContextProps = {
    isDrawerOpen: selectedConversationType?.isOpen,
    setIsDrawerOpen: setSelectedConversationType,
    selectedConversationType: selectedConversationType,
    refetch: refetch,
  };

  const openConversationTypeContext = () => {
    if (
      upsertConversationTypes?.includes(
        selectedConversationType?.conversationType,
      )
    ) {
      return <UpsertConversation {...openConversationTypeContextProps} />;
    }
    if (
      selectedConversationType?.conversationType ===
      TICKET_CONVERSATIONS_TYPE?.DISCUSS
    ) {
      return <Discuss {...openConversationTypeContextProps} />;
    }
    return <></>;
  };

  return {
    data,
    isLoading,
    isFetching,
    addConversationDropdownButton,
    openConversationTypeContext,
    selectedConversationType,
    setSelectedConversationType,
    refetch,
    isError,
  };
};
