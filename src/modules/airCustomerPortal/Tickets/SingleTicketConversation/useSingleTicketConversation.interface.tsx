import { Dispatch, SetStateAction } from 'react';

export interface useSingleTicketConversationIsReplyOpenI {
  data?: any;
  conversationType?: string;
  isOpen?: boolean;
}

export interface ConversationCardPropsI {
  data: any;
  isReplyOpen: useSingleTicketConversationIsReplyOpenI;
  setIsReplyOpen: Dispatch<
    SetStateAction<useSingleTicketConversationIsReplyOpenI>
  >;
  singleTicketData: any;
}

export interface ReplySingleTicketConversationPropsI {
  isReplyOpen: useSingleTicketConversationIsReplyOpenI;
  setIsReplyOpen: Dispatch<
    SetStateAction<useSingleTicketConversationIsReplyOpenI>
  >;
  singleTicketData: any;
}
