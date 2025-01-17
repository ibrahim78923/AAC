import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { DeleteRelatedTicket } from '../DeleteRelatedTicket';
import { UpsertRelatedTicket } from '../UpsertRelatedTicket';

export const RELATED_TICKET_ACTIONS_CONSTANT = {
  CREATE_RELATED_TICKET: 'create-new-ticket',
  EDIT_RELATED_TICKET: 'edit-ticket',
  DELETE_RELATED_TICKET: 'delete-ticket',
};

const { CREATE_RELATED_TICKET, EDIT_RELATED_TICKET, DELETE_RELATED_TICKET } =
  RELATED_TICKET_ACTIONS_CONSTANT;

export const relatedTicketsActionDropdownDynamic = (
  setTicketAction: (action: string) => void,
  selectedChildTickets = [],
) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_CHILD_TICKETS],
    title: 'Edit',
    disabled: selectedChildTickets?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction?.(RELATED_TICKET_ACTIONS_CONSTANT?.EDIT_RELATED_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_CHILD_TICKETS],
    title: 'Delete',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction?.(RELATED_TICKET_ACTIONS_CONSTANT?.DELETE_RELATED_TICKET);
      closeMenu?.();
    },
  },
];

export const relatedTicketActionComponent = {
  [CREATE_RELATED_TICKET]: <UpsertRelatedTicket />,
  [EDIT_RELATED_TICKET]: <UpsertRelatedTicket />,
  [DELETE_RELATED_TICKET]: <DeleteRelatedTicket />,
};
