import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import {
  AIR_SERVICES_TICKETS_TICKET_LISTS,
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
} from '@/constants/permission-keys';
import { SELECTED_ARRAY_LENGTH, TICKET_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/lib/snackbar';

export const TICKETS_ACTION_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
  EDIT_TICKET: 'edit-ticket',
  ASSIGNED_TICKET: 'assigned-ticket',
  MOVE_TICKET: 'move-ticket',
  MERGE_TICKET: 'merge-ticket',
  DELETE_TICKET: 'delete-ticket',
  UPDATE_TICKET_STATUS: 'update-ticket-status',
  PRINT_TICKET: 'print-ticket',
  EMAIL_TICKET: 'email-ticket',
  ADD_TIME_ON_TICKET: 'add-time-on-ticket',
};

export const ticketsActionDropdownDynamic = (
  setTicketAction: (
    ticketActionQuery: string,
    data?: {
      [key: string]: any;
    },
  ) => void,
  selectedTicketList: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
    ],
    title: 'Edit',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.EDIT_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Assign To',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 3,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Bulk Update',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA);
      closeMenu?.();
    },
  },
  {
    id: 4,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Merge',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.MERGE_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 5,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Move',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.MOVE_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 6,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Mark as Close',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS, {
        status: TICKET_STATUS?.CLOSED,
      });
      closeMenu?.();
    },
  },
  {
    id: 7,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Mark as Spam',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS, {
        status: TICKET_STATUS?.SPAM,
      });
      closeMenu?.();
    },
  },
  {
    id: 8,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Delete',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.DELETE_TICKET);
      closeMenu?.();
    },
  },
];
