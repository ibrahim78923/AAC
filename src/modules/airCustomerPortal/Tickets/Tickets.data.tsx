import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { TICKET_STATUS } from '@/constants/strings';
import { Dispatch, SetStateAction } from 'react';

export const ticketStatuses: string[] = [
  TICKET_STATUS?.CLOSED,
  TICKET_STATUS?.OPEN,
  TICKET_STATUS?.PENDING,
  TICKET_STATUS?.RESOLVED,
  TICKET_STATUS?.SPAM,
  TICKET_STATUS?.SHARE_WITH_ME,
];

export const CHECK_SURVEY_SUBMISSION_STATUS = {
  SUBMITTED: 'Survey submitted.',
  NOT_SUBMITTED: 'Survey not submitted.',
};

export const allTicketsDropdownFunction = (
  setTicketStatus: Dispatch<SetStateAction<string>>,
) => [
  {
    id: 1,
    title: 'All tickets',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.('All tickets');
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Open',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.OPEN);
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'Closed',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.CLOSED);
      closeMenu?.();
    },
  },
  {
    id: 4,
    title: 'Resolved',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.RESOLVED);
      closeMenu?.();
    },
  },
  {
    id: 5,
    title: 'Share with me',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.SHARE_WITH_ME);
      closeMenu?.();
    },
  },
];
