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

  const { data, isFetching, isLoading } = useGetConversationQuery(queryParams, {
    refetchOnMountOrArgChange: true,
    skip: !!!ticketId,
  });

  const addConversationDropdownButton = addConversationDropdownButtonDynamic?.(
    setSelectedConversationType,
  );

  const openConversationTypeContext = () => {
    if (upsertConversationTypes?.includes(selectedConversationType?.type)) {
      return (
        <UpsertConversation
          isDrawerOpen={selectedConversationType?.isOpen}
          setIsDrawerOpen={setSelectedConversationType}
          selectedConversationType={selectedConversationType}
        />
      );
    }
    if (selectedConversationType?.type === TICKET_CONVERSATIONS_TYPE?.DISCUSS) {
      return (
        <Discuss
          isDrawerOpen={selectedConversationType?.isOpen}
          setIsDrawerOpen={setSelectedConversationType}
        />
      );
    }
    return null;
  };

  return {
    data,
    isLoading,
    isFetching,
    addConversationDropdownButton,
    openConversationTypeContext,
    selectedConversationType,
  };
};
