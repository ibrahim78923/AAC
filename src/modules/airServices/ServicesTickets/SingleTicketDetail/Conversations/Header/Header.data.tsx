import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT } from '../Conversations.data';
import { UpsertConversation } from '../UpsertConversation';
import { Discuss } from '../Discuss';
import { DeleteConversation } from '../DeleteConversation';

export const ticketsConversationPortalActionComponent = {
  [TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.ADD_NOTE]: (
    <UpsertConversation />
  ),
  [TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.EDIT_NOTE]: (
    <UpsertConversation />
  ),
  [TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.DELETE_NOTE]: (
    <DeleteConversation />
  ),
  [TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.FORWARD]: (
    <UpsertConversation />
  ),
  [TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.REPLY]: <UpsertConversation />,
  [TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.DISCUSS]: <Discuss />,
};

export const addConversationDropdownActionsDynamic = (setAction: any) => [
  {
    id: 1,
    title: 'Note',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_NOTE,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction(TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.ADD_NOTE);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Reply',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_REPLY,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction(TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.REPLY);
      closeMenu();
    },
  },
  //TODO: will comment for now . will be included in future as per BA discussion
  // {
  //   id: 3,
  //   title: 'Forward',
  //   permissionKey: [
  //     AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_FARWARD,
  //   ],
  //   handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
  //     setAction(TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.FORWARD);
  //     closeMenu();
  //   },
  // },
  {
    id: 4,
    title: 'Discuss',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction(TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.DISCUSS);
      closeMenu();
    },
  },
];
