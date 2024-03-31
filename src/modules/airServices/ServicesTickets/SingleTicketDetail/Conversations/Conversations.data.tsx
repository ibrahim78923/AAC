import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';

export const CONVERSATION_TYPE_MODIFY = {
  [TICKET_CONVERSATIONS_TYPE?.NOTE]: {
    label: 'Note',
    description: 'notified to',
    add: 'Add Note',
    edit: 'Edit Note',
    recipients: 'Notify to',
  },
  [TICKET_CONVERSATIONS_TYPE?.REPLY]: {
    label: 'Reply',
    description: 'replied to',
    add: 'Reply',
    edit: 'Reply',
    recipients: 'Reply to',
  },
  [TICKET_CONVERSATIONS_TYPE?.FORWARD]: {
    label: 'Forward',
    description: 'forwarded to',
    add: 'Forward',
    edit: 'Forward',
    recipients: 'Forward to',
  },
};

export const upsertConversationTypes = [
  TICKET_CONVERSATIONS_TYPE?.NOTE,
  TICKET_CONVERSATIONS_TYPE?.REPLY,
  TICKET_CONVERSATIONS_TYPE?.FORWARD,
];

export const addConversationDropdownButtonDynamic = (
  setSelectedConversationType: any,
) => [
  {
    id: 1,
    title: 'Note',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_NOTE,
    ],
    handleClick: (closeMenu: any) => {
      setSelectedConversationType({
        type: TICKET_CONVERSATIONS_TYPE?.NOTE,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Reply',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_REPLY,
    ],
    handleClick: (closeMenu: any) => {
      setSelectedConversationType({
        type: TICKET_CONVERSATIONS_TYPE?.REPLY,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Forward',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_FARWARD,
    ],
    handleClick: (closeMenu: any) => {
      setSelectedConversationType({
        type: TICKET_CONVERSATIONS_TYPE?.FORWARD,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 4,
    title: 'Discuss',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
    ],
    handleClick: (closeMenu: any) => {
      setSelectedConversationType({
        type: TICKET_CONVERSATIONS_TYPE?.DISCUSS,
        isOpen: true,
      });
      closeMenu();
    },
  },
];
